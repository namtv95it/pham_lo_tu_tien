import React from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Scroll, Zap, ShieldAlert, Gift, BookOpen } from 'lucide-react';

export const LogPanel: React.FC = () => {
  const { logs } = useGameStore();

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />;
      case 'danger':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />;
      case 'loot':
        return <Gift className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />;
      case 'story':
        return <BookOpen className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />;
      default:
        return <Scroll className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />;
    }
  };

  const getLogTextColor = (type: string) => {
    switch (type) {
      case 'breakthrough':
        return 'text-amber-300 font-semibold';
      case 'danger':
        return 'text-red-400';
      case 'loot':
        return 'text-emerald-300';
      case 'story':
        return 'text-purple-300 italic';
      default:
        return 'text-slate-300';
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-3">
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
        <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-400" />
          <span>Ngọc Giản Tu Chân</span>
        </h3>
        <span className="text-[11px] text-slate-400 font-mono">
          {logs.length} ghi chép
        </span>
      </div>

      <div className="max-h-64 overflow-y-auto space-y-2 pr-1 text-xs">
        {logs.map((log) => (
          <div
            key={log.id}
            className="flex items-start gap-2 p-2 rounded-lg bg-slate-950/60 border border-slate-800/60 leading-relaxed"
          >
            {getLogIcon(log.type)}
            <div className="flex-1">
              <span className="text-[10px] text-slate-500 font-mono mr-1.5">
                [{log.timestamp}]
              </span>
              <span className={getLogTextColor(log.type)}>{log.message}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
