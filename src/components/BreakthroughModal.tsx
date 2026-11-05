import React, { useState } from 'react';
import { useGameStore } from '../stores/useGameStore';
import { REALMS } from '../constants/realms';
import { X, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface BreakthroughModalProps {
  onClose: () => void;
}

export const BreakthroughModal: React.FC<BreakthroughModalProps> = ({ onClose }) => {
  const { character, inventory, attemptBreakthrough } = useGameStore();
  const [selectedPillId, setSelectedPillId] = useState<string | undefined>(undefined);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const currentRealm = REALMS[character.currentRealmIndex];
  const nextRealm = REALMS[character.currentRealmIndex + 1];

  // Tìm các đan dược có effect tăng tỉ lệ đột phá
  const availablePills = inventory.filter(
    (slot) => slot.quantity > 0 && slot.item.effect?.successRateBonus
  );

  const selectedSlot = inventory.find((s) => s.item.id === selectedPillId);
  const pillBonus = selectedSlot?.item.effect?.successRateBonus || 0;
  const rootBonus = character.spiritualRoot.breakthroughBonus || 0;
  const totalRate = Math.min(100, Math.max(5, currentRealm.baseSuccessRate + rootBonus + pillBonus));

  const handleBreakthrough = () => {
    const res = attemptBreakthrough(selectedPillId);
    setResultMessage(res.message);
    setIsSuccess(res.success);
    if (res.success) {
      setTimeout(() => {
        onClose();
      }, 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-amber-500/40 rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-200 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-5">
          <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase bg-amber-950/60 px-3 py-1 rounded-full border border-amber-800/60">
            Nghịch Thiên Cải Mệnh
          </span>
          <h3 className="text-xl font-bold font-serif text-slate-100 mt-2">
            Đột Phá Cảnh Giới
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Từ <span className="text-sky-300 font-medium">[{currentRealm.name} - {currentRealm.stage}]</span>{' '}
            tiến nhập <span className="text-amber-300 font-bold">[{nextRealm ? `${nextRealm.name} - ${nextRealm.stage}` : 'Đỉnh Phong'}]</span>
          </p>
        </div>

        {/* Result banner if clicked */}
        {resultMessage && (
          <div
            className={`p-3 rounded-xl mb-4 text-xs font-medium border flex items-center gap-2 ${
              isSuccess
                ? 'bg-emerald-950/80 text-emerald-200 border-emerald-600'
                : 'bg-red-950/80 text-red-200 border-red-600'
            }`}
          >
            {isSuccess ? <ShieldCheck className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            <span>{resultMessage}</span>
          </div>
        )}

        {/* Tỉ Lệ Đột Phá */}
        <div className="bg-slate-950/80 rounded-xl p-4 border border-slate-800 mb-4 space-y-2 text-xs">
          <div className="flex justify-between text-slate-400">
            <span>Tỉ lệ cơ bản của cảnh giới:</span>
            <span className="text-slate-200 font-mono font-medium">{currentRealm.baseSuccessRate}%</span>
          </div>
          <div className="flex justify-between text-slate-400">
            <span>Linh Căn gia thành:</span>
            <span className="text-slate-200 font-mono font-medium">+{rootBonus}%</span>
          </div>
          {pillBonus > 0 && (
            <div className="flex justify-between text-amber-400 font-semibold">
              <span>Đan dược gia thành ({selectedSlot?.item.name}):</span>
              <span className="font-mono">+{pillBonus}%</span>
            </div>
          )}
          <div className="border-t border-slate-800 pt-2 flex justify-between items-center text-sm font-bold">
            <span className="text-slate-200">Xác suất thành công cuối cùng:</span>
            <span className={`font-mono text-base ${totalRate >= 70 ? 'text-emerald-400' : totalRate >= 40 ? 'text-amber-400' : 'text-red-400'}`}>
              {totalRate.toFixed(1)}%
            </span>
          </div>
        </div>

        {/* Chọn Đan Dược Phụ Trợ */}
        <div className="mb-5">
          <label className="text-xs font-semibold text-slate-300 block mb-2">
            Đan Dược Phụ Trợ (Tăng tỉ lệ thành công):
          </label>
          {availablePills.length === 0 ? (
            <div className="text-xs text-slate-500 bg-slate-950/50 p-2.5 rounded-lg border border-slate-800/80 text-center">
              Trong túi trữ vật chưa có đan dược đột phá (như Trúc Cơ Đan).
            </div>
          ) : (
            <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
              {availablePills.map((slot) => {
                const isSelected = selectedPillId === slot.item.id;
                return (
                  <button
                    key={slot.item.id}
                    type="button"
                    onClick={() => setSelectedPillId(isSelected ? undefined : slot.item.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs text-left transition-colors ${
                      isSelected
                        ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-amber-300">{slot.item.name}</div>
                      <div className="text-[11px] text-slate-400">
                        Gia tăng +{slot.item.effect?.successRateBonus}% tỉ lệ
                      </div>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded bg-slate-800 font-mono text-slate-300">
                      x{slot.quantity}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Warning Alert */}
        <div className="flex items-start gap-2 text-[11px] text-amber-300/80 bg-amber-950/20 border border-amber-900/30 p-2.5 rounded-lg mb-5">
          <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            Cảnh báo: Đột phá thất bại sẽ tổn hao 25% tu vi và giảm sút khí huyết! Hãy chuẩn bị kỹ lưỡng trước khi trùng quan.
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={handleBreakthrough}
          className="w-full py-3 px-4 rounded-xl font-bold text-sm tracking-wide bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4 fill-current" />
          <span>Nghịch Thiên Đột Phá!</span>
        </button>
      </div>
    </div>
  );
};
