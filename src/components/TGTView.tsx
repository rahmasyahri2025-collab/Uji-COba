import React, { useState, useEffect } from 'react';
import { INITIAL_TGT_TEAMS, TGT_QUESTIONS_DATA } from '../data/biologyData';
import { TGTQuestion, TGTTeam } from '../types/biology';
import { awardTGTPoints, rankTGTTeams } from '../utils/biologyLogic';
import { playSound } from '../utils/soundEffects';
import {
  Trophy,
  Crown,
  Timer,
  Users,
  Award,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Play,
  Pause,
  ArrowRight,
  Edit2,
  Zap,
  HelpCircle,
  FileCheck2
} from 'lucide-react';

interface TGTViewProps {
  soundEnabled: boolean;
  onGoToPostTest: () => void;
}

export const TGTView: React.FC<TGTViewProps> = ({
  soundEnabled,
  onGoToPostTest,
}) => {
  // 8 Teams State
  const [teams, setTeams] = useState<TGTTeam[]>(() => {
    const saved = localStorage.getItem('bioklasika_tgt_teams');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_TGT_TEAMS;
      }
    }
    return INITIAL_TGT_TEAMS;
  });

  // Track answered questions: { questionId: { teamIdWon: number, isPassed: boolean } }
  const [answeredCards, setAnsweredCards] = useState<Record<number, { teamIdWon: number }>>(() => {
    const saved = localStorage.getItem('bioklasika_tgt_answered');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return {};
      }
    }
    return {};
  });

  // Active playing turn state
  const [activeTeamId, setActiveTeamId] = useState<number>(1);
  const [selectedQuestion, setSelectedQuestion] = useState<TGTQuestion | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);

  // Turn Timer
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  // Edit team modal
  const [editingTeam, setEditingTeam] = useState<TGTTeam | null>(null);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('bioklasika_tgt_teams', JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem('bioklasika_tgt_answered', JSON.stringify(answeredCards));
  }, [answeredCards]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            playSound('wrong', soundEnabled);
            setIsTimerRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isTimerRunning, timerSeconds, soundEnabled]);

  const rankedTeams = rankTGTTeams(teams);
  const currentLeader = rankedTeams[0];
  const activeTeam = teams.find((t) => t.id === activeTeamId) || teams[0];

  const handleOpenQuestion = (question: TGTQuestion) => {
    playSound('click', soundEnabled);
    setSelectedQuestion(question);
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    setShowHint(false);
    setTimerSeconds(45);
    setIsTimerRunning(true);
  };

  const handleAnswerSubmit = (optionIndex: number) => {
    if (!selectedQuestion) return;
    setSelectedOptionIndex(optionIndex);
    setShowExplanation(true);
    setIsTimerRunning(false);

    const isCorrect = optionIndex === selectedQuestion.correctIndex;
    if (isCorrect) {
      playSound('win', soundEnabled);
      setTeams((prev) => awardTGTPoints(prev, activeTeamId, selectedQuestion.points, true));
      setAnsweredCards((prev) => ({
        ...prev,
        [selectedQuestion.id]: { teamIdWon: activeTeamId },
      }));
    } else {
      playSound('wrong', soundEnabled);
      setTeams((prev) => awardTGTPoints(prev, activeTeamId, selectedQuestion.points, false));
    }
  };

  const handleRebuttalAward = (targetTeamId: number) => {
    if (!selectedQuestion) return;
    playSound('correct', soundEnabled);
    setTeams((prev) => awardTGTPoints(prev, targetTeamId, selectedQuestion.points, true));
    setAnsweredCards((prev) => ({
      ...prev,
      [selectedQuestion.id]: { teamIdWon: targetTeamId },
    }));
    setShowExplanation(true);
  };

  const handleNextTurn = () => {
    playSound('click', soundEnabled);
    setSelectedQuestion(null);
    setSelectedOptionIndex(null);
    setShowExplanation(false);
    // Cycle to next team (1 -> 2 -> ... -> 8 -> 1)
    setActiveTeamId((prev) => (prev % 8) + 1);
  };

  const handleResetTournament = () => {
    if (window.confirm('Apakah kamu yakin ingin mereset skor dan turnamen 8 kelompok?')) {
      playSound('select', soundEnabled);
      setTeams(INITIAL_TGT_TEAMS);
      setAnsweredCards({});
      setSelectedQuestion(null);
      setActiveTeamId(1);
      localStorage.removeItem('bioklasika_tgt_teams');
      localStorage.removeItem('bioklasika_tgt_answered');
    }
  };

  const handleSaveTeamEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTeam) return;
    playSound('correct', soundEnabled);
    setTeams((prev) => prev.map((t) => (t.id === editingTeam.id ? editingTeam : t)));
    setEditingTeam(null);
  };

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Tournament Header */}
      <section className="bg-gradient-to-r from-yellow-950/60 via-slate-900 to-amber-950/70 border-2 border-yellow-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/20 border border-yellow-400/40 text-yellow-300 text-xs font-black uppercase tracking-wider mb-3">
              <Crown className="w-4 h-4 text-yellow-400" />
              <span>Turnamen Kuis Kelompok Kooperatif</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center gap-3">
              Kuis TGT "Sang King"
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mt-2 leading-relaxed">
              Teams Games Tournament (TGT) untuk <strong className="text-yellow-400">8 Kelompok</strong>. 
              Pilih kartu tantangan, kumpulkan poin sebanyak-banyaknya, dan rebut tahta tertinggi sebagai <strong>"Sang King"</strong> Klasifikasi Makhluk Hidup!
            </p>
          </div>

          {/* Current King Spotlight */}
          <div className="bg-slate-950/80 border-2 border-yellow-400/50 rounded-3xl p-4 sm:p-6 text-center shadow-xl shrink-0">
            <div className="text-xs font-extrabold uppercase tracking-widest text-yellow-400 flex items-center justify-center gap-1.5 mb-1">
              <Crown className="w-4 h-4" />
              <span>Pemegang Mahkota Saat Ini</span>
            </div>
            <div className="text-3xl sm:text-4xl my-1">{currentLeader.badge}</div>
            <div className="text-lg sm:text-xl font-black text-white">{currentLeader.name}</div>
            <div className="text-2xl font-black text-yellow-400 font-mono mt-1">
              {currentLeader.score} <span className="text-xs font-semibold text-slate-400">Poin</span>
            </div>
            {currentLeader.streak >= 2 && (
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                🔥 {currentLeader.streak}x Kemenangan Beruntun!
              </span>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 mt-6 pt-6 border-t border-yellow-500/20 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">Giliran Menjawab Saat Ini:</span>
            <span className="px-3 py-1 rounded-xl bg-yellow-500/20 text-yellow-300 font-extrabold border border-yellow-500/40">
              {activeTeam.badge} {activeTeam.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetTournament}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-rose-400 border border-slate-800 flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Turnamen</span>
            </button>
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                onGoToPostTest();
              }}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span>Ke Post-Test 30 Soal</span>
            </button>
          </div>
        </div>
      </section>

      {/* 8 Kelompok Grid (Overview & Edit) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-yellow-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Papan 8 Kelompok Turnamen
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Klik tombol tim untuk memilih tim yang giliran bermain, atau klik ikon pensil untuk ubah nama anggota.
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {teams.map((team) => {
            const isActive = team.id === activeTeamId;
            const rank = rankedTeams.findIndex((r) => r.id === team.id) + 1;
            return (
              <div
                key={team.id}
                className={`p-4 rounded-3xl border transition-all duration-200 relative flex flex-col justify-between ${
                  isActive
                    ? 'bg-yellow-950/40 border-yellow-400 shadow-xl shadow-yellow-500/10 ring-2 ring-yellow-400/50'
                    : 'bg-slate-900/90 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Top Badge: Rank & Edit */}
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                      rank === 1
                        ? 'bg-yellow-400 text-slate-950'
                        : rank === 2
                        ? 'bg-slate-300 text-slate-950'
                        : rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{rank}
                  </span>
                  <button
                    onClick={() => setEditingTeam(team)}
                    className="p-1 rounded-lg text-slate-500 hover:text-slate-200 hover:bg-slate-800"
                    title="Ubah Nama Kelompok & Anggota"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Team Info */}
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setActiveTeamId(team.id);
                  }}
                  className="text-left w-full cursor-pointer"
                >
                  <div className="text-2xl mb-1">{team.badge}</div>
                  <h3 className="text-xs sm:text-sm font-bold text-white truncate">
                    {team.name}
                  </h3>
                  <p className="text-[10px] text-slate-400 truncate mb-2">
                    {team.members}
                  </p>

                  <div className="flex items-baseline justify-between border-t border-slate-800/80 pt-2">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold">Skor:</span>
                    <span className="text-base sm:text-lg font-black text-yellow-400 font-mono">
                      {team.score}
                    </span>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Turnamen Meja: 16 Kartu Soal Berpoin */}
      <section className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-yellow-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Trophy className="w-4 h-4" />
              <span>Tournament Table (Meja Pertandingan)</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Papan Kartu Tantangan Soal
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Pilih kartu soal untuk dimainkan oleh <strong>{activeTeam.name}</strong>. Poin mudah (100 pt), sedang (200 pt), dan HOTS (300 pt).
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
            <span className="text-slate-400">Total Soal Terjawab:</span>
            <span className="px-3 py-1 rounded-xl bg-slate-950 font-bold text-emerald-400 border border-slate-800">
              {Object.keys(answeredCards).length} / {TGT_QUESTIONS_DATA.length}
            </span>
          </div>
        </div>

        {/* 16 Questions Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {TGT_QUESTIONS_DATA.map((q) => {
            const answerState = answeredCards[q.id];
            const isAnswered = !!answerState;
            const winningTeam = answerState ? teams.find((t) => t.id === answerState.teamIdWon) : null;

            return (
              <div
                key={q.id}
                className={`rounded-2xl border transition-all duration-200 p-4 flex flex-col justify-between ${
                  isAnswered
                    ? 'bg-slate-950/60 border-slate-800 opacity-75'
                    : 'bg-slate-900 hover:bg-slate-850 border-slate-700/80 hover:border-yellow-400 shadow-md hover:shadow-yellow-500/10 cursor-pointer'
                }`}
                onClick={() => {
                  if (!isAnswered) {
                    handleOpenQuestion(q);
                  }
                }}
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                      #{q.id}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                        q.points === 100
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : q.points === 200
                          ? 'bg-cyan-500/20 text-cyan-300'
                          : 'bg-amber-500/20 text-amber-300 font-extrabold'
                      }`}
                    >
                      +{q.points} Poin
                    </span>
                  </div>

                  <div className="text-xs font-semibold text-slate-400 mb-1">{q.category}</div>
                  <h4 className="text-xs sm:text-sm font-bold text-white line-clamp-2">
                    {q.question}
                  </h4>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-800/80">
                  {isAnswered ? (
                    <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span className="truncate">Dimenangkan: {winningTeam?.name.split(' ')[1] || 'Tim'}</span>
                    </div>
                  ) : (
                    <button
                      className="w-full py-1.5 rounded-lg bg-yellow-500/20 hover:bg-yellow-500 text-yellow-300 hover:text-slate-950 font-bold text-xs transition-colors flex items-center justify-center gap-1"
                    >
                      <span>Buka Soal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Question Modal / Stage */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border-2 border-yellow-400/50 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Header: Turn & Timer */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{activeTeam.badge}</span>
                <div>
                  <div className="text-xs text-slate-400">Giliran Menjawab:</div>
                  <strong className="text-base text-yellow-400 font-black">{activeTeam.name}</strong>
                </div>
              </div>

              {/* Timer Bar */}
              <div className="flex items-center gap-3 bg-slate-950 px-4 py-2 rounded-2xl border border-slate-800">
                <Timer className={`w-5 h-5 ${timerSeconds <= 10 ? 'text-rose-500 animate-pulse' : 'text-yellow-400'}`} />
                <span className={`text-xl font-mono font-black ${timerSeconds <= 10 ? 'text-rose-400' : 'text-white'}`}>
                  {timerSeconds}s
                </span>
                <button
                  onClick={() => setIsTimerRunning((prev) => !prev)}
                  className="p-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300"
                  title="Pause / Resume Timer"
                >
                  {isTimerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Question Details */}
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span>Soal #{selectedQuestion.id} • {selectedQuestion.category}</span>
                <span className="font-bold text-yellow-400">Nilai: +{selectedQuestion.points} Poin</span>
              </div>
              <h3 className="text-lg sm:text-xl font-extrabold text-white leading-relaxed">
                {selectedQuestion.question}
              </h3>
            </div>

            {/* Hint Box */}
            {showHint ? (
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Petunjuk Rahasia:</strong> {selectedQuestion.hint}
                </span>
              </div>
            ) : (
              <button
                onClick={() => {
                  playSound('select', soundEnabled);
                  setShowHint(true);
                }}
                className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold cursor-pointer"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Butuh Petunjuk / Bantuan?</span>
              </button>
            )}

            {/* Multiple Choice Options */}
            <div className="space-y-2.5">
              {selectedQuestion.options.map((opt, idx) => {
                const isSelected = selectedOptionIndex === idx;
                const isCorrect = idx === selectedQuestion.correctIndex;

                let btnStyle = 'bg-slate-950/80 hover:bg-slate-800 border-slate-800 text-slate-200';
                if (showExplanation) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-300';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-600 border-rose-400 text-white font-bold';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={showExplanation}
                    onClick={() => handleAnswerSubmit(idx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-lg bg-black/20 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>
                    {showExplanation && isCorrect && <CheckCircle2 className="w-5 h-5 text-white shrink-0" />}
                    {showExplanation && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-white shrink-0" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Rebuttal System */}
            {showExplanation && (
              <div className="space-y-4 pt-3 border-t border-slate-800 animate-fadeIn">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs sm:text-sm text-slate-300">
                  <strong className="text-yellow-400 block mb-1">💡 Pembahasan Kunci Jawaban:</strong>
                  {selectedQuestion.explanation}
                </div>

                {/* If active team was wrong, allow other teams to steal! */}
                {selectedOptionIndex !== selectedQuestion.correctIndex && (
                  <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/30">
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block mb-2">
                      ⚡ Sesi Rebutan! Siapa Kelompok yang Berhasil Merebut & Menjawab Benar?
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {teams
                        .filter((t) => t.id !== activeTeamId)
                        .map((team) => (
                          <button
                            key={team.id}
                            onClick={() => handleRebuttalAward(team.id)}
                            className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-xs font-bold border border-slate-800 transition-colors cursor-pointer"
                          >
                            {team.badge} {team.name.split(' ')[1]}
                          </button>
                        ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-end gap-3">
                  <button
                    onClick={handleNextTurn}
                    className="px-6 py-3 rounded-2xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 font-black text-sm shadow-lg shadow-yellow-500/20 flex items-center gap-2 cursor-pointer"
                  >
                    <span>Lanjut ke Giliran Berikutnya</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Team Modal */}
      {editingTeam && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <form
            onSubmit={handleSaveTeamEdit}
            className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl"
          >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Edit2 className="w-4 h-4 text-yellow-400" />
              <span>Edit Nama & Anggota Kelompok #{editingTeam.id}</span>
            </h3>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Nama Kelompok:</label>
              <input
                type="text"
                value={editingTeam.name}
                onChange={(e) => setEditingTeam({ ...editingTeam, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Maskot / Avatar Emoji:</label>
              <input
                type="text"
                value={editingTeam.badge}
                onChange={(e) => setEditingTeam({ ...editingTeam, badge: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1">Nama Anggota & Ketua:</label>
              <textarea
                value={editingTeam.members}
                onChange={(e) => setEditingTeam({ ...editingTeam, members: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setEditingTeam(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-slate-950 text-xs font-black"
              >
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Podium Kejuaraan Sang King */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl text-center space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400 flex items-center justify-center gap-1.5 mb-1">
            <Award className="w-4 h-4" />
            <span>Papan Kehormatan Turnamen</span>
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Podium Juara "Sang King" Kelas
          </h2>
        </div>

        {/* 3 Top Podiums */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 max-w-xl mx-auto items-end pt-6">
          {/* Juara 2 (Perak) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2">
            <span className="text-2xl">🥈</span>
            <div className="text-2xl">{rankedTeams[1]?.badge || '🥈'}</div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 truncate">{rankedTeams[1]?.name}</h4>
            <span className="text-sm sm:text-base font-black text-slate-300 font-mono block">
              {rankedTeams[1]?.score} pt
            </span>
            <div className="h-16 bg-slate-800 rounded-t-xl flex items-center justify-center text-xs font-bold text-slate-400">
              Juara 2
            </div>
          </div>

          {/* Juara 1 (Emas - Mahkota Sang King) */}
          <div className="p-4 rounded-2xl bg-yellow-950/50 border-2 border-yellow-400 text-center space-y-2 shadow-2xl shadow-yellow-500/20 transform -translate-y-4">
            <span className="text-3xl">👑</span>
            <div className="text-4xl">{rankedTeams[0]?.badge || '🦁'}</div>
            <h4 className="text-sm sm:text-base font-black text-yellow-300 truncate">{rankedTeams[0]?.name}</h4>
            <span className="text-lg sm:text-xl font-black text-yellow-400 font-mono block">
              {rankedTeams[0]?.score} pt
            </span>
            <div className="h-24 bg-gradient-to-t from-yellow-600 to-yellow-500 rounded-t-xl flex flex-col items-center justify-center text-xs font-black text-slate-950">
              <span>SANG KING</span>
              <span className="text-[10px] font-bold">Juara 1</span>
            </div>
          </div>

          {/* Juara 3 (Perunggu) */}
          <div className="p-4 rounded-2xl bg-slate-900 border border-slate-700 text-center space-y-2">
            <span className="text-2xl">🥉</span>
            <div className="text-2xl">{rankedTeams[2]?.badge || '🥉'}</div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-200 truncate">{rankedTeams[2]?.name}</h4>
            <span className="text-sm sm:text-base font-black text-amber-600 font-mono block">
              {rankedTeams[2]?.score} pt
            </span>
            <div className="h-12 bg-slate-800 rounded-t-xl flex items-center justify-center text-xs font-bold text-slate-400">
              Juara 3
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
