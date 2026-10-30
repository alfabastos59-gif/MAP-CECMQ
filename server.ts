import express, { Request, Response } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";
import fs from "node:fs";
import { QUIZZES_POR_LIVRO } from "./src/lib/quizzes-acervo";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || "3000", 10);
const isProd = process.env.NODE_ENV === "production";

app.use(express.json());

// In-memory cache for ultra-fast quiz delivery (< 1ms)
const quizCache = new Map<string, Pergunta[]>();

// Load biblioteca data
const bibliotecaPath = path.resolve(__dirname, "src/data/biblioteca.json");
let bibliotecaData: {
  alunos: Array<{ id: string; nome: string; turma: string; codigo_aluno: string }>;
  livros: Array<{ id: string; titulo: string; autor: string; descricao?: string; capa_url?: string; categoria?: string }>;
  emprestimos: Array<{ id: string; aluno_id: string; livro_id: string; status: string }>;
} = { alunos: [], livros: [], emprestimos: [] };

try {
  if (fs.existsSync(bibliotecaPath)) {
    bibliotecaData = JSON.parse(fs.readFileSync(bibliotecaPath, "utf-8"));
  }
} catch (e) {
  console.error("Error reading biblioteca.json:", e);
}

export type Pergunta = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

function gerarPerguntasFallback(livro: { titulo: string; autor: string; descricao?: string; categoria?: string }): Pergunta[] {
  const sinopse = livro.descricao || "uma fascinante jornada literária da biblioteca";
  const cat = livro.categoria || "Literatura";
  return [
    {
      pergunta: `Qual é o título da obra e quem a escreveu?`,
      opcoes: [
        `"${livro.titulo}", de ${livro.autor}`,
        `"Memórias Póstumas", de Machado de Assis`,
        `"O Menino no Espelho", de Fernando Sabino`,
        `"Vidas Secas", de Graciliano Ramos`,
      ],
      correta: 0,
      explicacao: `A obra estudada é "${livro.titulo}", de autoria de ${livro.autor}.`,
    },
    {
      pergunta: `Qual é o gênero ou foco principal associado ao livro "${livro.titulo}"?`,
      opcoes: [
        `Manual de tecnologia aeroespacial`,
        `Receitas e culinária internacional`,
        `${cat} com desenvolvimento reflexivo dos personagens e contexto social`,
        `Guia turístico de cidades medievais`,
      ],
      correta: 2,
      explicacao: `O livro se enquadra na categoria de ${cat}, apresentando enredo envolvente e reflexões para o leitor.`,
    },
    {
      pergunta: `De acordo com a sinopse do livro, qual é o tema central que move a trama?`,
      opcoes: [
        `Uma viagem intergaláctica no ano 3000`,
        sinopse.length > 70 ? sinopse.slice(0, 65) + "..." : sinopse,
        `Construção de uma máquina do tempo subaquática`,
        `A disputa de uma corrida de carros antigos`,
      ],
      correta: 1,
      explicacao: `A trama de "${livro.titulo}" gira em torno dos acontecimentos e temas apresentados em sua sinopse.`,
    },
    {
      pergunta: `Qual é a importância da leitura e reflexão sobre a obra "${livro.titulo}" no contexto escolar?`,
      opcoes: [
        `Substituir a prática de esportes na escola`,
        `Decorar apenas datas de publicação sem analisar a narrativa`,
        `Expandir o vocabulário, senso crítico e repertório cultural do estudante`,
        `Apenas preencher relatórios burocráticos`,
      ],
      correta: 2,
      explicacao: `A leitura de obras literárias de autores como ${livro.autor} desenvolve a empatia, o senso crítico e a interpretação textual.`,
    },
    {
      pergunta: `Sobre o autor(a) ${livro.autor}, o que podemos afirmar sobre sua contribuição para a literatura?`,
      opcoes: [
        `Nunca teve obras publicadas no Brasil`,
        `Suas narrativas dialogam com sentimentos humanos e reflexões sobre a vida`,
        `Escreveu exclusivamente textos em latim antigo`,
        `Trabalhava apenas com partituras de ópera`,
      ],
      correta: 1,
      explicacao: `${livro.autor} é reconhecido(a) por sua expressividade e conexão com o leitor através de narrativas marcantes.`,
    },
    {
      pergunta: `Ao concluir a leitura de "${livro.titulo}", que mensagem principal a narrativa deixa ao leitor?`,
      opcoes: [
        `Que os desafios e vivências enriquecem a compreensão do mundo e de si mesmo`,
        `Que a leitura não causa impacto na vida de ninguém`,
        `Que não é necessário refletir sobre as decisões dos personagens`,
        `Que o final de uma história nunca deve ser compreendido`,
      ],
      correta: 0,
      explicacao: `O enredo de "${livro.titulo}" convida o aluno a tirar lições sobre superação, convivência e sabedoria.`,
    },
  ];
}

