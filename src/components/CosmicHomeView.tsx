import React, { useState, useEffect, useRef } from "react";
import {
  Aluno,
  KEY,
  rankingAlunos,
  LinhaRanking,
  obterMetaPontos,
} from "../lib/aluno";
import { AvatarAluno } from "./AvatarAluno";
import { EquipeModal } from "./EquipeModal";
import { RegrasModal } from "./RegrasModal";
import { RecompensasModal } from "./RecompensasModal";
import { LoginModal } from "./LoginModal";
import { ConquistaPremioModal } from "./ConquistaPremioModal";
import {
  Trophy,
  Sparkles,
  X,
  BarChart3,
  Star,
  Users,
  ChevronRight,
  Play,
} from "lucide-react";

interface CosmicHomeViewProps {
  aluno: Aluno | null;
  onLoginSuccess: (aluno: Aluno) => void;
  onLogout: () => void;
  onNavigate: (view: string, livroId?: string) => void;
}

export interface CasaPercurso {
  id: number;
  nome: string;
  x: number; // Percentage X of container width
  y: number; // Percentage Y of container height
  corPad: string; // ring color
  pontosMinimos: number;
}

// 11 ordered stepping stone pads along the exact trail from LARGADA (0 pts) to CASA 10 (1.000 pts / Prêmio Final)
const CASAS_DO_PERCURSO: CasaPercurso[] = [
  { id: 0, nome: "LARGADA", x: 18.0, y: 66.0, corPad: "from-amber-600 via-amber-700 to-amber-900 border-amber-300", pontosMinimos: 0 },
  { id: 1, nome: "Casa 1", x: 24.5, y: 63.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 100 },
  { id: 2, nome: "Casa 2", x: 31.0, y: 56.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 200 },
  { id: 3, nome: "Casa 3", x: 37.5, y: 49.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 300 },
  { id: 4, nome: "Casa 4", x: 44.0, y: 41.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 400 },
  { id: 5, nome: "Casa 5", x: 50.5, y: 35.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 500 },
  { id: 6, nome: "Casa 6", x: 58.0, y: 42.0, corPad: "from-emerald-500 to-green-600 border-emerald-200", pontosMinimos: 600 },
  { id: 7, nome: "Casa 7", x: 65.0, y: 51.5, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 700 },
  { id: 8, nome: "Casa 8", x: 72.0, y: 55.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 800 },
  { id: 9, nome: "Casa 9", x: 79.0, y: 50.0, corPad: "from-blue-500 to-cyan-500 border-white", pontosMinimos: 900 },
  { id: 10, nome: "Casa 10", x: 86.0, y: 44.0, corPad: "from-amber-400 via-yellow-300 to-amber-500 border-white shadow-[0_0_25px_rgba(251,191,36,0.95)]", pontosMinimos: 1000 },
];

