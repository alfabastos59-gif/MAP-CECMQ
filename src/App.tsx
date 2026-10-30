/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { KEY, buscarAluno, Aluno } from "./lib/aluno";
import { Cabecalho } from "./components/Cabecalho";
import { CosmicHomeView } from "./components/CosmicHomeView";
import { LoginView } from "./components/LoginView";
import { AlunoView } from "./components/AlunoView";
import { MissaoView } from "./components/MissaoView";
import { RankingView } from "./components/RankingView";
import { AdminHelpModal } from "./components/AdminHelpModal";

export type ViewType = "login" | "aluno" | "missao" | "ranking";

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>("login");
  const [selectedLivroId, setSelectedLivroId] = useState<string | null>(null);
  const [aluno, setAluno] = useState<Aluno | null>(null);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Initialize view from URL and localStorage
  useEffect(() => {
    const rawPath = window.location.pathname;
    const codigoSalvo = localStorage.getItem(KEY);
    const alunoSalvo = codigoSalvo ? buscarAluno(codigoSalvo) : null;
    setAluno(alunoSalvo);

    if (rawPath === "/ranking") {
      setCurrentView("ranking");
    } else if (rawPath.startsWith("/missao/")) {
      const parts = rawPath.split("/");
      const id = parts[2];
      if (id && alunoSalvo) {
        setSelectedLivroId(id);
        setCurrentView("missao");
      } else {
        setCurrentView(alunoSalvo ? "aluno" : "login");
      }
    } else if (rawPath === "/aluno" && alunoSalvo) {
      setCurrentView("aluno");
    } else {
      setCurrentView(alunoSalvo ? "aluno" : "login");
    }

    const handlePopState = () => {
      const path = window.location.pathname;
      const cod = localStorage.getItem(KEY);
      const al = cod ? buscarAluno(cod) : null;
      setAluno(al);

      if (path === "/ranking") {
        setCurrentView("ranking");
      } else if (path.startsWith("/missao/")) {
        const parts = path.split("/");
        const id = parts[2];
        if (id && al) {
          setSelectedLivroId(id);
          setCurrentView("missao");
        } else {
          setCurrentView(al ? "aluno" : "login");
        }
      } else if (path === "/aluno" && al) {
        setCurrentView("aluno");
      } else {
        setCurrentView(al ? "aluno" : "login");
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigateTo = (view: ViewType | string, livroId?: string) => {
    const cod = localStorage.getItem(KEY);
    const al = cod ? buscarAluno(cod) : null;
    setAluno(al);

    if (view === "missao" && livroId) {
      setSelectedLivroId(livroId);
      setCurrentView("missao");
      window.history.pushState({}, "", `/missao/${livroId}`);
    } else if (view === "ranking") {
      setCurrentView("ranking");
      window.history.pushState({}, "", "/ranking");
    } else if (view === "aluno") {
      if (al) {
        setCurrentView("aluno");
        window.history.pushState({}, "", "/aluno");
      } else {
        setCurrentView("login");
        window.history.pushState({}, "", "/");
      }
    } else {
      setCurrentView("login");
      window.history.pushState({}, "", "/");
    }
  };

  const handleLoginSuccess = () => {
    const cod = localStorage.getItem(KEY);
    const al = cod ? buscarAluno(cod) : null;
    setAluno(al);
    navigateTo("aluno");
  };

  return (
    <div className="min-h-screen bg-[#050b3d] text-slate-100 flex flex-col font-['Nunito',sans-serif]">
      {/* Header for subviews (aluno, missao, ranking) */}
      {currentView !== "login" && (
        <Cabecalho
          nome={aluno?.nome}
          turma={aluno?.turma}
          onNavigate={navigateTo}
          currentView={currentView}
        />
      )}

      {/* Main View */}
      <main className="flex-1 flex flex-col">
        {currentView === "login" && (
          <CosmicHomeView
            aluno={aluno}
            onLoginSuccess={(alunoLogado) => {
              setAluno(alunoLogado);
              navigateTo("aluno");
            }}
            onLogout={() => {
              localStorage.removeItem(KEY);
              setAluno(null);
              navigateTo("login");
            }}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "aluno" && aluno && (
          <AlunoView
            aluno={aluno}
            onSelectLivro={(livroId) => navigateTo("missao", livroId)}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "missao" && aluno && selectedLivroId && (
          <MissaoView
            aluno={aluno}
            livroId={selectedLivroId}
            onVoltar={() => navigateTo("aluno")}
            onNavigate={navigateTo}
          />
        )}

        {currentView === "ranking" && (
          <RankingView
            onVoltar={() => navigateTo(aluno ? "aluno" : "login")}
            onNavigate={navigateTo}
          />
        )}
      </main>

      {/* Footer (clean, only on internal screens) */}
      {currentView !== "login" && (
        <footer className="border-t border-cyan-500/20 py-3 px-4 text-center text-xs text-cyan-200/60 bg-[#070e38]/70">
          <div className="mx-auto max-w-6xl flex items-center justify-center">
            <span>
              📚 Escola & Biblioteca Maria Quitéria • Projeto <strong>Missão Quitério</strong>
            </span>
          </div>
        </footer>
      )}

      {/* Librarian / Admin Helper Modal */}
      <AdminHelpModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onLoginAs={(cod) => {
          const al = buscarAluno(cod);
          setAluno(al);
          navigateTo("aluno");
        }}
      />
    </div>
  );
}
