import React, { useState, useEffect } from "react";
import { rankingAlunos, LinhaRanking, KEY } from "../lib/aluno";
import { AvatarAluno } from "./AvatarAluno";
import { Trophy, Medal, Sparkles, ArrowLeft, RefreshCw, Star, Flag, Award, BookCheck } from "lucide-react";

interface RankingViewProps {
  onVoltar: () => void;
  onNavigate: (view: string) => void;
}

const TOTAL_CASAS = 10;
const CORES = ["bg-amber-400", "bg-cyan-400", "bg-fuchsia-400", "bg-emerald-400", "bg-blue-400", "bg-rose-400"];

// Board house names and icons for the cosmic adventure
const CASAS_NOMES = [
  { n: 1, label: "Partida 🚀", desc: "Primeira Leitura" },
  { n: 2, label: "Nebulosa 🌌", desc: "Descobrindo Mundos" },
  { n: 3, label: "Constelação ✨", desc: "Curiosidade" },
  { n: 4, label: "Cometa ☄️", desc: "Acelerando Páginas" },
  { n: 5, label: "Planeta Azul 🪐", desc: "Meio do Caminho" },
  { n: 6, label: "Asteroide 🪨", desc: "Superando Desafios" },
  { n: 7, label: "Supernova 🌟", desc: "Mestre Leitor" },
  { n: 8, label: "Galáxia 🌀", desc: "Grandes Ideias" },
  { n: 9, label: "Vórtice 🌠", desc: "Reta Final" },
  { n: 10, label: "Estrela Guia 🏆", desc: "Campeão Literário" },
];

