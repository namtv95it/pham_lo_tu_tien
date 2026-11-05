import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { REALMS } from '../constants/realms';
import { Shield, Sword, Heart, Wind, Award, AlertCircle } from 'lucide-react';

export const CharacterPanel: React.FC = () => {
  const { character } = useGameStore();
  const currentRealm = REALMS[character.currentRealmIndex] || REALMS[REALMS.length - 1];

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
            <span>Bản Mệnh Thuộc Tính</span>
          </h3>
          <p className="text-xs text-slate-400">Gốc rễ căn cơ & tư chất tu tiên</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-amber-950/60 text-amber-300 border border-amber-800/50 font-medium">
          {character.spiritualRoot.quality}
        </span>
      </div>

      {/* Linh Căn Info */}
      <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/90 text-xs">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-semibold text-sky-400 flex items-center gap-1">
            <Wind className="w-3.5 h-3.5" />
            Linh Căn: {character.spiritualRoot.name}
          </span>
          <span className="text-slate-400 font-mono">
            Hấp thu: x{character.spiritualRoot.rateMultiplier.toFixed(1)}
          </span>
        </div>
        <p className="text-slate-400 leading-relaxed italic">
          {character.spiritualRoot.description}
        </p>
      </div>

      {/* Combat & Survival Stats Grid */}
      <div className="grid grid-cols-2 gap-3 text-xs">
        {/* Khí Huyết (HP) */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-red-950/70 border border-red-800/50 flex items-center justify-center text-red-400 shrink-0">
            <Heart className="w-4 h-4 fill-current" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Khí Huyết (HP)</span>
            <span className="font-mono font-bold text-slate-200">
              {character.hp} / {character.maxHp}
            </span>
          </div>
        </div>

        {/* Công Kích */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amber-950/70 border border-amber-800/50 flex items-center justify-center text-amber-400 shrink-0">
            <Sword className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Lực Công Kích</span>
            <span className="font-mono font-bold text-slate-200">
              {character.attack}
            </span>
          </div>
        </div>

        {/* Phòng Ngự */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-sky-950/70 border border-sky-800/50 flex items-center justify-center text-sky-400 shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Phòng Ngự</span>
            <span className="font-mono font-bold text-slate-200">
              {character.defense}
            </span>
          </div>
        </div>

        {/* Cảnh Giới Cốt Lõi */}
        <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-purple-950/70 border border-purple-800/50 flex items-center justify-center text-purple-400 shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <span className="text-slate-400 block text-[11px]">Cảnh Giới</span>
            <span className="font-semibold text-purple-300 truncate block">
              {currentRealm.name}
            </span>
          </div>
        </div>
      </div>

      {/* Tu Tiên Thống Kê */}
      <div className="border-t border-slate-800/80 pt-3 text-xs space-y-2 text-slate-400">
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            Đột phá thành công:
          </span>
          <span className="font-mono text-emerald-400 font-bold">{character.breakthroughCount} lần</span>
        </div>
        <div className="flex justify-between">
          <span className="flex items-center gap-1">
            <AlertCircle className="w-3.5 h-3.5 text-red-400" />
            Tẩu hỏa / Thất bại:
          </span>
          <span className="font-mono text-red-400 font-bold">{character.failureCount} lần</span>
        </div>
        <div className="flex justify-between">
          <span>Thời gian tu luyện:</span>
          <span className="font-mono text-slate-300">
            {Math.floor(character.totalPlayTime / 60)} phút {character.totalPlayTime % 60} giây
          </span>
        </div>
      </div>
    </div>
  );
};
