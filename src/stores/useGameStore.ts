import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CharacterState, InventorySlot, LogEntry, Enemy } from '../types/game';
import { REALMS } from '../constants/realms';
import { INITIAL_ITEMS } from '../constants/items';
import confetti from 'canvas-confetti';

interface GameState {
  character: CharacterState;
  inventory: InventorySlot[];
  logs: LogEntry[];
  
  // Actions
  meditateOnce: () => void;
  toggleMeditation: () => void;
  gameTick: () => void;
  attemptBreakthrough: (usedItemId?: string) => { success: boolean; message: string };
  useItem: (itemId: string) => boolean;
  addLog: (message: string, type?: LogEntry['type']) => void;
  exploreBattle: (enemy: Enemy) => { won: boolean; battleLogs: string[] };
  renameCharacter: (name: string) => void;
  resetGame: () => void;
}

const DEFAULT_CHARACTER: CharacterState = {
  name: 'Hàn Lập Sơn',
  title: 'Phàm Cốt Tán Tu',
  slogan: 'Thân mang phàm cốt, tâm hướng tiên đồ.',
  gender: 'male',
  spiritualRoot: {
    name: 'Ngũ Hành Tạp Linh Căn',
    quality: 'Phàm Cốt (Ngũ Tạp Linh Căn)',
    rateMultiplier: 1.0,
    breakthroughBonus: 0,
    description: 'Tư chất bình phàm nhất thiên hạ, hấp thu linh khí chậm chạp nhưng ngũ hành cân bằng, vạn pháp đều có thể tu tập.',
  },
  currentRealmIndex: 0,
  cultivation: 0,
  lifespan: 16,
  maxLifespan: 80, // Phàm nhân tối đa 80 năm
  spiritStones: 10,
  hp: 120,
  maxHp: 120,
  attack: 15,
  defense: 5,
  isMeditating: false,
  autoBreakthrough: false,
  totalPlayTime: 0,
  breakthroughCount: 0,
  failureCount: 0,
};

