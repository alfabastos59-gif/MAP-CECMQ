import React, { useState } from "react";
import { buscarAluno, KEY, todosAlunos, livrosDevolvidos } from "../lib/aluno";
import { Sparkles, Trophy, ArrowRight, BookOpen, AlertCircle, Users, CheckCircle2 } from "lucide-react";

interface LoginViewProps {
  onSuccess: () => void;
  onNavigate: (view: string) => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onSuccess, onNavigate }) => {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const [mostrarListaAlunos, setMostrarListaAlunos] = useState(false);

  const alunos = todosAlunos();

  const handleEntrar = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const codigoLimpo = codigo.trim();
    if (!codigoLimpo) {
      setErro("Por favor, digite o seu código de aluno.");
      return;
    }

    const aluno = buscarAluno(codigoLimpo);
    if (!aluno) {
      setErro("Código não encontrado. Confira com os bibliotecários ou use a lista de alunos abaixo.");
      return;
    }

    localStorage.setItem(KEY, aluno.codigo_aluno);
    onSuccess();
  };

  const selecionarAlunoExemplo = (codigoAluno: string) => {
    setCodigo(codigoAluno);
    setErro("");
    const aluno = buscarAluno(codigoAluno);
    if (aluno) {
      localStorage.setItem(KEY, aluno.codigo_aluno);
      onSuccess();
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] flex flex-col justify-center items-center px-4 py-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md z-10">
        <div className="login-card p-6 sm:p-8 text-center shadow-2xl backdrop-blur-xl">
          {/* Mascot icon */}
          <div className="relative mx-auto mb-3 w-24 h-24 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400/40 to-cyan-400/30 blur-lg animate-pulse" />
            <img
              src="/gatinho-missao.png"
              alt="Mascote Gatinho da Missão Quitério"
              className="relative w-20 h-20 object-contain drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)] transform hover:scale-105 transition duration-300"
              onError={(e) => {
                // fallback if image not loaded
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Biblioteca Maria Quitéria</span>
          </div>

          <h1 className="font-['Baloo_2'] text-4xl sm:text-5xl font-black text-white tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
            MISSÃO <span className="text-amber-400">QUITÉRIO</span>
          </h1>

          <p className="mt-1 font-bold text-cyan-300 text-sm tracking-wide">
            Leia • Responda • Avance no Tabuleiro
          </p>

          <form onSubmit={handleEntrar} className="mt-6 text-left space-y-4">
            <div>
              <label
                htmlFor="codigo-input"
                className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1.5"
              >
                Código do Aluno
              </label>
              <div className="relative">
                <input
                  id="codigo-input"
                  type="text"
                  value={codigo}
                  onChange={(e) => {
                    setCodigo(e.target.value.toUpperCase());
                    setErro("");
                  }}
                  placeholder="Ex: RUA0004, ADR0007..."
                  className="w-full rounded-xl bg-slate-900/90 border-2 border-cyan-400/40 px-4 py-3 text-lg font-bold text-white placeholder-slate-500 shadow-inner focus:border-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-400/20 transition uppercase tracking-wider"
                  autoFocus
                />
              </div>
            </div>

            {erro && (
              <div className="flex items-start gap-2 p-3 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full group flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] text-lg font-black py-3 px-6 shadow-[0_4px_20px_rgba(251,191,36,0.4)] transition transform active:scale-98 cursor-pointer"
            >
              <span>ENTRAR NA MISSÃO</span>
              <ArrowRight className="w-5 h-5 transition transform group-hover:translate-x-1" />
            </button>
          </form>

          {/* Quick links */}
          <div className="mt-6 pt-5 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <button
              type="button"
              onClick={() => onNavigate("ranking")}
              className="flex items-center gap-1.5 text-amber-300 hover:text-amber-200 font-bold transition"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Ver Ranking dos Alunos</span>
            </button>

            <button
              type="button"
              onClick={() => setMostrarListaAlunos(!mostrarListaAlunos)}
              className="flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-semibold transition"
            >
              <Users className="w-3.5 h-3.5" />
              <span>{mostrarListaAlunos ? "Ocultar alunos" : "Ver códigos de exemplo"}</span>
            </button>
          </div>
        </div>

        {/* Quick select drawer */}
        {mostrarListaAlunos && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/95 border border-cyan-400/30 text-left shadow-2xl backdrop-blur-md">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300">
                Alunos cadastrados (toque para entrar direto)
              </span>
              <span className="text-[10px] text-slate-400">{alunos.length} alunos</span>
            </div>
            <div className="max-h-56 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {alunos.map((a) => {
                const devolvidos = livrosDevolvidos(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => selecionarAlunoExemplo(a.codigo_aluno)}
                    className="w-full flex items-center justify-between p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 border border-slate-700/60 hover:border-amber-400/50 transition text-left group"
                  >
                    <div>
                      <div className="font-bold text-white group-hover:text-amber-300">
                        {a.nome}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Código: <span className="font-mono text-cyan-300">{a.codigo_aluno}</span> • {a.turma}
                      </div>
                    </div>
                    <div className="text-right">
                      {devolvidos.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-500/30">
                          <CheckCircle2 className="w-3 h-3" />
                          {devolvidos.length} {devolvidos.length === 1 ? "livro" : "livros"}
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500">Sem devolução</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mission Rules Card */}
        <div className="mt-6 rounded-2xl bg-slate-900/60 border border-cyan-500/20 p-4 text-xs text-cyan-200/80 space-y-2">
          <div className="font-bold text-cyan-100 flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span>Como funciona a Missão Quitério?</span>
          </div>
          <p>
            1. Leia e devolva livros na biblioteca da escola.
          </p>
          <p>
            2. Cada livro devolvido libera uma missão especial de <strong>6 perguntas</strong> com a IA.
          </p>
          <p>
            3. Ganhe <strong>100 pontos por acerto</strong> e avance pelo tabuleiro cósmico rumo ao topo do ranking!
          </p>
        </div>
      </div>
    </div>
  );
};
