import React, { useState } from "react";
import { X, ArrowRight, AlertCircle, Sparkles, CheckCircle2, User, BookOpen } from "lucide-react";
import { buscarAluno, todosAlunos, livrosDevolvidos, KEY, Aluno } from "../lib/aluno";
import { AvatarAluno } from "./AvatarAluno";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (aluno: Aluno) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [codigo, setCodigo] = useState("");
  const [erro, setErro] = useState("");
  const alunos = todosAlunos();

  if (!isOpen) return null;

  const handleEntrar = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const codigoLimpo = codigo.trim();
    if (!codigoLimpo) {
      setErro("Por favor, digite seu código de aluno.");
      return;
    }

    const aluno = buscarAluno(codigoLimpo);
    if (!aluno) {
      setErro("Código não encontrado. Escolha um dos alunos na lista abaixo ou confira com a biblioteca.");
      return;
    }

    localStorage.setItem(KEY, aluno.codigo_aluno);
    onSuccess(aluno);
    onClose();
  };

  const handleSelecionar = (codigoAluno: string) => {
    const aluno = buscarAluno(codigoAluno);
    if (aluno) {
      localStorage.setItem(KEY, aluno.codigo_aluno);
      onSuccess(aluno);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-[#0a1242] to-[#040824] border-2 border-amber-400 shadow-[0_0_50px_rgba(251,191,36,0.35)] flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-5 border-b border-cyan-400/30 bg-blue-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-xl shadow-md border border-white">
              🐱
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-300 tracking-widest block">
                Embarque na Aventura
              </span>
              <h3 className="font-['Baloo_2'] text-xl font-black text-white">
                Identificação do Aluno
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 overflow-y-auto space-y-4">
          <form onSubmit={handleEntrar} className="space-y-3">
            <div>
              <label
                htmlFor="codigo-modal"
                className="block text-xs font-bold uppercase tracking-wider text-cyan-200 mb-1"
              >
                Digite seu Código de Aluno:
              </label>
              <input
                id="codigo-modal"
                type="text"
                value={codigo}
                onChange={(e) => {
                  setCodigo(e.target.value.toUpperCase());
                  setErro("");
                }}
                placeholder="Ex: RUA0004, ADR0007..."
                className="w-full rounded-xl bg-slate-900 border-2 border-cyan-400/40 px-4 py-2.5 text-base font-bold text-white placeholder-slate-500 uppercase tracking-wider focus:border-amber-400 focus:outline-none"
                autoFocus
              />
            </div>

            {erro && (
              <div className="flex items-start gap-2 p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-200 text-xs font-semibold">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <span>{erro}</span>
              </div>
            )}

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] text-base font-black py-2.5 px-4 shadow-md transition transform active:scale-95 cursor-pointer"
            >
              <span>INICIAR JORNADA</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick select list */}
          <div className="pt-3 border-t border-cyan-500/20">
            <span className="text-[11px] font-bold uppercase tracking-wider text-cyan-300 block mb-2">
              Ou escolha seu nome na lista da escola:
            </span>

            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1 text-xs">
              {alunos.map((a) => {
                const devolvidos = livrosDevolvidos(a.id);
                return (
                  <button
                    key={a.id}
                    onClick={() => handleSelecionar(a.codigo_aluno)}
                    className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-400/50 transition text-left group"
                  >
                    <div className="flex items-center gap-2.5">
                      <AvatarAluno
                        alunoId={a.id}
                        codigo={a.codigo_aluno}
                        nome={a.nome}
                        avatarUrl={a.avatar_url}
                        tamanho="sm"
                      />
                      <div>
                        <div className="font-bold text-white group-hover:text-amber-300">
                          {a.nome}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Código: <span className="font-mono text-cyan-300">{a.codigo_aluno}</span> • {a.turma}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      {devolvidos.length > 0 ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
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
        </div>
      </div>
    </div>
  );
};
