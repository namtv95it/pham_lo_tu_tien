import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { Item, InventorySlot } from '../types/game';
import { Package, Sparkles, Check } from 'lucide-react';

const RARITY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  common: { bg: 'bg-slate-900', text: 'text-slate-300', border: 'border-slate-700' },
  uncommon: { bg: 'bg-emerald-950/40', text: 'text-emerald-300', border: 'border-emerald-700/60' },
  rare: { bg: 'bg-sky-950/40', text: 'text-sky-300', border: 'border-sky-700/60' },
  epic: { bg: 'bg-purple-950/40', text: 'text-purple-300', border: 'border-purple-700/60' },
  legendary: { bg: 'bg-amber-950/50', text: 'text-amber-300', border: 'border-amber-600' },
};

export const InventoryPanel: React.FC = () => {
  const { inventory, useItem } = useGameStore();
  const [selectedSlot, setSelectedSlot] = useState<InventorySlot | null>(null);
  const [usedNotify, setUsedNotify] = useState<string | null>(null);

  const handleUseItem = (item: Item) => {
    const success = useItem(item.id);
    if (success) {
      setUsedNotify(`Đã sử dụng thành công [${item.name}]!`);
      setTimeout(() => setUsedNotify(null), 2000);
      
      // Update selected slot quantity or close if finished
      const updated = inventory.find((s) => s.item.id === item.id);
      if (!updated || updated.quantity <= 1) {
        setSelectedSlot(null);
      } else {
        setSelectedSlot({ ...selectedSlot!, quantity: updated.quantity - 1 });
      }
    }
  };

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
        <div>
          <h3 className="font-serif font-bold text-slate-100 text-lg flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <span>Túi Trữ Vật</span>
          </h3>
          <p className="text-xs text-slate-400">Không gian nạp giới chứa các loại đan dược, linh tài</p>
        </div>
        <span className="text-xs px-2.5 py-1 rounded bg-slate-950 text-slate-400 border border-slate-800 font-mono">
          {inventory.length} / 30 ô
        </span>
      </div>

      {/* Used Alert */}
      {usedNotify && (
        <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-200 border border-emerald-600 text-xs flex items-center gap-2">
          <Check className="w-4 h-4 shrink-0" />
          <span>{usedNotify}</span>
        </div>
      )}

      {/* Grid of Items */}
      {inventory.length === 0 ? (
        <div className="py-12 text-center text-slate-500 text-xs italic">
          Túi trữ vật trống không. Hãy thám hiểm bí cảnh để thu thập tài nguyên!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-72 overflow-y-auto pr-1">
          {inventory.map((slot) => {
            const rarityStyle = RARITY_COLORS[slot.item.rarity] || RARITY_COLORS.common;
            const isSelected = selectedSlot?.item.id === slot.item.id;

            return (
              <button
                key={slot.item.id}
                onClick={() => setSelectedSlot(slot)}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all relative ${
                  rarityStyle.bg
                } ${rarityStyle.border} ${
                  isSelected ? 'ring-2 ring-amber-400 shadow-[0_0_12px_rgba(245,158,11,0.3)]' : 'hover:border-slate-600'
                }`}
              >
                <div>
                  <div className={`font-semibold text-xs ${rarityStyle.text} line-clamp-1`}>
                    {slot.item.name}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5 font-mono">
                    {slot.item.type}
                  </div>
                </div>

                <div className="flex justify-between items-center mt-3 text-xs">
                  <span className="text-[11px] text-amber-400 font-mono">
                    {slot.item.value} linh thạch
                  </span>
                  <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-slate-950/80 text-slate-200 border border-slate-800">
                    x{slot.quantity}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Selected Item Detail Modal/Card */}
      {selectedSlot && (
        <div className="mt-2 p-3.5 rounded-xl bg-slate-950 border border-amber-500/30 text-xs space-y-2">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="font-bold text-amber-300 text-sm">{selectedSlot.item.name}</h4>
              <span className="text-[10px] text-slate-400 uppercase tracking-wide">
                Loại: {selectedSlot.item.type} | Phẩm giai: {selectedSlot.item.rarity}
              </span>
            </div>
            <button
              onClick={() => setSelectedSlot(null)}
              className="text-slate-500 hover:text-slate-300 text-xs"
            >
              Đóng
            </button>
          </div>

          <p className="text-slate-300 italic">{selectedSlot.item.description}</p>

          {/* Effects */}
          {selectedSlot.item.effect && (
            <div className="bg-slate-900/80 p-2 rounded-lg border border-slate-800 space-y-1 text-sky-300">
              {selectedSlot.item.effect.cultivationBonus && (
                <div>• Tăng tu vi: +{selectedSlot.item.effect.cultivationBonus} điểm</div>
              )}
              {selectedSlot.item.effect.successRateBonus && (
                <div>• Tăng tỉ lệ đột phá: +{selectedSlot.item.effect.successRateBonus}%</div>
              )}
              {selectedSlot.item.effect.lifespanBonus && (
                <div>• Kéo dài thọ nguyên: +{selectedSlot.item.effect.lifespanBonus} năm</div>
              )}
              {selectedSlot.item.effect.hpBonus && (
                <div>• Tăng sinh mệnh (HP): +{selectedSlot.item.effect.hpBonus} điểm</div>
              )}
              {selectedSlot.item.effect.attackBonus && (
                <div>• Tăng công kích: +{selectedSlot.item.effect.attackBonus} điểm</div>
              )}
            </div>
          )}

          {/* Use button */}
          <div className="pt-1 flex gap-2">
            <button
              onClick={() => handleUseItem(selectedSlot.item)}
              className="flex-1 py-2 px-3 rounded-lg font-semibold bg-amber-600 hover:bg-amber-500 text-slate-950 transition-colors flex items-center justify-center gap-1.5 text-xs shadow-md"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Sử Dụng / Luyện Hóa</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
