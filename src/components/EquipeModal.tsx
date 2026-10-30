import React from "react";
import { X, Users, BookOpen, Trophy, Sparkles, Award } from "lucide-react";
import { Aluno, todosAlunos, rankingAlunos, livrosDevolvidos } from "../lib/aluno";

interface EquipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  alunoAtual: Aluno | null;
  onSelectAluno?: (codigo: string) => void;
}

export const EquipeModal: React.FC<EquipeModalProps> = ({
  isOpen,
  onClose,
  alunoAtual,
  onSelectAluno,
}) => {
  if (!isOpen) return null;

  const todos = todosAlunos();
  const ranking = rankingAlunos();
  const turmaFoco = alunoAtual?.turma || "Todas as Turmas";

  // Filter students from the same class, or top overall
  const colegasDaTurma = alunoAtual
    ? todos.filter((a) => a.turma === alunoAtual.turma)
    : todos;

  const totalLivrosTurma = colegasDaTurma.reduce(
    (acc, a) => acc + livrosDevolvidos(a.id).length,
    0
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-gradient-to-b from-[#09154f] to-[#04092b] border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.3)]">
        {/* Header with Cat Mascot badge */}
        <div className="flex items-center justify-between p-5 border-b border-cyan-400/30 bg-blue-950/70">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-500 border-2 border-white shadow-lg">
              <span className="text-2xl">🐱</span>
              <span className="absolute -bottom-1 -right-1 text-xs">📖</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Biblioteca Maria Quitéria</span>
              </div>
              <h2 className="font-['Baloo_2'] text-2xl font-black text-white">
                Detalhes da Equipe Cósmica
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800/80 text-cyan-200 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-5 text-sm text-cyan-100">
          {/* Class banner */}
          <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border border-cyan-400/40 p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-inner">
            <div>
              <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">
                Sua Tripulação / Turma
              </span>
              <h3 className="font-['Baloo_2'] text-2xl font-black text-white">
                {turmaFoco}
              </h3>
              <p className="text-xs text-cyan-200/80">
                Juntos na travessia das ilhas literárias da Escola Maria Quitéria
              </p>
            </div>

            <div className="flex gap-2">
              <div className="rounded-xl bg-blue-950/80 border border-cyan-400/30 px-3 py-2 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  Exploradores
                </span>
                <strong className="font-['Baloo_2'] text-lg text-amber-300">
                  {colegasDaTurma.length}
                </strong>
              </div>
              <div className="rounded-xl bg-blue-950/80 border border-cyan-400/30 px-3 py-2 text-center">
                <span className="block text-[10px] uppercase font-bold text-slate-400">
                  Livros Devolvidos
                </span>
                <strong className="font-['Baloo_2'] text-lg text-emerald-400">
                  {totalLivrosTurma}
                </strong>
              </div>
            </div>
          </div>

          {/* Guardians Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-slate-900/80 border border-amber-400/30 p-3.5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-2xl shrink-0">
                🐱
              </div>
              <div>
                <span className="font-bold text-white text-xs block">
                  Guardião Quitério
                </span>
                <p className="text-[11px] text-cyan-200/80">
                  Mascote felino oficial. Garante que cada resposta certa renda estrelas no mapa!
                </p>
              </div>
            </div>

            <div className="rounded-2xl bg-slate-900/80 border border-cyan-400/30 p-3.5 flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-2xl shrink-0">
                👩‍🏫
              </div>
              <div>
                <span className="font-bold text-white text-xs block">
                  Equipe da Biblioteca
                </span>
                <p className="text-[11px] text-cyan-200/80">
                  Registra empréstimos, devoluções e cuida do acervo de obras da escola.
                </p>
              </div>
            </div>
          </div>

          {/* Members List */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Membros da Tripulação ({colegasDaTurma.length})</span>
              </span>
              <span className="text-[11px] text-slate-400">Livros devolvidos para jogar</span>
            </div>

            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {colegasDaTurma.map((colega) => {
                const devolvidos = livrosDevolvidos(colega.id);
                const posRanking = ranking.findIndex((r) => r.codigo === colega.codigo_aluno);
                const infoRanking = posRanking !== -1 ? ranking[posRanking] : null;
                const isSelected = alunoAtual?.id === colega.id;

                return (
                  <div
                    key={colega.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border transition ${
                      isSelected
                        ? "bg-amber-400/15 border-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.2)]"
                        : "bg-slate-900/60 border-cyan-500/20 hover:border-cyan-400/40 text-cyan-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-blue-600/40 border border-cyan-300/40 flex items-center justify-center text-sm font-bold text-white">
                        {colega.nome.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xs flex items-center gap-1.5">
                          <span>{colega.nome}</span>
                          {isSelected && (
                            <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-400/30">
                              Você
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-cyan-300/70 font-mono">
                          {colega.codigo_aluno} • Turma: {colega.turma}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <span className="block text-[11px] font-bold text-amber-300">
                          {infoRanking?.pontos || 0} pts
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {devolvidos.length} {devolvidos.length === 1 ? "devolução" : "devoluções"}
                        </span>
                      </div>

                      {onSelectAluno && !isSelected && (
                        <button
                          onClick={() => onSelectAluno(colega.codigo_aluno)}
                          className="rounded-lg bg-cyan-500/20 hover:bg-cyan-500/40 border border-cyan-400/30 px-2 py-1 text-[10px] font-bold text-cyan-200 transition"
                        >
                          Trocar
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-400/20 bg-blue-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-2 shadow-md transition transform active:scale-95"
          >
            Entendido, Capitão!
          </button>
        </div>
      </div>
    </div>
  );
};
