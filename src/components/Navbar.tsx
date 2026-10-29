import React from 'react';
import { ActiveTab } from '../types/biology';
import { 
  Lightbulb, 
  Leaf, 
  Layers, 
  Crown, 
  Trophy, 
  FileCheck2, 
  Volume2, 
  VolumeX, 
  GraduationCap
} from 'lucide-react';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  soundEnabled: boolean;
  setSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  soundEnabled,
  setSoundEnabled,
}) => {
  const navItems = [
    { id: 'apersepsi' as ActiveTab, label: 'Apersepsi', icon: Lightbulb, badge: 'Nalar Kritis' },
    { id: 'pertemuan1' as ActiveTab, label: 'Pertemuan 1', icon: Leaf, badge: 'Ciri & Kunci' },
    { id: 'pertemuan2' as ActiveTab, label: 'Pertemuan 2', icon: Layers, badge: 'Takson & Binomial' },
    { id: 'pertemuan3' as ActiveTab, label: 'Pertemuan 3', icon: Crown, badge: '6 Kingdom' },
    { id: 'tgt' as ActiveTab, label: 'Kuis TGT Sang King', icon: Trophy, badge: '8 Kelompok', highlight: true },
    { id: 'posttest' as ActiveTab, label: 'Post-Test', icon: FileCheck2, badge: '30 Soal', special: true },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-emerald-500/20 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo & Brand */}
          <div 
            onClick={() => setActiveTab('apersepsi')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <GraduationCap className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-2xl tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                  BioKlasika
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-xs font-semibold uppercase tracking-wider bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-full">
                  IPA Interaktif
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Klasifikasi Makhluk Hidup & Turnamen Belajar
              </p>
            </div>
          </div>

          {/* Sound & Action Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled((prev) => !prev)}
              className="p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 flex items-center gap-1.5 text-xs font-medium transition-colors"
              title={soundEnabled ? 'Matikan Suara Efek' : 'Nyalakan Suara Efek'}
              aria-label="Toggle Sound"
            >
              {soundEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-emerald-400" />
                  <span className="hidden md:inline">Suara: ON</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-500" />
                  <span className="hidden md:inline text-slate-400">Suara: OFF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Navigation Tabs - Horizontal Scroll on Mobile */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto pb-2 scrollbar-none pt-1" aria-label="Tabs Navigasi Materi">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? item.special
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg shadow-orange-500/25 ring-2 ring-amber-300'
                      : item.highlight
                      ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 shadow-lg shadow-yellow-500/20 ring-2 ring-yellow-300 font-bold'
                      : 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 ring-2 ring-emerald-400'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'scale-110' : 'text-slate-400'}`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span
                    className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                      isActive
                        ? 'bg-black/20 text-current'
                        : 'bg-slate-800 text-emerald-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
