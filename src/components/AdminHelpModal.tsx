import React, { useState } from "react";
import { todosAlunos, livrosDevolvidos, KEY, buscarAluno } from "../lib/aluno";
import { X, Wrench, RotateCcw, User, BookOpen, Check, ExternalLink } from "lucide-react";

interface AdminHelpModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginAs: (codigo: string) => void;
}

export const AdminHelpModal: React.FC<AdminHelpModalProps> = ({ isOpen, onClose, onLoginAs }) => {
  const [mensagem, setMensagem] = useState<string | null>(null);

  if (!isOpen) return null;

  const alunos = todosAlunos();

  const [pontosCasaInput, setPontosCasaInput] = useState<number>(() => {
    try {
      const v = localStorage.getItem("mq_pontos_por_casa");
      return v ? parseInt(v, 10) : 100;
    } catch {
      return 100;
    }
  });

  const [metaPontosInput, setMetaPontosInput] = useState<number>(() => {
    try {
      const v = localStorage.getItem("mq_meta_pontos");
      return v ? parseInt(v, 10) : 1000;
    } catch {
      return 1000;
    }
  });

  const handleSalvarConfig = () => {
    localStorage.setItem("mq_pontos_por_casa", pontosCasaInput.toString());
    localStorage.setItem("mq_meta_pontos", metaPontosInput.toString());
    window.dispatchEvent(new Event("storage"));
    setMensagem("Configurações da corrida salvas com sucesso!");
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleSimularCorrida = () => {
    const partidasSimuladas = {
      RUA0004: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 900, acertos: 6, data: new Date().toISOString() },
      ],
      GUS0001: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 700, acertos: 5, data: new Date().toISOString() },
      ],
      "202401": [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 500, acertos: 5, data: new Date().toISOString() },
      ],
      JEN0006: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 400, acertos: 4, data: new Date().toISOString() },
      ],
      CLO0004: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 300, acertos: 3, data: new Date().toISOString() },
      ],
      MAR0015: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 200, acertos: 2, data: new Date().toISOString() },
      ],
      KAI0009: [
        { livroId: "f21cf19d-7d0e-4e09-a959-9165e0b0c7a4", pontos: 100, acertos: 1, data: new Date().toISOString() },
      ],
    };
    localStorage.setItem("mq_partidas", JSON.stringify(partidasSimuladas));
    setMensagem("Corrida simulada com os 7 alunos nas casas da trilha cósmica!");
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleCarregarTurmaAtual = () => {
    const partidasAtuais = {
      RUA0004: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 400, acertos: 4, data: new Date().toISOString() },
      ],
      GUS0001: [
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 300, acertos: 3, data: new Date().toISOString() },
      ],
    };
    localStorage.setItem("mq_partidas", JSON.stringify(partidasAtuais));
    setMensagem("Dados reais carregados: Ruan (400 pts, Casa 4), Gustavo (300 pts, Casa 3) e demais na Largada!");
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => setMensagem(null), 3500);
  };

  const handleResetarHistorico = () => {
    localStorage.removeItem("mq_partidas");
    setMensagem("Histórico de partidas do jogo resetado com sucesso!");
    window.dispatchEvent(new Event("storage"));
    setTimeout(() => setMensagem(null), 3000);
  };

  const handleLoginDireto = (codigo: string) => {
    const aluno = buscarAluno(codigo);
    if (aluno) {
      localStorage.setItem(KEY, aluno.codigo_aluno);
      onLoginAs(codigo);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-slate-900 border-2 border-cyan-400/40 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-cyan-500/20 bg-slate-950/80">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Baloo_2'] text-xl font-bold text-white">
                Painel da Biblioteca & Demonstração
              </h2>
              <p className="text-xs text-cyan-200/70">
                Atalhos rápidos para professores, bibliotecários e testes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 overflow-y-auto space-y-5 text-xs text-slate-300">
          {mensagem && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 font-bold flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400" />
              <span>{mensagem}</span>
            </div>
          )}

          {/* Quick Explainer */}
          <div className="rounded-2xl bg-slate-950/60 border border-cyan-500/20 p-4 space-y-1.5">
            <span className="font-bold text-amber-300 text-sm block">
              💡 Como funciona o fluxo de dados:
            </span>
            <p>
              • Os dados dos alunos, livros e empréstimos estão cadastrados em <code className="text-cyan-300">src/data/biblioteca.json</code>.
            </p>
            <p>
              • O aluno só pode jogar livros cujo status no registro de empréstimo esteja como <strong>"Devolvido"</strong>.
            </p>
            <p>
              • As perguntas são geradas dinamicamente com <strong>Google Gemini AI</strong> a partir do título, autor e sinopse do livro.
            </p>
          </div>

          {/* Configuração da Corrida */}
          <div className="rounded-2xl bg-slate-950/60 border border-cyan-500/30 p-4 space-y-3">
            <span className="font-bold text-amber-300 text-sm block">
              ⚙️ Configurações do Tabuleiro da Corrida:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  Pontos para Avançar 1 Casa:
                </label>
                <input
                  type="number"
                  min="10"
                  step="10"
                  value={pontosCasaInput}
                  onChange={(e) => setPontosCasaInput(parseInt(e.target.value, 10) || 100)}
                  className="w-full bg-slate-800 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-400">Padrão: 100 pts por casa</span>
              </div>
              <div>
                <label className="block text-slate-300 mb-1 font-semibold">
                  Meta para o Baú Lendário (Casa 10):
                </label>
                <input
                  type="number"
                  min="100"
                  step="100"
                  value={metaPontosInput}
                  onChange={(e) => setMetaPontosInput(parseInt(e.target.value, 10) || 1000)}
                  className="w-full bg-slate-800 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-white font-mono"
                />
                <span className="text-[10px] text-slate-400">Padrão: 1000 pts</span>
              </div>
            </div>
            <button
              onClick={handleSalvarConfig}
              className="mt-1 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold px-4 py-1.5 text-xs transition"
            >
              Salvar Parâmetros
            </button>
          </div>

          {/* Reset & Simulation buttons */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={handleCarregarTurmaAtual}
              className="flex items-center gap-1.5 rounded-xl bg-amber-500/25 hover:bg-amber-500/35 border border-amber-400 text-amber-200 px-3.5 py-2 font-bold transition cursor-pointer"
            >
              <span>⭐ Carregar Dados Atuais (Ruan 400 pts, Gustavo 300 pts)</span>
            </button>
            <button
              onClick={handleSimularCorrida}
              className="flex items-center gap-1.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-200 px-3.5 py-2 font-bold transition cursor-pointer"
            >
              <span>🏁 Simular Corrida Completa (7 Alunos nas Casas)</span>
            </button>
            <button
              onClick={handleResetarHistorico}
              className="flex items-center gap-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-rose-300 px-3.5 py-2 font-bold transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Resetar Partidas (Limpar)</span>
            </button>
          </div>

          {/* Quick Student Login Table */}
          <div>
            <h3 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2">
              Alunos com livros devolvidos prontos para jogar:
            </h3>
            <div className="space-y-1.5">
              {alunos.map((a) => {
                const devolvidos = livrosDevolvidos(a.id);
                return (
                  <div
                    key={a.id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/60 hover:border-cyan-400/40 transition"
                  >
                    <div>
                      <span className="font-bold text-white text-xs mr-2">{a.nome}</span>
                      <span className="text-[10px] text-cyan-300 font-mono">[{a.codigo_aluno}]</span>
                      <span className="text-[10px] text-slate-400 ml-2">Turma: {a.turma}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        devolvidos.length > 0 ? "bg-emerald-950 text-emerald-300 border border-emerald-500/30" : "text-slate-500"
                      }`}>
                        {devolvidos.length} devoluções
                      </span>

                      <button
                        onClick={() => handleLoginDireto(a.codigo_aluno)}
                        className="rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-2.5 py-1 text-[11px] transition"
                      >
                        Logar como {a.nome.split(" ")[0]}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-cyan-500/20 bg-slate-950/80 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold px-5 py-2 text-xs transition"
          >
            Fechar Painel
          </button>
        </div>
      </div>
    </div>
  );
};
