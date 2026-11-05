import React, { useState } from 'react';
import { useGameLoop } from './hooks/useGameLoop';
import { Header } from './components/Header';
import { CultivationPanel } from './components/CultivationPanel';
import { CharacterPanel } from './components/CharacterPanel';
import { InventoryPanel } from './components/InventoryPanel';
import { ExplorationPanel } from './components/ExplorationPanel';
import { LogPanel } from './components/LogPanel';
import { Flame, Package, Compass, Scroll, HeartHandshake } from 'lucide-react';

export const App: React.FC = () => {
  // Kích hoạt vòng lặp thời gian tu luyện (mỗi giây 1 tick)
  useGameLoop();

  const [activeTab, setActiveTab] = useState<'cultivation' | 'inventory' | 'exploration' | 'logs'>('cultivation');

  return (
    <div className="min-h-screen bg-[#080b11] text-slate-200 flex flex-col font-sans selection:bg-amber-500/20 selection:text-amber-300">
      {/* Thanh Header Cố Định */}
      <Header />

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col gap-6">
        {/* Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 border-b border-slate-800/80 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('cultivation')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all border ${
              activeTab === 'cultivation'
                ? 'bg-sky-950/70 text-sky-300 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Tu Luyện & Đan Điền</span>
          </button>

          <button
            onClick={() => setActiveTab('inventory')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all border ${
              activeTab === 'inventory'
                ? 'bg-sky-950/70 text-sky-300 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Package className="w-4 h-4 text-sky-400" />
            <span>Túi Trữ Vật</span>
          </button>

          <button
            onClick={() => setActiveTab('exploration')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all border ${
              activeTab === 'exploration'
                ? 'bg-sky-950/70 text-sky-300 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Bí Cảnh Lịch Luyện</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all border ${
              activeTab === 'logs'
                ? 'bg-sky-950/70 text-sky-300 border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.25)]'
                : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-slate-200 hover:border-slate-700'
            }`}
          >
            <Scroll className="w-4 h-4 text-purple-400" />
            <span>Ngọc Giản Nhật Ký</span>
          </button>
        </div>

        {/* Dynamic Tab Contents */}
        {activeTab === 'cultivation' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Cultivation Panel (Center/Left) */}
            <div className="lg:col-span-7 space-y-6">
              <CultivationPanel />
              <LogPanel />
            </div>

            {/* Character & Secondary Info (Right) */}
            <div className="lg:col-span-5 space-y-6">
              <CharacterPanel />
              <InventoryPanel />
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-7">
              <InventoryPanel />
            </div>
            <div className="md:col-span-5">
              <CharacterPanel />
            </div>
          </div>
        )}

        {activeTab === 'exploration' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
            <div className="md:col-span-8">
              <ExplorationPanel />
            </div>
            <div className="md:col-span-4 space-y-6">
              <CharacterPanel />
              <LogPanel />
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="max-w-3xl mx-auto w-full">
            <LogPanel />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 px-4 py-4 text-center text-xs text-slate-500">
        <p className="flex items-center justify-center gap-1.5 text-slate-400">
          <HeartHandshake className="w-4 h-4 text-amber-500/80" />
          <span>Phàm Lộ Tu Tiên • </span>
          <span className="italic text-amber-300">&ldquo;Thân mang phàm cốt, tâm hướng tiên đồ.&rdquo;</span>
        </p>
        <p className="mt-1 text-[11px] text-slate-600">
          Xây dựng bằng React + Vite + Tailwind CSS • Tự động lưu tiến trình trên trình duyệt
        </p>
      </footer>
    </div>
  );
};

export default App;
