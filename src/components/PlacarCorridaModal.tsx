import React from "react";
import { LinhaRanking } from "../lib/aluno";
import { AvatarAluno } from "./AvatarAluno";
import { Trophy, Medal, Flag, Award, X, Sparkles, Compass } from "lucide-react";

interface PlacarCorridaModalProps {
  isOpen: boolean;
  onClose: () => void;
  jogadores: LinhaRanking[];
  codigoAlunoLogado?: string | null;
  onSelecionarAluno?: (aluno: LinhaRanking) => void;
  metaPontos: number;
}

export const PlacarCorridaModal: React.FC<PlacarCorridaModalProps> = ({
  isOpen,
  onClose,
  jogadores,
  codigoAlunoLogado,
  onSelecionarAluno,
  metaPontos,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl bg-slate-900 border-2 border-cyan-400/50 shadow-[0_0_50px_rgba(34,211,238,0.4)] overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cyan-500/20 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Baloo_2'] text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <span>Placar da Corrida Cósmica</span>
                <span className="text-[10px] font-mono bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 px-2 py-0.5 rounded-full">
                  Ao Vivo
                </span>
              </h2>
              <p className="text-xs text-cyan-200/70">
                Progresso dos jogadores pelas 10 casas até o Baú Lendário ({metaPontos} pts)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Players List */}
        <div className="p-4 sm:p-5 overflow-y-auto space-y-2.5 flex-1">
          {jogadores.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <Compass className="w-10 h-10 mx-auto mb-2 text-cyan-400 animate-spin-slow opacity-60" />
              <p className="font-['Baloo_2'] text-base text-cyan-200 font-bold">Nenhum aluno iniciou a corrida ainda.</p>
              <p className="text-xs text-slate-400 mt-1">
                Faça o login e responda aos desafios dos livros para avançar pelas casas do mapa!
              </p>
            </div>
          ) : (
            jogadores.map((jogador, index) => {
              const posicao = index + 1;
              const ehLider = posicao === 1 && jogador.pontos > 0;
              const ehSegundo = posicao === 2;
              const ehTerceiro = posicao === 3;
              const ehEu = codigoAlunoLogado === jogador.codigo;

              // Rank medal
              let medalha = (
                <span className="font-['Baloo_2'] text-xs font-bold text-slate-400">
                  #{posicao}
                </span>
              );
              let cardBg = "bg-slate-800/60 border-slate-700/60";

              if (ehLider) {
                medalha = <span className="text-xl">🥇</span>;
                cardBg = "bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/40 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.2)]";
              } else if (ehSegundo) {
                medalha = <span className="text-xl">🥈</span>;
                cardBg = "bg-gradient-to-r from-slate-800/80 via-slate-900 to-slate-800/60 border-slate-300/50";
              } else if (ehTerceiro) {
                medalha = <span className="text-xl">🥉</span>;
                cardBg = "bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-800 border-amber-600/40";
              }

              if (ehEu) {
                cardBg += " ring-2 ring-cyan-400/80";
              }

              const progressoPercent = Math.min(100, Math.round((jogador.pontos / metaPontos) * 100));

              return (
                <div
                  key={jogador.id || jogador.codigo}
                  onClick={() => onSelecionarAluno && onSelecionarAluno(jogador)}
                  className={`p-3 sm:p-3.5 rounded-2xl border transition transform hover:scale-[1.01] cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${cardBg}`}
                >
                  {/* Left: Position + Avatar + Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 flex items-center justify-center shrink-0">
                      {medalha}
                    </div>

                    <AvatarAluno
                      alunoId={jogador.id}
                      codigo={jogador.codigo}
                      nome={jogador.nome}
                      avatarUrl={jogador.avatarUrl}
                      tamanho="md"
                    />

                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-['Baloo_2'] text-sm sm:text-base font-bold text-white truncate">
                          {jogador.nome}
                        </span>
                        {ehEu && (
                          <span className="text-[9px] font-black uppercase tracking-wider text-slate-950 bg-amber-400 px-1.5 py-0.2 rounded-full border border-white">
                            Você
                          </span>
                        )}
                        {jogador.atingiuMeta && (
                          <span className="text-[10px] font-black uppercase text-amber-300 bg-amber-950 border border-amber-400/50 px-2 py-0.2 rounded-full animate-pulse">
                            🏆 Baú Aberto!
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <span className="font-mono text-cyan-300">{jogador.codigo}</span>
                        <span>•</span>
                        <span>{jogador.turma}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right: House, Score and Distance */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-slate-700/40 pt-2 sm:pt-0 shrink-0 gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-cyan-200 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/40">
                        Casa {jogador.casa} / 10
                      </span>
                      <span className="font-['Baloo_2'] text-sm sm:text-base font-black text-amber-300">
                        ★ {jogador.pontos} pts
                      </span>
                    </div>

                    {/* Distance to final prize */}
                    <span className="text-[11px] text-slate-400">
                      {jogador.atingiuMeta ? (
                        <strong className="text-emerald-400">Chegou à Meta Final!</strong>
                      ) : (
                        <>Faltam <strong className="text-amber-300">{jogador.distanciaMeta} pts</strong> para o Baú</>
                      )}
                    </span>

                    {/* Progress bar */}
                    <div className="hidden sm:block w-32 h-1.5 bg-slate-700 rounded-full overflow-hidden mt-0.5">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-amber-400 rounded-full"
                        style={{ width: `${progressoPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-cyan-500/20 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <span>Total de competidores: <strong className="text-white">{jogadores.length}</strong></span>
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold px-4 py-1.5 text-xs transition cursor-pointer"
          >
            Fechar Placar
          </button>
        </div>

      </div>
    </div>
  );
};
