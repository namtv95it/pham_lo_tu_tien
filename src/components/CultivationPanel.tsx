import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { REALMS } from '../constants/realms';
import { Zap, Play, Pause, ArrowUpCircle, Flame } from 'lucide-react';
import { BreakthroughModal } from './BreakthroughModal';

export const CultivationPanel: React.FC = () => {
  const { character, meditateOnce, toggleMeditation } = useGameStore();
  const [showBreakthroughModal, setShowBreakthroughModal] = useState(false);
  const [clickEffect, setClickEffect] = useState(false);

  const currentRealm = REALMS[character.currentRealmIndex] || REALMS[REALMS.length - 1];
  const isMaxCultivation = character.cultivation >= currentRealm.maxCultivation;
  const progressPercent = Math.min(100, (character.cultivation / currentRealm.maxCultivation) * 100);

  const handleManualMeditate = () => {
    meditateOnce();
    setClickEffect(true);
    setTimeout(() => setClickEffect(false), 200);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden flex flex-col items-center">
      {/* Background Glow */}
      <div className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
        character.isMeditating ? 'bg-sky-500/20 opacity-100' : 'bg-slate-700/10 opacity-30'
      }`} />
      <div className={`absolute -bottom-24 -right-24 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-opacity duration-1000 ${
        character.isMeditating ? 'bg-indigo-500/20 opacity-100' : 'bg-slate-700/10 opacity-30'
      }`} />

      {/* Cảnh Giới Tiêu Đề */}
      <div className="text-center mb-6 z-10">
        <span className="text-xs font-semibold tracking-widest text-sky-400 uppercase bg-sky-950/80 px-3 py-1 rounded-full border border-sky-800/60">
          Hiện Tiền Cảnh Giới
        </span>
        <h2 className="text-2xl md:text-3xl font-extrabold font-serif text-slate-100 mt-2 tracking-wide">
          {currentRealm.name}
        </h2>
        <p className="text-amber-400 font-medium text-sm mt-0.5">
          {currentRealm.stage}
        </p>
        <p className="text-xs text-slate-400 max-w-md mx-auto mt-2 italic">
          {currentRealm.description}
        </p>
      </div>

      {/* Đan Điền Linh Khí Visual Orb */}
      <div className="relative my-4 flex items-center justify-center">
        {/* Outer Ring */}
        <div className={`w-44 h-44 md:w-52 md:h-52 rounded-full border border-dashed border-sky-500/30 flex items-center justify-center ${
          character.isMeditating ? 'animate-[spin_12s_linear_infinite]' : ''
        }`}>
          {/* Inner Glow Core */}
          <div className={`w-36 h-36 md:w-44 md:h-44 rounded-full border border-sky-400/40 bg-gradient-to-tr from-slate-950 via-sky-950/40 to-slate-900 flex flex-col items-center justify-center shadow-[inset_0_0_30px_rgba(56,189,248,0.2)] transition-transform duration-300 ${
            clickEffect ? 'scale-95' : 'scale-100'
          }`}>
            <Flame className={`w-10 h-10 transition-colors duration-500 ${
              character.isMeditating ? 'text-sky-400 animate-bounce' : 'text-slate-600'
            }`} />
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-mono mt-1">
              Khí Hải Đan Điền
            </span>
            <span className="text-xs font-semibold text-sky-300">
              +{Math.max(1, Math.floor((character.currentRealmIndex + 2) * character.spiritualRoot.rateMultiplier))}/giây
            </span>
          </div>
        </div>

        {/* Orbiting sparkles */}
        {character.isMeditating && (
          <div className="absolute inset-0 pointer-events-none animate-ping opacity-25">
            <div className="w-full h-full rounded-full border border-sky-400" />
          </div>
        )}
      </div>

      {/* Thanh Tiến Độ Tu Vi */}
      <div className="w-full max-w-lg mt-4 z-10">
        <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
          <span className="text-slate-400 flex items-center gap-1">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Linh Lực Tích Lũy:
          </span>
          <span className="text-slate-200 font-bold">
            {character.cultivation.toLocaleString()} / {currentRealm.maxCultivation.toLocaleString()} ({progressPercent.toFixed(1)}%)
          </span>
        </div>

        {/* Progress bar container */}
        <div className="h-4 w-full bg-slate-950 rounded-full border border-slate-800 overflow-hidden p-0.5 shadow-inner">
          <div
            className={`h-full rounded-full transition-all duration-300 ${
              isMaxCultivation
                ? 'bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.8)] animate-pulse'
                : 'bg-gradient-to-r from-sky-600 via-sky-400 to-indigo-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Các Nút Hành Động Tu Luyện */}
      <div className="flex flex-wrap items-center justify-center gap-3 mt-6 w-full max-w-md z-10">
        {/* Nút Thổ Nạp Thủ Công */}
        <button
          onClick={handleManualMeditate}
          disabled={isMaxCultivation}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95 ${
            isMaxCultivation
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-600 hover:border-sky-400'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Thổ Nạp Khí</span>
        </button>

        {/* Nút Bế Quan / Tự Động */}
        <button
          onClick={toggleMeditation}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-medium text-sm transition-all shadow-md active:scale-95 ${
            character.isMeditating
              ? 'bg-sky-600/30 text-sky-300 border border-sky-400 shadow-[0_0_15px_rgba(56,189,248,0.3)]'
              : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600'
          }`}
        >
          {character.isMeditating ? (
            <>
              <Pause className="w-4 h-4 text-sky-400 animate-spin" />
              <span>Đang Bế Quan</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 text-emerald-400" />
              <span>Bắt Đầu Bế Quan</span>
            </>
          )}
        </button>

        {/* Nút Đột Phá Cảnh Giới */}
        <button
          onClick={() => setShowBreakthroughModal(true)}
          disabled={!isMaxCultivation}
          className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg active:scale-95 ${
            isMaxCultivation
              ? 'bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] animate-pulse border border-amber-300'
              : 'bg-slate-800/60 text-slate-500 border border-slate-800 cursor-not-allowed'
          }`}
        >
          <ArrowUpCircle className="w-5 h-5" />
          <span>{isMaxCultivation ? 'ĐẠT BÌNH CẢNH: TIẾN HÀNH ĐỘT PHÁ!' : 'Chưa Đạt Bình Cảnh'}</span>
        </button>
      </div>

      {/* Modal Đột Phá */}
      {showBreakthroughModal && (
        <BreakthroughModal onClose={() => setShowBreakthroughModal(false)} />
      )}
    </div>
  );
};
