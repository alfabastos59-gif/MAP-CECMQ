import React from "react";
import { Trophy, LogOut, BookOpen, Sparkles } from "lucide-react";
import { KEY } from "../lib/aluno";

interface CabecalhoProps {
  nome?: string;
  turma?: string;
  onNavigate: (view: string, livroId?: string) => void;
  currentView: string;
}

export const Cabecalho: React.FC<CabecalhoProps> = ({
  nome,
  turma,
  onNavigate,
  currentView,
}) => {
  const handleLogout = () => {
    localStorage.removeItem(KEY);
    onNavigate("login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#070e38]/85 backdrop-blur-md px-4 sm:px-6 py-3 transition-all">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3">
        {/* Logo / Brand */}
        <button
          onClick={() => onNavigate("login")}
          className="flex items-center gap-2.5 text-left group transition transform active:scale-95"
          title="Ir para o Mapa Cósmico"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-amber-400 to-amber-600 shadow-[0_0_15px_rgba(251,191,36,0.5)] border border-white/40">
            <span className="text-xl">🐱</span>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-['Baloo_2'] text-lg sm:text-xl font-extrabold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                MISSÃO <span className="text-amber-400">QUITÉRIO</span>
              </span>
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            </div>
            <span className="block text-[11px] font-medium text-cyan-200/70">
              Biblioteca Maria Quitéria
            </span>
          </div>
        </button>

        {/* Actions / User profile */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate("login")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-bold transition ${
              currentView === "login"
                ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-[0_0_15px_rgba(34,211,238,0.5)] border border-white/40"
                : "bg-slate-800/90 text-cyan-100 hover:bg-slate-700"
            }`}
          >
            <span>🗺️</span>
            <span className="hidden xs:inline">Mapa Cósmico</span>
          </button>

          <button
            onClick={() => onNavigate("ranking")}
            className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs sm:text-sm font-bold transition ${
              currentView === "ranking"
                ? "bg-amber-400 text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                : "bg-slate-800/90 text-cyan-100 hover:bg-slate-700 hover:ring-2 hover:ring-amber-400/50"
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Ranking</span>
          </button>

          {nome ? (
            <>
              {currentView !== "aluno" && (
                <button
                  onClick={() => onNavigate("aluno")}
                  className="hidden md:flex items-center gap-1.5 rounded-full bg-blue-600/30 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-cyan-200 hover:bg-blue-600/50 transition border border-cyan-400/30"
                >
                  <BookOpen className="w-4 h-4 text-cyan-400" />
                  <span>Meus Livros</span>
                </button>
              )}

              <div className="hidden sm:flex flex-col text-right pr-1">
                <span className="text-xs font-bold text-white leading-tight">{nome}</span>
                {turma && (
                  <span className="text-[10px] text-cyan-300/80 font-medium">{turma}</span>
                )}
              </div>

              <button
                onClick={handleLogout}
                title="Sair da conta"
                className="flex items-center gap-1 rounded-full bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/30 px-3 py-1.5 text-xs font-semibold transition"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Sair</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => onNavigate("login")}
              className={`rounded-full px-3.5 py-1.5 text-xs sm:text-sm font-bold transition ${
                currentView === "login"
                  ? "bg-amber-400 text-slate-950"
                  : "bg-slate-800 text-cyan-100 hover:bg-slate-700"
              }`}
            >
              Entrar
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
