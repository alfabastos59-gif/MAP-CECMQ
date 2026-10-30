import React from "react";
import { X, Compass, MapPin, Sparkles, BookOpen, Clock, Heart, Award } from "lucide-react";

interface RegrasModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RegrasModal: React.FC<RegrasModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const regras = [
    {
      num: "01",
      titulo: "O Passaporte de Embarque",
      icone: "📚",
      desc: "Apenas livros que você pegou emprestado e já devolveu na biblioteca da escola liberam missões no mapa. Cada livro devolvido garante 1 missão exclusiva!",
    },
    {
      num: "02",
      titulo: "As 6 Perguntas dos Guardiões",
      icone: "❓",
      desc: "Ao iniciar a missão, a Inteligência Artificial cria 6 perguntas de múltipla escolha sobre os personagens, a trama, o autor e as mensagens da obra.",
    },
    {
      num: "03",
      titulo: "Pontuação, Estrelas e Vidas",
      icone: "⭐",
      desc: "Cada resposta correta vale 100 pontos e adiciona estrelas ao seu perfil! Você começa com 100 Vidas ❤️ para encarar a travessia das ilhas.",
    },
    {
      num: "04",
      titulo: "Avanço no Tabuleiro Cósmico",
      icone: "⛵",
      desc: "Seu barquinho espacial navega pelas ilhas flutuantes. Do Portal de Embarque até o Baú Lendário, cada missão avança sua posição no mapa e no ranking escolar!",
    },
    {
      num: "05",
      titulo: "O Ciclo de Leitura (5 Dias)",
      icone: "⏳",
      desc: "Terminou uma missão? Excelente! Agora você tem 5 dias para escolher e ler com calma seu próximo livro na biblioteca antes de iniciar uma nova missão.",
    },
    {
      num: "06",
      titulo: "O Baú de Conquistas",
      icone: "🎁",
      desc: "Ao acertar as questões e acumular leituras, você destrava insígnias especiais de leitura e pode se consagrar o maior leitor da escola!",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-gradient-to-b from-[#250d4f] to-[#0d0426] border-2 border-fuchsia-400/80 shadow-[0_0_50px_rgba(232,121,249,0.35)]">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-fuchsia-500/30 bg-purple-950/70">
          <div className="flex items-center gap-3">
            <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-fuchsia-500 to-amber-400 border-2 border-white shadow-lg">
              <span className="text-2xl">📜</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest text-fuchsia-300">
                <Compass className="w-3.5 h-3.5" />
                <span>Guia do Aventureiro Cósmico</span>
              </div>
              <h2 className="font-['Baloo_2'] text-2xl font-black text-white">
                Regras da Ilha
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-purple-900/60 text-fuchsia-200 hover:text-white hover:bg-purple-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Rules Grid */}
        <div className="p-5 overflow-y-auto space-y-3.5 text-xs text-purple-100">
          <div className="p-3.5 rounded-2xl bg-fuchsia-950/60 border border-fuchsia-500/30 flex items-center gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <strong className="text-amber-300 font-bold block text-sm">
                Missão Quitério: Leia, Responda e Avance!
              </strong>
              <p className="text-[11px] text-fuchsia-200/80">
                Todas as regras foram criadas pelos educadores da Escola Maria Quitéria para incentivar o amor pela leitura e o raciocínio crítico.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {regras.map((regra) => (
              <div
                key={regra.num}
                className="rounded-2xl bg-purple-950/50 border border-fuchsia-500/25 p-3.5 hover:border-fuchsia-400/50 transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xl">{regra.icone}</span>
                    <span className="font-mono text-[10px] font-bold text-fuchsia-400 bg-black/40 px-2 py-0.5 rounded-md">
                      REGRA {regra.num}
                    </span>
                  </div>
                  <h4 className="font-['Baloo_2'] text-base font-bold text-white mb-1">
                    {regra.titulo}
                  </h4>
                  <p className="text-[11px] text-fuchsia-200/80 leading-relaxed">
                    {regra.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-fuchsia-500/20 bg-purple-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-gradient-to-r from-fuchsia-500 to-amber-400 hover:from-fuchsia-400 hover:to-amber-300 text-slate-950 font-['Baloo_2'] font-black text-sm px-6 py-2 shadow-md transition transform active:scale-95"
          >
            Compreendi as Regras!
          </button>
        </div>
      </div>
    </div>
  );
};
