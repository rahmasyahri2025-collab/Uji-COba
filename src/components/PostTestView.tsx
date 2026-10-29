import React, { useState, useEffect } from 'react';
import { POST_TEST_QUESTIONS } from '../data/biologyData';
import { calculatePostTestScore, PostTestAnalysis } from '../utils/biologyLogic';
import { playSound } from '../utils/soundEffects';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Timer,
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
  ArrowRight,
  Sparkles,
  BookOpen,
  Filter
} from 'lucide-react';

interface PostTestViewProps {
  soundEnabled: boolean;
  onGoToHome: () => void;
}

export const PostTestView: React.FC<PostTestViewProps> = ({
  soundEnabled,
  onGoToHome,
}) => {
  // State for exam mode: 'ongoing' or 'result'
  const [examStatus, setExamStatus] = useState<'ongoing' | 'result'>('ongoing');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  
  // userAnswers: { [questionId]: optionIndex }
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  // flagged: { [questionId]: boolean }
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<number, boolean>>({});

  // Timer: 30 minutes = 1800 seconds
  const [timeLeft, setTimeLeft] = useState<number>(1800);
  const [isTimerActive, setIsTimerActive] = useState<boolean>(true);

  // Result state
  const [resultAnalysis, setResultAnalysis] = useState<PostTestAnalysis | null>(null);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'p1' | 'p2' | 'p3'>('all');

  // Confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (examStatus === 'ongoing' && isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleFinishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [examStatus, isTimerActive, timeLeft]);

  const currentQ = POST_TEST_QUESTIONS[currentQuestionIndex];
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (qId: number, optIndex: number) => {
    playSound('select', soundEnabled);
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optIndex,
    }));
  };

  const toggleFlag = (qId: number) => {
    playSound('click', soundEnabled);
    setFlaggedQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId],
    }));
  };

  const handleFinishExam = () => {
    playSound('win', soundEnabled);
    setIsTimerActive(false);
    const analysis = calculatePostTestScore(userAnswers, POST_TEST_QUESTIONS, 75);
    setResultAnalysis(analysis);
    setExamStatus('result');
    setShowConfirmModal(false);
  };

  const handleRetakeExam = () => {
    if (window.confirm('Mulai ulang ujian post-test dari awal?')) {
      playSound('click', soundEnabled);
      setUserAnswers({});
      setFlaggedQuestions({});
      setTimeLeft(1800);
      setIsTimerActive(true);
      setCurrentQuestionIndex(0);
      setResultAnalysis(null);
      setExamStatus('ongoing');
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 pb-16 animate-fadeIn">
      {/* Post-Test Header */}
      <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold mb-2">
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Evaluasi Akhir Komprehensif</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              Post-Test 30 Soal Klasifikasi Makhluk Hidup
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm mt-1 max-w-2xl">
              Uji pemahamanmu pada materi Pertemuan 1 (10 soal), Pertemuan 2 (10 soal), dan Pertemuan 3 (10 soal). Kriteria Ketuntasan Minimal (KKM): <strong className="text-emerald-400">75%</strong>.
            </p>
          </div>

          {examStatus === 'ongoing' && (
            <div className="flex items-center gap-3 bg-slate-950/80 px-4 py-2.5 rounded-2xl border border-slate-800 self-start sm:self-auto">
              <Timer className={`w-5 h-5 ${timeLeft < 300 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`} />
              <div>
                <span className="text-[10px] text-slate-400 block font-semibold">Sisa Waktu:</span>
                <span className={`text-lg font-mono font-black ${timeLeft < 300 ? 'text-rose-400' : 'text-white'}`}>
                  {formatTimer(timeLeft)}
                </span>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= MODE ONGOING: PENGERJAAN SOAL ================= */}
      {examStatus === 'ongoing' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Main Question Container (8 cols) */}
          <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            {/* Top Question Info */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-emerald-600 text-white font-black text-sm flex items-center justify-center shadow-md">
                  {currentQ.id}
                </span>
                <div>
                  <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
                    {currentQ.materi}
                  </span>
                  <span className="text-xs text-slate-400">{currentQ.topicDetail}</span>
                </div>
              </div>

              <button
                onClick={() => toggleFlag(currentQ.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  flaggedQuestions[currentQ.id]
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                    : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>{flaggedQuestions[currentQ.id] ? 'Ragu-Ragu' : 'Tandai Ragu'}</span>
              </button>
            </div>

            {/* Question Text */}
            <div className="text-base sm:text-lg font-semibold text-white leading-relaxed whitespace-pre-line">
              {currentQ.question}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentQ.id] === optIdx;
                return (
                  <button
                    key={optIdx}
                    onClick={() => handleSelectOption(currentQ.id, optIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition-all duration-200 flex items-start gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-600/30 text-white border-emerald-400 shadow-md ring-2 ring-emerald-400/40'
                        : 'bg-slate-950/70 hover:bg-slate-850 text-slate-200 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="leading-relaxed flex-1">{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Navigation Bottom Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              <button
                disabled={currentQuestionIndex === 0}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 text-xs sm:text-sm font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Sebelumnya</span>
              </button>

              {currentQuestionIndex < POST_TEST_QUESTIONS.length - 1 ? (
                <button
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setCurrentQuestionIndex((prev) => prev + 1);
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-md transition-colors cursor-pointer"
                >
                  <span>Selanjutnya</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowConfirmModal(true)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs sm:text-sm font-black shadow-lg shadow-amber-500/20 cursor-pointer"
                >
                  Selesaikan Post-Test ➔
                </button>
              )}
            </div>
          </div>

          {/* Question Grid Navigator (4 cols) */}
          <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white">Lembar Navigasi Soal</h3>
              <span className="text-xs text-emerald-400 font-bold">
                {answeredCount} / 30 Terjawab
              </span>
            </div>

            {/* Legend */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 px-1">
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Terjawab
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Ragu
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block" /> Kosong
              </span>
            </div>

            {/* 30 Buttons Grid */}
            <div className="grid grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
              {POST_TEST_QUESTIONS.map((q, idx) => {
                const isCurrent = idx === currentQuestionIndex;
                const isAnswered = userAnswers[q.id] !== undefined;
                const isFlagged = flaggedQuestions[q.id];

                let btnClass = 'bg-slate-950 text-slate-400 border-slate-800';
                if (isAnswered) {
                  btnClass = 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50 font-bold';
                }
                if (isFlagged) {
                  btnClass = 'bg-amber-500/30 text-amber-300 border-amber-400 font-bold';
                }
                if (isCurrent) {
                  btnClass += ' ring-2 ring-emerald-400 scale-105';
                }

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      playSound('click', soundEnabled);
                      setCurrentQuestionIndex(idx);
                    }}
                    className={`h-9 rounded-xl border text-xs font-semibold transition-all flex items-center justify-center cursor-pointer ${btnClass}`}
                  >
                    {q.id}
                  </button>
                );
              })}
            </div>

            {/* Complete Exam CTA */}
            <div className="pt-2">
              <button
                onClick={() => setShowConfirmModal(true)}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-transform active:scale-95 cursor-pointer"
              >
                Kirim Lembar Jawaban
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 text-center shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-400/30 flex items-center justify-center mx-auto text-2xl">
              ❓
            </div>
            <div>
              <h3 className="text-xl font-bold text-white mb-1">
                Kirim Lembar Jawaban Post-Test?
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                Kamu telah menjawab <strong className="text-emerald-400">{answeredCount}</strong> dari 30 soal. 
                {answeredCount < 30 && (
                  <span className="text-amber-400 block mt-1 font-semibold">
                    Peringatan: Masih ada {30 - answeredCount} soal yang belum terisi!
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                onClick={handleFinishExam}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs sm:text-sm font-black shadow-md cursor-pointer"
              >
                Ya, Selesaikan Ujian
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODE RESULT: EVALUASI & PEMBAHASAN ================= */}
      {examStatus === 'result' && resultAnalysis && (
        <div className="space-y-8 animate-fadeIn">
          {/* Result Score Card */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
            <div className="max-w-md mx-auto space-y-2">
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 flex items-center justify-center gap-1.5">
                <Award className="w-4 h-4" />
                <span>Hasil Skor Evaluasi Post-Test</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white">
                {resultAnalysis.isPassed ? 'Selamat, Kamu Tuntas! 🎉' : 'Tetap Semangat & Pelajari Lagi! 💪'}
              </h2>
            </div>

            {/* Score Wheel / Number */}
            <div className="inline-block p-6 rounded-3xl bg-slate-900/90 border-2 border-emerald-400 shadow-2xl shadow-emerald-500/20">
              <div className="text-5xl sm:text-6xl font-black text-white font-mono">
                {resultAnalysis.score}
                <span className="text-xl text-slate-400 font-sans font-bold">/100</span>
              </div>
              <span
                className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                  resultAnalysis.isPassed
                    ? 'bg-emerald-500 text-slate-950'
                    : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                }`}
              >
                {resultAnalysis.isPassed ? 'LULUS (KKM ≥ 75)' : 'BELUM TUNTAS (KKM: 75)'}
              </span>
            </div>

            {/* Breakdown Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Total Soal</span>
                <strong className="text-lg text-white font-mono font-bold">30</strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
                <span className="text-emerald-300 block mb-0.5">Jawaban Benar</span>
                <strong className="text-lg text-emerald-400 font-mono font-bold">
                  {resultAnalysis.correctCount}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-rose-950/30 border border-rose-500/30">
                <span className="text-rose-300 block mb-0.5">Jawaban Salah</span>
                <strong className="text-lg text-rose-400 font-mono font-bold">
                  {resultAnalysis.wrongCount}
                </strong>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-slate-400 block mb-0.5">Akurasi Total</span>
                <strong className="text-lg text-cyan-400 font-mono font-bold">
                  {resultAnalysis.score}%
                </strong>
              </div>
            </div>

            {/* Analysis per Meeting Session */}
            <div className="max-w-2xl mx-auto p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-3 text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Penguasaan Materi per Pertemuan:</span>
              </h4>

              <div className="space-y-2 text-xs">
                {/* P1 */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Pertemuan 1 (Ciri, Manfaat, Kunci Determinasi)</span>
                    <strong className="text-emerald-400 font-mono">
                      {resultAnalysis.topicBreakdown['Pertemuan 1'].correct}/10 (
                      {resultAnalysis.topicBreakdown['Pertemuan 1'].percentage}%)
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${resultAnalysis.topicBreakdown['Pertemuan 1'].percentage}%` }}
                    />
                  </div>
                </div>

                {/* P2 */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Pertemuan 2 (Tingkatan Takson & Binomial Nomenklatur)</span>
                    <strong className="text-teal-400 font-mono">
                      {resultAnalysis.topicBreakdown['Pertemuan 2'].correct}/10 (
                      {resultAnalysis.topicBreakdown['Pertemuan 2'].percentage}%)
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-teal-500 transition-all duration-500"
                      style={{ width: `${resultAnalysis.topicBreakdown['Pertemuan 2'].percentage}%` }}
                    />
                  </div>
                </div>

                {/* P3 */}
                <div>
                  <div className="flex justify-between text-slate-300 mb-1">
                    <span>Pertemuan 3 (Klasifikasi 6 Kingdom)</span>
                    <strong className="text-amber-400 font-mono">
                      {resultAnalysis.topicBreakdown['Pertemuan 3'].correct}/10 (
                      {resultAnalysis.topicBreakdown['Pertemuan 3'].percentage}%)
                    </strong>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-amber-500 transition-all duration-500"
                      style={{ width: `${resultAnalysis.topicBreakdown['Pertemuan 3'].percentage}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleRetakeExam}
                className="px-6 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-bold flex items-center gap-2 border border-slate-700 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-emerald-400" />
                <span>Ulangi Post-Test</span>
              </button>
              <button
                onClick={onGoToHome}
                className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs sm:text-sm font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-600/30 cursor-pointer"
              >
                <span>Kembali ke Halaman Awal</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Detailed Question by Question Review */}
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Kunci Jawaban & Pembahasan Lengkap 30 Soal
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1">
                  Pelajari analisis ilmiah setiap soal untuk memperkuat pemahaman konsep biologimu.
                </p>
              </div>

              {/* Review Filters */}
              <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto text-xs">
                <button
                  onClick={() => setReviewFilter('all')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    reviewFilter === 'all'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Semua (30)
                </button>
                <button
                  onClick={() => setReviewFilter('wrong')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    reviewFilter === 'wrong'
                      ? 'bg-rose-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Hanya yang Salah ({resultAnalysis.wrongCount})
                </button>
                <button
                  onClick={() => setReviewFilter('p1')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    reviewFilter === 'p1'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Pertemuan 1
                </button>
                <button
                  onClick={() => setReviewFilter('p2')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    reviewFilter === 'p2'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Pertemuan 2
                </button>
                <button
                  onClick={() => setReviewFilter('p3')}
                  className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                    reviewFilter === 'p3'
                      ? 'bg-teal-600 text-white'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  Pertemuan 3
                </button>
              </div>
            </div>

            {/* Questions Review List */}
            <div className="space-y-4">
              {POST_TEST_QUESTIONS.filter((q) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                if (reviewFilter === 'wrong') return !isCorrect;
                if (reviewFilter === 'p1') return q.materi === 'Pertemuan 1';
                if (reviewFilter === 'p2') return q.materi === 'Pertemuan 2';
                if (reviewFilter === 'p3') return q.materi === 'Pertemuan 3';
                return true;
              }).map((q) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;
                const isUnanswered = userAns === undefined;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border transition-all ${
                      isCorrect
                        ? 'bg-slate-950/60 border-emerald-500/30'
                        : 'bg-slate-950/90 border-rose-500/30'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded-lg bg-slate-800 text-white font-bold text-xs flex items-center justify-center">
                          {q.id}
                        </span>
                        <span className="text-xs text-slate-400 font-semibold">{q.materi}</span>
                      </div>
                      <div>
                        {isCorrect ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Benar
                          </span>
                        ) : isUnanswered ? (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-400 border border-slate-700">
                            Tidak Terjawab
                          </span>
                        ) : (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30 flex items-center gap-1">
                            <XCircle className="w-3.5 h-3.5" /> Salah
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-white mb-3 whitespace-pre-line leading-relaxed">
                      {q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs mb-3">
                      {q.options.map((opt, i) => {
                        const isKunci = i === q.correctIndex;
                        const isChosen = i === userAns;

                        let style = 'bg-slate-900 border-slate-800 text-slate-300';
                        if (isKunci) {
                          style = 'bg-emerald-950/60 border-emerald-400 text-emerald-200 font-bold';
                        } else if (isChosen && !isKunci) {
                          style = 'bg-rose-950/50 border-rose-400 text-rose-200 line-through';
                        }

                        return (
                          <div
                            key={i}
                            className={`p-2.5 rounded-xl border flex items-center gap-2 ${style}`}
                          >
                            <span className="w-5 h-5 rounded-md bg-black/20 font-bold flex items-center justify-center text-[10px] shrink-0">
                              {String.fromCharCode(65 + i)}
                            </span>
                            <span className="truncate">{opt}</span>
                          </div>
                        );
                      })}
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                      <strong className="text-emerald-400 font-bold block mb-0.5">
                        💡 Pembahasan:
                      </strong>
                      {q.explanation}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
