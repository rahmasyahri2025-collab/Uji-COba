import React, { useState } from 'react';
import { KINGDOM_6_DATA } from '../data/biologyData';
import { KingdomInfo } from '../types/biology';
import { playSound } from '../utils/soundEffects';
import {
  Crown,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  Filter,
  Microscope,
  Gamepad2,
  RefreshCw,
  Award
} from 'lucide-react';

interface Pertemuan3ViewProps {
  soundEnabled: boolean;
  onGoToTGT: () => void;
}

export const Pertemuan3View: React.FC<Pertemuan3ViewProps> = ({
  soundEnabled,
  onGoToTGT,
}) => {
  const [selectedKingdomId, setSelectedKingdomId] = useState<string>('archaea');
  const [cellFilter, setCellFilter] = useState<'all' | 'Prokariotik' | 'Eukariotik'>('all');
  const [nutritionFilter, setNutritionFilter] = useState<'all' | 'Autotrof' | 'Heterotrof'>('all');

  // Detective Quiz Mini-Game State
  const detectiveRiddles = [
    {
      id: 1,
      clue: 'Aku adalah organisme eukariotik bersel banyak yang tidak punya klorofil. Dinding selku terbuat dari zat kitin dan aku menyerap nutrisi dari substrat mati.',
      correctKingdomId: 'fungi',
      correctName: 'Kingdom Fungi (Jamur)',
    },
    {
      id: 2,
      clue: 'Aku hidup di lingkungan air mendidih kawah belerang bersuhu 95°C. Sel-ku prokariotik dan dinding selku tidak mengandung peptidoglikan.',
      correctKingdomId: 'archaea',
      correctName: 'Kingdom Archaebacteria',
    },
    {
      id: 3,
      clue: 'Aku bersel satu, memiliki flagela untuk berenang, dan memiliki kloroplas untuk fotosintesis. Para ahli memasukkanku ke kelompok eukariota sederhana.',
      correctKingdomId: 'protista',
      correctName: 'Kingdom Protista',
    },
    {
      id: 4,
      clue: 'Aku eukariotik multiseluler, sel-selku tidak memiliki dinding sel sama sekali, dan aku aktif bergerak memangsa organisme lain.',
      correctKingdomId: 'animalia',
      correctName: 'Kingdom Animalia (Hewan)',
    },
  ];

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState<number>(0);
  const [selectedGuess, setSelectedGuess] = useState<string | null>(null);
  const [quizScore, setQuizScore] = useState<number>(0);

  const activeKingdom: KingdomInfo =
    KINGDOM_6_DATA.find((k) => k.id === selectedKingdomId) || KINGDOM_6_DATA[0];

  const handleGuess = (kingdomId: string) => {
    setSelectedGuess(kingdomId);
    const riddle = detectiveRiddles[currentRiddleIndex];
    if (kingdomId === riddle.correctKingdomId) {
      playSound('correct', soundEnabled);
      setQuizScore((prev) => prev + 1);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const nextRiddle = () => {
    playSound('click', soundEnabled);
    setSelectedGuess(null);
    setCurrentRiddleIndex((prev) => (prev + 1) % detectiveRiddles.length);
  };

  const filteredKingdoms = KINGDOM_6_DATA.filter((k) => {
    if (cellFilter !== 'all' && k.tipeSel !== cellFilter) return false;
    if (nutritionFilter !== 'all') {
      if (nutritionFilter === 'Autotrof' && !k.nutrisi.includes('Autotrof')) return false;
      if (nutritionFilter === 'Heterotrof' && !k.nutrisi.includes('Heterotrof')) return false;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Session Header */}
      <section className="bg-gradient-to-r from-amber-950/50 via-slate-900 to-emerald-950 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/30">
            Pertemuan 3 dari 3
          </span>
          <span className="text-xs text-slate-400">Klasifikasi Modern Carl Woese</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Klasifikasi 6 Kingdom Makhluk Hidup
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Sistem klasifikasi 6 kingdom membagi seluruh keanekaragaman hayati ke dalam enam kelompok besar berdasarkan organisasi sel, struktur dinding sel, dan cara memperoleh nutrisi: Archaebacteria, Eubacteria, Protista, Fungi, Plantae, dan Animalia.
        </p>
      </section>

      {/* Bagian 1: Matriks Komparasi 6 Kingdom */}
      <section className="space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Microscope className="w-4 h-4" />
              <span>Materi Inti 1</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Tabel Matriks Pembeda 6 Kingdom
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Gunakan filter cepat untuk membandingkan kelompok prokariotik vs eukariotik serta cara nutrisi organisme.
            </p>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto text-xs">
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5" />
              <button
                onClick={() => setCellFilter('all')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  cellFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Semua Sel
              </button>
              <button
                onClick={() => setCellFilter('Prokariotik')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  cellFilter === 'Prokariotik' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Prokariotik
              </button>
              <button
                onClick={() => setCellFilter('Eukariotik')}
                className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                  cellFilter === 'Eukariotik' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Eukariotik
              </button>
            </div>
          </div>
        </div>

        {/* Matrix Table Responsive Scroll */}
        <div className="overflow-x-auto rounded-3xl border border-slate-800 shadow-xl bg-slate-900">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-950/80 text-slate-400 uppercase tracking-wider text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-4 px-4 font-bold">Kingdom</th>
                <th className="py-4 px-4 font-bold">Tipe Sel</th>
                <th className="py-4 px-4 font-bold">Jumlah Sel</th>
                <th className="py-4 px-4 font-bold">Dinding Sel</th>
                <th className="py-4 px-4 font-bold">Cara Nutrisi</th>
                <th className="py-4 px-4 font-bold">Contoh Ciri</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredKingdoms.map((k) => (
                <tr
                  key={k.id}
                  onClick={() => {
                    playSound('click', soundEnabled);
                    setSelectedKingdomId(k.id);
                  }}
                  className={`hover:bg-slate-800/60 cursor-pointer transition-colors ${
                    k.id === selectedKingdomId ? 'bg-amber-500/10' : ''
                  }`}
                >
                  <td className="py-3.5 px-4 font-bold text-white flex items-center gap-2">
                    <span className="text-xl">{k.contoh[0]?.gambarSymbol || '🌿'}</span>
                    <div>
                      <div className="font-extrabold text-sm text-amber-300">{k.nama}</div>
                      <div className="text-[11px] text-slate-400 italic">{k.namaLatin}</div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        k.tipeSel === 'Prokariotik'
                          ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                          : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}
                    >
                      {k.tipeSel}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{k.jumlahSel}</td>
                  <td className="py-3.5 px-4 text-slate-300 max-w-xs">{k.dindingSel}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        k.nutrisi === 'Autotrof'
                          ? 'bg-teal-500/20 text-teal-300'
                          : k.nutrisi === 'Heterotrof'
                          ? 'bg-rose-500/20 text-rose-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {k.nutrisi}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 max-w-xs truncate">
                    {k.contoh[0]?.namaUmum} ({k.contoh[0]?.namaIlmiah})
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Bagian 2: Eksplorasi Mendalam Setiap Kingdom */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Crown className="w-4 h-4" />
            <span>Materi Inti 2</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Eksplorasi Profil Lengkap 6 Kingdom
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Pilih tab kingdom di bawah untuk melihat karakteristik khas, contoh foto simbolis, dan peranan positif vs negatifnya bagi bumi.
          </p>
        </div>

        {/* Kingdom Selector Pills */}
        <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {KINGDOM_6_DATA.map((k) => {
            const isSelected = k.id === selectedKingdomId;
            return (
              <button
                key={k.id}
                onClick={() => {
                  playSound('click', soundEnabled);
                  setSelectedKingdomId(k.id);
                }}
                className={`px-4 py-2.5 rounded-2xl border font-bold text-xs sm:text-sm whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/20 ring-2 ring-amber-400/40'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800'
                }`}
              >
                <span>{k.contoh[0]?.gambarSymbol || '✨'}</span>
                <span>{k.nama}</span>
              </button>
            );
          })}
        </div>

        {/* Selected Kingdom Detail Card */}
        <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <span>{activeKingdom.namaLatin}</span>
                <span>•</span>
                <span>{activeKingdom.tipeSel}</span>
                <span>•</span>
                <span>{activeKingdom.nutrisi}</span>
              </div>
              <h3 className="text-3xl font-black text-white">
                {activeKingdom.nama}
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-xl bg-slate-950 text-slate-300 border border-slate-700 text-xs font-medium">
                Dinding Sel: {activeKingdom.dindingSel.split(' ')[0]}
              </span>
            </div>
          </div>

          {/* Ciri Khas List */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Karakteristik & Ciri Khusus:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {activeKingdom.ciriKhas.map((ciri, i) => (
                <div
                  key={i}
                  className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-start gap-2.5 leading-relaxed"
                >
                  <span className="w-5 h-5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span>{ciri}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Contoh Organisme Terkenal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Contoh Spesies Terkenal:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeKingdom.contoh.map((specimen, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl bg-slate-950 border border-slate-800/80 flex items-start gap-3.5"
                >
                  <div className="w-12 h-12 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center text-2xl shrink-0">
                    {specimen.gambarSymbol}
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-sm">
                      {specimen.namaUmum}
                    </h5>
                    <div className="text-xs text-amber-400 font-mono italic mb-1">
                      {specimen.namaIlmiah}
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {specimen.deskripsi}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Peranan Positif & Negatif */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Peranan Positif (Menguntungkan):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeKingdom.peranan.positif}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30">
              <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider mb-1.5">
                <XCircle className="w-4 h-4" />
                <span>Peranan Negatif (Merugikan/Patogen):</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                {activeKingdom.peranan.negatif}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 3: Mini Game "Detektif Hayati: Tebak Kingdom" */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Gamepad2 className="w-4 h-4" />
              <span>Mini Game Interaktif</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Detektif Hayati: Temukan Kingdom Misterius!
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm">
              Baca petunjuk karakteristik organisme misterius, lalu tebak ke kingdom mana ia tergolong.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold text-xs border border-amber-500/30 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5" />
              <span>Skor Detektif: {quizScore}</span>
            </span>
          </div>
        </div>

        {/* Current Riddle Box */}
        <div className="p-5 rounded-2xl bg-slate-950 border border-amber-500/20 space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>Teka-Teki #{currentRiddleIndex + 1} dari {detectiveRiddles.length}</span>
            <span className="text-amber-400 font-semibold">Tantangan Logika Taksonomi</span>
          </div>

          <p className="text-sm sm:text-base font-semibold text-white leading-relaxed italic">
            "{detectiveRiddles[currentRiddleIndex].clue}"
          </p>

          {/* Options Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {KINGDOM_6_DATA.map((k) => {
              const isGuessed = selectedGuess === k.id;
              const isCorrect = k.id === detectiveRiddles[currentRiddleIndex].correctKingdomId;
              let btnStyle = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

              if (selectedGuess) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-600 border-emerald-400 text-white font-bold ring-2 ring-emerald-400';
                } else if (isGuessed) {
                  btnStyle = 'bg-rose-600 border-rose-400 text-white font-bold';
                }
              }

              return (
                <button
                  key={k.id}
                  disabled={selectedGuess !== null}
                  onClick={() => handleGuess(k.id)}
                  className={`p-3 rounded-xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${btnStyle}`}
                >
                  <span>{k.contoh[0]?.gambarSymbol || '🔹'}</span>
                  <span className="truncate">{k.nama}</span>
                </button>
              );
            })}
          </div>

          {/* Feedback & Next Button */}
          {selectedGuess && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 animate-fadeIn">
              <div className="text-xs sm:text-sm">
                {selectedGuess === detectiveRiddles[currentRiddleIndex].correctKingdomId ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    Tepat sekali! Organisme ini adalah {detectiveRiddles[currentRiddleIndex].correctName}.
                  </span>
                ) : (
                  <span className="text-rose-400 font-bold flex items-center gap-1.5">
                    <XCircle className="w-4 h-4" />
                    Kurang tepat. Jawaban yang benar adalah {detectiveRiddles[currentRiddleIndex].correctName}.
                  </span>
                )}
              </div>

              <button
                onClick={nextRiddle}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Teka-Teki Berikutnya</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Big Call to Action for Teams Games Tournament "Sang King" */}
      <section className="bg-gradient-to-r from-yellow-500/20 via-amber-500/20 to-orange-500/20 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Turnamen Belajar Akbar</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Waktunya Bertarung di Turnamen Kuis "Sang King"!
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Semua materi Pertemuan 1, 2, dan 3 telah kamu pelajari. Saatnya bersaing seru bersama <strong className="text-amber-300">8 Kelompok Turnamen</strong> dalam Teams Games Tournament (TGT) "Sang King" untuk memperebutkan mahkota juara kelas!
          </p>
        </div>

        <button
          onClick={() => {
            playSound('win', soundEnabled);
            onGoToTGT();
          }}
          className="px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-slate-950 font-black text-base sm:text-lg shadow-xl shadow-yellow-500/30 flex items-center gap-3 transition-transform hover:scale-105 active:scale-100 cursor-pointer shrink-0"
        >
          <span>Masuk Turnamen "Sang King"</span>
          <ArrowRight className="w-6 h-6" />
        </button>
      </section>
    </div>
  );
};