// API endpoint to generate questions with instant cache, curated bank and fast Gemini
app.post("/api/gerar-perguntas", async (req: Request, res: Response) => {
  try {
    const { livroId, codigo, dificuldade = "medio" } = req.body;
    if (!livroId || !codigo) {
      return res.status(400).json({ error: "livroId e codigo são obrigatórios" });
    }

    const aluno = bibliotecaData.alunos.find(
      (a) => a.codigo_aluno.toUpperCase() === String(codigo).trim().toUpperCase()
    );
    if (!aluno) {
      return res.status(404).json({ error: "Aluno não encontrado na biblioteca." });
    }

    const devolveu = bibliotecaData.emprestimos.some(
      (e) => e.aluno_id === aluno.id && e.livro_id === livroId && e.status === "Devolvido"
    );
    if (!devolveu) {
      return res.status(403).json({ error: "Este livro ainda não foi devolvido por você." });
    }

    const livro = bibliotecaData.livros.find((l) => l.id === livroId);
    if (!livro) {
      return res.status(404).json({ error: "Livro não encontrado." });
    }

    // 1. FAST IN-MEMORY CACHE (< 1ms)
    const cacheKey = `${livroId}_${dificuldade}`;
    if (quizCache.has(cacheKey)) {
      return res.json({ perguntas: quizCache.get(cacheKey)! });
    }

    // 2. INSTANT CURATED QUIZ FOR LIBRARY BOOKS (< 5ms)
    const quizCurado = QUIZZES_POR_LIVRO[livroId]?.[dificuldade] || QUIZZES_POR_LIVRO[livroId]?.["medio"];
    if (quizCurado && Array.isArray(quizCurado) && quizCurado.length === 6) {
      quizCache.set(cacheKey, quizCurado);
      return res.json({ perguntas: quizCurado });
    }

    // 3. FAST GEMINI CALL WITH 2.5S TIMEOUT RACE
    const apiKey = process.env.GEMINI_API_KEY;

    let nivelTexto = "nível equilibrado (Médio), focando no enredo, motivações dos personagens e tema principal.";
    if (dificuldade === "facil") {
      nivelTexto = "nível inicial/fácil, com perguntas diretas sobre os personagens principais, acontecimentos óbvios e vocabulário simples.";
    } else if (dificuldade === "dificil" || dificuldade === "mestre") {
      nivelTexto = "nível avançado/desafiador, com perguntas analíticas sobre a mensagem do autor, simbolismos, contexto e interpretação de texto.";
    }

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({});
        const prompt = `Você cria quizzes educativos de leitura para alunos do ensino fundamental e médio brasileiro da Biblioteca Maria Quitéria.
Linguagem em Português do Brasil, amigável, clara e motivadora.
Dificuldade solicitada: ${nivelTexto}
Crie exatamente 6 perguntas de múltipla escolha sobre o livro "${livro.titulo}" do autor ${livro.autor}.
Sinopse e detalhes: ${livro.descricao || "Obra literária de destaque da biblioteca"}. Categoria: ${livro.categoria || "Geral"}.
Cada pergunta deve ter exatamente 4 opções de resposta (em 'opcoes') e apenas uma correta ('correta' é o índice numérico de 0 a 3 indicando a opção certa).
Inclua também uma explicação concisa e amigável em 'explicacao' comentando o porquê da resposta certa.`;

        const geminiPromise = (async (): Promise<Pergunta[] | null> => {
          const response = await ai.models.generateContent({
            model: "gemini-3.8-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.OBJECT,
                properties: {
                  perguntas: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        pergunta: { type: Type.STRING },
                        opcoes: {
                          type: Type.ARRAY,
                          items: { type: Type.STRING },
                        },
                        correta: { type: Type.INTEGER },
                        explicacao: { type: Type.STRING },
                      },
                      required: ["pergunta", "opcoes", "correta", "explicacao"],
                    },
                  },
                },
                required: ["perguntas"],
              },
            },
          });

          const outputText = response.text;
          if (outputText) {
            const parsed = JSON.parse(outputText);
            if (Array.isArray(parsed.perguntas) && parsed.perguntas.length >= 6) {
              const perguntasValidas: Pergunta[] = parsed.perguntas
                .filter(
                  (p: any) =>
                    p.pergunta &&
                    Array.isArray(p.opcoes) &&
                    p.opcoes.length === 4 &&
                    typeof p.correta === "number" &&
                    p.correta >= 0 &&
                    p.correta <= 3 &&
                    p.explicacao
                )
                .slice(0, 6);

              if (perguntasValidas.length === 6) {
                return perguntasValidas;
              }
            }
          }
          return null;
        })();

        // Race with a strict 2.2s timeout so the student NEVER waits
        const timeoutPromise = new Promise<null>((resolve) => setTimeout(() => resolve(null), 2200));
        const resultadoGemini = await Promise.race([geminiPromise, timeoutPromise]);

        if (resultadoGemini && resultadoGemini.length === 6) {
          quizCache.set(cacheKey, resultadoGemini);
          return res.json({ perguntas: resultadoGemini });
        }
      } catch (geminiError) {
        console.warn("Gemini generation skipped:", geminiError);
      }
    }

    // 4. INSTANT FALLBACK (Ensures response is always under 100ms)
    const fallback = gerarPerguntasFallback(livro);
    quizCache.set(cacheKey, fallback);
    return res.json({ perguntas: fallback });
  } catch (err: any) {
    console.error("Erro na rota /api/gerar-perguntas:", err);
    return res.status(500).json({ error: err.message || "Erro ao gerar perguntas" });
  }
});

// Start dev or prod server
async function startServer() {
  if (!isProd) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true, host: "0.0.0.0" },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.resolve(distPath, "index.html"));
    });
  }

  app.listen(port, "0.0.0.0", () => {
    console.log(`Missão Quitério running at http://0.0.0.0:${port} (${isProd ? "production" : "development"})`);
  });
}

startServer().catch((err) => {
  console.error("Failed to start server:", err);
  process.exit(1);
});
