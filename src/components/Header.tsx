import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Sparkles, Gem, Hourglass, RefreshCw, Edit3, Check } from 'lucide-react';

export const Header: React.FC = () => {
  const { character, renameCharacter, resetGame } = useGameStore();
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(character.name);

  const handleSaveName = () => {
    renameCharacter(tempName);
    setIsEditingName(false);
  };

  const handleReset = () => {
    if (window.confirm('Đạo hữu có chắc chắn muốn TỰ PHẾ TU VI, bắt đầu lại kiếp sau không? Mọi tiến trình sẽ bị xóa sạch!')) {
      resetGame();
    }
  };

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40 px-4 py-3 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Brand Slogan */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-sky-500 to-indigo-600 flex items-center justify-center shadow-[0_0_15px_rgba(56,189,248,0.5)] border border-sky-400/30">
            <Sparkles className="w-5 h-5 text-amber-200 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl md:text-2xl font-bold font-serif tracking-wider bg-gradient-to-r from-amber-200 via-sky-300 to-amber-100 bg-clip-text text-transparent">
                Phàm Lộ Tu Tiên
              </h1>
              <span className="text-xs px-2 py-0.5 rounded bg-sky-950/80 text-sky-400 border border-sky-800/60 font-mono">
                v0.1.0
              </span>
            </div>
            <p className="text-xs text-slate-400 italic tracking-wide">
              &ldquo;{character.slogan}&rdquo;
            </p>
          </div>
        </div>

        {/* Character Quick Info & Resources */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
          {/* Đạo Hiệu */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
            {isEditingName ? (
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="bg-slate-800 text-xs text-amber-300 px-2 py-1 rounded outline-none border border-amber-500/50 w-28"
                  maxLength={15}
                  autoFocus
                />
                <button
                  onClick={handleSaveName}
                  className="p-1 hover:text-emerald-400 text-slate-400"
                  title="Lưu đạo hiệu"
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 text-xs">Đạo Hiệu:</span>
                <span className="font-semibold text-amber-300">{character.name}</span>
                <button
                  onClick={() => {
                    setTempName(character.name);
                    setIsEditingName(true);
                  }}
                  className="text-slate-500 hover:text-slate-300 ml-1"
                  title="Đổi đạo hiệu"
                >
                  <Edit3 className="w-3 h-3" />
                </button>
              </div>
            )}
          </div>

          {/* Linh Thạch */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 shadow-inner">
            <Gem className="w-4 h-4 text-sky-400" />
            <span className="text-slate-400 text-xs">Linh Thạch:</span>
            <span className="font-bold text-sky-300 font-mono">
              {character.spiritStones.toLocaleString()}
            </span>
          </div>

          {/* Thọ Nguyên */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800">
            <Hourglass className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 text-xs">Thọ Nguyên:</span>
            <span className={`font-mono font-semibold ${character.lifespan >= character.maxLifespan * 0.9 ? 'text-red-400 animate-pulse' : 'text-amber-300'}`}>
              {character.lifespan} / {character.maxLifespan} <span className="text-xs text-slate-400">năm</span>
            </span>
          </div>

          {/* Nút Reset / Chuyển Thế */}
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/50 text-xs transition-colors"
            title="Tự phế tu vi, chuyển thế trùng sinh"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Trùng Sinh</span>
          </button>
        </div>
      </div>
    </header>
  );
};
