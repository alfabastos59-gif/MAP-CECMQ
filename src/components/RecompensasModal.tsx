import React from "react";
import { X, Trophy, Star, Gift, Check, Lock, Sparkles, BookOpen } from "lucide-react";
import { Aluno, partidasDo } from "../lib/aluno";

interface RecompensasModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: Aluno | null;
}

export const RecompensasModal: React.FC<RecompensasModalProps> = ({ isOpen, onClose, aluno }) => {
  if (!isOpen) return null;

  const partidas = aluno ? partidasDo(aluno.codigo_aluno) : [];
  const totalPontos = partidas.reduce((acc, p) => acc + p.pontos, 0);
  const totalJogos = partidas.length;
  const maxAcerto = partidas.reduce((acc, p) => Math.max(acc, p.acertos), 0);

  const conquistas = [
    {
      id: "primeiro",
      titulo: "Primeiro Embarque",
      desc: "Complete sua 1ª missão de livro devolvido.",
      icone: "⛵",
      desbloqueado: totalJogos >= 1,
      progresso: `${Math.min(totalJogos, 1)}/1`,
      recompensa: "+10 ⭐",
    },
    {
      id: "trio",
      titulo: "Navegador de Histórias",
      desc: "Conclua missões de 3 livros diferentes.",
      icone: "📖",
      desbloqueado: totalJogos >= 3,
      progresso: `${Math.min(totalJogos, 3)}/3`,
      recompensa: "+25 ⭐",
    },
    {
      id: "perfeito",
      titulo: "Acerto Cósmico 100%",
      desc: "Acerte todas as 6 perguntas em uma única missão.",
      icone: "🌟",
      desbloqueado: maxAcerto >= 6,
      progresso: maxAcerto >= 6 ? "6/6 acertos" : `${maxAcerto}/6 melhor`,
      recompensa: "+50 ⭐",
    },
    {
      id: "pontuador",
      titulo: "Mestre dos 500 Pontos",
      desc: "Acumule 500 ou mais pontos no ranking da escola.",
      icone: "🏆",
      desbloqueado: totalPontos >= 500,
      progresso: `${Math.min(totalPontos, 500)}/500 pts`,
      recompensa: "+100 ⭐",
    },
    {
      id: "lenda",
      titulo: "Guardião da Maria Quitéria",
      desc: "Chegue até a Ilha do Baú Lendário (9+ missões).",
      icone: "👑",
      desbloqueado: totalJogos >= 9,
      progresso: `${Math.min(totalJogos, 9)}/9 ilhas`,
      recompensa: "Troféu de Ouro",
    },
  ];

  const destravadas = conquistas.filter((c) => c.desbloqueado).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-gradient-to-b from-[#131e5c] to-[#060b2b] border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.4)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-400/30 bg-blue-950/80">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-white shadow-lg">
              <Gift className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recompensas da Ilha</span>
              </div>
              <h2 className="font-['Baloo_2'] text-2xl font-black text-white">
                Baú Lendário de Conquistas
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-cyan-200 hover:text-white hover:bg-slate-700 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs text-cyan-100">
          {/* Summary Box */}
          <div className="rounded-2xl bg-gradient-to-r from-amber-500/20 to-cyan-500/10 border border-amber-400/40 p-4 flex items-center justify-between">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300">
                Conquistas Desbloqueadas
              </span>
              <div className="font-['Baloo_2'] text-3xl font-black text-white">
                {destravadas} de {conquistas.length}
              </div>
              <p className="text-[11px] text-cyan-200/80">
                {aluno ? `Explorador(a): ${aluno.nome}` : "Faça login para salvar suas medalhas"}
              </p>
            </div>

            <div className="text-right flex flex-col items-end">
              <span className="text-[11px] text-slate-400 uppercase font-bold">Estrelas</span>
              <div className="flex items-center gap-1 font-['Baloo_2'] text-2xl font-black text-amber-400">
                <span>⭐</span>
                <span>{partidas.length * 5 + destravadas * 10}</span>
              </div>
            </div>
          </div>

          {/* Achievements Grid */}
          <div className="space-y-2.5">
            {conquistas.map((c) => (
              <div
                key={c.id}
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition ${
                  c.desbloqueado
                    ? "bg-slate-900/90 border-amber-400/60 shadow-[0_0_15px_rgba(251,191,36,0.15)] text-white"
                    : "bg-slate-950/60 border-slate-800/80 text-slate-400 opacity-60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`h-11 w-11 rounded-xl flex items-center justify-center text-2xl shrink-0 border ${
                      c.desbloqueado
                        ? "bg-amber-400/20 border-amber-400/50"
                        : "bg-slate-900 border-slate-700"
                    }`}
                  >
                    {c.icone}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-['Baloo_2'] text-base font-bold text-white">
                        {c.titulo}
                      </h4>
                      {c.desbloqueado ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.2 rounded-full border border-emerald-500/40">
                          <Check className="w-3 h-3" />
                          Conquistada
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-slate-400 bg-slate-900 px-2 py-0.2 rounded-full border border-slate-700">
                          <Lock className="w-3 h-3" />
                          Bloqueada
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-300">{c.desc}</p>
                  </div>
                </div>

                <div className="text-right shrink-0 pl-2">
                  <span className="block text-[11px] font-mono text-cyan-300 font-bold">
                    {c.progresso}
                  </span>
                  <span className="text-[10px] font-bold text-amber-300">
                    {c.recompensa}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-400/20 bg-blue-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-2 shadow-md transition transform active:scale-95"
          >
            Fechar Baú
          </button>
        </div>
      </div>
    </div>
  );
};
