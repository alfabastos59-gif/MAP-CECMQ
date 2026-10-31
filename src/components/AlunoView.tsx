import { Aluno, livrosDevolvidos, partidasDo, situacao, PONTOS_POR_ACERTO, calcularCasa } from "../lib/aluno";
import { AvatarAluno } from "./AvatarAluno";
import { Sparkles, Trophy, BookOpen, Clock, CheckCircle, Lock, Play, ArrowRight, UserCheck } from "lucide-react";

interface AlunoViewProps {
  aluno: Aluno;
  onSelectLivro: (livroId: string) => void;
  onNavigate: (view: string) => void;
}

export const AlunoView: React.FC<AlunoViewProps> = ({ aluno, onSelectLivro, onNavigate }) => {
  const livros = livrosDevolvidos(aluno.id);
  const partidas = partidasDo(aluno.codigo_aluno);
  const totalPontos = partidas.reduce((acc, p) => acc + p.pontos, 0);
  const totalAcertos = partidas.reduce((acc, p) => acc + p.acertos, 0);
  const casaAtual = calcularCasa(totalPontos);
  const geral = situacao(partidas, null);

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 sm:px-6 py-6">
      {/* Student Profile & Stats Banner */}
      <section className="glow-card p-6 sm:p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-bl from-amber-400/20 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <AvatarAluno
              alunoId={aluno.id}
              codigo={aluno.codigo_aluno}
              nome={aluno.nome}
              avatarUrl={aluno.avatar_url}
              tamanho="lg"
              className="border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.5)] shrink-0"
            />
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300 text-xs font-bold">
                <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>Posição no Mapa: Casa {casaAtual}</span>
              </div>
              <h1 className="font-['Baloo_2'] text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Olá, <span className="text-amber-300">{aluno.nome}</span>! 🚀
              </h1>
              <p className="text-xs sm:text-sm font-semibold text-cyan-200">
                Turma: <span className="text-white font-bold">{aluno.turma}</span> • Código:{" "}
                <span className="font-mono text-amber-300">{aluno.codigo_aluno}</span>
              </p>
            </div>
          </div>

          {/* Stats Boxes */}
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[120px] rounded-2xl bg-slate-900/80 border border-amber-400/40 p-4 text-center shadow-lg">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-200">
                Pontuação Total
              </span>
              <div className="mt-1 flex items-center justify-center gap-1">
                <span className="text-amber-400 text-lg">⭐</span>
                <span className="font-['Baloo_2'] text-3xl font-black text-amber-400">
                  {totalPontos}
                </span>
                <span className="text-xs text-amber-300 font-bold">pts</span>
              </div>
            </div>

            <div className="flex-1 min-w-[120px] rounded-2xl bg-slate-900/80 border border-cyan-400/40 p-4 text-center shadow-lg">
              <span className="block text-[11px] font-bold uppercase tracking-wider text-cyan-200">
                Missões Realizadas
              </span>
              <div className="mt-1 flex items-center justify-center gap-1">
                <span className="text-cyan-400 text-lg">🏆</span>
                <span className="font-['Baloo_2'] text-3xl font-black text-cyan-300">
                  {partidas.length}
                </span>
                <span className="text-xs text-cyan-200 font-bold">jogos</span>
              </div>
            </div>

            <div className="w-full sm:w-auto flex items-center">
              <button
                onClick={() => onNavigate("ranking")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-['Baloo_2'] font-extrabold px-5 py-3 shadow-[0_0_20px_rgba(251,191,36,0.3)] transition transform active:scale-95"
              >
                <Trophy className="w-5 h-5" />
                <span>Ver Ranking</span>
              </button>
            </div>
          </div>
        </div>

        {/* 5-day Rule notification */}
        {geral.aguardando && geral.liberaEm && (
          <div className="mt-5 flex items-center gap-2.5 rounded-xl bg-amber-500/15 border border-amber-400/40 px-3.5 py-2.5 text-xs text-amber-200">
            <Clock className="w-4 h-4 text-amber-400 shrink-0" />
            <div>
              <span className="font-bold text-amber-300">Nova Missão: </span>
              liberada em{" "}
              <strong>{geral.liberaEm.toLocaleDateString("pt-BR")}</strong> às{" "}
              <strong>
                {geral.liberaEm.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
              </strong>
            </div>
          </div>
        )}
      </section>

      {/* Books Returned Section */}
      <section className="glow-card p-6 sm:p-7 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-cyan-500/20 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-400" />
              <h2 className="font-['Baloo_2'] text-2xl font-bold text-white">
                Livros devolvidos — Escolha sua Missão
              </h2>
            </div>
            <p className="text-xs text-cyan-200/80 mt-0.5">
              Cada livro lido e devolvido na biblioteca dá direito a 1 missão de 6 perguntas (100 pts por acerto).
            </p>
          </div>
          <div className="text-xs font-bold text-cyan-300 bg-cyan-950/80 px-3 py-1.5 rounded-full border border-cyan-400/30 self-start sm:self-auto">
            {livros.length} {livros.length === 1 ? "livro devolvido" : "livros devolvidos"}
          </div>
        </div>

        {livros.length === 0 ? (
          <div className="py-12 px-4 text-center space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-slate-800/80 border border-cyan-400/30 flex items-center justify-center text-3xl">
              📖
            </div>
            <h3 className="font-['Baloo_2'] text-xl font-bold text-white">
              Nenhum livro devolvido no momento
            </h3>
            <p className="max-w-md mx-auto text-xs text-slate-300">
              Você ainda não registrou a devolução de livros na biblioteca escolar. Visite a biblioteca Maria Quitéria, pegue um livro emprestado, realize a leitura e devolva para desbloquear suas missões!
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {livros.map((livro) => {
              const partidaFeita = partidas.find((p) => p.livroId === livro.id);
              const st = situacao(partidas, livro.id);

              return (
                <div
                  key={livro.id}
                  className={`flex flex-col justify-between rounded-2xl border p-4 transition-all duration-200 ${
                    st.podeJogar
                      ? "bg-slate-900/90 border-cyan-400/50 hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.2)]"
                      : partidaFeita
                      ? "bg-slate-950/60 border-emerald-500/30 opacity-85"
                      : "bg-slate-950/60 border-slate-700/50 opacity-70"
                  }`}
                >
                  <div className="flex gap-4">
                    {/* Cover */}
                    <div className="h-28 w-20 shrink-0 rounded-xl overflow-hidden bg-slate-800 shadow-md border border-cyan-500/20 flex items-center justify-center">
                      {livro.capa_url ? (
                        <img
                          src={livro.capa_url}
                          alt={livro.titulo}
                          className="h-full w-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                      ) : (
                        <span className="text-3xl">📚</span>
                      )}
                    </div>

                    {/* Book Info */}
                    <div className="flex flex-col justify-between flex-1 min-w-0">
                      <div>
                        {livro.categoria && (
                          <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-300 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-500/30">
                            {livro.categoria}
                          </span>
                        )}
                        <h4 className="font-['Baloo_2'] text-base sm:text-lg font-bold text-white line-clamp-2 mt-1 leading-snug">
                          {livro.titulo}
                        </h4>
                        <p className="text-xs text-cyan-200/70 font-medium">
                          {livro.autor}
                        </p>
                      </div>

                      {livro.descricao && (
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 italic">
                          "{livro.descricao}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Status / Action Footer */}
                  <div className="mt-4 pt-3 border-t border-cyan-500/20 flex items-center justify-between">
                    {partidaFeita ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-400">
                        <CheckCircle className="w-4 h-4 text-emerald-400" />
                        <span>Missão concluída ({partidaFeita.pontos} pts)</span>
                      </div>
                    ) : st.aguardando ? (
                      <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                        <Lock className="w-4 h-4 text-amber-400" />
                        <span>Aguarde liberação (5 dias)</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 text-xs font-bold text-cyan-300">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        <span>Missão liberada</span>
                      </div>
                    )}

                    {st.podeJogar ? (
                      <button
                        onClick={() => onSelectLivro(livro.id)}
                        className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-['Baloo_2'] font-black px-4 py-2 shadow-md transition transform active:scale-95 cursor-pointer"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        <span>Jogar Missão</span>
                      </button>
                    ) : (
                      <button
                        disabled
                        className="rounded-xl bg-slate-800 text-slate-500 text-xs font-bold px-3 py-1.5 cursor-not-allowed"
                      >
                        {partidaFeita ? "Já jogado" : "Bloqueado"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