export const CosmicHomeView: React.FC<CosmicHomeViewProps> = ({
  aluno,
  onLoginSuccess,
  onLogout,
  onNavigate,
}) => {
  // Modals
  const [isEquipeOpen, setIsEquipeOpen] = useState(false);
  const [isRegrasOpen, setIsRegrasOpen] = useState(false);
  const [isRecompensasOpen, setIsRecompensasOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isProgressoOpen, setIsProgressoOpen] = useState(false);
  const [isRankingModalOpen, setIsRankingModalOpen] = useState(false);
  const [abaModalEquipe, setAbaModalEquipe] = useState<"ranking" | "equipe">("ranking");

  // Selected player modal state
  const [alunoSelecionado, setAlunoSelecionado] = useState<LinhaRanking | null>(null);

  // Final victory celebration modal
  const [alunoVencedor, setAlunoVencedor] = useState<LinhaRanking | null>(null);

  // Live ranking
  const [todosRanqueados, setTodosRanqueados] = useState<LinhaRanking[]>(() => rankingAlunos());

  const metaPontos = obterMetaPontos();

  useEffect(() => {
    const syncRanking = () => setTodosRanqueados(rankingAlunos());
    window.addEventListener("storage", syncRanking);
    const interval = setInterval(syncRanking, 1500);
    return () => {
      window.removeEventListener("storage", syncRanking);
      clearInterval(interval);
    };
  }, []);

  // Filter students who played
  const jogadoresAtivos = todosRanqueados.filter((a) => a.jogos > 0 || a.pontos > 0);

  // Check if active logged-in student reached the goal (celebrate once)
  useEffect(() => {
    if (aluno) {
      const registro = todosRanqueados.find((r) => r.codigo === aluno.codigo_aluno || r.id === aluno.id);
      if (registro && registro.pontos >= metaPontos) {
        const jaCelebrado = localStorage.getItem(`mq_conquista_celebrada_${aluno.id}`);
        if (!jaCelebrado) {
          setAlunoVencedor(registro);
        }
      }
    }
  }, [aluno, todosRanqueados, metaPontos]);

  const handleJogarClique = () => {
    if (!aluno) {
      setIsLoginOpen(true);
    } else {
      onNavigate("aluno");
    }
  };

  // Pre-seed exact demo match matching the user's reference mockup
  const simularCorridaExataMockup = () => {
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
        { livroId: "bad44537-65d1-4892-8f7a-807037730ac1", pontos: 100, acertos: 1, data: new Date().toISOString() },
      ],
    };
    localStorage.setItem("mq_partidas", JSON.stringify(partidasSimuladas));
    window.dispatchEvent(new Event("storage"));
    setTodosRanqueados(rankingAlunos());
  };

  // Helper to get rank position (1-indexed) in active players
  const getRankPosicao = (codigo: string) => {
    const idx = jogadoresAtivos.findIndex((a) => a.codigo === codigo);
    if (idx !== -1) return idx + 1;
    const fallbackIdx = todosRanqueados.findIndex((a) => a.codigo === codigo);
    return fallbackIdx !== -1 ? fallbackIdx + 1 : 1;
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [casaFocada, setCasaFocada] = useState<number | null>(null);

  // Difficulty setting for the Nível Médio card
  const [dificuldade, setDificuldade] = useState<"facil" | "medio" | "dificil">(() => {
    return (localStorage.getItem("mq_dificuldade") as any) || "medio";
  });

  const toggleDificuldade = () => {
    const prox = dificuldade === "facil" ? "medio" : dificuldade === "medio" ? "dificil" : "facil";
    setDificuldade(prox);
    localStorage.setItem("mq_dificuldade", prox);
  };

  const dificuldadeNome = dificuldade === "facil" ? "Fácil" : dificuldade === "medio" ? "Médio" : "Difícil";

  // Focus and highlight a house on the map
  const focarCasa = (casaNum: number) => {
    setCasaFocada(casaNum);
    setTimeout(() => setCasaFocada(null), 2500);
    if (!scrollContainerRef.current) return;
    const casaAlvo = CASAS_DO_PERCURSO.find((c) => c.id === casaNum) || CASAS_DO_PERCURSO[0];
    const container = scrollContainerRef.current;
    const targetX = (casaAlvo.x / 100) * container.scrollWidth - container.clientWidth / 2;
    container.scrollTo({ left: Math.max(0, targetX), behavior: "smooth" });
  };

  return (
    <div
      className="relative w-full min-h-screen flex flex-col justify-between items-center bg-[#030933] select-none overflow-x-hidden box-border px-1 sm:px-2 pt-1 pb-[max(5.5rem,env(safe-area-inset-bottom))]"
    >
      {/* ======================================================================= */}
      {/* MAPA DO JOGO RESPONSIVO (Com pan horizontal interno no mobile sem rolar a página) */}
      {/* ======================================================================= */}
      <div className="w-full flex-1 flex flex-col justify-center items-center my-auto min-h-0 max-w-full">
        {/* Dica de deslizamento no celular */}
        <div className="md:hidden flex items-center justify-center gap-1.5 text-[10px] text-cyan-300/80 pb-1 font-['Baloo_2'] select-none">
          <span>👈 Deslize para explorar as ilhas 👉</span>
        </div>

        <div
          ref={scrollContainerRef}
          className="w-full max-w-[1875px] overflow-x-auto overflow-y-visible scrollbar-none rounded-xl sm:rounded-3xl shadow-2xl border border-cyan-500/30 bg-[#040a33] touch-pan-x"
        >
          <div className="relative min-w-[580px] md:min-w-full w-full aspect-[1875/839] select-none shrink-0">
            {/* Official Cosmic Map Background Illustration */}
            <img
              src="/assets/aistudio/Mapa_C_smico_da_Miss_o_Quit_rio_08f6dd5b.png"
              alt="Mapa Cósmico da Missão Quitério"
              className="w-full h-full object-fill pointer-events-none select-none block"
            />

        {/* ======================================================================= */}
        {/* STEPPING STONE PADS & PLAYERS ALONG THE PATH (CASAS 0 TO 10) */}
        {/* ======================================================================= */}
        {CASAS_DO_PERCURSO.map((casa) => {
          // Find all players stationed on this house (including Casa 0 for 0 pts)
          const alunosNestaCasa = todosRanqueados.filter((j) => j.casa === casa.id);
          const temAlunos = alunosNestaCasa.length > 0;
          const ehLargada = casa.id === 0;
          const ehPremioFinal = casa.id === 10;
          const isFocada = casaFocada === casa.id;

          return (
            <div
              key={casa.id}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-300"
              style={{ left: `${casa.x}%`, top: `${casa.y}%` }}
            >
              {/* Pad Marker: LARGADA wooden badge for Casa 0, Golden for Casa 10, or circular pad */}
              {ehLargada ? (
                <div
                  onClick={() => {
                    if (temAlunos) setAlunoSelecionado(alunosNestaCasa[0]);
                  }}
                  className={`relative cursor-pointer group flex flex-col items-center transition-all ${
                    isFocada ? "scale-125 z-40" : ""
                  }`}
                  title={`LARGADA: ${alunosNestaCasa.length} aluno(s) aguardando início`}
                >
                  <div
                    className={`rounded-md sm:rounded-xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border sm:border-2 border-amber-300 px-1.5 sm:px-3 py-0.5 sm:py-1 shadow-2xl flex items-center gap-1 transform hover:scale-105 active:scale-95 transition ${
                      isFocada ? "ring-2 ring-amber-300" : ""
                    }`}
                  >
                    <span className="text-[9px] sm:text-sm">⛵</span>
                    <span className="font-['Baloo_2'] text-[7px] sm:text-xs font-black uppercase text-amber-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                      LARGADA
                    </span>
                  </div>
                </div>
              ) : (
                <div
                  onClick={() => {
                    if (temAlunos) setAlunoSelecionado(alunosNestaCasa[0]);
                  }}
                  className={`group relative flex h-[clamp(18px,3.8vw,44px)] w-[clamp(18px,3.8vw,44px)] items-center justify-center rounded-full bg-gradient-to-b ${casa.corPad} border sm:border-2 md:border-3 shadow-lg cursor-pointer transform hover:scale-115 active:scale-95 transition ${
                    isFocada ? "ring-4 ring-amber-300 scale-125 z-40 animate-pulse" : ""
                  }`}
                >
                  <span className="font-['Baloo_2'] text-[9px] sm:text-xs md:text-sm font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {casa.id}
                  </span>
                </div>
              )}

              {/* PRÊMIO FINAL Wooden Badge on Casa 10 */}
              {ehPremioFinal && (
                <div className="absolute -bottom-4 sm:-bottom-6 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-20">
                  <span className="font-['Baloo_2'] text-[7px] sm:text-[9px] md:text-[10px] font-black uppercase text-amber-200 bg-amber-950/90 border border-amber-400 px-1.5 sm:px-2 py-0.5 rounded shadow-lg">
                    ★ PRÊMIO ★
                  </span>
                </div>
              )}

              {/* If players are on this house: render character token & name/score tag */}
              {temAlunos && (
                <div className="absolute bottom-[75%] sm:bottom-[80%] left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-auto z-30">
                  <div className="flex items-end justify-center -space-x-1.5 sm:-space-x-2 hover:space-x-1 transition-all">
                    {alunosNestaCasa.slice(0, 2).map((jogador) => {
                      const posicao = getRankPosicao(jogador.codigo);
                      const ehLider = posicao === 1 && jogador.pontos > 0;
                      const ehEu = aluno?.codigo_aluno === jogador.codigo;

                      return (
                        <div
                          key={jogador.id || jogador.codigo}
                          onClick={() => setAlunoSelecionado(jogador)}
                          className="relative flex flex-col items-center cursor-pointer group hover:z-30 transition transform hover:scale-105 active:scale-95 touch-manipulation"
                        >
                          {/* Floating Crown for #1 */}
                          {ehLider && (
                            <div className="absolute -top-3 sm:-top-5 left-1/2 -translate-x-1/2 z-30 filter drop-shadow animate-bounce">
                              <span className="text-xs sm:text-lg md:text-xl">👑</span>
                            </div>
                          )}

                          {/* Pulsing "VOCÊ" tag only for active player */}
                          {ehEu && (
                            <div className="absolute -top-3 sm:-top-4 left-1/2 -translate-x-1/2 z-30">
                              <span className="text-[6px] sm:text-[8px] md:text-[9px] font-black uppercase text-slate-950 bg-amber-400 px-1 py-0.2 rounded-full border border-white shadow-md animate-pulse whitespace-nowrap">
                                VOCÊ
                              </span>
                            </div>
                          )}

                          {/* Name & Points Tag Pill */}
                          <div className="mb-0.5 rounded sm:rounded-md bg-[#071342]/95 border border-cyan-400/80 px-1 sm:px-1.5 py-0.2 shadow-lg text-center whitespace-nowrap z-20 max-w-[70px] sm:max-w-[90px] truncate">
                            <span className="font-['Baloo_2'] text-[7px] sm:text-[9px] md:text-xs font-bold text-white block leading-tight truncate">
                              {jogador.nome.split(" ")[0]}
                            </span>
                            <span className="font-['Baloo_2'] text-[7px] sm:text-[9px] md:text-xs font-black text-amber-400 block leading-tight">
                              {jogador.pontos} pts
                            </span>
                          </div>

                          {/* Character Avatar Token */}
                          <div className="relative">
                            <AvatarAluno
                              alunoId={jogador.id}
                              codigo={jogador.codigo}
                              nome={jogador.nome}
                              avatarUrl={jogador.avatarUrl}
                              tamanho="responsive"
                              className={`border sm:border-2 ${
                                ehLider
                                  ? "border-amber-300 ring-1 sm:ring-2 ring-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.8)]"
                                  : "border-white shadow-md"
                              }`}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Indicator if more than 2 students are on this house */}
                  {alunosNestaCasa.length > 2 && (
                    <button
                      onClick={() => setAlunoSelecionado(alunosNestaCasa[0])}
                      className="ml-0.5 mb-0.5 font-['Baloo_2'] text-[7px] sm:text-[9px] font-black bg-amber-400 hover:bg-yellow-300 text-slate-950 px-1 sm:px-1.5 py-0.2 rounded-full border border-white shadow-md cursor-pointer transition transform hover:scale-105 active:scale-95 whitespace-nowrap z-30"
                      title={`${alunosNestaCasa.length} alunos nesta casa. Clique para ver todos.`}
                    >
                      +{alunosNestaCasa.length - 2}
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* ======================================================================= */}
        {/* INTERACTIVE HOTSPOTS OVER PAINTED ILLUSTRATION BUTTONS */}
        {/* ======================================================================= */}
        {/* Hotspot: DETALHES DA EQUIPE (Bottom Left) -> Opens Ranking & Team Modal */}
        <button
          onClick={() => {
            setAbaModalEquipe("ranking");
            setIsRankingModalOpen(true);
          }}
          className="absolute z-30 cursor-pointer rounded-2xl transition hover:opacity-20 hover:bg-white/30 focus:outline-none"
          style={{
            left: "2.3%",
            top: "72.0%",
            width: "9.5%",
            height: "23.0%",
          }}
          title="Detalhes da Equipe & Ranking dos Alunos"
          aria-label="Detalhes da Equipe (Ranking)"
        />

        {/* Hotspot: REGRAS DA ILHA (Bottom Left) -> Opens Regras Modal */}
        <button
          onClick={() => setIsRegrasOpen(true)}
          className="absolute z-30 cursor-pointer rounded-2xl transition hover:opacity-20 hover:bg-white/30 focus:outline-none"
          style={{
            left: "13.0%",
            top: "72.0%",
            width: "9.5%",
            height: "23.0%",
          }}
          title="Regras da Ilha"
          aria-label="Regras da Ilha"
        />

        {/* Hotspot: JOGAR (Bottom Right giant green button) -> Starts Question Game */}
        <button
          onClick={handleJogarClique}
          className="absolute z-30 cursor-pointer rounded-full transition hover:opacity-20 hover:bg-white/30 focus:outline-none"
          style={{
            left: "81.5%",
            top: "64.0%",
            width: "14.5%",
            height: "30.0%",
          }}
          title="Jogar Perguntas"
          aria-label="Jogar Perguntas"
        />

        {/* Hotspot: Central Student Avatar Circle (Bottom Center) */}
        <button
          onClick={() => {
            if (aluno) {
              const infoAluno = todosRanqueados.find((j) => j.codigo === aluno.codigo_aluno);
              if (infoAluno) setAlunoSelecionado(infoAluno);
            } else {
              setIsLoginOpen(true);
            }
          }}
          className="absolute z-30 cursor-pointer rounded-full transition hover:opacity-20 hover:bg-white/30 focus:outline-none"
          style={{
            left: "38.5%",
            top: "71.0%",
            width: "9.5%",
            height: "22.0%",
          }}
          title={aluno ? `${aluno.nome} (Seu Perfil)` : "Entrar / Identificar Aluno"}
          aria-label="Perfil do Aluno"
        />
      </div>
    </div>
  </div>

      {/* ======================================================================= */}
      {/* CARDS RESPONSIVOS DO JOGO (Seção 4: Detalhes da Equipe, Regras, Nível) */}
      {/* ======================================================================= */}
      <div className="w-full max-w-md mx-auto px-2 py-2 flex items-center justify-center gap-2 sm:gap-3 box-border my-1">
        {/* Card 1: Detalhes da Equipe */}
        <button
          onClick={() => {
            setAbaModalEquipe("ranking");
            setIsRankingModalOpen(true);
          }}
          className="flex-1 min-w-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#0a1854] to-[#040a2b] border border-cyan-400/50 hover:border-cyan-300 shadow-[0_4px_16px_rgba(0,102,255,0.3)] transition transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Detalhes da Equipe & Ranking"
        >
          <img
            src="/assets/buttons/btn_equipe.png"
            alt="Detalhes da Equipe"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow"
          />
          <span className="font-['Baloo_2'] text-[9px] sm:text-[11px] font-bold text-white text-center leading-tight truncate w-full mt-1">
            Detalhes Equipe
          </span>
        </button>

        {/* Card 2: Regras da Ilha */}
        <button
          onClick={() => setIsRegrasOpen(true)}
          className="flex-1 min-w-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#1b0d52] to-[#0a0526] border border-fuchsia-400/50 hover:border-fuchsia-300 shadow-[0_4px_16px_rgba(168,85,247,0.3)] transition transform hover:scale-105 active:scale-95 cursor-pointer"
          title="Regras da Ilha"
        >
          <img
            src="/assets/buttons/btn_regras.png"
            alt="Regras da Ilha"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow"
          />
          <span className="font-['Baloo_2'] text-[9px] sm:text-[11px] font-bold text-cyan-200 text-center leading-tight truncate w-full mt-1">
            Regras da Ilha
          </span>
        </button>

        {/* Card 3: Nível Médio */}
        <button
          onClick={toggleDificuldade}
          className="flex-1 min-w-0 flex flex-col items-center justify-center p-2 rounded-2xl bg-gradient-to-b from-[#2e1805] to-[#140a02] border border-amber-400/50 hover:border-amber-300 shadow-[0_4px_16px_rgba(251,191,36,0.3)] transition transform hover:scale-105 active:scale-95 cursor-pointer"
          title={`Dificuldade: ${dificuldadeNome}. Clique para alterar.`}
        >
          <img
            src="/assets/buttons/btn_nivel.png"
            alt="Nível"
            className="h-9 sm:h-11 w-auto object-contain drop-shadow"
          />
          <span className="font-['Baloo_2'] text-[9px] sm:text-[11px] font-bold text-amber-300 text-center leading-tight truncate w-full mt-1">
            Nível {dificuldadeNome}
          </span>
        </button>
      </div>

      {/* ======================================================================= */}
      {/* MENU INFERIOR RESPONSIVO (Seção 3: Ranking, Largada, Líder, Regras, Jogar) */}
      {/* ======================================================================= */}
      <div
        className="fixed bottom-0 inset-x-0 z-40 w-full flex justify-center px-2 py-1.5 pointer-events-none"
        style={{ paddingBottom: "max(0.4rem, env(safe-area-inset-bottom))" }}
      >
        <nav
          aria-label="Menu principal de navegação"
          className="pointer-events-auto w-full max-w-md flex items-center justify-between gap-1 p-1.5 rounded-2xl bg-[#071342]/95 backdrop-blur-xl border border-cyan-400/60 shadow-[0_8px_30px_rgba(0,0,0,0.9)] box-border"
        >
          {/* 1. Ranking */}
          <button
            onClick={() => {
              setAbaModalEquipe("ranking");
              setIsRankingModalOpen(true);
            }}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-amber-400/40 text-amber-300 active:scale-95 transition"
          >
            <Trophy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 shrink-0" />
            <span className="text-[8px] sm:text-[10px] font-['Baloo_2'] font-bold leading-none truncate w-full text-center mt-0.5">
              Ranking
            </span>
          </button>

          {/* 2. Largada */}
          <button
            onClick={() => focarCasa(0)}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-200 active:scale-95 transition"
          >
            <span className="text-xs sm:text-sm leading-none shrink-0">⛵</span>
            <span className="text-[8px] sm:text-[10px] font-['Baloo_2'] font-bold leading-none truncate w-full text-center mt-0.5">
              Largada
            </span>
          </button>

          {/* 3. Líder */}
          <button
            onClick={() => {
              const lider = jogadoresAtivos[0];
              focarCasa(lider ? lider.casa : 0);
            }}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-200 active:scale-95 transition"
          >
            <span className="text-xs sm:text-sm leading-none shrink-0">👑</span>
            <span className="text-[8px] sm:text-[10px] font-['Baloo_2'] font-bold leading-none truncate w-full text-center mt-0.5">
              Líder
            </span>
          </button>

          {/* 4. Regras */}
          <button
            onClick={() => setIsRegrasOpen(true)}
            className="flex-1 min-w-0 flex flex-col items-center justify-center py-1 px-0.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-cyan-500/30 text-cyan-200 active:scale-95 transition"
          >
            <span className="text-xs sm:text-sm leading-none shrink-0">📜</span>
            <span className="text-[8px] sm:text-[10px] font-['Baloo_2'] font-bold leading-none truncate w-full text-center mt-0.5">
              Regras
            </span>
          </button>

          {/* 5. Jogar */}
          <button
            onClick={handleJogarClique}
            className="flex-[1.2] min-w-0 flex items-center justify-center gap-1 py-1.5 px-1.5 sm:px-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-['Baloo_2'] font-black text-[9px] sm:text-[11px] shadow-md border border-white/60 active:scale-95 transition shrink-0"
          >
            <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white shrink-0" />
            <span className="truncate">Jogar</span>
          </button>
        </nav>
      </div>

      {/* ========================================================================= */}
      {/* DETALHES DA EQUIPE & RANKING MODAL */}
      {/* ========================================================================= */}
      {isRankingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-hidden flex flex-col rounded-3xl bg-gradient-to-b from-[#0e1d5c] to-[#050b2b] border-2 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.4)]">
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-5 border-b border-cyan-500/20 bg-blue-950/70">
              <div className="flex items-center gap-3">
                <div className="relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-lg shrink-0">
                  <span className="text-2xl">🐱</span>
                  <span className="absolute -bottom-1 -right-1 text-xs">📖</span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-amber-300">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Biblioteca Maria Quitéria</span>
                  </div>
                  <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-black text-white leading-tight">
                    {abaModalEquipe === "ranking" ? "Ranking dos Alunos" : "Detalhes da Equipe"}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => setIsRankingModalOpen(false)}
                className="p-1.5 sm:p-2 rounded-xl bg-slate-800/80 text-cyan-200 hover:text-white hover:bg-slate-700 transition cursor-pointer"
                title="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-cyan-500/20 bg-slate-950/40 p-2 gap-2">
              <button
                onClick={() => setAbaModalEquipe("ranking")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-['Baloo_2'] font-bold text-xs sm:text-sm transition cursor-pointer ${
                  abaModalEquipe === "ranking"
                    ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 shadow-md"
                    : "text-cyan-200 hover:bg-slate-800/60"
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>Ranking dos Alunos</span>
              </button>
              <button
                onClick={() => setAbaModalEquipe("equipe")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl font-['Baloo_2'] font-bold text-xs sm:text-sm transition cursor-pointer ${
                  abaModalEquipe === "equipe"
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md"
                    : "text-cyan-200 hover:bg-slate-800/60"
                }`}
              >
                <Users className="w-4 h-4" />
                <span>Tripulação & Turma</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 sm:p-5 overflow-y-auto space-y-4 text-cyan-100 flex-1">
              {abaModalEquipe === "ranking" ? (
                <>
                  <div className="flex items-center justify-between text-xs text-cyan-200 border-b border-cyan-500/10 pb-2">
                    <span className="font-bold flex items-center gap-1.5">
                      <Trophy className="w-3.5 h-3.5 text-amber-400" />
                      Pontuação em tempo real
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Meta: {metaPontos} pts (Prêmio Final)
                    </span>
                  </div>

                  {/* List of students sorted strictly by score */}
                  <div className="space-y-2">
                    {todosRanqueados.map((item, index) => {
                      const posicao = index + 1;
                      const isPrimeiro = posicao === 1 && item.pontos > 0;
                      const isSegundo = posicao === 2 && item.pontos > 0;
                      const isTerceiro = posicao === 3 && item.pontos > 0;
                      const isAlunoLogado = aluno?.codigo_aluno === item.codigo;

                      return (
                        <div
                          key={item.codigo}
                          onClick={() => {
                            setAlunoSelecionado(item);
                            setIsRankingModalOpen(false);
                          }}
                          className={`flex items-center justify-between p-2.5 sm:p-3 rounded-2xl border transition cursor-pointer transform hover:scale-[1.01] ${
                            isAlunoLogado
                              ? "bg-amber-400/15 border-amber-400 text-white shadow-[0_0_15px_rgba(251,191,36,0.3)]"
                              : isPrimeiro
                              ? "bg-gradient-to-r from-amber-500/20 to-blue-900/40 border-amber-400/60 text-white"
                              : "bg-slate-900/70 border-cyan-500/20 hover:border-cyan-400 text-cyan-100"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                            {/* Position Badge */}
                            <div
                              className={`flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full font-['Baloo_2'] font-black text-xs sm:text-sm shrink-0 ${
                                isPrimeiro
                                  ? "bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 shadow-[0_0_10px_rgba(251,191,36,0.8)] border border-white"
                                  : isSegundo
                                  ? "bg-gradient-to-tr from-slate-200 to-slate-400 text-slate-950 border border-white"
                                  : isTerceiro
                                  ? "bg-gradient-to-tr from-amber-700 to-amber-600 text-amber-100 border border-amber-300"
                                  : "bg-slate-800 text-slate-300 border border-slate-700"
                              }`}
                            >
                              {posicao}
                            </div>

                            {/* Avatar */}
                            <AvatarAluno
                              alunoId={item.id}
                              codigo={item.codigo}
                              nome={item.nome}
                              avatarUrl={item.avatarUrl}
                              tamanho="sm"
                              className={isPrimeiro ? "border-amber-300 ring-2 ring-amber-400" : ""}
                            />

                            {/* Name & House */}
                            <div className="min-w-0 truncate">
                              <div className="font-['Baloo_2'] font-bold text-xs sm:text-sm text-white flex items-center gap-1.5 truncate">
                                <span>{item.nome}</span>
                                {isPrimeiro && <span>👑</span>}
                                {isAlunoLogado && (
                                  <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-1.5 py-0.2 rounded border border-amber-400/30">
                                    Você
                                  </span>
                                )}
                              </div>
                              <div className="text-[11px] text-cyan-300/80 flex items-center gap-1">
                                <span>{item.casa > 0 ? `Casa ${item.casa}` : "Largada"}</span>
                                <span className="text-slate-500">•</span>
                                <span className="font-mono text-[10px] text-slate-400">Turma {item.turma}</span>
                              </div>
                            </div>
                          </div>

                          {/* Points & Arrow */}
                          <div className="flex items-center gap-2 shrink-0">
                            <span className="font-['Baloo_2'] font-black text-xs sm:text-sm text-amber-300">
                              {item.pontos} pts
                            </span>
                            <ChevronRight className="w-4 h-4 text-cyan-400/60" />
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Full Ranking Action Button */}
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setIsRankingModalOpen(false);
                        onNavigate("ranking");
                      }}
                      className="w-full py-2.5 sm:py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 hover:from-blue-500 hover:to-cyan-500 text-white font-['Baloo_2'] font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 border border-cyan-300 transition cursor-pointer transform active:scale-95"
                    >
                      <Trophy className="w-4 h-4 text-amber-300" />
                      <span>Ver Ranking Completo & Estatísticas</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </>
              ) : (
                /* Team details tab */
                <div className="space-y-4">
                  {/* Class banner */}
                  <div className="rounded-2xl bg-gradient-to-r from-blue-900/60 to-cyan-900/40 border border-cyan-400/40 p-3.5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-300 tracking-wider">
                        Turma da Biblioteca
                      </span>
                      <h4 className="font-['Baloo_2'] text-lg font-black text-white">
                        {aluno?.turma || "Escola Maria Quitéria"}
                      </h4>
                      <p className="text-[11px] text-cyan-200/80">
                        Total de {todosRanqueados.length} alunos cadastrados no percurso
                      </p>
                    </div>
                    <div className="rounded-xl bg-blue-950/80 border border-cyan-400/30 px-3 py-1.5 text-center">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Líder</span>
                      <span className="font-['Baloo_2'] font-black text-xs text-amber-300">
                        {todosRanqueados[0]?.nome.split(" ")[0]} ({todosRanqueados[0]?.pontos} pts)
                      </span>
                    </div>
                  </div>

                  {/* Mascot info */}
                  <div className="rounded-2xl bg-slate-900/80 border border-amber-400/30 p-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-xl shrink-0">
                      🐱
                    </div>
                    <div>
                      <span className="font-bold text-white text-xs block">
                        Guardião Quitério
                      </span>
                      <p className="text-[11px] text-cyan-200/80">
                        Mascote felino oficial da biblioteca! A cada acerto nas perguntas, você avança rumo ao Baú Cósmico.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setIsRankingModalOpen(false);
                        setIsRegrasOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-200 font-bold text-xs transition border border-cyan-500/30"
                    >
                      📜 Ver Regras da Ilha
                    </button>
                    <button
                      onClick={() => {
                        setIsRankingModalOpen(false);
                        setIsRecompensasOpen(true);
                      }}
                      className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold text-xs transition border border-amber-400/30"
                    >
                      🎁 Baú de Recompensas
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-cyan-500/20 bg-slate-950/70 flex justify-end">
              <button
                onClick={() => setIsRankingModalOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Voltar ao Mapa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* PROGRESSO MODAL (HUB FOR RULES, TEAM, REWARDS) */}
      {/* ========================================================================= */}
      {isProgressoOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-slate-900 border-3 border-cyan-400 shadow-2xl p-6 text-center space-y-4">
            <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-amber-400" />
                <h3 className="font-['Baloo_2'] text-lg font-black text-white">
                  Progresso & Informações da Ilha
                </h3>
              </div>
              <button
                onClick={() => setIsProgressoOpen(false)}
                className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-cyan-200">
              Escolha uma das opções abaixo para visualizar regras, conquistas ou membros da turma:
            </p>

            <div className="grid grid-cols-1 gap-2.5 pt-1 text-left">
              <button
                onClick={() => {
                  setIsProgressoOpen(false);
                  setIsRegrasOpen(true);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-400 transition cursor-pointer"
              >
                <span className="text-2xl">📜</span>
                <div>
                  <span className="font-['Baloo_2'] font-bold text-white text-sm block">Regras da Ilha</span>
                  <span className="text-[11px] text-slate-400">Como funciona o passaporte de leitura e pontuações</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsProgressoOpen(false);
                  setIsEquipeOpen(true);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-400 transition cursor-pointer"
              >
                <span className="text-2xl">🐱</span>
                <div>
                  <span className="font-['Baloo_2'] font-bold text-white text-sm block">Detalhes da Equipe</span>
                  <span className="text-[11px] text-slate-400">Colegas de turma e livros devolvidos na biblioteca</span>
                </div>
              </button>

              <button
                onClick={() => {
                  setIsProgressoOpen(false);
                  setIsRecompensasOpen(true);
                }}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 border border-slate-700 hover:border-cyan-400 transition cursor-pointer"
              >
                <span className="text-2xl">🎁</span>
                <div>
                  <span className="font-['Baloo_2'] font-bold text-white text-sm block">Baú de Recompensas</span>
                  <span className="text-[11px] text-slate-400">Medalhas desbloqueadas e marcos de leitura</span>
                </div>
              </button>
            </div>

            <button
              onClick={() => setIsProgressoOpen(false)}
              className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* STUDENT DETAILS MODAL */}
      {/* ========================================================================= */}
      {alunoSelecionado && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-gradient-to-b from-[#162569] to-[#080f33] border-3 border-cyan-400 shadow-[0_0_50px_rgba(34,211,238,0.5)] text-center p-6 space-y-4">
            <button
              onClick={() => setAlunoSelecionado(null)}
              className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Avatar */}
            <div className="relative mx-auto w-24 h-24 rounded-full flex items-center justify-center mt-2">
              {getRankPosicao(alunoSelecionado.codigo) === 1 && alunoSelecionado.pontos > 0 && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-3xl z-20 animate-bounce">👑</span>
              )}
              <AvatarAluno
                alunoId={alunoSelecionado.id}
                codigo={alunoSelecionado.codigo}
                nome={alunoSelecionado.nome}
                avatarUrl={alunoSelecionado.avatarUrl}
                tamanho="xl"
                className="border-amber-300 shadow-[0_0_25px_rgba(251,191,36,0.7)]"
              />
            </div>

            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 text-xs font-bold mb-1">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                Posição #{getRankPosicao(alunoSelecionado.codigo)} na Corrida
              </span>
              <h3 className="font-['Baloo_2'] text-2xl font-black text-white">
                {alunoSelecionado.nome}
              </h3>
              <p className="text-xs text-amber-300 font-mono font-bold tracking-widest">
                [{alunoSelecionado.codigo}] • Turma {alunoSelecionado.turma}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2 py-2">
              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                <span className="text-[10px] text-cyan-200 block">Pontos</span>
                <span className="font-['Baloo_2'] text-lg font-black text-amber-400">
                  ★ {alunoSelecionado.pontos}
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                <span className="text-[10px] text-cyan-200 block">Casa Atual</span>
                <span className="font-['Baloo_2'] text-lg font-black text-emerald-400">
                  Casa {alunoSelecionado.casa}
                </span>
              </div>
              <div className="p-2.5 rounded-2xl bg-slate-900/80 border border-cyan-500/30">
                <span className="text-[10px] text-cyan-200 block">Distância Baú</span>
                <span className="font-['Baloo_2'] text-sm font-black text-cyan-300">
                  {alunoSelecionado.atingiuMeta ? "Alcançada!" : `${alunoSelecionado.distanciaMeta} pts`}
                </span>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setAlunoSelecionado(null)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition cursor-pointer"
              >
                Voltar ao Mapa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* OTHER MODALS */}
      {/* ========================================================================= */}
      <EquipeModal
        isOpen={isEquipeOpen}
        onClose={() => setIsEquipeOpen(false)}
        alunoAtual={aluno}
      />
      <RegrasModal isOpen={isRegrasOpen} onClose={() => setIsRegrasOpen(false)} />
      <RecompensasModal
        isOpen={isRecompensasOpen}
        onClose={() => setIsRecompensasOpen(false)}
        aluno={aluno}
      />
      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onSuccess={(alunoLogado) => {
          setIsLoginOpen(false);
          onLoginSuccess(alunoLogado);
        }}
      />
      {alunoVencedor && (
        <ConquistaPremioModal
          isOpen={!!alunoVencedor}
          onClose={() => setAlunoVencedor(null)}
          aluno={alunoVencedor}
        />
      )}

    </div>
  );
};