export const RankingView: React.FC<RankingViewProps> = ({ onVoltar, onNavigate }) => {
  const [alunos, setAlunos] = useState<LinhaRanking[]>(rankingAlunos);
  const [filtroTurma, setFiltroTurma] = useState<string>("todas");

  // Sync ranking live
  useEffect(() => {
    const atualizar = () => setAlunos(rankingAlunos());
    window.addEventListener("storage", atualizar);
    const interval = window.setInterval(atualizar, 2000);
    return () => {
      window.removeEventListener("storage", atualizar);
      window.clearInterval(interval);
    };
  }, []);

  const turmasDisponiveis = Array.from(new Set(alunos.map((a) => a.turma).filter(Boolean)));
  const alunosFiltrados = filtroTurma === "todas" ? alunos : alunos.filter((a) => a.turma === filtroTurma);

  const lider = alunos[0];
  const houvePartidas = alunos.some((a) => a.jogos > 0);
  const jogadoresAtivos = alunos.filter((a) => a.jogos > 0);

  return (
    <div className="ranking-page min-h-[calc(100vh-65px)] px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-cyan-300/20 pb-4">
        <div>
          <button
            onClick={onVoltar}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-cyan-300 hover:text-cyan-100 mb-2 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar</span>
          </button>
          <div className="flex items-center gap-2">
            <Trophy className="w-7 h-7 text-amber-400" />
            <h1 className="font-['Baloo_2'] text-3xl sm:text-4xl font-black text-white">
              Ranking dos Alunos
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-cyan-200/80 mt-1">
            Cada missão concluída garante pontos e faz o aluno avançar de casa no tabuleiro cósmico!
          </p>
        </div>

        {/* Filter by class */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <label htmlFor="filtro-turma" className="text-xs font-bold text-cyan-200">
            Turma:
          </label>
          <select
            id="filtro-turma"
            value={filtroTurma}
            onChange={(e) => setFiltroTurma(e.target.value)}
            className="rounded-xl bg-slate-900 border border-cyan-400/40 text-xs font-bold text-cyan-100 px-3 py-1.5 focus:outline-none focus:border-amber-400"
          >
            <option value="todas">Todas as turmas ({alunos.length})</option>
            {turmasDisponiveis.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <button
            onClick={() => setAlunos(rankingAlunos())}
            title="Atualizar ranking"
            className="p-2 rounded-xl bg-slate-800 text-cyan-300 hover:text-cyan-100 hover:bg-slate-700 transition"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-6xl space-y-6">
        {/* Top 3 Podium (if games played) */}
        {houvePartidas && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {alunos.slice(0, 3).map((aluno, idx) => {
              const medalhas = ["🥇 1º Lugar", "🥈 2º Lugar", "🥉 3º Lugar"];
              const borderStyles = [
                "border-amber-400 bg-gradient-to-b from-amber-500/20 to-slate-900/90 shadow-[0_0_25px_rgba(251,191,36,0.25)]",
                "border-slate-300 bg-gradient-to-b from-slate-400/20 to-slate-900/90",
                "border-amber-700 bg-gradient-to-b from-amber-700/20 to-slate-900/90",
              ];

              return (
                <div
                  key={aluno.codigo}
                  className={`rounded-2xl border-2 p-4 text-center flex flex-col justify-between ${borderStyles[idx]}`}
                >
                  <div className="font-['Baloo_2'] text-sm font-extrabold text-amber-300">
                    {medalhas[idx]}
                  </div>
                  <div className="my-2 flex flex-col items-center">
                    <AvatarAluno
                      alunoId={aluno.id}
                      codigo={aluno.codigo}
                      nome={aluno.nome}
                      avatarUrl={aluno.avatarUrl}
                      tamanho="lg"
                      className="mb-2"
                    />
                    <h3 className="font-['Baloo_2'] text-xl font-black text-white truncate max-w-[200px]">
                      {aluno.nome}
                    </h3>
                    <p className="text-xs text-cyan-200/80">{aluno.turma} • <strong className="text-amber-300">Casa {aluno.casa}</strong></p>
                  </div>
                  <div className="flex items-center justify-center gap-3 pt-2 border-t border-cyan-500/20">
                    <div className="text-xs">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Pontos</span>
                      <strong className="text-base text-amber-400 font-['Baloo_2']">{aluno.pontos}</strong>
                    </div>
                    <div className="text-xs">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Missões</span>
                      <strong className="text-base text-cyan-300 font-['Baloo_2']">{aluno.jogos}</strong>
                    </div>
                    <div className="text-xs">
                      <span className="block text-[10px] text-slate-400 uppercase font-bold">Acertos</span>
                      <strong className="text-base text-emerald-400 font-['Baloo_2']">{aluno.acertos}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Tabuleiro Cósmico / Cosmic Board Visualization */}
        <section className="ranking-board rounded-3xl border-2 border-cyan-400/50 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 border-b border-cyan-500/30 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <div>
                <h2 className="font-['Baloo_2'] text-xl sm:text-2xl font-black text-white">
                  Tabuleiro da Missão Quitério
                </h2>
                <p className="text-xs text-cyan-200/70">
                  Os alunos avançam uma casa no percurso cósmico a cada livro e missão completada!
                </p>
              </div>
            </div>
            <div className="text-xs font-bold text-cyan-300 bg-slate-900/80 px-3 py-1 rounded-full border border-cyan-400/30 self-start sm:self-auto">
              10 Estações da Aventura
            </div>
          </div>

          {/* Interactive Houses Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            {CASAS_NOMES.map((casa, idx) => {
              // Find students currently on this house
              // casa.n ranges from 1 to 10. aluno.casas = Math.min(jogos, 9).
              // So 0 games = house 1 (start), 1 game = house 2, ... >=9 games = house 10.
              const alunosNestaCasa = alunos.filter((a) => {
                if (casa.n === 1) return a.jogos === 0;
                if (casa.n === 10) return a.jogos >= 9;
                return a.jogos === casa.n - 1;
              });

              const isStart = casa.n === 1;
              const isFinish = casa.n === 10;

              return (
                <div
                  key={casa.n}
                  className={`relative rounded-2xl border-2 p-3 min-h-[115px] flex flex-col justify-between transition-all duration-300 ${
                    isFinish
                      ? "ranking-house-finish"
                      : isStart
                      ? "ranking-house-start"
                      : "ranking-house"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-['Baloo_2'] text-xs font-black px-1.5 py-0.5 rounded-md bg-black/40 text-white">
                      #{casa.n}
                    </span>
                    <span className="text-xs font-bold text-amber-200 drop-shadow truncate">
                      {casa.label}
                    </span>
                  </div>

                  {/* Student Tokens on this house */}
                  <div className="my-1.5 flex flex-wrap gap-1 items-center justify-center min-h-[32px]">
                    {alunosNestaCasa.slice(0, 4).map((aluno, i) => (
                      <div
                        key={aluno.codigo}
                        title={`${aluno.nome} (${aluno.turma}) - ${aluno.pontos} pts`}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold text-slate-950 shadow-md ${
                          CORES[i % CORES.length]
                        } border border-white animate-in zoom-in-50 duration-200`}
                      >
                        <span>🚗</span>
                        <span className="truncate max-w-[65px]">{aluno.nome.split(" ")[0]}</span>
                      </div>
                    ))}
                    {alunosNestaCasa.length > 4 && (
                      <span className="text-[10px] font-bold text-cyan-200 bg-black/50 px-1.5 py-0.5 rounded-full">
                        +{alunosNestaCasa.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="text-[10px] text-cyan-100/70 font-medium text-center truncate">
                    {casa.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Full Leaderboard Table */}
        <section className="glow-card p-5 sm:p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-cyan-500/20 pb-3">
            <h2 className="font-['Baloo_2'] text-xl font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <span>Tabela Geral de Classificação</span>
            </h2>
            <span className="text-xs text-cyan-300 font-bold">
              {alunosFiltrados.length} alunos listados
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-cyan-400/30 text-cyan-200 uppercase text-[11px] font-bold tracking-wider">
                  <th className="py-3 px-2 sm:px-4 text-center w-14">Pos.</th>
                  <th className="py-3 px-3 sm:px-4">Aluno</th>
                  <th className="py-3 px-3 sm:px-4">Turma</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Missões</th>
                  <th className="py-3 px-3 sm:px-4 text-center">Acertos</th>
                  <th className="py-3 px-3 sm:px-4 text-right">Pontos Totais</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-500/10">
                {alunosFiltrados.map((aluno, index) => {
                  const ehTop3 = index < 3;
                  const ehLider = index === 0 && aluno.jogos > 0;

                  return (
                    <tr
                      key={aluno.codigo}
                      className={`transition hover:bg-slate-800/50 ${
                        ehLider
                          ? "bg-amber-400/10 font-bold"
                          : ehTop3 && aluno.jogos > 0
                          ? "bg-slate-900/60"
                          : ""
                      }`}
                    >
                      {/* Position */}
                      <td className="py-3 px-2 sm:px-4 text-center font-bold">
                        {index === 0 && aluno.jogos > 0 ? (
                          <span className="text-lg">🥇</span>
                        ) : index === 1 && aluno.jogos > 0 ? (
                          <span className="text-lg">🥈</span>
                        ) : index === 2 && aluno.jogos > 0 ? (
                          <span className="text-lg">🥉</span>
                        ) : (
                          <span className="text-slate-400 font-mono">#{index + 1}</span>
                        )}
                      </td>

                      {/* Name & Code */}
                      <td className="py-3 px-3 sm:px-4">
                        <div className="flex items-center gap-2.5">
                          <AvatarAluno
                            alunoId={aluno.id}
                            codigo={aluno.codigo}
                            nome={aluno.nome}
                            avatarUrl={aluno.avatarUrl}
                            tamanho="sm"
                          />
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{aluno.nome}</span>
                              {aluno.jogos > 0 && (
                                <span className="inline-flex items-center gap-0.5 text-[10px] text-amber-300 bg-amber-950/70 px-1.5 py-0.2 rounded border border-amber-500/30">
                                  <Star className="w-2.5 h-2.5 fill-current" />
                                  Casa {aluno.casa}
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] font-mono text-cyan-300/70">
                              {aluno.codigo}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Class */}
                      <td className="py-3 px-3 sm:px-4 text-cyan-200">
                        {aluno.turma || "—"}
                      </td>

                      {/* Missions / Games */}
                      <td className="py-3 px-3 sm:px-4 text-center font-semibold text-white">
                        {aluno.jogos}
                      </td>

                      {/* Correct answers */}
                      <td className="py-3 px-3 sm:px-4 text-center font-semibold text-emerald-400">
                        {aluno.acertos}
                      </td>

                      {/* Total points */}
                      <td className="py-3 px-3 sm:px-4 text-right">
                        <span className="font-['Baloo_2'] text-base sm:text-lg font-black text-amber-400">
                          {aluno.pontos}
                        </span>
                        <span className="text-[10px] text-amber-200 ml-1 font-bold">pts</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};
