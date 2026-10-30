import React from "react";
import { obterAvatarInfo, AvatarInfo } from "../lib/aluno";

interface AvatarAlunoProps {
  alunoId: string;
  codigo: string;
  nome: string;
  avatarUrl?: string | null;
  tamanho?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  mostrarIniciaisFallback?: boolean;
}

const TAMANHOS = {
  xs: "w-6 h-6 text-[9px] border",
  sm: "w-8 h-8 text-xs border-2",
  md: "w-11 h-11 sm:w-12 sm:h-12 text-sm sm:text-base border-2",
  lg: "w-14 h-14 sm:w-16 sm:h-16 text-lg sm:text-xl border-3",
  xl: "w-20 h-20 sm:w-24 sm:h-24 text-2xl sm:text-3xl border-4",
};

export const AvatarAluno: React.FC<AvatarAlunoProps> = ({
  alunoId,
  codigo,
  nome,
  avatarUrl,
  tamanho = "md",
  className = "",
}) => {
  const info: AvatarInfo = obterAvatarInfo(alunoId, codigo, nome, avatarUrl);
  const sizeClass = TAMANHOS[tamanho] || TAMANHOS.md;

  if (info.tipo === "imagem" && info.url) {
    return (
      <div
        className={`relative rounded-full overflow-hidden flex items-center justify-center shrink-0 shadow-md ${sizeClass} ${info.borda} bg-slate-900 ${className}`}
      >
        <img
          src={info.url}
          alt={nome}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.currentTarget;
            target.style.display = "none";
            const parent = target.parentElement;
            if (parent) {
              parent.classList.add("bg-gradient-to-tr", ...info.gradiente.split(" "));
              const span = document.createElement("span");
              span.className = `font-['Baloo_2'] font-black ${info.texto}`;
              span.innerText = info.iniciais;
              parent.appendChild(span);
            }
          }}
        />
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full shrink-0 flex items-center justify-center shadow-md bg-gradient-to-tr ${info.gradiente} ${info.borda} ${sizeClass} ${className}`}
    >
      <span className={`font-['Baloo_2'] font-black select-none tracking-tight ${info.texto}`}>
        {info.iniciais}
      </span>
    </div>
  );
};
