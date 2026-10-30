import React, { useState, useEffect } from "react";
import { Aluno, livroPorId, partidasDo, PONTOS_POR_ACERTO, registrarPartida, situacao, TOTAL_PERGUNTAS, KEY } from "../lib/aluno";
import { ArrowLeft, CheckCircle2, XCircle, Trophy, Sparkles, BookOpen, Clock, AlertTriangle, ArrowRight } from "lucide-react";

export type Pergunta = {
  pergunta: string;
  opcoes: string[];
  correta: number;
  explicacao: string;
};

interface MissaoViewProps {
  aluno: Aluno;
  livroId: string;
  onVoltar: () => void;
  onNavigate: (view: string) => void;
}

export const MissaoView: React.FC<MissaoViewProps> = ({ aluno, livroId, onVoltar, onNavigate }) => {
  const livro = livroPorId(livroId);

  const [perguntas, setPerguntas] = useState<Pergunta[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [atual, setAtual] = useState(0);
  const [escolha, setEscolha] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [fim, setFim] = useState(false);
  const [restante, setRestante] = useState(15);

  const st = situacao(partidasDo(aluno.codigo_aluno), livroId);

  // Fetch quiz questions from backend API
  useEffect(() => {
    if (!st.podeJogar) {
      setCarregando(false);
      return;
    }

    let isMounted = true;
    async function carregarPerguntas() {
      setCarregando(true);
      setErro(null);
      const dificuldade = localStorage.getItem("mq_dificuldade") || "medio";
      try {
        const res = await fetch("/api/gerar-perguntas", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ livroId, codigo: aluno.codigo_aluno, dificuldade }),
        });

        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          throw new Error(errData.error || `Erro do servidor (${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          if (Array.isArray(data.perguntas) && data.perguntas.length >= 6) {
            setPerguntas(data.perguntas.slice(0, 6));
          } else {
            throw new Error("Não foi possível carregar as 6 perguntas do livro.");
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error("Falha ao gerar perguntas:", err);
          setErro(err.message || "Erro ao conectar com a missão.");
        }
      } finally {
        if (isMounted) {
          setCarregando(false);
        }
      }
    }

    carregarPerguntas();
    return () => {
      isMounted = false;
    };
  }, [livroId, aluno.codigo_aluno, st.podeJogar]);

  // Countdown timer on mission completion
  useEffect(() => {
    if (!fim) return;
    if (restante <= 0) {
      localStorage.removeItem(KEY);
      onNavigate("login");
      return;
    }
    const timer = setTimeout(() => setRestante((r) => r - 1), 1000);
    return () => clearTimeout(timer);
  }, [fim, restante, onNavigate]);

  const handleEncerrar = () => {
    localStorage.removeItem(KEY);
    onNavigate("login");
  };

  if (!livro) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 text-center">
        <p className="text-rose-400 font-bold">Livro não encontrado no acervo.</p>
        <button onClick={onVoltar} className="mt-4 rounded-xl bg-amber-400 text-slate-950 px-4 py-2 font-bold">
          Voltar para meus livros
        </button>
      </div>
    );
  }

  // If not allowed to play
  if (!st.podeJogar && !fim) {
    return (
      <div className="mx-auto max-w-xl px-4 py-12 text-center">
        <div className="glow-card p-8 space-y-4">
          <div className="text-5xl">🔒</div>
          <h2 className="font-['Baloo_2'] text-2xl font-bold text-white">
            Missão Indisponível
          </h2>
          <p className="text-sm text-cyan-200">
            {st.jaJogado
              ? "Você já concluiu a missão referente a este livro! Cada livro devolvido vale uma única missão no jogo."
              : "Esta missão ainda está em período de espera. É necessário aguardar 5 dias entre missões para leitura do próximo livro!"}
          </p>
          <button
            onClick={onVoltar}
            className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-6 py-2.5 transition"
          >
            Voltar para Meus Livros
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 px-4 sm:px-6 py-6">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={onVoltar}
          className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-300 hover:text-cyan-100 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para lista de livros</span>
        </button>

        <div className="text-xs font-bold text-cyan-200/80 bg-slate-900/80 px-3 py-1.5 rounded-full border border-cyan-500/20">
          Aluno: <span className="text-amber-300 font-mono">{aluno.codigo_aluno}</span> ({aluno.nome})
        </div>
      </div>

      {/* Book header card */}
      <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-900/80 border border-cyan-400/30 shadow-lg">
        <div className="h-20 w-14 shrink-0 rounded-lg overflow-hidden bg-slate-800 shadow border border-cyan-500/20 flex items-center justify-center">
          {livro.capa_url ? (
            <img src={livro.capa_url} alt={livro.titulo} className="h-full w-full object-cover" />
          ) : (
            <span className="text-2xl">📖</span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Missão Literária</span>
          </div>
          <h1 className="font-['Baloo_2'] text-xl sm:text-2xl font-black text-white truncate">
            {livro.titulo}
          </h1>
          <p className="text-xs text-cyan-200/80 font-medium truncate">
            Autor: {livro.autor} {livro.categoria ? `• ${livro.categoria}` : ""}
          </p>
        </div>
      </div>

      {/* Main card */}
      <section className="glow-card p-6 sm:p-8 min-h-[380px] flex flex-col justify-center">
        {carregando ? (
          <div className="text-center py-8 space-y-5" role="status" aria-live="polite">
            <div className="relative mx-auto h-36 max-w-md overflow-hidden rounded-2xl bg-slate-900/80 border border-cyan-400/30">
              <div className="absolute inset-x-6 bottom-6 h-1 rounded-full bg-cyan-400/20" />
              <img
                src="/gatinho-missao.png"
                alt="Gatinho caminhando enquanto prepara a missão"
                className="missao-gatinho absolute bottom-5 left-2 h-24 w-20 object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = "none";
                }}
              />
            </div>

            <div className="relative mx-auto max-w-md h-3 overflow-hidden rounded-full bg-slate-800 border border-cyan-500/30">
              <div className="missao-barra-carrega absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-amber-400 to-amber-500" />
            </div>

            <div>
              <p className="font-['Baloo_2'] text-2xl font-extrabold text-white animate-pulse">
                🐱 Preparando sua missão com Inteligência Artificial...
              </p>
              <p className="text-xs text-cyan-200/80 mt-1">
                Lendo os dados de "{livro.titulo}" e formulando 6 perguntas desafiadoras.
              </p>
            </div>
          </div>
        ) : erro ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-rose-500/20 border border-rose-500/40 flex items-center justify-center text-3xl text-rose-400">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <h3 className="font-['Baloo_2'] text-xl font-bold text-white">
              Não foi possível carregar as perguntas
            </h3>
            <p className="text-xs text-rose-300 max-w-md mx-auto">{erro}</p>
            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => window.location.reload()}
                className="rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-5 py-2 text-xs transition"
              >
                Tentar novamente
              </button>
              <button
                onClick={onVoltar}
                className="rounded-xl bg-slate-800 text-slate-200 font-bold px-5 py-2 text-xs transition"
              >
                Voltar aos livros
              </button>
            </div>
          </div>
        ) : fim ? (
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl animate-bounce">
              {acertos >= 5 ? "🏆" : acertos >= 3 ? "⭐" : "📖"}
            </div>

            <h2 className="font-['Baloo_2'] text-3xl sm:text-4xl font-black text-white">
              Missão Concluída!
            </h2>

            <p className="text-sm font-semibold text-cyan-200">
              Você acertou <strong className="text-amber-300 font-bold">{acertos}</strong> de{" "}
              <strong>{TOTAL_PERGUNTAS}</strong> perguntas sobre o livro.
            </p>

            <div className="py-2">
              <span className="font-['Baloo_2'] text-5xl sm:text-6xl font-black text-amber-400 drop-shadow-[0_0_25px_rgba(251,191,36,0.5)]">
                +{acertos * PONTOS_POR_ACERTO} pts
              </span>
            </div>

            <div className="rounded-xl bg-slate-900/80 border border-cyan-400/30 p-4 max-w-md mx-auto text-xs text-cyan-200/90 text-left space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-white">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Pontos gravados com sucesso!</span>
              </div>
              <p>
                Sua pontuação já foi somada no seu perfil e refletida no ranking escolar.
              </p>
              <p className="text-amber-300 font-medium">
                Regra da biblioteca: Sua próxima missão, com outro livro lido, será liberada em 5 dias!
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleEncerrar}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-3 shadow-lg transition transform active:scale-95"
              >
                <span>Encerrar e passar a vez ({restante}s)</span>
              </button>

              <button
                onClick={() => onNavigate("ranking")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl bg-blue-600/40 hover:bg-blue-600/60 border border-cyan-400/40 text-cyan-200 font-bold text-sm px-6 py-3 transition"
              >
                <Trophy className="w-4 h-4 text-amber-400" />
                <span>Ver Meu Lugar no Ranking</span>
              </button>
            </div>
          </div>
        ) : perguntas.length > 0 ? (
          <div>
            {/* Question Progress Header */}
            <div className="mb-4 flex items-center justify-between text-xs sm:text-sm font-bold">
              <span className="text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" />
                Pergunta {atual + 1} de {TOTAL_PERGUNTAS}
              </span>
              <span className="text-cyan-300 font-['Baloo_2'] text-base">
                Acertos: {acertos} ({acertos * PONTOS_POR_ACERTO} pts)
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-2.5 rounded-full bg-slate-800/90 overflow-hidden border border-cyan-500/20">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300"
                style={{
                  width: `${((atual + (escolha !== null ? 1 : 0)) / TOTAL_PERGUNTAS) * 100}%`,
                }}
              />
            </div>

            {/* Current Question */}
            <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-bold text-white leading-relaxed">
              {perguntas[atual].pergunta}
            </h2>

            {/* Options */}
            <div className="mt-6 grid gap-3">
              {perguntas[atual].opcoes.map((opcao, i) => {
                const respondeu = escolha !== null;
                const ehCorreta = i === perguntas[atual].correta;
                const foiEscolhida = i === escolha;

                let corEstilo = "bg-slate-900/90 border-slate-700/70 hover:border-amber-400/80 hover:bg-slate-800 text-slate-100";
                if (respondeu) {
                  if (ehCorreta) {
                    corEstilo = "bg-emerald-900/90 border-emerald-400 text-emerald-100 shadow-[0_0_15px_rgba(52,211,153,0.3)]";
                  } else if (foiEscolhida) {
                    corEstilo = "bg-rose-900/90 border-rose-400 text-rose-100";
                  } else {
                    corEstilo = "bg-slate-950/60 border-slate-800 text-slate-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={i}
                    disabled={respondeu}
                    onClick={() => {
                      setEscolha(i);
                      if (ehCorreta) {
                        setAcertos((prev) => prev + 1);
                      }
                    }}
                    className={`flex items-start gap-3 rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all duration-200 ${corEstilo} ${
                      !respondeu ? "cursor-pointer active:scale-[0.99]" : ""
                    }`}
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 font-mono text-sm font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="flex-1 text-sm sm:text-base font-medium leading-snug pt-0.5">
                      {opcao}
                    </span>
                    {respondeu && (
                      <span className="shrink-0 pt-0.5">
                        {ehCorreta ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        ) : foiEscolhida ? (
                          <XCircle className="w-5 h-5 text-rose-400" />
                        ) : null}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Answer Explanation & Next Button */}
            {escolha !== null && (
              <div className="mt-6 p-4 rounded-2xl bg-slate-900/95 border border-cyan-400/30 animate-in fade-in duration-300">
                <div className="flex items-start gap-2.5">
                  <div className="text-xl">
                    {escolha === perguntas[atual].correta ? "🎉" : "💡"}
                  </div>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-semibold text-cyan-100 leading-relaxed">
                      <strong className={escolha === perguntas[atual].correta ? "text-emerald-400" : "text-amber-300"}>
                        {escolha === perguntas[atual].correta ? "Resposta Correta! " : "Quase lá! "}
                      </strong>
                      {perguntas[atual].explicacao}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => {
                      if (atual + 1 >= TOTAL_PERGUNTAS) {
                        // Register partida on completion
                        const totalAcertosFinais = acertos + (escolha === perguntas[atual].correta ? 1 : 0);
                        registrarPartida(aluno.codigo_aluno, {
                          livroId,
                          acertos: totalAcertosFinais,
                          pontos: totalAcertosFinais * PONTOS_POR_ACERTO,
                          data: new Date().toISOString(),
                        });
                        setFim(true);
                      } else {
                        setAtual((prev) => prev + 1);
                        setEscolha(null);
                      }
                    }}
                    className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-2.5 shadow-md transition transform active:scale-95 cursor-pointer"
                  >
                    <span>{atual + 1 >= TOTAL_PERGUNTAS ? "Ver Resultado da Missão" : "Próxima Pergunta"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </section>
    </div>
  );
};
