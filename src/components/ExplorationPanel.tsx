import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { EXPLORATION_AREAS } from '../constants/exploration';
import { REALMS } from '../constants/realms';
import { Enemy } from '../types/game';
import { Compass, Swords, Skull, ShieldAlert } from 'lucide-react';

export const ExplorationPanel: React.FC = () => {
  const { character, exploreBattle } = useGameStore();
  const [selectedAreaId, setSelectedAreaId] = useState(EXPLORATION_AREAS[0].id);
  const [battleLogs, setBattleLogs] = useState<string[]>([]);
  const [battleResult, setBattleResult] = useState<boolean | null>(null);

  const currentArea = EXPLORATION_AREAS.find((a) => a.id === selectedAreaId) || EXPLORATION_AREAS[0];
  const isEligible = character.currentRealmIndex >= currentArea.minRealmIndex;

  const handleFight = (enemy: Enemy) => {
    const res = exploreBattle(enemy);
    setBattleResult(res.won);
    setBattleLogs(res.battleLogs);
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
            <Compass className="w-5 h-5 text-sky-400" />
            <span>Lịch Luyện Bí Cảnh</span>
          </h3>
          <p className="text-xs text-slate-400">Khám phá cấm địa, tiêu diệt yêu thú, tầm tìm thiên tài địa bảo</p>
        </div>
      </div>

      {/* Area Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {EXPLORATION_AREAS.map((area) => {
          const unlocked = character.currentRealmIndex >= area.minRealmIndex;
          const isSelected = selectedAreaId === area.id;

          return (
            <button
              key={area.id}
              onClick={() => {
                setSelectedAreaId(area.id);
                setBattleLogs([]);
                setBattleResult(null);
              }}
              className={`px-3 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all border ${
                isSelected
                  ? 'bg-sky-950/80 border-sky-400 text-sky-200 shadow-[0_0_10px_rgba(56,189,248,0.3)]'
                  : unlocked
                  ? 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                  : 'bg-slate-950/30 border-slate-900 text-slate-600 opacity-60'
              }`}
            >
              <span>{area.name}</span>
              {!unlocked && (
                <span className="ml-1 text-[10px] text-amber-500/80">
                  (Y/c {REALMS[area.minRealmIndex]?.name} {REALMS[area.minRealmIndex]?.stage})
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Area Description */}
      <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/90 text-xs">
        <p className="text-slate-300 italic">{currentArea.description}</p>
      </div>

      {/* Warning if realm is too low */}
      {!isEligible ? (
        <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/60 text-xs text-red-300 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 shrink-0 text-red-400" />
          <span>
            Tu vi quá thấp! Nơi này yêu khí ngập trời, chí ít cần đạt tới cảnh giới [
            {REALMS[currentArea.minRealmIndex]?.name} - {REALMS[currentArea.minRealmIndex]?.stage}] mới được phép đặt chân vào.
          </span>
        </div>
      ) : (
        /* Enemies List */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currentArea.enemies.map((enemy) => (
            <div
              key={enemy.id}
              className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 flex flex-col justify-between transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-slate-200 text-sm flex items-center gap-1.5">
                    <Skull className="w-4 h-4 text-red-400" />
                    {enemy.name}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {enemy.realm}
                  </span>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-1 text-[11px] font-mono text-slate-400 my-2 bg-slate-900/60 p-1.5 rounded-lg border border-slate-800/50">
                  <span>HP: {enemy.hp}</span>
                  <span>Công: {enemy.attack}</span>
                  <span>Thủ: {enemy.defense}</span>
                </div>

                <div className="text-[11px] text-amber-400/90">
                  Thưởng: +{enemy.rewardStones} Linh thạch, +{enemy.rewardExp} Tu vi
                </div>
              </div>

              <button
                onClick={() => handleFight(enemy)}
                className="mt-3 w-full py-2 px-3 rounded-lg font-semibold bg-red-950/70 hover:bg-red-900/80 text-red-200 border border-red-800/60 text-xs flex items-center justify-center gap-1.5 transition-colors shadow-md active:scale-95"
              >
                <Swords className="w-3.5 h-3.5 text-red-400" />
                <span>Khiêu Chiến Ngay</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Battle logs view */}
      {battleLogs.length > 0 && (
        <div className="mt-2 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-1.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1.5">
            <span className="font-bold flex items-center gap-1 text-slate-200">
              <Swords className="w-4 h-4 text-sky-400" />
              Chiến Báo Lịch Luyện:
            </span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                battleResult ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' : 'bg-red-950 text-red-300 border border-red-800'
              }`}
            >
              {battleResult ? 'CHIẾN THẮNG' : 'THẤT BẠI'}
            </span>
          </div>
          <div className="max-h-40 overflow-y-auto space-y-1 pr-1 font-mono text-[11px] text-slate-300">
            {battleLogs.map((log, index) => (
              <div key={index} className="leading-relaxed">
                {log}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
