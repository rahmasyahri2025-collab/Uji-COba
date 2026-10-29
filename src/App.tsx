import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types/biology';
import { Navbar } from './components/Navbar';
import { ApersepsiView } from './components/ApersepsiView';
import { Pertemuan1View } from './components/Pertemuan1View';
import { Pertemuan2View } from './components/Pertemuan2View';
import { Pertemuan3View } from './components/Pertemuan3View';
import { TGTView } from './components/TGTView';
import { PostTestView } from './components/PostTestView';
import { 
  GraduationCap, 
  BookOpen, 
  Trophy, 
  CheckCircle2, 
  HelpCircle,
  FileCheck2,
  ChevronRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('apersepsi');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);

  // Support ?autostart=1 as required by ultra-mode to jump straight to lessons
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const tabParam = params.get('tab') as ActiveTab | null;
      if (tabParam && ['apersepsi', 'pertemuan1', 'pertemuan2', 'pertemuan3', 'tgt', 'posttest'].includes(tabParam)) {
        setActiveTab(tabParam);
      } else if (params.get('autostart') === '1') {
        setActiveTab('pertemuan1');
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* Floating Quick Stepper Indicator */}
        <div className="mb-6 p-2 rounded-2xl bg-slate-900/60 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1.5 shrink-0 px-2 font-medium">
            <GraduationCap className="w-4 h-4 text-emerald-400" />
            <span>Alur Pembelajaran:</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] shrink-0">
            <button
              onClick={() => setActiveTab('apersepsi')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'apersepsi' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              1. Apersepsi
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => setActiveTab('pertemuan1')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'pertemuan1' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              2. Pertemuan 1
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => setActiveTab('pertemuan2')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'pertemuan2' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              3. Pertemuan 2
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => setActiveTab('pertemuan3')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'pertemuan3' ? 'bg-emerald-500/20 text-emerald-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              4. Pertemuan 3
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => setActiveTab('tgt')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'tgt' ? 'bg-yellow-500/20 text-yellow-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              5. TGT Sang King
            </button>
            <ChevronRight className="w-3 h-3 text-slate-600" />
            <button
              onClick={() => setActiveTab('posttest')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                activeTab === 'posttest' ? 'bg-amber-500/20 text-amber-300 font-bold' : 'hover:text-slate-200'
              }`}
            >
              6. Post-Test (30 Soal)
            </button>
          </div>

          <button
            onClick={() => setShowInfoModal(true)}
            className="p-1 px-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs flex items-center gap-1 shrink-0 ml-2 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>Panduan</span>
          </button>
        </div>

        {/* View Switcher */}
        {activeTab === 'apersepsi' && (
          <ApersepsiView
            soundEnabled={soundEnabled}
            onStartLesson={() => setActiveTab('pertemuan1')}
          />
        )}

        {activeTab === 'pertemuan1' && (
          <Pertemuan1View
            soundEnabled={soundEnabled}
            onNextSession={() => setActiveTab('pertemuan2')}
          />
        )}

        {activeTab === 'pertemuan2' && (
          <Pertemuan2View
            soundEnabled={soundEnabled}
            onNextSession={() => setActiveTab('pertemuan3')}
          />
        )}

        {activeTab === 'pertemuan3' && (
          <Pertemuan3View
            soundEnabled={soundEnabled}
            onGoToTGT={() => setActiveTab('tgt')}
          />
        )}

        {activeTab === 'tgt' && (
          <TGTView
            soundEnabled={soundEnabled}
            onGoToPostTest={() => setActiveTab('posttest')}
          />
        )}

        {activeTab === 'posttest' && (
          <PostTestView
            soundEnabled={soundEnabled}
            onGoToHome={() => setActiveTab('apersepsi')}
          />
        )}
      </main>

      {/* Info / Guide Modal */}
      {showInfoModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-4 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Panduan Media Pembelajaran BioKlasika</span>
              </h3>
              <button
                onClick={() => setShowInfoModal(false)}
                className="text-slate-400 hover:text-white text-lg font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <p>
                <strong>BioKlasika</strong> adalah media pembelajaran interaktif sains biologi IPA yang dirancang komprehensif mencakup:
              </p>
              <ul className="list-disc list-inside space-y-1.5 pl-1">
                <li><strong className="text-emerald-300">Apersepsi Kritis:</strong> Eksperimen supermarket vs keteraturan alam & studi kasus paradoks fisiologis.</li>
                <li><strong className="text-emerald-300">Pertemuan 1:</strong> 8 Karakteristik ciri kehidupan, 4 manfaat klasifikasi, dan simulator kunci determinasi dikotomi interaktif 1a-5b.</li>
                <li><strong className="text-emerald-300">Pertemuan 2:</strong> 7 Tingkatan takson (Piramida takson, jembatan keledai, perbandingan takson) & bengkel validator tata nama ganda (*Binomial Nomenclature*).</li>
                <li><strong className="text-emerald-300">Pertemuan 3:</strong> Klasifikasi modern 6 Kingdom (Archaebacteria, Eubacteria, Protista, Fungi, Plantae, Animalia), matriks komparasi, dan mini game detektif hayati.</li>
                <li><strong className="text-yellow-300">Kuis TGT "Sang King":</strong> Model kooperatif <em>Teams Games Tournament</em> untuk 8 kelompok lengkap dengan papan turnamen meja, timer giliran, sistem rebutan, scorekeeper, dan podium pemenang.</li>
                <li><strong className="text-amber-300">Post-Test:</strong> 30 Soal evaluasi berstandar kurikulum (10 soal per pertemuan) dengan timer, lembar navigasi, skor KKM 75, dan pembahasan lengkap setiap butir soal.</li>
              </ul>
            </div>

            <div className="pt-2 text-right">
              <button
                onClick={() => setShowInfoModal(false)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer"
              >
                Mengerti & Lanjutkan Belajar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-300">BioKlasika</span>
            <span>• Media Interaktif Klasifikasi Makhluk Hidup</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Kurikulum IPA Terpadu</span>
            <span>KKM Post-Test: 75</span>
            <span>Model TGT 8 Kelompok</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
