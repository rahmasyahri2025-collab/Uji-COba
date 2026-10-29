import React, { useState } from 'react';
import { 
  TAKSON_LEVELS_DATA, 
  BINOMIAL_RULES, 
  BINOMIAL_PRACTICE_ITEMS 
} from '../data/biologyData';
import { validateBinomialNomenclature, BinomialValidationResult } from '../utils/biologyLogic';
import { playSound } from '../utils/soundEffects';
import {
  Layers,
  Sparkles,
  ArrowRight,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Edit3,
  Dna,
  Users,
  ChevronDown
} from 'lucide-react';

interface Pertemuan2ViewProps {
  soundEnabled: boolean;
  onNextSession: () => void;
}

export const Pertemuan2View: React.FC<Pertemuan2ViewProps> = ({
  soundEnabled,
  onNextSession,
}) => {
  // Takson selected level
  const [selectedTaksonIndex, setSelectedTaksonIndex] = useState<number>(0);
  const [activeMnemonic, setActiveMnemonic] = useState<'id' | 'en'>('id');

  // Binomial validator interactive state
  const [inputName, setInputName] = useState<string>('Panthera tigris');
  const [validationResult, setValidationResult] = useState<BinomialValidationResult>(
    validateBinomialNomenclature('Panthera tigris')
  );

  const handleValidate = (name: string) => {
    setInputName(name);
    const res = validateBinomialNomenclature(name);
    setValidationResult(res);
    if (res.isValid) {
      playSound('correct', soundEnabled);
    } else {
      playSound('wrong', soundEnabled);
    }
  };

  const handlePracticeSelect = (sampleSalah: string) => {
    playSound('select', soundEnabled);
    handleValidate(sampleSalah);
  };

  const currentTakson = TAKSON_LEVELS_DATA[selectedTaksonIndex];

  return (
    <div className="space-y-12 pb-16 animate-fadeIn">
      {/* Session Header */}
      <section className="bg-gradient-to-r from-teal-900/60 via-slate-900 to-emerald-950 border border-teal-500/30 rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-400/30">
            Pertemuan 2 dari 3
          </span>
          <span className="text-xs text-slate-400">Hierarki & Tata Nama Ilmiah</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-3">
          Tingkatan Takson & Binomial Nomenklatur
        </h1>
        <p className="text-slate-300 text-sm sm:text-base max-w-3xl leading-relaxed">
          Bagaimana cara ilmuwan mengurutkan organisme dari kelompok terluas hingga jenis terkecil? 
          Pelajari 7 hierarki takson, jembatan keledai menghafal, dan aturan baku penulisan nama ganda (*Binomial Nomenclature*) Carolus Linnaeus.
        </p>
      </section>

      {/* Bagian 1: Tingkatan Takson */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Layers className="w-4 h-4" />
            <span>Materi Inti 1</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            7 Tingkatan Taksonomi (Hierarki Klasifikasi)
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Makin ke bawah: jumlah anggota makin sedikit, persamaan ciri makin banyak, dan hubungan kekerabatan makin dekat.
          </p>
        </div>

        {/* Mnemonic Fun Card */}
        <div className="bg-gradient-to-r from-amber-950/30 via-slate-900 to-amber-950/20 border border-amber-500/30 rounded-3xl p-5 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Tips Jitu Menghafal Urutan (Jembatan Keledai)</span>
              </span>
              <h3 className="text-lg font-black text-white">
                {activeMnemonic === 'id' ? (
                  <span>
                    " <strong className="text-amber-300">K</strong>ucing{' '}
                    <strong className="text-amber-300">P</strong>aling{' '}
                    <strong className="text-amber-300">C</strong>antik{' '}
                    <strong className="text-amber-300">O</strong>rangnya{' '}
                    <strong className="text-amber-300">F</strong>eminin{' '}
                    <strong className="text-amber-300">G</strong>emar{' '}
                    <strong className="text-amber-300">S</strong>enyum "
                  </span>
                ) : (
                  <span>
                    " <strong className="text-amber-300">K</strong>ing{' '}
                    <strong className="text-amber-300">P</strong>hilip{' '}
                    <strong className="text-amber-300">C</strong>ame{' '}
                    <strong className="text-amber-300">O</strong>ver{' '}
                    <strong className="text-amber-300">F</strong>or{' '}
                    <strong className="text-amber-300">G</strong>ood{' '}
                    <strong className="text-amber-300">S</strong>oup "
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                K = Kingdom, P = Phylum/Divisi, C = Classis, O = Ordo, F = Familia, G = Genus, S = Species
              </p>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setActiveMnemonic('id');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMnemonic === 'id'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Versi Indonesia
              </button>
              <button
                onClick={() => {
                  playSound('click', soundEnabled);
                  setActiveMnemonic('en');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeMnemonic === 'en'
                    ? 'bg-amber-500 text-slate-950 shadow-md'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Versi Internasional
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Takson Pyramid & Comparator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Vertical Stepper Pyramid (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-xl space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-2 mb-2">
              <span>Hierarki Takson</span>
              <span>Arah Spesifik ⬇️</span>
            </div>

            {TAKSON_LEVELS_DATA.map((takson, idx) => {
              const isSelected = idx === selectedTaksonIndex;
              // visual width tapering like a pyramid
              const widths = ['w-full', 'w-[95%]', 'w-[90%]', 'w-[85%]', 'w-[80%]', 'w-[75%]', 'w-[70%]'];
              return (
                <div key={takson.tingkat} className="flex justify-center">
                  <button
                    onClick={() => {
                      playSound('click', soundEnabled);
                      setSelectedTaksonIndex(idx);
                    }}
                    className={`${widths[idx]} p-3 rounded-2xl text-left border transition-all duration-200 flex items-center justify-between cursor-pointer ${
                      isSelected
                        ? 'bg-teal-600 text-white border-teal-400 shadow-lg shadow-teal-600/30 ring-2 ring-teal-300/40'
                        : 'bg-slate-950/80 hover:bg-slate-850 text-slate-300 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 ${
                        isSelected ? 'bg-black/20 text-white' : 'bg-slate-800 text-teal-400'
                      }`}>
                        {idx + 1}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs sm:text-sm font-bold truncate">
                          {takson.tingkat.split('. ')[1]}
                        </div>
                        <div className={`text-[10px] truncate ${isSelected ? 'text-teal-100' : 'text-slate-500'}`}>
                          {takson.latin.split(' / ')[0]}
                        </div>
                      </div>
                    </div>
                    {isSelected && <Sparkles className="w-4 h-4 text-amber-300 shrink-0" />}
                  </button>
                </div>
              );
            })}

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 px-2">
              <span>⬆️ Anggota Banyak</span>
              <span>Persamaan Ciri Banyak ⬇️</span>
            </div>
          </div>

          {/* Level Details & Comparative Table (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="text-xs font-bold text-teal-400 uppercase tracking-wider">
                    Detail Tingkatan {selectedTaksonIndex + 1}
                  </span>
                  <h3 className="text-2xl font-black text-white mt-0.5">
                    {currentTakson.tingkat}
                  </h3>
                  <span className="text-xs text-slate-400 italic">
                    Nama Ilmiah / Botani: {currentTakson.latin}
                  </span>
                </div>
                <span className="px-3 py-1 rounded-xl bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                  Tingkat #{selectedTaksonIndex + 1}
                </span>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                {currentTakson.keterangan}
              </p>

              {/* Organism Comparison at this takson */}
              <div className="space-y-2 pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Dna className="w-4 h-4 text-teal-400" />
                  <span>Posisi Spesimen Pada Tingkatan Ini:</span>
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">👤 Manusia:</span>
                    <strong className="text-white text-sm block">{currentTakson.manusia}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">🐯 Harimau:</span>
                    <strong className="text-teal-300 text-sm block">{currentTakson.harimau}</strong>
                  </div>
                  <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800">
                    <span className="text-slate-400 block mb-1">🌾 Padi Sawah:</span>
                    <strong className="text-emerald-300 text-sm block">{currentTakson.padi}</strong>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-teal-950/30 border border-teal-500/20 text-xs text-teal-200 flex items-start gap-2.5">
                <Users className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Fakta Kekerabatan:</strong> Perhatikan bahwa Manusia dan Harimau berada dalam satu Kingdom (Animalia), satu Filum (Chordata), dan satu Kelas (Mammalia) yang sama! Keduanya baru berpisah di tingkatan <strong>Ordo</strong> (Primata vs Carnivora).
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bagian 2: Binomial Nomenklatur Carolus Linnaeus */}
      <section className="space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
            <Edit3 className="w-4 h-4" />
            <span>Materi Inti 2</span>
          </div>
          <h2 className="text-2xl font-bold text-white">
            Tata Nama Ganda (Binomial Nomenklatur) Carolus Linnaeus
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Sebelum abad ke-18, nama makhluk hidup sangat panjang dan bervariasi di tiap daerah. Linnaeus membakukan aturan 2 kata universal dalam bahasa Latin.
          </p>
        </div>

        {/* 5 Aturan Baku Linnaeus */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BINOMIAL_RULES.map((rule) => (
            <div
              key={rule.ruleNumber}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-xs flex items-center justify-center">
                    {rule.ruleNumber}
                  </span>
                  <h4 className="text-sm font-bold text-white">{rule.title}</h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {rule.desc}
                </p>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400">
                <span className="text-emerald-400 font-medium">Contoh: </span>
                {rule.example}
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Binomial Workshop / Validator */}
        <div className="bg-slate-900 border-2 border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Bengkel Interaktif Uji Format Nama Ilmiah</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Cek & Perbaiki Kesalahan Nama Ilmiah
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Ketik nama ilmiah atau pilih studi kasus penulisan yang salah di bawah ini untuk melihat bagaimana validator biologi mengecek aturan Linnaeus.
            </p>
          </div>

          {/* Quick Practice Buttons */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Pilih Contoh Penulisan Keliru untuk Dikoreksi:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {BINOMIAL_PRACTICE_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handlePracticeSelect(item.salah)}
                  className="p-3 rounded-2xl bg-slate-950/80 hover:bg-slate-850 border border-slate-800 text-left transition-colors cursor-pointer group"
                >
                  <span className="text-[11px] text-slate-400 block">{item.namaUmum}</span>
                  <strong className="text-rose-400 line-through text-xs sm:text-sm font-mono block group-hover:text-rose-300">
                    {item.salah}
                  </strong>
                </button>
              ))}
            </div>
          </div>

          {/* Live Input and Validation Result */}
          <div className="bg-slate-950/90 p-5 rounded-2xl border border-slate-800 space-y-4">
            <div>
              <label htmlFor="binomial-input" className="text-xs font-semibold text-slate-300 block mb-1.5">
                Ketikkan Nama Ilmiah (Uji Validitas Format):
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  id="binomial-input"
                  type="text"
                  value={inputName}
                  onChange={(e) => handleValidate(e.target.value)}
                  placeholder="Contoh: Panthera tigris"
                  className="flex-1 px-4 py-3 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
                <button
                  onClick={() => handleValidate(inputName)}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm cursor-pointer shadow-md"
                >
                  Periksa Kaidah
                </button>
              </div>
            </div>

            {/* Validation Feedback Card */}
            <div
              className={`p-4 rounded-2xl border transition-all ${
                validationResult.isValid
                  ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                {validationResult.isValid ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span className="text-emerald-300">Format Sesuai Kaidah Carolus Linnaeus!</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-rose-400 shrink-0" />
                    <span className="text-rose-300">Format Masih Kurang Tepat:</span>
                  </>
                )}
              </div>

              <ul className="space-y-1 text-xs list-disc list-inside">
                {validationResult.messages.map((msg, i) => (
                  <li key={i}>{msg}</li>
                ))}
              </ul>

              {validationResult.isValid && (
                <div className="mt-3 pt-3 border-t border-emerald-500/20 text-xs">
                  <span className="text-slate-400">Tampilan resmi dalam cetakan: </span>
                  <em className="font-serif text-emerald-300 font-bold text-sm ml-1">
                    {validationResult.genus} {validationResult.species}
                  </em>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation Next Session */}
      <section className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="text-xs font-semibold text-slate-400">Materi Selesai: Pertemuan 2</span>
          <h4 className="text-lg font-bold text-white">
            Lanjut ke Pertemuan 3: Klasifikasi 6 Kingdom
          </h4>
        </div>
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onNextSession();
          }}
          className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-teal-600/20 cursor-pointer"
        >
          <span>Masuk Pertemuan 3</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>
    </div>
  );
};
