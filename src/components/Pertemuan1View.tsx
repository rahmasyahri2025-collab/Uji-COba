import React, { useState } from 'react';
import { 
  CIRI_MAKHLUK_HIDUP_DATA, 
  MANFAAT_KLASIFIKASI, 
  DICHOTOMOUS_KEY_DATABASE, 
  TARGET_ORGANISMS_EXPLORER 
} from '../data/biologyData';
import { traceDichotomousKey } from '../utils/biologyLogic';
import { playSound } from '../utils/soundEffects';
import {
  Wind,
  Apple,
  Activity,
  Zap,
  TrendingUp,
  Heart,
  Droplet,
  Shield,
  HelpCircle,
  CheckCircle,
  RotateCcw,
  GitFork,
  ArrowRight,
  BookOpen,
  Sparkles,
  ChevronRight
} from 'lucide-react';

interface Pertemuan1ViewProps {
  soundEnabled: boolean;
  onNextSession: () => void;
}

const iconMap: Record<string, React.ElementType> = {
  Wind,
  Apple,
  Activity,
  Zap,
  TrendingUp,
  Heart,
  Droplet,
  Shield,
};

export const Pertemuan1View: React.FC<Pertemuan1ViewProps> = ({
  soundEnabled,
  onNextSession,
}) => {
  // Active selected ciri for detail inspection
  const [selectedCiriId, setSelectedCiriId] = useState<string>('bernapas');
  const [openCriticalCiri, setOpenCriticalCiri] = useState<Record<string, boolean>>({});

  // Dichotomous key simulator state
  const [selectedChoices, setSelectedChoices] = useState<string[]>([]);
  const [targetOrganism, setTargetOrganism] = useState<string>(TARGET_ORGANISMS_EXPLORER[0].name);

  const keyResult = traceDichotomousKey(selectedChoices, DICHOTOMOUS_KEY_DATABASE);

  const handleStepChoice = (code: string) => {
    playSound('select', soundEnabled);
    const newChoices = [...selectedChoices, code];
    setSelectedChoices(newChoices);
    const res = traceDichotomousKey(newChoices, DICHOTOMOUS_KEY_DATABASE);
    if (res.isComplete) {
      playSound('correct', soundEnabled);
    }
  };

  const handleResetKey = () => {
    playSound('click', soundEnabled);
    setSelectedChoices([]);
  };

  const activeCiri = CIRI_MAKHLUK_HIDUP_DATA.find((c) => c.id === selectedCiriId) || CIRI_MAKHLUK_HIDUP_DATA[0];
  const ActiveIcon = iconMap[activeCiri.icon] || Activity;

  // Find target organism details
  const targetObj = TARGET_ORGANISMS_EXPLORER.find((t) => t.name === targetOrganism);

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Session Header */}
      <section className="bg-gradient-to-r from-emerald-900/60 via-slate-900 to-teal-950 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
            Pertemuan 1 dari 3
          </span>
          <span className="text-xs text-slate-400">Dasar-Dasar Klasifikasi Hayati</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Ciri Makhluk Hidup, Manfaat Klasifikasi & Kunci Determinasi
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Sebelum mengelompokkan makhluk hidup, kita harus memahami apa saja ciri mendasar yang membedakan benda hidup dan tak hidup, apa manfaat pengelompokan tersebut, dan bagaimana cara kerja kunci determinasi (kunci dikotomi) untuk mengidentifikasi organisme.
        </p>
      </section>

      {/* Bagian 1: 8 Ciri-Ciri Makhluk Hidup */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Materi Inti 1</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              8 Karakteristik Utama Ciri Makhluk Hidup
            </h2>
            <p className="text-slate-400 text-sm">
              Klik setiap kartu ciri untuk melihat penjelasan mendalam, contoh kontekstual, dan refleksi pemikiran kritis.
            </p>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-300 border border-slate-700 font-medium self-start sm:self-auto">
            Terpilih: {activeCiri.nama}
          </span>
        </div>

        {/* 8 Ciri Interactive Pills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {CIRI_MAKHLUK_HIDUP_DATA.map((item) => {
            const ItemIcon = iconMap[item.icon] || Activity;
            const isSelected = item.id === selectedCiriId;
            return (
              <button
                key={item.id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setSelectedCiriId(item.id);
                }}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 flex items-center gap-3 cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-300/40'
                    : 'bg-slate-900 hover:bg-slate-800/80 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                    isSelected ? 'bg-black/20 text-white' : 'bg-slate-800 text-emerald-400'
                  }`}
                >
                  <ItemIcon className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs sm:text-sm font-bold truncate">{item.nama.split(' ')[0]}</div>
                  <div className={`text-[10px] truncate ${isSelected ? 'text-emerald-100' : 'text-slate-500'}`}>
                    {item.nama.includes('(') ? item.nama.match(/\((.*?)\)/)?.[0] : 'Karakteristik'}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Ciri Detailed Showcase Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 text-white flex items-center justify-center shadow-lg shadow-emerald-500/20 shrink-0">
              <ActiveIcon className="w-8 h-8" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Ciri Kehidupan Terverifikasi
                </span>
                <h3 className="text-2xl font-black text-white mt-0.5">
                  {activeCiri.nama}
                </h3>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeCiri.deskripsi}
              </p>

              <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800">
                <div className="text-xs font-bold text-teal-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4" />
                  <span>Contoh Nyata di Alam:</span>
                </div>
                <p className="text-sm text-slate-200">
                  {activeCiri.contoh}
                </p>
              </div>

              {/* Critical Thinking Accordion */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    playSound('select', soundEnabled);
                    setOpenCriticalCiri((prev) => ({
                      ...prev,
                      [activeCiri.id]: !prev[activeCiri.id],
                    }));
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Uji Nalar Kritis: {activeCiri.pertanyaanKritis}</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 transition-transform duration-200 ${
                      openCriticalCiri[activeCiri.id] ? 'rotate-90' : ''
                    }`}
                  />
                </button>

                {openCriticalCiri[activeCiri.id] && (
                  <div className="mt-2.5 p-4 rounded-2xl bg-slate-950 border border-amber-500/20 text-xs sm:text-sm text-slate-200 leading-relaxed animate-fadeIn">
                    <strong className="text-amber-400 font-bold block mb-1">
                      💡 Jawaban & Analisis Ilmiah:
                    </strong>
                    {activeCiri.jawabanKritis}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 2: Manfaat Klasifikasi Makhluk Hidup */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <BookOpen className="w-4 h-4" />
            <span>Materi Inti 2</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            4 Manfaat Klasifikasi Makhluk Hidup
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Klasifikasi bukan sekadar memberi nama label, melainkan memiliki dampak vital dalam kehidupan sehari-hari, riset obat, pertanian, dan konservasi alam.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {MANFAAT_KLASIFIKASI.map((item) => (
            <div
              key={item.nomor}
              className="bg-slate-900 border border-slate-800 hover:border-emerald-500/40 rounded-3xl p-6 transition-all duration-200 flex flex-col justify-between group shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-black text-sm flex items-center justify-center">
                    {item.nomor}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Tujuan Ilmiah</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {item.judul}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-4">
                  {item.detail}
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs text-slate-400">
                <span className="text-emerald-400 font-semibold block mb-0.5">Contoh Nyata:</span>
                {item.ilustrasi}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bagian 3: Laboratorium Kunci Determinasi (Kunci Dikotomi) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <GitFork className="w-4 h-4" />
              <span>Materi Inti 3 (Praktik Laboratorium)</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Simulator Kunci Determinasi (Kunci Dikotomi)
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Kunci dikotomi terdiri atas pasangan kuplet (1a vs 1b) yang berlawanan. Pilih jalur ciri hingga nama organisme berhasil diidentifikasi!
            </p>
          </div>

          <button
            onClick={handleResetKey}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-2 border border-slate-700 self-start sm:self-auto cursor-pointer"
          >
            <RotateCcw className="w-4 h-4 text-emerald-400" />
            <span>Reset Kunci Determinasi</span>
          </button>
        </div>

        {/* Target Organism Selector */}
        <div className="bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
            Pilih Target Organisme yang Ingin Diidentifikasi:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {TARGET_ORGANISMS_EXPLORER.map((target) => {
              const isSelected = target.name === targetOrganism;
              return (
                <button
                  key={target.name}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setTargetOrganism(target.name);
                    setSelectedChoices([]);
                  }}
                  className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-white font-bold ring-1 ring-emerald-400'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xl mb-1">{target.symbol}</div>
                  <div className="text-xs font-semibold truncate">{target.name.split(' ')[0]}</div>
                  <div className="text-[10px] text-slate-400 truncate">{target.kategori.split(' - ')[1]}</div>
                </button>
              );
            })}
          </div>

          {targetObj && (
            <div className="mt-3 p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between text-xs text-emerald-300">
              <div>
                <strong>Petunjuk Organisme Target:</strong> {targetObj.petunjuk}
              </div>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-200 font-mono text-[10px]">
                Target: {targetObj.kunciJawaban.join(' ➔ ')}
              </span>
            </div>
          )}
        </div>

        {/* Current Active Step Interactive Tree */}
        <div className="space-y-4">
          {/* Breadcrumb Path */}
          <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800 text-xs">
            <span className="text-slate-500 font-semibold">Jejak Langkah Kunci:</span>
            {selectedChoices.length === 0 ? (
              <span className="text-slate-400 italic">Belum ada pilihan (Mulai dari nomor 1)</span>
            ) : (
              selectedChoices.map((code, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600/30 border border-emerald-500/40 text-emerald-300 font-mono font-bold flex items-center gap-1"
                >
                  <span>{code}</span>
                  {idx < selectedChoices.length - 1 && <span className="text-slate-500">➔</span>}
                </span>
              ))
            )}
          </div>

          {/* Stepper Choices */}
          {!keyResult.isComplete && keyResult.currentStepId && DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId] && (
            <div className="p-6 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-4">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-black">
                  {keyResult.currentStepId}
                </span>
                <span>Pilihlah salah satu karakteristik yang sesuai:</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Option A */}
                <button
                  onClick={() => handleStepChoice(DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].codeA)}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/60 text-left transition-all duration-200 group flex items-start gap-3 cursor-pointer shadow-md"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    {DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].codeA}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white leading-relaxed">
                      {DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].textA}
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block flex items-center gap-1">
                      Menuju: <strong className="text-emerald-400">{DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].targetA}</strong>
                    </span>
                  </div>
                </button>

                {/* Option B */}
                <button
                  onClick={() => handleStepChoice(DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].codeB)}
                  className="p-4 rounded-2xl bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-emerald-500/60 text-left transition-all duration-200 group flex items-start gap-3 cursor-pointer shadow-md"
                >
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-300 font-mono font-bold text-xs group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    {DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].codeB}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-200 group-hover:text-white leading-relaxed">
                      {DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].textB}
                    </p>
                    <span className="text-xs text-slate-400 mt-2 block flex items-center gap-1">
                      Menuju: <strong className="text-emerald-400">{DICHOTOMOUS_KEY_DATABASE[keyResult.currentStepId!].targetB}</strong>
                    </span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Finished Outcome Display */}
          {keyResult.isComplete && (
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-emerald-950/60 to-slate-950 border-2 border-emerald-400/50 text-center space-y-4 animate-scaleUp">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
                🎉
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                  Organisme Berhasil Dikenali Melalui Kunci Determinasi!
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-1">
                  {keyResult.finalOrganism}
                </h3>
              </div>

              <div className="max-w-md mx-auto p-3 rounded-2xl bg-slate-900/80 border border-emerald-500/30 text-xs text-slate-300">
                <span>Rangkaian Kunci Determinasi Resmi: </span>
                <strong className="text-emerald-400 font-mono text-sm ml-1">
                  {selectedChoices.join(' - ')}
                </strong>
              </div>

              {keyResult.finalOrganism === targetOrganism ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-semibold max-w-sm mx-auto">
                  🌟 Luar biasa! Kamu berhasil menemukan organisme target yang kamu pilih!
                </div>
              ) : (
                <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 text-xs font-medium max-w-sm mx-auto">
                  💡 Kamu menemukan spesies {keyResult.finalOrganism}. Coba reset untuk mengidentifikasi target {targetOrganism}!
                </div>
              )}

              <button
                onClick={handleResetKey}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 cursor-pointer"
              >
                Uji Spesimen Lainnya
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer Navigation Next Session */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400">Materi Selesai: Pertemuan 1</span>
          <h4 className="text-lg font-bold text-white">
            Lanjut ke Pertemuan 2: Tingkatan Takson & Binomial Nomenklatur
          </h4>
        </div>
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onNextSession();
          }}
          className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
        >
          <span>Masuk Pertemuan 2</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
