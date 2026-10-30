import React, { useEffect } from "react";
import { AvatarAluno } from "./AvatarAluno";
import { Sparkles, Trophy, Award, X, Star } from "lucide-react";

interface ConquistaPremioModalProps {
  isOpen: boolean;
  onClose: () => void;
  aluno: {
    id: string;
    codigo: string;
    nome: string;
    pontos: number;
    avatarUrl?: string | null;
  };
}

export const ConquistaPremioModal: React.FC<ConquistaPremioModalProps> = ({
  isOpen,
  onClose,
  aluno,
}) => {
  useEffect(() => {
    if (isOpen && aluno) {
      // Mark as celebrated so it doesn't pop up repeatedly on every page reload
      try {
        localStorage.setItem(`mq_conquista_celebrada_${aluno.id}`, "true");
      } catch {}
    }
  }, [isOpen, aluno]);

  if (!isOpen || !aluno) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in zoom-in-95 duration-300">
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-b from-[#1c1854] via-[#101038] to-[#080821] border-4 border-amber-400 shadow-[0_0_80px_rgba(251,191,36,0.6)] p-6 sm:p-8 text-center text-white space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Floating Celebration Particles / Stars */}
        <div className="flex justify-center items-center gap-2 text-amber-300 animate-bounce">
          <Sparkles className="w-6 h-6 animate-spin-slow" />
          <span className="font-['Baloo_2'] text-xs uppercase tracking-widest font-black text-amber-300 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-300/40">
            ★ GRANDE CONQUISTA CÓSMICA ★
          </span>
          <Sparkles className="w-6 h-6 animate-spin-slow" />
        </div>

        {/* Giant Trophy / Chest Visual */}
        <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 blur-xl opacity-70 animate-pulse" />
          <div className="relative flex items-center justify-center w-full h-full rounded-full bg-gradient-to-tr from-amber-400 to-yellow-200 border-4 border-white shadow-2xl">
            <span className="text-5xl sm:text-6xl drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
              👑
            </span>
          </div>
        </div>

        {/* Title */}
        <div>
          <h2 className="font-['Baloo_2'] text-2xl sm:text-3xl font-black text-amber-300 drop-shadow-[0_2px_10px_rgba(251,191,36,0.5)]">
            BAÚ LENDÁRIO DESBLOQUEADO!
          </h2>
          <p className="text-cyan-200 text-xs sm:text-sm mt-1">
            Você completou todo o percurso e conquistou o grande prêmio final da Biblioteca Maria Quitéria!
          </p>
        </div>

        {/* Winner Card */}
        <div className="p-4 rounded-2xl bg-slate-900/80 border-2 border-amber-400/60 shadow-inner flex items-center gap-4 text-left">
          <AvatarAluno
            alunoId={aluno.id}
            codigo={aluno.codigo}
            nome={aluno.nome}
            avatarUrl={aluno.avatarUrl}
            tamanho="lg"
            className="border-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.6)]"
          />
          <div className="flex-1 min-w-0">
            <span className="text-[11px] font-mono font-bold text-amber-400 uppercase tracking-wider block">
              Campeão Cósmico • {aluno.codigo}
            </span>
            <h3 className="font-['Baloo_2'] text-base sm:text-lg font-black text-white truncate">
              {aluno.nome}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/40">
                ★ {aluno.pontos} Pontos Acumulados
              </span>
              <span className="text-xs font-bold text-amber-300 bg-amber-950/80 px-2 py-0.5 rounded-md border border-amber-500/40">
                Casa 10 / Final
              </span>
            </div>
          </div>
        </div>

        {/* Motivational Message */}
        <p className="text-xs text-slate-300 leading-relaxed italic px-2">
          "Parabéns por sua dedicação à leitura e ao conhecimento! Sua jornada inspirou toda a tripulação da Missão Quitério."
        </p>

        {/* Action Button */}
        <div>
          <button
            onClick={onClose}
            className="w-full py-3 px-6 rounded-2xl font-['Baloo_2'] text-base font-black text-slate-950 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-amber-300 hover:to-yellow-200 border-2 border-white shadow-[0_0_25px_rgba(251,191,36,0.6)] transition transform active:scale-95 cursor-pointer"
          >
            🌟 Comemorar e Continuar Explorando
          </button>
        </div>

      </div>
    </div>
  );
};
