import data from "../data/biblioteca.json";

export interface Aluno {
  id: string;
  nome: string;
  turma: string;
  codigo_aluno: string;
  avatar_url: string | null;
}

export interface Livro {
  id: string;
  titulo: string;
  autor: string;
  descricao?: string;
  capa_url?: string;
  categoria?: string;
  ano?: number;
}

export interface Emprestimo {
  id: string;
  aluno_id: string;
  livro_id: string;
  status: string;
  data_emprestimo?: string;
  data_devolucao?: string;
}

export const KEY = "mq_aluno";
export const PONTOS_POR_ACERTO = 100;
export const TOTAL_PERGUNTAS = 6;
export const DIAS_ESPERA = 5;
const PARTIDAS = "mq_partidas";

export type Partida = {
  livroId: string;
  pontos: number;
  acertos: number;
  data: string;
};

export function buscarAluno(codigo: string): Aluno | null {
  if (!codigo) return null;
  const limpo = codigo.trim().toUpperCase();
  return (data.alunos as Aluno[]).find((a) => a.codigo_aluno.toUpperCase() === limpo) ?? null;
}

export function todosAlunos(): Aluno[] {
  return data.alunos as Aluno[];
}

export function livrosDevolvidos(alunoId: string): Livro[] {
  const ids = new Set(
    (data.emprestimos as Emprestimo[])
      .filter((e) => e.aluno_id === alunoId && e.status === "Devolvido")
      .map((e) => e.livro_id),
  );
  return (data.livros as Livro[]).filter((l) => ids.has(l.id));
}

export function livroPorId(id: string): Livro | null {
  return (data.livros as Livro[]).find((l) => l.id === id) ?? null;
}

const PARTIDAS_PADRAO: Record<string, Partida[]> = {
  RUA0004: [
    { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 400, acertos: 4, data: new Date().toISOString() },
  ],
  GUS0001: [
    { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 300, acertos: 3, data: new Date().toISOString() },
  ],
};

function lerTodas(): Record<string, Partida[]> {
  try {
    const salvo = localStorage.getItem(PARTIDAS);
    if (!salvo) {
      localStorage.setItem(PARTIDAS, JSON.stringify(PARTIDAS_PADRAO));
      return PARTIDAS_PADRAO;
    }
    const parsed = JSON.parse(salvo);
    if (!parsed || Object.keys(parsed).length === 0) {
      return PARTIDAS_PADRAO;
    }
    return parsed;
  } catch {
    return PARTIDAS_PADRAO;
  }
}

export function partidasDo(codigo: string): Partida[] {
  return lerTodas()[codigo] ?? [];
}

export const TOTAL_CASAS = 10;
export const PONTOS_POR_CASA_PADRAO = 100;
export const META_PONTOS_FINAL = 1000;

export function obterPontosPorCasa(): number {
  try {
    const salvo = localStorage.getItem("mq_pontos_por_casa");
    if (salvo) {
      const n = parseInt(salvo, 10);
      if (!isNaN(n) && n > 0) return n;
    }
  } catch {}
  return PONTOS_POR_CASA_PADRAO;
}

export function obterMetaPontos(): number {
  try {
    const salvo = localStorage.getItem("mq_meta_pontos");
    if (salvo) {
      const n = parseInt(salvo, 10);
      if (!isNaN(n) && n > 0) return n;
    }
  } catch {}
  return META_PONTOS_FINAL;
}

export function calcularCasa(
  pontos: number,
  pontosPorCasa: number = obterPontosPorCasa(),
  totalCasas: number = TOTAL_CASAS
): number {
  return Math.min(totalCasas, Math.max(0, Math.floor(pontos / pontosPorCasa)));
}

export function calcularDistanciaMeta(pontos: number): number {
  const meta = obterMetaPontos();
  return Math.max(0, meta - pontos);
}

// 8 distinct cosmic gradients for avatars without pictures
const GRADIENTES_COSMICOS = [
  { grad: "from-cyan-500 to-blue-600", borda: "border-cyan-400", texto: "text-white" },
  { grad: "from-fuchsia-500 to-purple-600", borda: "border-fuchsia-400", texto: "text-white" },
  { grad: "from-emerald-500 to-teal-700", borda: "border-emerald-400", texto: "text-white" },
  { grad: "from-amber-400 to-orange-600", borda: "border-amber-400", texto: "text-slate-950" },
  { grad: "from-violet-600 to-indigo-800", borda: "border-indigo-400", texto: "text-white" },
  { grad: "from-rose-500 to-pink-600", borda: "border-rose-400", texto: "text-white" },
  { grad: "from-teal-400 to-emerald-600", borda: "border-teal-300", texto: "text-slate-950" },
  { grad: "from-blue-600 to-sky-400", borda: "border-sky-300", texto: "text-white" },
];

export function getIniciais(nome: string): string {
  if (!nome) return "MQ";
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 1) {
    return partes[0].slice(0, 2).toUpperCase();
  }
  return (partes[0][0] + partes[partes.length - 1][0]).toUpperCase();
}

export interface AvatarInfo {
  tipo: "imagem" | "iniciais";
  url: string | null;
  iniciais: string;
  gradiente: string;
  borda: string;
  texto: string;
}

