import React, { useState, useEffect } from "react";
import {
  Aluno,
  livrosDevolvidos,
  partidasDo,
  KEY,
  rankingAlunos,
  LinhaRanking,
  obterPontosPorCasa,
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
  Play,
  UserCheck,
  X,
  BarChart3,
  Star,
  Users,
  Compass,
  BookOpen,
  LogOut,
  ChevronRight,
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

  // Student stats
  const partidas = aluno ? partidasDo(aluno.codigo_aluno) : [];
  const totalPontosAluno = partidas.reduce((acc, p) => acc + p.pontos, 0);

  // Highest score or active student score for the bottom progress bar
  const maiorPontos = jogadoresAtivos.length > 0 ? Math.max(...jogadoresAtivos.map((j) => j.pontos)) : 0;
  const pontosExibicaoProgresso = aluno ? totalPontosAluno : (maiorPontos > 0 ? maiorPontos : 400);
  const progressoPercentual = Math.min(100, Math.round((pontosExibicaoProgresso / metaPontos) * 100));

  // Helper to get rank position (1-indexed) in active players
  const getRankPosicao = (codigo: string) => {
    const idx = jogadoresAtivos.findIndex((a) => a.codigo === codigo);
    if (idx !== -1) return idx + 1;
    const fallbackIdx = todosRanqueados.findIndex((a) => a.codigo === codigo);
    return fallbackIdx !== -1 ? fallbackIdx + 1 : 1;
  };

  return (
    <div className="relative min-h-[calc(100vh-65px)] w-full flex flex-col justify-between overflow-x-hidden bg-[#030933]">
      
      {/* ========================================================================= */}
      {/* TOP HEADER (Matching the user's reference mockup) */}
      {/* ========================================================================= */}
      <header className="relative z-30 w-full px-3 sm:px-6 py-2.5 bg-gradient-to-b from-[#020728]/95 to-transparent flex items-center justify-between gap-3">
        {/* Brand: Cat Badge + MISSÃO QUITÉRIO */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 shadow-[0_0_20px_rgba(251,191,36,0.6)] border-2 border-white shrink-0">
            <span className="text-2xl sm:text-3xl">🐱</span>
          </div>
          <div>
            <div className="flex items-center gap-1 leading-none">
              <span className="font-['Baloo_2'] text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                MISSÃO
              </span>
              <span className="font-['Baloo_2'] text-xl sm:text-2xl font-black tracking-tight text-amber-400 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] ml-1">
                QUITÉRIO
              </span>
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-cyan-200/90 tracking-wide block mt-0.5">
              Biblioteca Maria Quitéria
            </span>
          </div>
        </div>

        {/* Center: Wooden Sign "Leia • Responda • Avance" with open book */}
        <div className="hidden md:flex items-center justify-center pointer-events-none select-none">
          <img
            src="/assets/placa_leia.png"
            alt="Leia • Responda • Avance"
            className="h-10 sm:h-12 w-auto object-contain drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
            onError={(e) => {
              // Fallback styled wooden plaque if image isn't loaded
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>

        {/* Right Actions: Ranking Button & Entrar Button */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => onNavigate("ranking")}
            className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-[#0d2772] to-[#07194f] hover:from-[#13369a] hover:to-[#0d2772] text-white border-2 border-cyan-400/50 px-4 py-2 font-['Baloo_2'] font-bold text-xs sm:text-sm shadow-lg transition transform active:scale-95 cursor-pointer"
          >
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Ranking</span>
          </button>

          {aluno ? (
            <div className="flex items-center gap-2 rounded-full bg-blue-950/90 border border-cyan-400/60 px-3 py-1 text-xs text-white shadow-lg">
              <AvatarAluno
                alunoId={aluno.id}
                codigo={aluno.codigo_aluno}
                nome={aluno.nome}
                avatarUrl={aluno.avatar_url}
                tamanho="xs"
              />
              <span className="font-bold hidden sm:inline">{aluno.nome.split(" ")[0]}</span>
              <button
                onClick={onLogout}
                className="p-1 rounded text-slate-400 hover:text-white"
                title="Sair"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsLoginOpen(true)}
              className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 hover:from-amber-300 hover:to-yellow-200 text-slate-950 font-['Baloo_2'] font-black text-xs sm:text-sm px-5 py-2 shadow-[0_0_15px_rgba(251,191,36,0.5)] border-2 border-white transition transform active:scale-95 cursor-pointer"
            >
              <span>Entrar</span>
            </button>
          )}
        </div>
      </header>

      {/* ========================================================================= */}
      {/* CENTER STAGE: MAP + LEFT RANKING PANEL + STEPPING STONES */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex-1 w-full max-w-[1942px] mx-auto flex items-center justify-center px-1 sm:px-2 py-1">
        
        {/* Responsive Board Container preserving aspect ratio */}
        <div className="relative w-full aspect-[1942/810] min-w-[900px] overflow-hidden rounded-3xl border-2 border-cyan-500/40 shadow-2xl bg-[#040a33] select-none">
          
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

            return (
              <div
                key={casa.id}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-25 transition-all duration-300"
                style={{ left: `${casa.x}%`, top: `${casa.y}%` }}
              >
                {/* Pad Marker: LARGADA wooden badge for Casa 0, Golden for Casa 10, or 3D circular pad */}
                {ehLargada ? (
                  <div
                    onClick={() => {
                      if (temAlunos) setAlunoSelecionado(alunosNestaCasa[0]);
                    }}
                    className="relative cursor-pointer group flex flex-col items-center"
                    title={`LARGADA: ${alunosNestaCasa.length} aluno(s) aguardando início`}
                  >
                    <div className="rounded-xl bg-gradient-to-b from-amber-600 via-amber-700 to-amber-900 border-2 border-amber-300 px-3 py-1 shadow-2xl flex items-center gap-1.5 transform hover:scale-105 transition">
                      <span className="text-sm">⛵</span>
                      <span className="font-['Baloo_2'] text-xs font-black uppercase text-amber-100 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                        LARGADA
                      </span>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => {
                      if (temAlunos) setAlunoSelecionado(alunosNestaCasa[0]);
                    }}
                    className={`group relative flex h-9 w-9 sm:h-11 sm:w-11 md:h-12 md:w-12 items-center justify-center rounded-full bg-gradient-to-b ${casa.corPad} border-3 sm:border-4 shadow-[0_4px_15px_rgba(0,0,0,0.6)] cursor-pointer transform hover:scale-115 transition`}
                  >
                    <span className="font-['Baloo_2'] text-xs sm:text-base font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                      {casa.id}
                    </span>
                  </div>
                )}

                {/* PRÊMIO FINAL Wooden Badge on Casa 10 */}
                {ehPremioFinal && (
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-20">
                    <span className="font-['Baloo_2'] text-[10px] font-black uppercase text-amber-200 bg-amber-950/90 border border-amber-400 px-2 py-0.5 rounded-md shadow-lg">
                      ★ PRÊMIO FINAL ★
                    </span>
                  </div>
                )}

                {/* If players are on this house: render character token & name/score tag */}
                {temAlunos && (
                  <div className="absolute -top-16 sm:-top-18 md:-top-20 left-1/2 -translate-x-1/2 flex items-end justify-center pointer-events-auto z-30">
                    <div className="flex items-end justify-center -space-x-2 hover:space-x-1 transition-all">
                      {alunosNestaCasa.slice(0, 2).map((jogador) => {
                        const posicao = getRankPosicao(jogador.codigo);
                        const ehLider = posicao === 1 && jogador.pontos > 0;
                        const ehEu = aluno?.codigo_aluno === jogador.codigo;

                        return (
                          <div
                            key={jogador.id || jogador.codigo}
                            onClick={() => setAlunoSelecionado(jogador)}
                            className="relative flex flex-col items-center cursor-pointer group hover:z-30 transition transform hover:scale-105"
                          >
                            {/* Floating Crown for #1 */}
                            {ehLider && (
                              <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-30 filter drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] animate-bounce">
                                <span className="text-xl sm:text-2xl">👑</span>
                              </div>
                            )}

                            {/* Pulsing "VOCÊ" tag only for active player */}
                            {ehEu && (
                              <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-30">
                                <span className="text-[8px] sm:text-[9px] font-black uppercase text-slate-950 bg-amber-400 px-2 py-0.2 rounded-full border border-white shadow-md animate-pulse whitespace-nowrap">
                                  VOCÊ
                                </span>
                              </div>
                            )}

                            {/* Name & Points Tag Pill */}
                            <div className="mb-0.5 rounded-lg bg-[#071342]/95 border border-cyan-400/80 px-2 py-0.5 shadow-xl text-center whitespace-nowrap z-20">
                              <span className="font-['Baloo_2'] text-[10px] sm:text-xs font-bold text-white block leading-tight">
                                {jogador.nome.split(" ")[0]}
                              </span>
                              <span className="font-['Baloo_2'] text-[10px] sm:text-xs font-black text-amber-400 block leading-tight">
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
                                tamanho="md"
                                className={`border-2 ${
                                  ehLider
                                    ? "border-amber-300 ring-2 ring-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.8)]"
                                    : "border-white shadow-lg"
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
                        className="ml-1 mb-1 font-['Baloo_2'] text-[9px] font-black bg-amber-400 hover:bg-yellow-300 text-slate-950 px-2 py-0.5 rounded-full border border-white shadow-md cursor-pointer transition transform hover:scale-105 whitespace-nowrap z-30"
                        title={`${alunosNestaCasa.length} alunos nesta casa. Clique para ver todos.`}
                      >
                        +{alunosNestaCasa.length - 2} {ehLargada ? "na largada" : ""}
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>

      {/* ========================================================================= */}
      {/* BOTTOM BAR (Matching the user's reference mockup) */}
      {/* ========================================================================= */}
      <footer className="relative z-30 w-full px-3 sm:px-6 py-3 bg-gradient-to-t from-[#020728]/95 to-transparent">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
          
          {/* Left: Button "DETALHES DA EQUIPE (Ranking)" matching image_6e489cb4.png */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setAbaModalEquipe("ranking");
                setIsRankingModalOpen(true);
              }}
              className="relative group flex flex-col items-center justify-center cursor-pointer transition transform hover:scale-105 active:scale-95 focus:outline-none"
              title="Detalhes da Equipe (Ranking dos Alunos)"
            >
              <div className="relative">
                <img
                  src="/assets/buttons/btn_equipe.png"
                  alt="Detalhes da Equipe (Ranking)"
                  className="h-16 sm:h-20 w-auto object-contain select-none drop-shadow-[0_4px_16px_rgba(0,102,255,0.7)]"
                />
                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 font-['Baloo_2'] font-black text-[10px] sm:text-xs whitespace-nowrap shadow-[0_2px_8px_rgba(0,0,0,0.8)] border border-white tracking-wide flex items-center gap-1">
                  <Trophy className="w-3 h-3 text-slate-950 fill-slate-950" />
                  <span>(Ranking)</span>
                </span>
              </div>
            </button>
          </div>

          {/* Center: Star Badge + "Meta para o prêmio: 1.000 pontos" + Golden Progress Bar */}
          <div className="flex-1 max-w-[480px] w-full flex items-center gap-3 rounded-full bg-[#071342]/90 border-2 border-cyan-400/80 px-4 py-2 shadow-[0_0_25px_rgba(34,211,238,0.3)]">
            {/* Golden Star Badge */}
            <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 border-2 border-white shadow-md text-slate-950 shrink-0">
              <Star className="w-4 h-4 fill-slate-950 text-slate-950" />
            </div>

            {/* Progress track & dynamic label */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between text-xs font-['Baloo_2'] font-bold text-white mb-1">
                <span className="truncate">Meta para o prêmio: {metaPontos.toLocaleString("pt-BR")} pontos</span>
                <span className="font-mono text-amber-300 shrink-0 ml-2">
                  {pontosExibicaoProgresso} / {metaPontos}
                </span>
              </div>
              <div className="w-full h-2.5 sm:h-3 rounded-full bg-slate-800/90 overflow-hidden border border-cyan-500/30 p-0.5">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_12px_rgba(251,191,36,0.8)] transition-all duration-500"
                  style={{ width: `${progressoPercentual}%` }}
                />
              </div>
            </div>
          </div>

          {/* Right: Giant Emerald Green Button "▶ Jogar Perguntas" */}
          <div className="flex items-center justify-center">
            <button
              onClick={handleJogarClique}
              className="flex items-center gap-3 rounded-full bg-gradient-to-b from-[#22c55e] via-[#16a34a] to-[#15803d] hover:from-[#34d399] hover:to-[#16a34a] border-3 border-white px-6 sm:px-8 py-2.5 sm:py-3 shadow-[0_0_30px_rgba(34,197,94,0.6)] font-['Baloo_2'] font-black text-base sm:text-lg text-white uppercase tracking-wider cursor-pointer transform active:scale-95 transition"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white shadow-md">
                <Play className="w-4 h-4 fill-[#15803d] text-[#15803d] ml-0.5" />
              </div>
              <span>Jogar Perguntas</span>
            </button>
          </div>

        </div>
      </footer>

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
