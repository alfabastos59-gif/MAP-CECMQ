import React from "react";
import { X, Shield, Star, Check, Sparkles, Zap, Flame } from "lucide-react";

export type NivelType = "facil" | "medio" | "mestre";

interface NivelModalProps {
  isOpen: boolean;
  onClose: () => void;
  nivelAtual: NivelType;
  onSelectNivel: (nivel: NivelType) => void;
}

export const NivelModal: React.FC<NivelModalProps> = ({
  isOpen,
  onClose,
  nivelAtual,
  onSelectNivel,
}) => {
  if (!isOpen) return null;

  const niveis: Array<{
    id: NivelType;
    nome: string;
    subtitulo: string;
    pontos: number;
    icone: string;
    cor: string;
    borda: string;
    badge: string;
    detalhes: string;
    caracteristicas: string[];
  }> = [
    {
      id: "facil",
      nome: "Nível Fácil",
      subtitulo: "Para leitores iniciantes",
      pontos: 80,
      icone: "🌱",
      cor: "from-emerald-600/30 to-slate-900/90",
      borda: "border-emerald-400/50",
      badge: "bg-emerald-500/20 text-emerald-300 border-emerald-400/40",
      detalhes:
        "Perguntas diretas sobre os personagens principais, nomes, lugares e acontecimentos explícitos do início e fim da história.",
      caracteristicas: [
        "Linguagem simples e amigável",
        "Opções bem distintas",
        "+80 pontos por acerto",
      ],
    },
    {
      id: "medio",
      nome: "Nível Médio",
      subtitulo: "Padrão Oficial da Escola",
      pontos: 100,
      icone: "⭐",
      cor: "from-amber-600/30 to-slate-900/90",
      borda: "border-amber-400",
      badge: "bg-amber-500/20 text-amber-300 border-amber-400/40",
      detalhes:
        "O equilíbrio perfeito! Avalia o entendimento geral da trama, as atitudes dos personagens, conflitos e lições aprendidas.",
      caracteristicas: [
        "Perguntas de interpretação e enredo",
        "Exige atenção aos detalhes do livro",
        "+100 pontos por acerto (Padrão)",
      ],
    },
    {
      id: "mestre",
      nome: "Nível Mestre",
      subtitulo: "Desafio Cósmico",
      pontos: 150,
      icone: "🔥",
      cor: "from-purple-600/30 to-slate-900/90",
      borda: "border-purple-400/60",
      badge: "bg-purple-500/20 text-purple-300 border-purple-400/40",
      detalhes:
        "Para verdadeiros devoradores de livros! Perguntas mais profundas sobre estilo do autor, mensagens implícitas e reflexões morais.",
      caracteristicas: [
        "Interpretação crítica e contexto",
        "Opções reflexivas e desafiadoras",
        "+150 pontos por acerto",
      ],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-gradient-to-b from-[#1f1602] to-[#0d0a02] border-2 border-amber-400/90 shadow-[0_0_50px_rgba(251,191,36,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-amber-500/30 bg-amber-950/60">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 border-2 border-white shadow-lg">
              <Shield className="w-6 h-6 text-purple-900 fill-purple-900" />
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300 absolute" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Configuração de Missão</span>
              </div>
              <h2 className="font-['Baloo_2'] text-2xl font-black text-white">
                Dificuldade da Missão
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-amber-900/40 text-amber-200 hover:text-white hover:bg-amber-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Levels List */}
        <div className="p-5 overflow-y-auto space-y-4 text-xs">
          <p className="text-amber-200/80 text-xs">
            Escolha o nível de desafio com que a Inteligência Artificial deve formular as perguntas dos seus livros devolvidos:
          </p>

          <div className="grid gap-3 sm:grid-cols-3">
            {niveis.map((nivel) => {
              const selecionado = nivelAtual === nivel.id;

              return (
                <button
                  key={nivel.id}
                  onClick={() => onSelectNivel(nivel.id)}
                  className={`group relative rounded-2xl border-2 p-4 text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                    selecionado
                      ? `bg-gradient-to-b ${nivel.cor} ${nivel.borda} shadow-[0_0_20px_rgba(251,191,36,0.3)] ring-2 ring-amber-400/40`
                      : "bg-slate-900/60 border-slate-700/60 hover:border-amber-400/40 opacity-75 hover:opacity-100"
                  }`}
                >
                  {selecionado && (
                    <div className="absolute -top-2.5 -right-2.5 bg-amber-400 text-slate-950 p-1 rounded-full shadow-md">
                      <Check className="w-4 h-4 stroke-[3]" />
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl">{nivel.icone}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${nivel.badge}`}>
                        {nivel.pontos} pts/acerto
                      </span>
                    </div>

                    <h4 className="font-['Baloo_2'] text-lg font-black text-white leading-tight">
                      {nivel.nome}
                    </h4>
                    <span className="text-[10px] text-amber-300/80 font-bold block mb-2">
                      {nivel.subtitulo}
                    </span>

                    <p className="text-[11px] text-slate-300 leading-relaxed mb-3">
                      {nivel.detalhes}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-white/10 space-y-1">
                    {nivel.caracteristicas.map((c, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[10px] text-cyan-200/80">
                        <span className="text-amber-400 text-[12px]">•</span>
                        <span>{c}</span>
                      </div>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-amber-500/20 bg-amber-950/60 flex items-center justify-between">
          <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">
            Nível selecionado ativo para as próximas missões.
          </span>
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-2 shadow-md transition transform active:scale-95 ml-auto"
          >
            Confirmar Nível
          </button>
        </div>
      </div>
    </div>
  );
};