export function obterAvatarInfo(
  alunoId: string,
  codigo: string,
  nome: string,
  avatarUrlProp?: string | null
): AvatarInfo {
  const iniciais = getIniciais(nome);

  // Deterministic gradient based on ID or code
  let hash = 0;
  const str = (alunoId || codigo || nome);
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const idx = Math.abs(hash) % GRADIENTES_COSMICOS.length;
  const estilo = GRADIENTES_COSMICOS[idx];

  // 1. Check custom avatar saved in localStorage for this student
  let customUrl: string | null = null;
  try {
    customUrl = localStorage.getItem(`mq_avatar_${alunoId}`) || localStorage.getItem(`mq_avatar_${codigo}`);
  } catch {}

  // 2. Map of authentic character avatars from the official reference illustration
  const defaultAvatars: Record<string, string> = {
    RUA0004: "/assets/avatars/ruan.png",
    GUS0001: "/assets/avatars/gustavo.png",
    "202401": "/assets/avatars/ana.png",
    JEN0006: "/assets/avatars/luisa.png",
    CLO0004: "/assets/avatars/pedro.png",
    MAR0015: "/assets/avatars/mariana.png",
    KAI0009: "/assets/avatars/lucas.png",
  };

  const primeiroNome = (nome || "").trim().split(" ")[0].toLowerCase();
  const avatarPorNome: Record<string, string> = {
    ruan: "/assets/avatars/ruan.png",
    gustavo: "/assets/avatars/gustavo.png",
    ana: "/assets/avatars/ana.png",
    luisa: "/assets/avatars/luisa.png",
    luísa: "/assets/avatars/luisa.png",
    jennifer: "/assets/avatars/luisa.png",
    pedro: "/assets/avatars/pedro.png",
    mariana: "/assets/avatars/mariana.png",
    lucas: "/assets/avatars/lucas.png",
    kailan: "/assets/avatars/lucas.png",
  };

  const finalUrl =
    customUrl ||
    avatarUrlProp ||
    defaultAvatars[codigo] ||
    avatarPorNome[primeiroNome] ||
    null;

  if (finalUrl) {
    return {
      tipo: "imagem",
      url: finalUrl,
      iniciais,
      gradiente: estilo.grad,
      borda: estilo.borda,
      texto: estilo.texto,
    };
  }

  return {
    tipo: "iniciais",
    url: null,
    iniciais,
    gradiente: estilo.grad,
    borda: estilo.borda,
    texto: estilo.texto,
  };
}

export type LinhaRanking = {
  id: string;
  nome: string;
  codigo: string;
  turma: string;
  avatarUrl: string | null;
  jogos: number;
  acertos: number;
  pontos: number;
  casas: number;
  casa: number;
  distanciaMeta: number;
  atingiuMeta: boolean;
};

export function rankingAlunos(): LinhaRanking[] {
  const todas = lerTodas();
  const meta = obterMetaPontos();
  return (data.alunos as Aluno[])
    .map((aluno) => {
      const partidas = todas[aluno.codigo_aluno] ?? [];
      const jogos = partidas.length;
      const acertos = partidas.reduce((total, partida) => total + partida.acertos, 0);
      const pontos = partidas.reduce((total, partida) => total + partida.pontos, 0);
      const casa = calcularCasa(pontos);
      const distanciaMeta = calcularDistanciaMeta(pontos);
      return {
        id: aluno.id,
        nome: aluno.nome,
        codigo: aluno.codigo_aluno,
        turma: aluno.turma,
        avatarUrl: aluno.avatar_url ?? (aluno.codigo_aluno === "RUA0004" ? "/assets/avatar_lider.png" : null),
        jogos,
        acertos,
        pontos,
        casas: casa,
        casa,
        distanciaMeta,
        atingiuMeta: pontos >= meta,
      };
    })
    .sort((a, b) => b.pontos - a.pontos || b.acertos - a.acertos || b.jogos - a.jogos || a.nome.localeCompare(b.nome));
}

export function obterAlunoLider(): LinhaRanking {
  const ranking = rankingAlunos();
  // If any student has points or played matches, the top one is the leader
  const comPontos = ranking.find((a) => a.pontos > 0 || a.jogos > 0);
  if (comPontos) {
    return comPontos;
  }
  // If no points in localStorage yet, find student with most returned books
  const ruan = ranking.find((a) => a.codigo === "RUA0004");
  if (ruan) {
    return ruan;
  }
  return ranking[0];
}

export function registrarPartida(codigo: string, p: Partida) {
  const t = lerTodas();
  const lista = t[codigo] ?? [];
  const antiga = lista.find((x) => x.livroId === p.livroId);
  t[codigo] = [...lista.filter((x) => x.livroId !== p.livroId), antiga ? { ...p, data: antiga.data } : p];
  localStorage.setItem(PARTIDAS, JSON.stringify(t));
}

/** Regras: cada livro só pode ser jogado uma vez; nova partida só após 5 dias da última. */
export function situacao(partidas: Partida[], livroId: string | null, agora = new Date()) {
  const ultima = partidas.reduce<Date | null>((m, p) => {
    const d = new Date(p.data);
    return !m || d > m ? d : m;
  }, null);

  const liberaEm = ultima ? new Date(ultima.getTime() + DIAS_ESPERA * 86400000) : null;
  const jaJogado = !!livroId && partidas.some((p) => p.livroId === livroId);
  const aguardando = !!liberaEm && agora < liberaEm;

  return {
    jaJogado,
    aguardando,
    liberaEm,
    podeJogar: !jaJogado && !aguardando,
  };
}