const INITIAL_LOGS: LogEntry[] = [
  {
    id: 'log_init_1',
    timestamp: 'Vừa rồi',
    message: 'Ngươi ngước nhìn bầu trời mênh mông, thầm niệm: "Thân mang phàm cốt, tâm hướng tiên đồ!"',
    type: 'story',
  },
  {
    id: 'log_init_2',
    timestamp: 'Vừa rồi',
    message: 'Ngươi tìm thấy một phiến đá sạch trong hang núi, bắt đầu nếm thử cảm ứng thiên địa linh khí.',
    type: 'info',
  },
];

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      character: DEFAULT_CHARACTER,
      inventory: [
        { item: INITIAL_ITEMS['tu_khi_dan'], quantity: 3 },
        { item: INITIAL_ITEMS['linh_nhuoc_thao'], quantity: 5 },
      ],
      logs: INITIAL_LOGS,

      addLog: (message: string, type: LogEntry['type'] = 'info') => {
        const newLog: LogEntry = {
          id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
          timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false }),
          message,
          type,
        };
        set((state) => ({
          logs: [newLog, ...state.logs.slice(0, 99)], // Lưu 100 log gần nhất
        }));
      },

      renameCharacter: (name: string) => {
        if (!name.trim()) return;
        set((state) => ({
          character: { ...state.character, name: name.trim() },
        }));
        get().addLog(`Ngươi đã lấy đạo hiệu là "${name.trim()}".`, 'story');
      },

      meditateOnce: () => {
        const { character, addLog } = get();
        const currentRealm = REALMS[character.currentRealmIndex];
        
        if (character.cultivation >= currentRealm.maxCultivation) {
          addLog('Tu vi đã đạt bình cảnh cực hạn, hãy tiến hành Đột Phá!', 'info');
          return;
        }

        const gain = Math.max(1, Math.floor(5 * character.spiritualRoot.rateMultiplier));
        const newCultivation = Math.min(currentRealm.maxCultivation, character.cultivation + gain);

        set((state) => ({
          character: {
            ...state.character,
            cultivation: newCultivation,
          },
        }));
      },

      toggleMeditation: () => {
        set((state) => {
          const nextState = !state.character.isMeditating;
          return {
            character: { ...state.character, isMeditating: nextState },
          };
        });
        const isMed = get().character.isMeditating;
        get().addLog(
          isMed 
            ? 'Ngươi ngồi xếp bằng, buông bỏ tạp niệm, bắt đầu thổ nạp thiên địa linh khí...' 
            : 'Ngươi thu liễm khí tức, chấm dứt bế quan.',
          'info'
        );
      },

      gameTick: () => {
        const state = get();
        const { character } = state;
        const currentRealm = REALMS[character.currentRealmIndex];

        let updatedCultivation = character.cultivation;
        let isMeditating = character.isMeditating;

        if (isMeditating) {
          if (character.cultivation < currentRealm.maxCultivation) {
            // Tốc độ hấp thu theo giây
            const baseGainPerSec = Math.max(1, Math.floor((character.currentRealmIndex + 2) * character.spiritualRoot.rateMultiplier));
            updatedCultivation = Math.min(currentRealm.maxCultivation, character.cultivation + baseGainPerSec);
          }
        }

        // Tăng tuổi thọ: Cứ mỗi 120 giây chơi game tính là 1 năm trôi qua
        const newPlayTime = character.totalPlayTime + 1;
        let newLifespan = character.lifespan;
        if (newPlayTime % 120 === 0 && newLifespan < character.maxLifespan) {
          newLifespan += 1;
          if (newLifespan % 5 === 0) {
            state.addLog(`Thời gian thấm thoát thoi đưa, ngươi đã ${newLifespan} tuổi. Tiên lộ mịt mờ, phải tranh từng tấc thời gian!`, 'info');
          }
        }

        set({
          character: {
            ...character,
            cultivation: updatedCultivation,
            totalPlayTime: newPlayTime,
            lifespan: newLifespan,
            isMeditating,
          },
        });
      },

      attemptBreakthrough: (usedItemId?: string) => {
        const { character, inventory, addLog } = get();
        const currentRealm = REALMS[character.currentRealmIndex];

        if (character.cultivation < currentRealm.maxCultivation) {
          return { success: false, message: 'Tu vi chưa viên mãn, cưỡng ép đột phá tất phải trả giá đắt!' };
        }

        let bonusRate = character.spiritualRoot.breakthroughBonus;

        // Nếu sử dụng đan dược phụ trợ (ví dụ Trúc Cơ Đan)
        if (usedItemId) {
          const slot = inventory.find((s) => s.item.id === usedItemId && s.quantity > 0);
          if (slot && slot.item.effect?.successRateBonus) {
            bonusRate += slot.item.effect.successRateBonus;
            // Trừ 1 viên đan
            set((st) => ({
              inventory: st.inventory
                .map((s) => (s.item.id === usedItemId ? { ...s, quantity: s.quantity - 1 } : s))
                .filter((s) => s.quantity > 0),
            }));
            addLog(`Ngươi nuốt vào một viên ${slot.item.name}, dược lực bùng nổ trong đan điền!`, 'info');
          }
        }

        const totalRate = Math.min(100, Math.max(5, currentRealm.baseSuccessRate + bonusRate));
        const roll = Math.random() * 100;

        if (roll <= totalRate) {
          // Thành công
          const nextRealmIndex = character.currentRealmIndex + 1;
          const nextRealm = REALMS[nextRealmIndex];

          try {
            confetti({
              particleCount: 120,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#38bdf8', '#f59e0b', '#a855f7'],
            });
          } catch {
            // Ignore if canvas confetti not supported in test environment
          }

          if (nextRealm) {
            set((st) => ({
              character: {
                ...st.character,
                currentRealmIndex: nextRealmIndex,
                cultivation: 0,
                maxLifespan: st.character.maxLifespan + nextRealm.lifespanBonus,
                maxHp: st.character.maxHp + nextRealm.hpBonus,
                hp: st.character.maxHp + nextRealm.hpBonus,
                attack: st.character.attack + nextRealm.attackBonus,
                breakthroughCount: st.character.breakthroughCount + 1,
              },
            }));
            const msg = `OÀNH! Lôi kiếp tan biến! Ngươi đã đột phá thành công lên [${nextRealm.name} - ${nextRealm.stage}]!`;
            addLog(msg, 'breakthrough');
            return { success: true, message: msg };
          } else {
            const msg = 'Chúc mừng Đạo Hữu! Ngươi đã tu đến đỉnh phong tuyệt đỉnh của phiên bản hiện tại!';
            addLog(msg, 'breakthrough');
            return { success: true, message: msg };
          }
        } else {
          // Thất bại: Mất 25% tu vi
          const lostCultivation = Math.floor(currentRealm.maxCultivation * 0.25);
          const remainCultivation = Math.max(0, character.cultivation - lostCultivation);

          set((st) => ({
            character: {
              ...st.character,
              cultivation: remainCultivation,
              hp: Math.max(10, Math.floor(st.character.hp * 0.7)),
              failureCount: st.character.failureCount + 1,
            },
          }));

          const failMsg = `Khí huyết nghịch chuyển, tâm ma nhiễu loạn! Đột phá thất bại (Tỉ lệ: ${totalRate.toFixed(1)}%). Tổn thất ${lostCultivation} điểm tu vi!`;
          addLog(failMsg, 'danger');
          return { success: false, message: failMsg };
        }
      },

      useItem: (itemId: string) => {
        const { inventory, character, addLog } = get();
        const slot = inventory.find((s) => s.item.id === itemId && s.quantity > 0);
        if (!slot) return false;

        const item = slot.item;
        let used = false;

        if (item.effect?.cultivationBonus) {
          const currentRealm = REALMS[character.currentRealmIndex];
          const newCultivation = Math.min(currentRealm.maxCultivation, character.cultivation + item.effect.cultivationBonus);
          set((st) => ({
            character: { ...st.character, cultivation: newCultivation },
          }));
          addLog(`Sử dụng [${item.name}], tăng ${item.effect.cultivationBonus} điểm tu vi!`, 'loot');
          used = true;
        }

        if (item.effect?.lifespanBonus) {
          set((st) => ({
            character: { ...st.character, maxLifespan: st.character.maxLifespan + (item.effect?.lifespanBonus || 0) },
          }));
          addLog(`Nuốt [${item.name}], thọ nguyên kéo dài thêm ${item.effect.lifespanBonus} năm!`, 'loot');
          used = true;
        }

        if (item.effect?.hpBonus) {
          set((st) => ({
            character: { 
              ...st.character, 
              maxHp: st.character.maxHp + (item.effect?.hpBonus || 0),
              hp: st.character.hp + (item.effect?.hpBonus || 0),
            },
          }));
          addLog(`Sử dụng [${item.name}], sinh mệnh khí huyết gia tăng ${item.effect.hpBonus}!`, 'loot');
          used = true;
        }

        if (item.effect?.attackBonus) {
          set((st) => ({
            character: { ...st.character, attack: st.character.attack + (item.effect?.attackBonus || 0) },
          }));
          addLog(`Trang bị [${item.name}], lực công kích tăng thêm ${item.effect.attackBonus}!`, 'loot');
          used = true;
        }

        if (used) {
          set((st) => ({
            inventory: st.inventory
              .map((s) => (s.item.id === itemId ? { ...s, quantity: s.quantity - 1 } : s))
              .filter((s) => s.quantity > 0),
          }));
        }

        return used;
      },

      exploreBattle: (enemy: Enemy) => {
        const { character, addLog } = get();
        const battleLogs: string[] = [];

        battleLogs.push(`Ngươi tao ngộ [${enemy.name}] (${enemy.realm})!`);

        let playerHp = character.hp;
        let enemyHp = enemy.hp;

        // Auto combat turns
        let round = 1;
        while (playerHp > 0 && enemyHp > 0 && round <= 15) {
          // Player attacks
          const playerDmg = Math.max(1, character.attack - enemy.defense + Math.floor(Math.random() * 5));
          enemyHp -= playerDmg;
          battleLogs.push(`Hiệp ${round}: Ngươi tung chưởng pháp gây ${playerDmg} sát thương (Địch còn ${Math.max(0, enemyHp)} HP).`);

          if (enemyHp <= 0) break;

          // Enemy attacks
          const enemyDmg = Math.max(1, enemy.attack - character.defense + Math.floor(Math.random() * 3));
          playerHp -= enemyDmg;
          battleLogs.push(`Hiệp ${round}: [${enemy.name}] phản kích gây ${enemyDmg} sát thương (Ngươi còn ${Math.max(0, playerHp)} HP).`);

          round++;
        }

        const won = enemyHp <= 0;

        if (won) {
          battleLogs.push(`Ngươi đã đánh bại [${enemy.name}]! Thu được ${enemy.rewardStones} Linh thạch và ${enemy.rewardExp} Tu vi.`);
          addLog(`Chiến thắng oanh liệt trước [${enemy.name}], thu hoạch phong phú!`, 'loot');

          // Cập nhật tu vi và linh thạch
          const currentRealm = REALMS[character.currentRealmIndex];
          const newCultivation = Math.min(currentRealm.maxCultivation, character.cultivation + enemy.rewardExp);

          // Rơi đồ
          const droppedSlots: InventorySlot[] = [];
          for (const drop of enemy.dropItems) {
            if (Math.random() <= drop.chance) {
              const baseItem = INITIAL_ITEMS[drop.itemId];
              if (baseItem) {
                droppedSlots.push({ item: baseItem, quantity: 1 });
                battleLogs.push(`Nhặt được chiến lợi phẩm: [${baseItem.name}]!`);
                addLog(`Từ thi thể [${enemy.name}] tìm được [${baseItem.name}]!`, 'loot');
              }
            }
          }

          set((st) => {
            const newInv = [...st.inventory];
            for (const drop of droppedSlots) {
              const existing = newInv.find((s) => s.item.id === drop.item.id);
              if (existing && existing.item.stackable) {
                existing.quantity += drop.quantity;
              } else {
                newInv.push(drop);
              }
            }
            return {
              character: {
                ...st.character,
                cultivation: newCultivation,
                spiritStones: st.character.spiritStones + enemy.rewardStones,
                hp: Math.max(20, playerHp),
              },
              inventory: newInv,
            };
          });
        } else {
          battleLogs.push(`Ngươi bất địch [${enemy.name}], đành phải dùng Huyết Độn Thuật chạy trốn thoát thân!`);
          addLog(`Bị [${enemy.name}] trọng thương, gắng gượng trốn thoát!`, 'danger');
          set((st) => ({
            character: { ...st.character, hp: Math.max(10, Math.floor(st.character.maxHp * 0.2)) },
          }));
        }

        return { won, battleLogs };
      },

      resetGame: () => {
        set({
          character: { ...DEFAULT_CHARACTER, lifespan: 16 },
          inventory: [
            { item: INITIAL_ITEMS['tu_khi_dan'], quantity: 3 },
            { item: INITIAL_ITEMS['linh_nhuoc_thao'], quantity: 5 },
          ],
          logs: INITIAL_LOGS,
        });
        get().addLog('Ngươi tự phế tu vi, chuyển thế trùng tu, bắt đầu lại một thế nhân sinh!', 'story');
      },
    }),
    {
      name: 'pham_lo_tu_tien_save',
    }
  )
);
