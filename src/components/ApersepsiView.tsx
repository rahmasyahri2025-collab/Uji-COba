import React, { useState } from 'react';
import { APERSEPSI_CASES } from '../data/biologyData';
import { playSound } from '../utils/soundEffects';
import { 
  Lightbulb, 
  HelpCircle, 
  CheckCircle2, 
  Sparkles, 
  Store, 
  ArrowRight, 
  BrainCircuit, 
  Compass, 
  Eye, 
  EyeOff
} from 'lucide-react';

interface ApersepsiViewProps {
  onStartLesson: () => void;
  soundEnabled: boolean;
}

export const ApersepsiView: React.FC<ApersepsiViewProps> = ({
  onStartLesson,
  soundEnabled,
}) => {
  const [chaosMode, setChaosMode] = useState<boolean>(true);
  const [openedReflections, setOpenedReflections] = useState<Record<string, boolean>>({});
  const [selectedHypothesis, setSelectedHypothesis] = useState<Record<string, string>>({});

  const toggleReflection = (id: string) => {
    playSound('select', soundEnabled);
    setOpenedReflections((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleHypothesis = (caseId: string, value: string) => {
    playSound('click', soundEnabled);
    setSelectedHypothesis((prev) => ({ ...prev, [caseId]: value }));
  };

  return (
    <div className="space-y-10 pb-16 animate-fadeIn">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 border border-emerald-500/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold mb-4">
            <BrainCircuit className="w-4 h-4 text-emerald-400" />
            <span>Apersepsi & Berpikir Kritis Siswa</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
            Mengapa Kita Perlu{' '}
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
              Mengklasifikasikan
            </span>{' '}
            Makhluk Hidup?
          </h1>

          <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
            Di planet Bumi terdapat lebih dari <strong className="text-emerald-300 font-semibold">8,7 juta spesies</strong> makhluk hidup berbeda! 
            Dari bakteri mikroskopis di kawah berapi hingga paus raksasa seberat 150 ton di samudra. 
            Bagaimana mungkin manusia dapat mempelajari jutaan variasi tersebut tanpa tersesat dan bingung?
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                playSound('click', soundEnabled);
                onStartLesson();
              }}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-lg shadow-emerald-500/30 flex items-center gap-2 transition-all transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <span>Lanjut ke Pertemuan 1</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            <a
              href="#simulasi-pasar"
              className="px-5 py-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-semibold text-sm border border-slate-700 flex items-center gap-2 transition-colors"
            >
              <Store className="w-4 h-4 text-emerald-400" />
              <span>Coba Eksperimen Supermarket</span>
            </a>
          </div>
        </div>
      </section>

      {/* Interactive Thought Experiment: Supermarket vs Hutan */}
      <section id="simulasi-pasar" className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Store className="w-4 h-4" />
              <span>Simulasi Analogi Nyata</span>
            </div>
            <h2 className="text-2xl font-bold text-white">
              Eksperimen Nalar: Supermarket 100.000 Barang
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Bandingkan bagaimana rasanya mencari kebutuhan hidup jika barang tidak diklasifikasikan vs dikelompokkan rapi.
            </p>
          </div>

          {/* Interactive Switch */}
          <div className="flex items-center gap-3 bg-slate-950/60 p-1.5 rounded-2xl border border-slate-700/80 self-start md:self-auto">
            <button
              onClick={() => {
                setChaosMode(true);
                playSound('wrong', soundEnabled);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                chaosMode
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ⚠️ Tanpa Klasifikasi (Kekacauan)
            </button>
            <button
              onClick={() => {
                setChaosMode(false);
                playSound('correct', soundEnabled);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                !chaosMode
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              ✅ Dengan Klasifikasi Ilmiah
            </button>
          </div>
        </div>

        {chaosMode ? (
          <div className="bg-rose-950/20 border border-rose-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center shrink-0">
                <Store className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-rose-300">
                  Kondisi: Rak Campur Aduk Tanpa Kategori
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Bayangkan kamu diminta membeli sebotol <strong className="text-white">Susu Sapi Segar</strong> dan <strong className="text-white">Sabun Mandi</strong>. 
                  Namun penjual menaruh susu di sebelah racun serangga, sabun di bawah tumpukan karpet, dan pasta gigi di antara tumpukan semangka!
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Waktu Pencarian</span>
                    <span className="text-xl font-black text-rose-400">± 4.5 Jam</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Tingkat Frustrasi</span>
                    <span className="text-xl font-black text-rose-400">Sangat Tinggi (99%)</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Risiko Kesalahan</span>
                    <span className="text-xl font-black text-rose-400">Tertukar Racun</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Efisiensi Studi</span>
                    <span className="text-xl font-black text-rose-400">0% Mustahil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-emerald-300">
                  Kondisi: Rak Dikelompokkan Berdasarkan Ciri & Kategori
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Ada lorong <em>Dairy Product</em> (Produk Susu & Olahannya), lorong <em>Toiletries</em> (Perlengkapan Mandi), lorong <em>Fresh Produce</em> (Sayur & Buah). 
                  Kamu cukup melangkah langsung ke lorong bernomor spesifik!
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Waktu Pencarian</span>
                    <span className="text-xl font-black text-emerald-400">30 Detik</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Tingkat Kepastian</span>
                    <span className="text-xl font-black text-emerald-400">100% Akurat</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Keamanan</span>
                    <span className="text-xl font-black text-emerald-400">Higienis & Terpisah</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 text-center">
                    <span className="text-xs text-slate-400 block">Keteraturan Sains</span>
                    <span className="text-xl font-black text-emerald-400">Universal Global</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mt-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-xs sm:text-sm text-slate-300">
          <Lightbulb className="w-5 h-5 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300 font-semibold">Refleksi Kritis:</strong> Begitu pula alam semesta. 
            Klasifikasi bukan sekadar memberi nama label, melainkan <span className="underline decoration-emerald-400">alat bernalar ilmiah</span> untuk memetakan kekerabatan, fungsi ekologis, dan evolusi jutaan makhluk hidup!
          </span>
        </div>
      </section>

      {/* 4 Paradoks Biologis yang Menantang Nalar Siswa */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-teal-400 text-xs font-bold uppercase tracking-wider mb-1">
              <Compass className="w-4 h-4" />
              <span>Studi Kasus Paradoks Berpikir Kritis</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Teka-Teki Organisme: Jangan Tertipu Ciri Luar!
            </h2>
            <p className="text-slate-400 text-sm mt-1">
              Jika kita mengelompokkan makhluk hidup hanya dari tempat tinggal atau bentuk sepintas, kita bisa terjebak kesimpulan keliru. Uji pemikiranmu di bawah ini:
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {APERSEPSI_CASES.map((item) => {
            const isRevealed = openedReflections[item.id] || false;
            const currentHypo = selectedHypothesis[item.id];

            return (
              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-3xl p-6 transition-all duration-300 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                      {item.badge}
                    </span>
                    <span className="text-xs text-slate-500 flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5" />
                      Tantangan Nalar
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 mb-4">
                    <div className="text-xs font-semibold text-amber-300 flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Pertanyaan Reflektif:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-medium">
                      {item.pertanyaanKritis}
                    </p>
                  </div>

                  {/* Interactive Hypothesis Selector */}
                  <div className="mb-4">
                    <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                      Menurut analisismu, apa kunci jawabannya?
                    </label>
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      {item.id === 'paus' && (
                        <>
                          <button
                            onClick={() => handleHypothesis(item.id, 'A')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'A'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            A. Paus bernapas paru-paru, melahirkan, dan menyusui anaknya.
                          </button>
                          <button
                            onClick={() => handleHypothesis(item.id, 'B')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'B'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            B. Karena paus bisa berenang lebih kencang daripada hiu.
                          </button>
                        </>
                      )}

                      {item.id === 'jamur' && (
                        <>
                          <button
                            onClick={() => handleHypothesis(item.id, 'A')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'A'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            A. Jamur tidak berklorofil (tidak fotosintesis) & dinding sel dari kitin.
                          </button>
                          <button
                            onClick={() => handleHypothesis(item.id, 'B')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'B'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            B. Karena jamur rasanya gurih seperti daging saat dimasak.
                          </button>
                        </>
                      )}

                      {item.id === 'kelelawar' && (
                        <>
                          <button
                            onClick={() => handleHypothesis(item.id, 'A')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'A'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            A. Sayap dari selaput kulit, tubuh berambut, melahirkan & menyusui.
                          </button>
                          <button
                            onClick={() => handleHypothesis(item.id, 'B')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'B'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            B. Karena kelelawar terbang hanya di malam hari (nokturnal).
                          </button>
                        </>
                      )}

                      {item.id === 'supermarket' && (
                        <>
                          <button
                            onClick={() => handleHypothesis(item.id, 'A')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'A'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            A. Klasifikasi menyederhanakan objek acak menjadi pola yang dapat dipelajari.
                          </button>
                          <button
                            onClick={() => handleHypothesis(item.id, 'B')}
                            className={`p-2.5 rounded-xl text-left border transition-all ${
                              currentHypo === 'B'
                                ? 'bg-emerald-500/20 border-emerald-400 text-white font-semibold'
                                : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            B. Hanya untuk formalitas para ilmuwan agar terlihat sibuk.
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <button
                    onClick={() => toggleReflection(item.id)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {isRevealed ? (
                      <>
                        <EyeOff className="w-4 h-4 text-emerald-400" />
                        <span>Sembunyikan Pembahasan Ilmiah</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-emerald-400" />
                        <span>Buka Penjelasan Ilmiah Biologis</span>
                      </>
                    )}
                  </button>

                  {isRevealed && (
                    <div className="mt-3 p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 text-xs sm:text-sm text-emerald-200 leading-relaxed animate-fadeIn">
                      <div className="flex items-center gap-1.5 font-bold text-emerald-300 mb-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>Kebenaran Biologis:</span>
                      </div>
                      <p>{item.refleksi}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action card */}
      <section className="bg-gradient-to-r from-emerald-900/40 via-teal-900/40 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Siap Mempelajari Bagaimana Cara Ilmuwan Mengelompokkannya?
          </h3>
          <p className="text-slate-300 text-sm max-w-xl">
            Di Pertemuan 1, kita akan menjelajahi 8 Ciri-Ciri Makhluk Hidup, 4 Manfaat Utama Klasifikasi, dan mempraktikkan Kunci Determinasi (Kunci Dikotomi).
          </p>
        </div>
        <button
          onClick={() => {
            playSound('click', soundEnabled);
            onStartLesson();
          }}
          className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm sm:text-base shrink-0 shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-transform hover:scale-105 active:scale-100 cursor-pointer"
        >
          <span>Masuk Pertemuan 1</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>
    </div>
  );
};
