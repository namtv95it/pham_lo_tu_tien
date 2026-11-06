import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServerInfo } from './ServerSelectScreen';
import { CreatedCharacterData } from './CharacterCreateScreen';

// 1. Fullscreen Background
import backgroundBattle from '@/assets/images/main_game/background_battle.png';

// 2. HUD & Currencies
import avatarPlayer from '@/assets/images/main_game/avatar_player_framed.png';
import iconSpiritEnergy from '@/assets/images/main_game/icon_spirit_energy.png';
import iconCrystalBlue from '@/assets/images/main_game/icon_crystal_blue.png';
import iconGoldIngot from '@/assets/images/main_game/icon_gold_ingot.png';
import btnAddPlus from '@/assets/images/main_game/button_add_plus.png';

// 3. Quick Menu
import iconDailyReward from '@/assets/images/main_game/icon_daily_reward_gift.png';
import iconFirstRecharge from '@/assets/images/main_game/icon_first_recharge_ingot.png';
import iconEvent from '@/assets/images/main_game/icon_event_no_text.png';
import iconSevenDay from '@/assets/images/main_game/icon_seven_day_no_text.png';
import iconQuests from '@/assets/images/main_game/icon_quests_scroll.png';
import iconNotificationDot from '@/assets/images/main_game/icon_notification_dot.png';
import iconMail from '@/assets/images/main_game/icon_mail.png';
import iconFriends from '@/assets/images/main_game/icon_friends.png';
import iconRanking from '@/assets/images/main_game/icon_ranking_trophy.png';
import iconCrossedSwords from '@/assets/images/main_game/icon_crossed_swords.png';

// 4. Battle Arena & Scenery
import topBattleStageFrame from '@/assets/images/main_game/top_battle_stage_frame_blank.png';
import iconStageComplete from '@/assets/images/main_game/icon_stage_complete.png';
import iconBossSwords from '@/assets/images/main_game/icon_boss_cross_swords.png';
import iconStageMonster from '@/assets/images/main_game/icon_stage_monster.png';
import iconRewardChest from '@/assets/images/main_game/icon_reward_chest.png';
import heroAttack from '@/assets/images/main_game/hero_sword_attack_with_slash.png';
import monsterWolfBoss from '@/assets/images/main_game/monster_wolf_boss.png';
import monsterWolfSmall from '@/assets/images/main_game/monster_wolf_small.png';

// 5. Huyền Lộ Bình & Slots
import tagGreenBlank from '@/assets/images/main_game/tag_green_blank.png';
import spiralEnergy from '@/assets/images/main_game/spiral_energy.png';
import bottleEmerald from '@/assets/images/main_game/bottle_emerald_lotus_highres.png';
import energyProgressBar from '@/assets/images/main_game/energy_progress_bar.png';
import energyProgressEmpty from '@/assets/images/main_game/energy_progress_empty.png';
import iconInfo from '@/assets/images/main_game/icon_info.png';
import slotPurpleEmpty from '@/assets/images/main_game/slot_purple_empty.png';

// Slot Base Icons
import slotSword from '@/assets/images/main_game/slot_sword.png';
import slotRobe from '@/assets/images/main_game/slot_robe.png';
import slotBracelet from '@/assets/images/main_game/slot_bracelet.png';
import slotJadePendant from '@/assets/images/main_game/slot_jade_pendant.png';
import slotBoots from '@/assets/images/main_game/slot_boots.png';
import slotBelt from '@/assets/images/main_game/slot_belt.png';
import slotTalisman from '@/assets/images/main_game/slot_talisman.png';
import slotRing from '@/assets/images/main_game/slot_ring.png';
import slotGourd from '@/assets/images/main_game/slot_gourd.png';
import slotLotus from '@/assets/images/main_game/slot_lotus.png';
import slotManual from '@/assets/images/main_game/slot_manual.png';
import slotLocked from '@/assets/images/main_game/slot_locked.png';

// Equipment Item Icons
import itemSword from '@/assets/images/main_game/item_sword.png';
import itemRobe from '@/assets/images/main_game/item_robe.png';
import itemBracelet from '@/assets/images/main_game/item_bracelet.png';
import itemJadePendant from '@/assets/images/main_game/item_jade_pendant.png';
import itemBoots from '@/assets/images/main_game/item_boots.png';
import itemBelt from '@/assets/images/main_game/item_belt.png';
import itemTalisman from '@/assets/images/main_game/item_talisman.png';
import itemRing from '@/assets/images/main_game/item_ring.png';
import itemGourd from '@/assets/images/main_game/item_gourd.png';
import itemLotus from '@/assets/images/main_game/item_lotus.png';
import itemManual from '@/assets/images/main_game/item_manual.png';
import itemLocked from '@/assets/images/main_game/item_locked.png';
import itemSwordAmberRare from '@/assets/images/main_game/item_sword_amber_rare.png';
import itemRobeSpecial from '@/assets/images/main_game/item_robe_special.png';
import itemBookSpecial from '@/assets/images/main_game/item_book_special.png';

// 6. Action & Comparison UI Components
import buttonGoldExtra from '@/assets/images/main_game/button_gold_extra.png';
import tagJadeCenter from '@/assets/images/main_game/tag_jade_center_blank.png';
import comparisonCardLeft from '@/assets/images/main_game/comparison_card_left_blank.png';
import comparisonCardRight from '@/assets/images/main_game/comparison_card_right_blank.png';
import arrowUpgradeGreen from '@/assets/images/main_game/arrow_upgrade_green.png';
import btnBlueBlank from '@/assets/images/main_game/btn_blue_blank.png';
import btnGoldBlank from '@/assets/images/main_game/btn_gold_blank.png';

// 7. Bottom Navigation
import navHuyenLoBinh from '@/assets/images/main_game/nav_huyen_lo_binh.png';
import navCultivationManual from '@/assets/images/main_game/nav_cultivation_manual.png';
import navSpiritBeast from '@/assets/images/main_game/nav_spirit_beast.png';
import navSecretRealm from '@/assets/images/main_game/nav_secret_realm.png';
import navCaveAbode from '@/assets/images/main_game/nav_cave_abode.png';

interface MainGameScreenProps {
  server?: ServerInfo | null;
  character?: CreatedCharacterData | null;
  onBackToServerSelect: () => void;
  onLogout: () => void;
}

// Cấu trúc trang bị
export interface EquipmentItem {
  id: string;
  name: string;
  slotIndex: number; // 0 to 11
  slotName: string;
  slotIcon: string;
  itemIcon: string;
  level: number;
  quality: 'pham' | 'ha' | 'trung' | 'cuc' | 'tien';
  qualityName: string;
  qualityColor: string;
  atk: number;
  hp: number;
  crit: number; // %
}

// 12 Ô trang bị mẫu chuẩn
const INITIAL_EQUIPMENT: EquipmentItem[] = [
  // Cột Trái
  {
    id: 'eq_1',
    name: 'Thanh Mộc Kiếm',
    slotIndex: 0,
    slotName: 'Vũ Khí',
    slotIcon: slotSword,
    itemIcon: itemSword,
    level: 12,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 4820,
    hp: 28600,
    crit: 5.6,
  },
  {
    id: 'eq_2',
    name: 'Thanh Vân Đạo Bào',
    slotIndex: 1,
    slotName: 'Đạo Bào',
    slotIcon: slotRobe,
    itemIcon: itemRobe,
    level: 10,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 1200,
    hp: 42000,
    crit: 2.1,
  },
  {
    id: 'eq_3',
    name: 'Kim Cang Linh Hoàn',
    slotIndex: 2,
    slotName: 'Vòng Tay',
    slotIcon: slotBracelet,
    itemIcon: itemBracelet,
    level: 10,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 2400,
    hp: 18000,
    crit: 4.2,
  },
  {
    id: 'eq_4',
    name: 'Hàn Ngọc Bội',
    slotIndex: 3,
    slotName: 'Ngọc Bội',
    slotIcon: slotJadePendant,
    itemIcon: itemJadePendant,
    level: 11,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 3100,
    hp: 22000,
    crit: 4.8,
  },
  {
    id: 'eq_5',
    name: 'Lý Phong Ngoa',
    slotIndex: 4,
    slotName: 'Giày',
    slotIcon: slotBoots,
    itemIcon: itemBoots,
    level: 10,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 1800,
    hp: 19500,
    crit: 3.5,
  },
  {
    id: 'eq_6',
    name: 'Tử Vân Đới',
    slotIndex: 5,
    slotName: 'Đai Lưng',
    slotIcon: slotBelt,
    itemIcon: itemBelt,
    level: 9,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 1500,
    hp: 25000,
    crit: 2.8,
  },

  // Cột Phải
  {
    id: 'eq_7',
    name: 'Cửu Thiên Linh Phù',
    slotIndex: 6,
    slotName: 'Pháp Phù',
    slotIcon: slotTalisman,
    itemIcon: itemTalisman,
    level: 11,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 3600,
    hp: 14000,
    crit: 6.2,
  },
  {
    id: 'eq_8',
    name: 'Bát Quái Kính',
    slotIndex: 7,
    slotName: 'Linh Hoàn',
    slotIcon: slotRing,
    itemIcon: itemRing,
    level: 10,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 2900,
    hp: 21000,
    crit: 4.0,
  },
  {
    id: 'eq_9',
    name: 'Tử Kim Hồ Lô',
    slotIndex: 8,
    slotName: 'Hồ Lô',
    slotIcon: slotGourd,
    itemIcon: itemGourd,
    level: 9,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 2200,
    hp: 26000,
    crit: 3.1,
  },
  {
    id: 'eq_10',
    name: 'Bích Thủy Liên Hoa',
    slotIndex: 9,
    slotName: 'Liên Hoa',
    slotIcon: slotLotus,
    itemIcon: itemLotus,
    level: 10,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 2700,
    hp: 31000,
    crit: 3.8,
  },
  {
    id: 'eq_11',
    name: 'Thần Mộc Quyết',
    slotIndex: 10,
    slotName: 'Bí Kíp',
    slotIcon: slotManual,
    itemIcon: itemManual,
    level: 9,
    quality: 'trung',
    qualityName: 'Trung Phẩm',
    qualityColor: 'text-purple-400',
    atk: 3400,
    hp: 16000,
    crit: 5.0,
  },
  {
    id: 'eq_12',
    name: 'Trúc Cơ Khóa',
    slotIndex: 11,
    slotName: 'Trúc Cơ mở',
    slotIcon: slotLocked,
    itemIcon: itemLocked,
    level: 0,
    quality: 'pham',
    qualityName: 'Khóa',
    qualityColor: 'text-slate-400',
    atk: 0,
    hp: 0,
    crit: 0,
  },
];

// Mẫu tên và icon cho các lần Luyện Hóa đồ mới
const DRAWABLE_ITEMS = [
  {
    slotIndex: 0,
    name: 'Huyền Quang Kiếm',
    slotName: 'Vũ Khí',
    itemIcon: itemSwordAmberRare,
    quality: 'cuc' as const,
    qualityName: 'Cực Phẩm',
    qualityColor: 'text-amber-400',
    atkMul: 1.4,
    hpMul: 1.2,
    critMul: 1.3,
  },
  {
    slotIndex: 1,
    name: 'Cửu Long Thiên Bào',
    slotName: 'Đạo Bào',
    itemIcon: itemRobeSpecial,
    quality: 'cuc' as const,
    qualityName: 'Cực Phẩm',
    qualityColor: 'text-amber-400',
    atkMul: 1.25,
    hpMul: 1.45,
    critMul: 1.15,
  },
  {
    slotIndex: 10,
    name: 'Thái Cực Tiên Thư',
    slotName: 'Bí Kíp',
    itemIcon: itemBookSpecial,
    quality: 'cuc' as const,
    qualityName: 'Cực Phẩm',
    qualityColor: 'text-amber-400',
    atkMul: 1.5,
    hpMul: 1.2,
    critMul: 1.4,
  },
  {
    slotIndex: 3,
    name: 'Thanh Ngọc Tiên Bội',
    slotName: 'Ngọc Bội',
    itemIcon: itemJadePendant,
    quality: 'cuc' as const,
    qualityName: 'Cực Phẩm',
    qualityColor: 'text-amber-400',
    atkMul: 1.35,
    hpMul: 1.35,
    critMul: 1.2,
  },
  {
    slotIndex: 2,
    name: 'Bát Hoang Linh Hoàn',
    slotName: 'Vòng Tay',
    itemIcon: itemBracelet,
    quality: 'tien' as const,
    qualityName: 'Tiên Phẩm',
    qualityColor: 'text-rose-400',
    atkMul: 1.8,
    hpMul: 1.5,
    critMul: 1.6,
  },
];

interface DamageNumber {
  id: number;
  text: string;
  x: number;
  y: number;
  isCrit?: boolean;
}

export const MainGameScreen: React.FC<MainGameScreenProps> = ({
  server,
  character,
  onBackToServerSelect,
  onLogout,
}) => {
  // --- 1. THÔNG TIN NGƯỜI CHƠI & TÀI NGUYÊN ---
  const [playerName] = useState(character?.name || 'Vân Mộng');
  const [combatPower, setCombatPower] = useState(358420);
  const [spiritEnergy, setSpiritEnergy] = useState(25480); // Linh Khí
  const [crystals, setCrystals] = useState(3280); // Linh Thạch (mỗi lần luyện tốn 10)
  const [gold, setGold] = useState(680); // Kim Nguyên Bảo

  // --- 2. TRẠNG THÁI HUYỀN LỘ BÌNH ---
  const [bottleLevel, setBottleLevel] = useState(12);
  const [bottleExp, setBottleExp] = useState(680);
  const maxBottleExp = 1000;
  const [isBottleShaking, setIsBottleShaking] = useState(false);
  const [isAutoRefining, setIsAutoRefining] = useState(false);
  const [skipComparison, setSkipComparison] = useState(false);

  // --- 3. TRANG BỊ & SO SÁNH PHÁP BẢO ---
  const [equippedItems, setEquippedItems] = useState<EquipmentItem[]>(INITIAL_EQUIPMENT);
  const [newItemComparison, setNewItemComparison] = useState<{
    current: EquipmentItem;
    incoming: EquipmentItem;
  } | null>({
    current: INITIAL_EQUIPMENT[0],
    incoming: {
      id: 'eq_new_sample',
      name: 'Huyền Quang Kiếm',
      slotIndex: 0,
      slotName: 'Vũ Khí',
      slotIcon: slotSword,
      itemIcon: itemSwordAmberRare,
      level: 14,
      quality: 'cuc',
      qualityName: 'Cực Phẩm',
      qualityColor: 'text-amber-400',
      atk: 6720,
      hp: 33800,
      crit: 7.2,
    },
  });

  // Popup nhảy lực chiến khi trang bị
  const [powerGainToast, setPowerGainToast] = useState<number | null>(null);

  // --- 4. BATTLE LOOP (CHIẾN ĐẤU TỰ ĐỘNG PHÍA TRÊN) ---
  const [isHeroAttacking, setIsHeroAttacking] = useState(false);
  const [wolfBossHp, setWolfBossHp] = useState(100);
  const [wolfSmallHp, setWolfSmallHp] = useState(100);
  const [isWolfBossHit, setIsWolfBossHit] = useState(false);
  const [isWolfSmallHit, setIsWolfSmallHit] = useState(false);
  const [damageNumbers, setDamageNumbers] = useState<DamageNumber[]>([]);
  const [autoBattle, setAutoBattle] = useState(true);
  const damageIdRef = useRef(1);

  // --- 5. TABS & MODALS ---
  const [activeBottomNav, setActiveBottomNav] = useState<'binh' | 'cong_phap' | 'linh_thu' | 'bi_canh' | 'dong_phu'>('binh');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Vòng lặp chiến đấu tự động
  useEffect(() => {
    if (!autoBattle) return;

    const battleInterval = setInterval(() => {
      setIsHeroAttacking(true);

      setTimeout(() => {
        const bossDmg = Math.floor(Math.random() * 4000) + 11000;
        const smallDmg = Math.floor(Math.random() * 3000) + 7000;

        setIsWolfBossHit(true);
        setIsWolfSmallHit(true);

        const newId = damageIdRef.current++;
        setDamageNumbers([
          { id: newId, text: `-${bossDmg.toLocaleString()}`, x: 260, y: 70, isCrit: true },
          { id: newId + 1, text: `-${smallDmg.toLocaleString()}`, x: 330, y: 95 },
        ]);

        setWolfBossHp((hp) => (hp <= 20 ? 100 : hp - 20));
        setWolfSmallHp((hp) => (hp <= 30 ? 100 : hp - 30));

        setTimeout(() => {
          setIsWolfBossHit(false);
          setIsWolfSmallHit(false);
        }, 300);
      }, 150);

      setTimeout(() => {
        setIsHeroAttacking(false);
      }, 400);
    }, 2000);

    return () => clearInterval(battleInterval);
  }, [autoBattle]);

  // Vòng lặp Tự Động Luyện Hóa
  useEffect(() => {
    if (!isAutoRefining) return;

    const autoRefineInterval = setInterval(() => {
      if (crystals < 10) {
        setIsAutoRefining(false);
        setActiveModal('Hết Linh Thạch! Đã tạm dừng Tự Động Luyện Hóa.');
        return;
      }
      handleRefineBottle();
    }, 1500);

    return () => clearInterval(autoRefineInterval);
  }, [isAutoRefining, crystals]);

  // Hàm xử lý "Luyện Hóa"
  const handleRefineBottle = () => {
    if (crystals < 10) {
      setActiveModal('Hết Linh Thạch! Hãy tham gia bí cảnh hoặc chiến đấu để tích lũy thêm.');
      setIsAutoRefining(false);
      return;
    }

    setCrystals((c) => c - 10);
    setIsBottleShaking(true);

    setBottleExp((exp) => {
      if (exp + 20 >= maxBottleExp) {
        setBottleLevel((lvl) => lvl + 1);
        return (exp + 20) - maxBottleExp;
      }
      return exp + 20;
    });

    setTimeout(() => {
      setIsBottleShaking(false);

      const template = DRAWABLE_ITEMS[Math.floor(Math.random() * DRAWABLE_ITEMS.length)];
      const currentItem = equippedItems[template.slotIndex] || equippedItems[0];

      const newAtk = Math.round(currentItem.atk * template.atkMul);
      const newHp = Math.round(currentItem.hp * template.hpMul);
      const newCrit = Number((currentItem.crit * template.critMul).toFixed(1));

      const incomingItem: EquipmentItem = {
        id: `drawn_${Date.now()}`,
        name: template.name,
        slotIndex: template.slotIndex,
        slotName: template.slotName,
        slotIcon: currentItem.slotIcon,
        itemIcon: template.itemIcon,
        level: currentItem.level + Math.floor(Math.random() * 3) + 1,
        quality: template.quality,
        qualityName: template.qualityName,
        qualityColor: template.qualityColor,
        atk: newAtk,
        hp: newHp,
        crit: newCrit,
      };

      if (skipComparison) {
        const isBetter = newAtk > currentItem.atk;
        if (isBetter) {
          equipItem(incomingItem);
        } else {
          disassembleItem(incomingItem);
        }
      } else {
        setNewItemComparison({
          current: currentItem,
          incoming: incomingItem,
        });
      }
    }, 300);
  };

  // Trang bị món đồ mới
  const equipItem = (itemToEquip: EquipmentItem) => {
    const current = equippedItems[itemToEquip.slotIndex];
    const powerDiff = (itemToEquip.atk - current.atk) * 5 + (itemToEquip.hp - current.hp) / 2;

    setEquippedItems((prev) => {
      const next = [...prev];
      next[itemToEquip.slotIndex] = itemToEquip;
      return next;
    });

    const gain = Math.max(500, Math.round(powerDiff));
    setCombatPower((p) => p + gain);
    setPowerGainToast(gain);
    setTimeout(() => setPowerGainToast(null), 1500);

    setNewItemComparison(null);
  };

  // Phân giải món đồ
  const disassembleItem = (item: EquipmentItem) => {
    const spiritGain = item.level * 15 + 120;
    setSpiritEnergy((s) => s + spiritGain);
    setNewItemComparison(null);
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none bg-[#02100d] font-sans text-white">
      {/* ẢNH NỀN TOÀN TRANG: background_battle.png */}
      <img
        src={backgroundBattle}
        alt="Background Battle"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />

      {/* 1. TOP HEADER HUD (Avatar, Tên, Lực Chiến, Cảnh Giới, 3 Khung Tài Nguyên) */}
      <header className="relative z-30 w-full px-2.5 pt-1.5 pb-1 flex items-center justify-between flex-shrink-0 bg-gradient-to-b from-[#031c17]/95 via-[#041a16]/80 to-transparent">
        {/* Cụm Avatar + Thông tin nhân vật */}
        <div className="flex items-center gap-2 flex-1 min-w-0 pr-1">
          {/* Avatar có khung */}
          <div
            className="relative w-[46px] h-[46px] sm:w-[50px] sm:h-[50px] flex-shrink-0 cursor-pointer active:scale-95 transition-transform"
            onClick={() =>
              setActiveModal(
                `Máy chủ: ${server?.name || 'S1 - Phàm Lộ'}\nĐạo hiệu: ${playerName}\nCảnh giới: Luyện Khí Tầng 9\nLực chiến: ${combatPower.toLocaleString()}`
              )
            }
          >
            <img src={avatarPlayer} alt="Avatar" className="w-full h-full object-contain drop-shadow-md" />
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-[#09221a] text-[#8cf0c8] border border-emerald-600 font-extrabold text-[7.5px] px-1.5 rounded-full leading-none shadow-xs">
              Lv.68
            </span>
          </div>

          {/* Tên + Lực Chiến + Cảnh Giới */}
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-extrabold text-[11.5px] sm:text-[12.5px] text-[#ebf8f2] tracking-wide truncate drop-shadow-xs">
              {playerName}
            </span>
            <div className="flex items-center gap-1 text-[10px] sm:text-[10.5px] text-amber-300 font-black leading-none drop-shadow-xs mt-0.5">
              <span>Lực Chiến</span>
              <span className="text-amber-200">{combatPower.toLocaleString()}</span>
            </div>
            {/* Cảnh giới Tu vi */}
            <div className="mt-1 inline-flex items-center gap-1 bg-emerald-950/80 border border-emerald-700/60 rounded-full px-1.5 py-0.5 w-fit">
              <span className="text-[8px] text-[#a7f3d0] font-bold leading-none">☁ Luyện Khí Tầng 9</span>
            </div>
          </div>
        </div>

        {/* Cụm 3 Tài Nguyên chuẩn tỷ lệ đồng nhất 22px */}
        <div className="flex items-center gap-1 flex-shrink-0">
          {/* 1. Linh Khí */}
          <div className="h-[22px] bg-[#04241d]/90 border border-emerald-600/70 rounded-full flex items-center justify-between px-1.5 shadow-xs gap-1">
            <img src={iconSpiritEnergy} alt="Linh Khí" className="w-[15px] h-[15px] object-contain drop-shadow-xs" />
            <span className="font-extrabold text-[9px] text-[#9df5d3] leading-none">{spiritEnergy.toLocaleString()}</span>
            <button className="w-[13px] h-[13px] active:scale-90 transition-transform cursor-pointer">
              <img src={btnAddPlus} alt="Add" className="w-full h-full object-contain" />
            </button>
          </div>

          {/* 2. Linh Thạch */}
          <div className="h-[22px] bg-[#04241d]/90 border border-sky-600/70 rounded-full flex items-center justify-between px-1.5 shadow-xs gap-1">
            <img src={iconCrystalBlue} alt="Linh Thạch" className="w-[14px] h-[14px] object-contain drop-shadow-xs" />
            <span className="font-extrabold text-[9px] text-sky-200 leading-none">{crystals.toLocaleString()}</span>
            <button className="w-[13px] h-[13px] active:scale-90 transition-transform cursor-pointer">
              <img src={btnAddPlus} alt="Add" className="w-full h-full object-contain" />
            </button>
          </div>

          {/* 3. Kim Nguyên Bảo */}
          <div className="h-[22px] bg-[#04241d]/90 border border-amber-600/70 rounded-full flex items-center justify-between px-1.5 shadow-xs gap-1">
            <img src={iconGoldIngot} alt="Vàng" className="w-[15px] h-[12px] object-contain drop-shadow-xs" />
            <span className="font-extrabold text-[9px] text-amber-200 leading-none">{gold.toLocaleString()}</span>
            <button className="w-[13px] h-[13px] active:scale-90 transition-transform cursor-pointer">
              <img src={btnAddPlus} alt="Add" className="w-full h-full object-contain" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. KHU VỰC CHIẾN ĐẤU (BATTLE ARENA) - Tỷ lệ vàng rộng rãi, chuẩn bố cục Nấm Lùn Tiến Lên */}
      <div className="relative w-full h-[205px] sm:h-[220px] flex-shrink-0 overflow-hidden">
        {/* 4 Nút Sự Kiện Góc Phải Trên (Phúc Lợi, Nạp Đầu, Sự Kiện, Mục Tiêu 7 Ngày) */}
        <div className="absolute right-2 top-0.5 z-20 flex items-center gap-2">
          <button
            onClick={() => {
              setGold((g) => g + 100);
              setActiveModal('Đã nhận Phúc Lợi Hàng Ngày: +100 Kim Nguyên Bảo!');
            }}
            className="relative flex flex-col items-center active:scale-90 transition-transform cursor-pointer"
          >
            <img src={iconDailyReward} alt="Phúc Lợi" className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain drop-shadow-md" />
            <span className="text-[8px] font-black text-amber-200 drop-shadow-[0_1px_2px_black] leading-tight">Phúc Lợi</span>
            <img src={iconNotificationDot} alt="dot" className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] object-contain" />
          </button>
          <button onClick={() => setActiveModal('Nạp Đầu Nhận Quà')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconFirstRecharge} alt="Nạp Đầu" className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain drop-shadow-md" />
            <span className="text-[8px] font-black text-amber-200 drop-shadow-[0_1px_2px_black] leading-tight">Nạp Đầu</span>
          </button>
          <button onClick={() => setActiveModal('Sự Kiện Tiên Giới')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconEvent} alt="Sự Kiện" className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain drop-shadow-md" />
            <span className="text-[8px] font-black text-amber-200 drop-shadow-[0_1px_2px_black] leading-tight">Sự Kiện</span>
          </button>
          <button onClick={() => setActiveModal('Mục Tiêu 7 Ngày')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconSevenDay} alt="Mục Tiêu 7 Ngày" className="w-[28px] h-[28px] sm:w-[30px] sm:h-[30px] object-contain drop-shadow-md" />
            <span className="text-[8px] font-black text-amber-200 drop-shadow-[0_1px_2px_black] leading-tight">Mục Tiêu 7N</span>
          </button>
        </div>

        {/* Thanh Ải và Tiến Trình (Ải 7-15 • Sơn Lâm Yêu Vực) - Căn giữa phía dưới hàng sự kiện */}
        <div className="absolute top-10 inset-x-0 flex flex-col items-center z-10 pointer-events-none">
          <div className="relative w-[184px] sm:w-[200px] h-[24px] flex items-center justify-center">
            <img src={topBattleStageFrame} alt="Khung Ải" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md" />
            <span className="relative z-10 font-black text-[9.5px] sm:text-[10px] text-amber-200 tracking-wide drop-shadow-md -translate-y-0.5">
              Ải 7-15 • Sơn Lâm Yêu Vực
            </span>
          </div>

          {/* 5 Nút Tiến Trình Ải với dây lộ trình */}
          <div className="relative flex items-center gap-2 mt-1">
            <div className="absolute inset-x-1 top-1/2 -translate-y-1/2 h-[1.5px] bg-amber-400/50 -z-0" />
            <img src={iconStageComplete} alt="Passed" className="relative z-10 w-[12px] h-[12px] object-contain" />
            <img src={iconStageComplete} alt="Passed" className="relative z-10 w-[12px] h-[12px] object-contain" />
            <img src={iconBossSwords} alt="Current" className="relative z-10 w-[16px] h-[16px] object-contain animate-pulse drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]" />
            <img src={iconStageMonster} alt="Monster" className="relative z-10 w-[13px] h-[13px] object-contain opacity-75" />
            <img src={iconRewardChest} alt="Chest" className="relative z-10 w-[13px] h-[13px] object-contain opacity-85" />
          </div>
        </div>

        {/* Cột Menu Dọc Bên Trái (Nhiệm Vụ, Thư, Hảo Hữu, Xếp Hạng) */}
        <div className="absolute left-2.5 top-11 z-20 flex flex-col gap-1.5 items-center">
          <button onClick={() => setActiveModal('Nhiệm Vụ Tông Môn')} className="relative flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconQuests} alt="Nhiệm Vụ" className="w-[22px] h-[22px] object-contain drop-shadow-md" />
            <span className="text-[7px] font-black text-amber-100 drop-shadow-[0_1px_2px_black] leading-none mt-0.5">Nhiệm Vụ</span>
            <img src={iconNotificationDot} alt="dot" className="absolute -top-0.5 -right-0.5 w-[7px] h-[7px] object-contain" />
          </button>
          <button onClick={() => setActiveModal('Hòm Thư Tiên Hữu')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconMail} alt="Thư" className="w-[22px] h-[22px] object-contain drop-shadow-md" />
            <span className="text-[7px] font-black text-amber-100 drop-shadow-[0_1px_2px_black] leading-none mt-0.5">Thư</span>
          </button>
          <button onClick={() => setActiveModal('Hảo Hữu Đồng Đạo')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconFriends} alt="Hảo Hữu" className="w-[22px] h-[22px] object-contain drop-shadow-md" />
            <span className="text-[7px] font-black text-amber-100 drop-shadow-[0_1px_2px_black] leading-none mt-0.5">Hảo Hữu</span>
          </button>
          <button onClick={() => setActiveModal('Bảng Xếp Hạng Tiên Môn')} className="flex flex-col items-center active:scale-90 transition-transform cursor-pointer">
            <img src={iconRanking} alt="Xếp Hạng" className="w-[22px] h-[22px] object-contain drop-shadow-md" />
            <span className="text-[7px] font-black text-amber-100 drop-shadow-[0_1px_2px_black] leading-none mt-0.5">Xếp Hạng</span>
          </button>
        </div>

        {/* Rương Tích Lũy AFK (12:00:00) */}
        <div onClick={() => setActiveModal('Nhận Thưởng Tích Lũy Tu Luyện')} className="absolute left-2.5 bottom-1.5 z-20 flex flex-col items-center cursor-pointer active:scale-95 transition-transform">
          <img src={iconRewardChest} alt="Rương AFK" className="w-[32px] h-[32px] object-contain drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] animate-bounce" />
          <span className="bg-[#04241d]/90 text-amber-300 border border-amber-600/70 text-[7px] font-extrabold px-1.5 rounded-full shadow-xs leading-none mt-0.5">
            12:00:00
          </span>
        </div>

        {/* Nút Bật/Tắt Tự Động Chiến Đấu */}
        <button
          onClick={() => setAutoBattle(!autoBattle)}
          className={`absolute right-2.5 bottom-1.5 z-20 w-[36px] h-[36px] rounded-full flex flex-col items-center justify-center cursor-pointer active:scale-90 transition-all ${
            autoBattle ? 'bg-amber-500/90 border-2 border-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-slate-800/80 border border-slate-600 opacity-60'
          }`}
        >
          <img src={iconCrossedSwords} alt="Tự Động" className="w-[18px] h-[18px] object-contain" />
          <span className="text-[6.5px] font-black text-slate-950 leading-none">Tự Động</span>
        </button>

        {/* Rơi vàng và tinh thể trên mặt cỏ */}
        <div className="absolute left-[44%] bottom-2 flex items-center gap-1 pointer-events-none z-10 opacity-85">
          <img src={iconGoldIngot} alt="Loot" className="w-[14px] h-[10px] object-contain drop-shadow" />
          <img src={iconCrystalBlue} alt="Loot" className="w-[12px] h-[12px] object-contain drop-shadow -ml-1" />
          <img src={iconGoldIngot} alt="Loot" className="w-[12px] h-[8px] object-contain drop-shadow -ml-0.5" />
        </div>

        {/* --- NHÂN VẬT CHÍNH (HERO) TẤN CÔNG BẰNG KIẾM KHÍ --- */}
        <div className="absolute left-[54px] sm:left-[64px] bottom-1 z-10 pointer-events-none">
          <motion.div
            animate={isHeroAttacking ? { x: [0, 15, 0], scale: [1, 1.04, 1] } : { x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative"
          >
            <img
              src={heroAttack}
              alt="Hero"
              className="w-[96px] sm:w-[108px] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            />
          </motion.div>
        </div>

        {/* --- 2 CON SÓI YÊU THÚ ĐỐI DIỆN --- */}
        <div className="absolute right-[40px] sm:right-[50px] bottom-1 z-10 flex items-end gap-1.5 pointer-events-none">
          {/* Sói Đầu Đàn (Wolf Boss) */}
          <div className="relative flex flex-col items-center">
            {/* Thanh Máu Sói Boss */}
            <div className="w-[52px] h-[4px] bg-slate-900 border border-black rounded-full overflow-hidden mb-0.5">
              <div className="h-full bg-red-600 transition-all duration-200" style={{ width: `${wolfBossHp}%` }} />
            </div>

            <motion.img
              src={monsterWolfBoss}
              alt="Wolf Boss"
              animate={isWolfBossHit ? { x: [-3, 3, -1, 1, 0], filter: ['brightness(1)', 'brightness(1.8) drop-shadow(0 0 10px red)', 'brightness(1)'] } : {}}
              transition={{ duration: 0.3 }}
              className="w-[84px] sm:w-[94px] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            />
          </div>

          {/* Sói Con (Wolf Small) */}
          <div className="relative flex flex-col items-center -ml-3 translate-y-0.5">
            <div className="w-[38px] h-[3px] bg-slate-900 border border-black rounded-full overflow-hidden mb-0.5">
              <div className="h-full bg-red-600 transition-all duration-200" style={{ width: `${wolfSmallHp}%` }} />
            </div>

            <motion.img
              src={monsterWolfSmall}
              alt="Wolf Small"
              animate={isWolfSmallHit ? { x: [-2, 2, -1, 1, 0], filter: ['brightness(1)', 'brightness(1.8) drop-shadow(0 0 8px red)', 'brightness(1)'] } : {}}
              transition={{ duration: 0.3 }}
              className="w-[56px] sm:w-[64px] h-auto object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>

        {/* Số Sát Thương Nhảy Lên (Floating Damage Numbers) */}
        <AnimatePresence>
          {damageNumbers.map((dmg) => (
            <motion.div
              key={dmg.id}
              initial={{ opacity: 0, y: dmg.y, scale: 0.6 }}
              animate={{ opacity: 1, y: dmg.y - 20, scale: dmg.isCrit ? 1.25 : 1 }}
              exit={{ opacity: 0, y: dmg.y - 35 }}
              transition={{ duration: 0.55 }}
              className={`absolute font-black tracking-wider drop-shadow-[0_2px_4px_black] z-30 pointer-events-none ${
                dmg.isCrit ? 'text-amber-400 text-[11px] sm:text-xs' : 'text-orange-300 text-[10px] sm:text-[11px]'
              }`}
              style={{ left: `${dmg.x}px` }}
            >
              {dmg.text}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* 4. THANH THỐNG KÊ AFK (EXP + Linh Thạch + Linh Khí) */}
      <div className="relative z-20 w-full px-3 py-0.5 flex items-center justify-between text-[8.5px] sm:text-[9px] font-extrabold bg-[#031d17]/70 border-y border-emerald-600/30 flex-shrink-0 backdrop-blur-xs">
        <div className="flex items-center gap-1 text-[#8cf0c8]">
          <span className="bg-[#123e31] px-1 rounded text-[7px] font-mono">EXP</span>
          <span>+15.260/Phút</span>
        </div>
        <div className="flex items-center gap-1 text-sky-300">
          <img src={iconCrystalBlue} alt="LT" className="w-[12px] h-[12px] object-contain" />
          <span>Linh Thạch +3.840/Phút</span>
        </div>
        <div className="flex items-center gap-1 text-emerald-300">
          <img src={iconSpiritEnergy} alt="LK" className="w-[12px] h-[12px] object-contain" />
          <span>Linh Khí +120/Phút</span>
        </div>
      </div>

      {/* 5. KHU VỰC HUYỀN LỘ BÌNH & 12 Ô TRANG BỊ */}
      <div className="relative z-20 w-full flex-1 min-h-0 flex flex-col justify-center items-center px-2 py-1 gap-1 overflow-hidden bg-transparent">
        {/* Tiêu đề "Huyền Lộ Bình Lv.12" */}
        <div className="relative flex flex-col items-center justify-center flex-shrink-0">
          <div className="relative w-[140px] sm:w-[150px] h-[26px] sm:h-[28px] flex items-center justify-center">
            <img src={tagGreenBlank} alt="Title Banner" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-sm" />
            <div className="relative z-10 flex items-center gap-1 -translate-y-0.5">
              <span className="font-extrabold text-[10.5px] sm:text-[11px] text-amber-200 tracking-wider drop-shadow-md">Huyền Lộ Bình</span>
              <button
                onClick={() =>
                  setActiveModal(`Cấp Huyền Lộ Bình: Lv.${bottleLevel}\nTỷ lệ nhận đồ Cực Phẩm: 12.5%, Tiên Phẩm: 2.1%`)
                }
                className="w-[14px] h-[14px] text-amber-300 font-bold text-[8px] border border-amber-400 rounded-full flex items-center justify-center cursor-pointer hover:bg-amber-400/20"
              >
                i
              </button>
            </div>
          </div>
          <span className="text-[9px] font-black text-amber-300 drop-shadow-xs -mt-0.5">Lv.{bottleLevel}</span>
        </div>

        {/* Cụm Trung Tâm: 6 Ô Trang Bị Trái + BÌNH PHÉP + 6 Ô Trang Bị Phải */}
        <div className="relative w-full flex items-center justify-between px-1 flex-shrink-0">
          {/* CỘT TRÁI: 6 Ô TRANG BỊ (2 cột x 3 hàng) */}
          <div className="grid grid-cols-2 gap-1 z-10">
            {equippedItems.slice(0, 6).map((item) => (
              <EquipmentSlotCard key={item.id} item={item} onClick={() => setActiveModal(`Pháp Bảo: ${item.name} (+${item.level})\nCông: +${item.atk}\nHP: +${item.hp}\nBạo Kích: +${item.crit}%`)} />
            ))}
          </div>

          {/* BÌNH THẦN HUYỀN LỘ BÌNH TỎA SÁNG Ở TRUNG TÂM */}
          <div className="relative flex-1 flex flex-col items-center justify-center mx-1 z-0">
            {/* Hiệu ứng xoáy hào quang ma thuật */}
            <motion.img
              src={spiralEnergy}
              alt="Spiral Energy"
              animate={{ rotate: 360 }}
              transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
              className="absolute w-[110px] h-[110px] sm:w-[120px] sm:h-[120px] object-contain opacity-70 pointer-events-none rounded-full"
            />

            {/* Bình Ngọc Đặt Trên Đài Sen */}
            <motion.div
              animate={isBottleShaking ? { rotate: [-8, 8, -6, 6, 0], scale: [1, 1.15, 1] } : { y: [0, -3, 0] }}
              transition={isBottleShaking ? { duration: 0.3 } : { duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="relative cursor-pointer active:scale-95 transition-transform"
              onClick={handleRefineBottle}
              title="Nhấn để Luyện Hóa!"
            >
              <img
                src={bottleEmerald}
                alt="Huyền Lộ Bình"
                className="w-[78px] sm:w-[86px] h-auto object-contain drop-shadow-[0_0_16px_rgba(52,211,153,0.7)]"
              />
            </motion.div>

            {/* Thanh Tiến Trình Đột Phá Bình (680 / 1.000) */}
            <div className="relative w-[96px] sm:w-[105px] h-[11px] flex items-center justify-center mt-0.5">
              <img src={energyProgressEmpty} alt="Empty Bar" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
              <div
                className="absolute left-[3%] top-[15%] bottom-[15%] rounded-full overflow-hidden transition-all duration-300"
                style={{ width: `${Math.min(94, (bottleExp / maxBottleExp) * 94)}%` }}
              >
                <img src={energyProgressBar} alt="Progress" className="w-full h-full object-cover" />
              </div>
              <span className="relative z-10 font-black text-[7.5px] text-white tracking-wider drop-shadow-[0_1px_2px_black]">
                {bottleExp}/{maxBottleExp}
              </span>
              <button
                onClick={() => setActiveModal(`Tiến độ Huyền Lộ Bình: ${bottleExp}/${maxBottleExp}\nLuyện hóa mỗi lần +20 EXP.`)}
                className="absolute -right-3.5 w-[12px] h-[12px] flex items-center justify-center cursor-pointer active:scale-90"
              >
                <img src={iconInfo} alt="Info" className="w-full h-full object-contain drop-shadow" />
              </button>
            </div>
          </div>

          {/* CỘT PHẢI: 6 Ô TRANG BỊ (2 cột x 3 hàng) */}
          <div className="grid grid-cols-2 gap-1 z-10">
            {equippedItems.slice(6, 12).map((item) => (
              <EquipmentSlotCard key={item.id} item={item} onClick={() => setActiveModal(`Pháp Bảo: ${item.name} (+${item.level})\nCông: +${item.atk}\nHP: +${item.hp}\nBạo Kích: +${item.crit}%`)} />
            ))}
          </div>
        </div>

        {/* HÀNG ĐIỀU KHIỂN: NÚT TỰ ĐỘNG + NÚT TO [10 💎 LUYỆN HÓA] + CHECKBOX BỎ QUA SO SÁNH */}
        <div className="relative w-full flex items-center justify-between px-2 pt-1 pb-0.5 flex-shrink-0">
          {/* Nút "⚙ Tự Động" */}
          <button
            onClick={() => setIsAutoRefining(!isAutoRefining)}
            className={`px-3 py-1 rounded-full border text-[9px] font-black flex items-center gap-1 active:scale-95 transition-all cursor-pointer shadow-md ${
              isAutoRefining
                ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.8)]'
                : 'bg-[#093126]/90 text-amber-200 border-amber-500/60'
            }`}
          >
            <span>⚙</span>
            <span>{isAutoRefining ? 'Đang Luyện' : 'Tự Động'}</span>
          </button>

          {/* NÚT TO CHÍNH GIỮA: [💎 10  Luyện Hóa] với khung buttonGoldExtra */}
          <button
            onClick={handleRefineBottle}
            className="relative w-[142px] sm:w-[155px] h-[36px] sm:h-[38px] flex items-center justify-center cursor-pointer active:scale-95 transition-transform drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)] z-20 group"
          >
            <img src={buttonGoldExtra} alt="Luyện Hóa" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
            <div className="relative z-10 flex items-center gap-1.5 -translate-y-0.5">
              <img src={iconCrystalBlue} alt="LT" className="w-[14px] h-[14px] object-contain drop-shadow" />
              <span className="font-extrabold text-[11px] sm:text-xs text-amber-100">10</span>
              <span className="font-black text-xs sm:text-[13px] text-amber-950 tracking-wide">Luyện Hóa</span>
            </div>
          </button>

          {/* Checkbox "Bỏ qua so sánh" */}
          <label className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-200 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={skipComparison}
              onChange={(e) => setSkipComparison(e.target.checked)}
              className="accent-emerald-500 w-[14px] h-[14px] rounded cursor-pointer"
            />
            <span className="drop-shadow-[0_1px_2px_black]">Bỏ qua</span>
          </label>
        </div>
      </div>

      {/* 6. BẢNG SO SÁNH PHÁP BẢO (XUẤT HIỆN KHI LUYỆN ĐƯỢC ĐỒ MỚI) */}
      <div className="relative z-20 w-full px-2 mt-1 mb-0.5 flex-shrink-0">
        {newItemComparison ? (
          <div className="relative w-full bg-[#fbf6e8] border-2 border-amber-500/90 rounded-2xl p-1.5 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Header: "So Sánh Pháp Bảo" với khung ngọc tag_jade_center_blank */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-[130px] sm:w-[140px] h-[24px] flex items-center justify-center">
              <img src={tagJadeCenter} alt="Header" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow" />
              <span className="relative z-10 text-amber-200 text-[9px] sm:text-[9.5px] font-black tracking-wider drop-shadow -translate-y-0.5">
                So Sánh Pháp Bảo
              </span>
            </div>

            <div className="flex items-center justify-between gap-1 pt-1">
              {/* Thẻ Trái: "Đang dùng" với khung comparison_card_left_blank */}
              <div className="relative flex-1 h-[56px] sm:h-[60px] flex items-center px-1.5 py-1">
                <img src={comparisonCardLeft} alt="Card Left" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
                <span className="text-[7px] font-extrabold bg-[#856b46] text-white px-1.5 py-0.2 rounded-full absolute -top-1.5 left-2 z-10 shadow-xs">
                  Đang dùng
                </span>
                <div className="relative z-10 flex items-center gap-1.5 w-full pt-1">
                  <div className="relative w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] flex-shrink-0 flex items-center justify-center">
                    <img src={slotPurpleEmpty} alt="Slot" className="absolute inset-0 w-full h-full object-contain" />
                    <img src={newItemComparison.current.itemIcon} alt="Current" className="relative z-10 w-[20px] h-[20px] object-contain" />
                  </div>
                  <div className="text-[8px] sm:text-[8.5px] font-extrabold leading-tight min-w-0">
                    <div className="text-purple-800 truncate font-black">{newItemComparison.current.name} +{newItemComparison.current.level}</div>
                    <div className="text-slate-700">Công: +{newItemComparison.current.atk.toLocaleString()}</div>
                    <div className="text-slate-700">HP: +{newItemComparison.current.hp.toLocaleString()}</div>
                    <div className="text-slate-700">Bạo: +{newItemComparison.current.crit}%</div>
                  </div>
                </div>
              </div>

              {/* Mũi tên nâng cấp xanh lá */}
              <img src={arrowUpgradeGreen} alt="arrow" className="w-[15px] h-[15px] object-contain flex-shrink-0 z-10" />

              {/* Thẻ Phải: "Mới nhận" với khung comparison_card_right_blank */}
              <div className="relative flex-1 h-[56px] sm:h-[60px] flex items-center px-1.5 py-1">
                <img src={comparisonCardRight} alt="Card Right" className="absolute inset-0 w-full h-full object-fill pointer-events-none" />
                <div className="flex items-center justify-between absolute -top-1.5 inset-x-2 z-10">
                  <span className="text-[7px] font-extrabold bg-emerald-700 text-white px-1.5 py-0.2 rounded-full shadow-xs">
                    Mới nhận
                  </span>
                  <span className="text-[7px] font-extrabold bg-red-600 text-amber-200 px-1.5 py-0.2 rounded-full shadow-xs">
                    {newItemComparison.incoming.qualityName}
                  </span>
                </div>

                <div className="relative z-10 flex items-center gap-1.5 w-full pt-1">
                  <div className="relative w-[30px] h-[30px] sm:w-[32px] sm:h-[32px] flex-shrink-0 flex items-center justify-center">
                    <img src={slotPurpleEmpty} alt="Slot" className="absolute inset-0 w-full h-full object-contain brightness-125 hue-rotate-30" />
                    <img src={newItemComparison.incoming.itemIcon} alt="Incoming" className="relative z-10 w-[20px] h-[20px] object-contain" />
                  </div>
                  <div className="text-[8px] sm:text-[8.5px] font-extrabold leading-tight min-w-0">
                    <div className="text-amber-900 truncate font-black">{newItemComparison.incoming.name}</div>
                    <div className="text-emerald-700 font-black">Công: +{newItemComparison.incoming.atk.toLocaleString()} ⬆</div>
                    <div className="text-emerald-700 font-black">HP: +{newItemComparison.incoming.hp.toLocaleString()} ⬆</div>
                    <div className="text-emerald-700 font-black">Bạo: +{newItemComparison.incoming.crit}% ⬆</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 2 Nút Hành Động: [Phân Giải] & [Trang Bị] dùng khung btnBlueBlank & btnGoldBlank */}
            <div className="flex items-center gap-2 pt-1.5">
              <button
                onClick={() => disassembleItem(newItemComparison.incoming)}
                className="relative flex-1 h-[28px] sm:h-[30px] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              >
                <img src={btnBlueBlank} alt="Phân Giải" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                <span className="relative z-10 text-white font-black text-[10px] sm:text-[10.5px] drop-shadow-[0_1px_2px_black] -translate-y-0.5">
                  Phân Giải
                </span>
              </button>
              <button
                onClick={() => equipItem(newItemComparison.incoming)}
                className="relative flex-1 h-[28px] sm:h-[30px] flex items-center justify-center active:scale-95 transition-transform cursor-pointer"
              >
                <img src={btnGoldBlank} alt="Trang Bị" className="absolute inset-0 w-full h-full object-contain pointer-events-none" />
                <span className="relative z-10 text-amber-950 font-black text-[10px] sm:text-[10.5px] tracking-wide -translate-y-0.5">
                  Trang Bị
                </span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative w-full h-[98px] sm:h-[105px] bg-[#03201a]/70 border border-emerald-600/40 rounded-2xl flex flex-col items-center justify-center px-4 py-2 text-center backdrop-blur-xs">
            <span className="text-amber-300 font-black text-[11px] sm:text-xs drop-shadow">✨ Đang Chờ Luyện Hóa Pháp Bảo ✨</span>
            <span className="text-[#a7f3d0] text-[9px] sm:text-[9.5px] mt-1 opacity-80 leading-snug">
              Nhấn nút [10 Luyện Hóa] để đột phá cảnh giới và mở khóa pháp bảo thần binh
            </span>
          </div>
        )}
      </div>

      {/* 7. BOTTOM NAVIGATION BAR (5 Tabs) - Tất cả 5 nút đồng đều 100% */}
      <footer className="relative z-30 w-full px-2 pt-0.5 pb-1 sm:pb-2 flex flex-col items-center bg-gradient-to-t from-[#01140f] via-[#021813]/95 to-transparent flex-shrink-0">
        {/* Đường viền hoa sen hoàng kim phía trên Bottom Bar */}
        <div className="relative w-full flex items-center justify-center mb-0.5">
          <div className="flex-1 h-[1.5px] bg-gradient-to-r from-transparent via-amber-400/70 to-amber-300" />
          <div className="mx-1.5 text-amber-300 flex items-center justify-center">
            <svg className="w-4 h-4 drop-shadow-[0_0_6px_rgba(251,191,36,0.9)]" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C11.5 5 9.5 8 7 9C9.5 10 11.5 13 12 16C12.5 13 14.5 10 17 9C14.5 8 12.5 5 12 2Z" />
              <path d="M12 16C9 14.5 5 15.5 2 19C6 19 9.5 18 12 16Z" opacity="0.8" />
              <path d="M12 16C15 14.5 19 15.5 22 19C18 19 14.5 18 12 16Z" opacity="0.8" />
            </svg>
          </div>
          <div className="flex-1 h-[1.5px] bg-gradient-to-l from-transparent via-amber-400/70 to-amber-300" />
        </div>

        {/* 5 Nút Điều Hướng Chính - KÍCH THƯỚC ĐỒNG NHẤT 40x40px */}
        <div className="w-full flex items-center justify-around">
          {/* Tab 1 */}
          <button
            onClick={() => setActiveBottomNav('binh')}
            className="flex flex-col items-center active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              {activeBottomNav === 'binh' && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse" />
              )}
              <img
                src={navHuyenLoBinh}
                alt="Huyền Lộ Bình"
                className={`w-full h-full object-contain transition-all ${
                  activeBottomNav === 'binh'
                    ? 'scale-105 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
            <span
              className={`text-[8px] sm:text-[8.5px] font-black leading-tight mt-0.5 drop-shadow-[0_1px_2px_black] ${
                activeBottomNav === 'binh' ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              Huyền Lộ Bình
            </span>
          </button>

          {/* Tab 2 */}
          <button
            onClick={() => {
              setActiveBottomNav('cong_phap');
              setActiveModal('Tính năng Công Pháp (Tu Luyện Tâm Pháp)');
            }}
            className="flex flex-col items-center active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              {activeBottomNav === 'cong_phap' && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse" />
              )}
              <img
                src={navCultivationManual}
                alt="Công Pháp"
                className={`w-full h-full object-contain transition-all ${
                  activeBottomNav === 'cong_phap'
                    ? 'scale-105 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
            <span
              className={`text-[8px] sm:text-[8.5px] font-black leading-tight mt-0.5 drop-shadow-[0_1px_2px_black] ${
                activeBottomNav === 'cong_phap' ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              Công Pháp
            </span>
          </button>

          {/* Tab 3 */}
          <button
            onClick={() => {
              setActiveBottomNav('linh_thu');
              setActiveModal('Tính năng Linh Thú (Bạch Hổ, Huyền Vũ)');
            }}
            className="flex flex-col items-center active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              {activeBottomNav === 'linh_thu' && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse" />
              )}
              <img
                src={navSpiritBeast}
                alt="Linh Thú"
                className={`w-full h-full object-contain transition-all ${
                  activeBottomNav === 'linh_thu'
                    ? 'scale-105 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
            <span
              className={`text-[8px] sm:text-[8.5px] font-black leading-tight mt-0.5 drop-shadow-[0_1px_2px_black] ${
                activeBottomNav === 'linh_thu' ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              Linh Thú
            </span>
          </button>

          {/* Tab 4 */}
          <button
            onClick={() => {
              setActiveBottomNav('bi_canh');
              setActiveModal('Tính năng Bí Cảnh (Phụ Bản Thí Luyện)');
            }}
            className="flex flex-col items-center active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              {activeBottomNav === 'bi_canh' && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse" />
              )}
              <img
                src={navSecretRealm}
                alt="Bí Cảnh"
                className={`w-full h-full object-contain transition-all ${
                  activeBottomNav === 'bi_canh'
                    ? 'scale-105 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
            <span
              className={`text-[8px] sm:text-[8.5px] font-black leading-tight mt-0.5 drop-shadow-[0_1px_2px_black] ${
                activeBottomNav === 'bi_canh' ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              Bí Cảnh
            </span>
          </button>

          {/* Tab 5 */}
          <button
            onClick={() => {
              setActiveBottomNav('dong_phu');
              setActiveModal('Tính năng Động Phủ (Luyện Đan, Trồng Dược)');
            }}
            className="flex flex-col items-center active:scale-95 transition-transform cursor-pointer"
          >
            <div className="relative w-[38px] h-[38px] sm:w-[42px] sm:h-[42px] flex items-center justify-center">
              {activeBottomNav === 'dong_phu' && (
                <div className="absolute inset-0 rounded-full bg-amber-400/40 blur-md animate-pulse" />
              )}
              <img
                src={navCaveAbode}
                alt="Động Phủ"
                className={`w-full h-full object-contain transition-all ${
                  activeBottomNav === 'dong_phu'
                    ? 'scale-105 drop-shadow-[0_0_8px_rgba(251,191,36,0.9)]'
                    : 'opacity-70 hover:opacity-100'
                }`}
              />
            </div>
            <span
              className={`text-[8px] sm:text-[8.5px] font-black leading-tight mt-0.5 drop-shadow-[0_1px_2px_black] ${
                activeBottomNav === 'dong_phu' ? 'text-amber-300' : 'text-slate-300'
              }`}
            >
              Động Phủ
            </span>
          </button>
        </div>
      </footer>

      {/* TOAST NHẢY LỰC CHIẾN (KHI THAY ĐỒ THÀNH CÔNG) */}
      <AnimatePresence>
        {powerGainToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1.15 }}
            exit={{ opacity: 0, y: -40 }}
            className="absolute top-1/3 left-1/2 -translate-x-1/2 z-50 bg-[#07251e]/95 border-2 border-amber-400 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(251,191,36,0.9)] flex items-center gap-1.5 pointer-events-none"
          >
            <span className="text-amber-300 font-black text-xs">Lực Chiến:</span>
            <span className="text-emerald-400 font-black text-sm">+{powerGainToast.toLocaleString()} ⬆</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MODAL THÔNG TIN CHUNG (Khi bấm vào các icon tính năng) */}
      {activeModal && (
        <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[300px] bg-[#fbf6e8] border-2 border-amber-500 rounded-2xl p-4 shadow-2xl text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-base text-emerald-950 font-serif border-b border-amber-300 pb-2">
              📜 Tiên Giới Thông Cáo
            </h3>
            <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
              {activeModal}
            </p>
            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setActiveModal(null)}
                className="flex-1 py-1.5 bg-gradient-to-r from-emerald-700 to-teal-600 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                Đã Rõ
              </button>
              {activeModal.includes('Máy chủ') && (
                <>
                  <button
                    onClick={onBackToServerSelect}
                    className="px-3 py-1.5 bg-amber-700 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    Đổi Server
                  </button>
                  <button
                    onClick={onLogout}
                    className="px-3 py-1.5 bg-red-800 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                  >
                    Đăng Xuất
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Component thẻ ô trang bị nhỏ với kích thước chuẩn 40x40px
const EquipmentSlotCard: React.FC<{ item: EquipmentItem; onClick: () => void }> = ({ item, onClick }) => {
  const isLocked = item.level === 0;

  return (
    <div
      onClick={onClick}
      className={`relative w-[40px] h-[40px] sm:w-[44px] sm:h-[44px] flex items-center justify-center cursor-pointer transition-all active:scale-90 ${
        isLocked ? 'opacity-70' : 'drop-shadow-md hover:brightness-110'
      }`}
      title={item.name}
    >
      {/* Khung ô tím slot_purple_empty hoặc slot_locked */}
      <img
        src={isLocked ? slotLocked : slotPurpleEmpty}
        alt="Slot"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
      />

      {/* Icon Pháp Bảo bên trong */}
      <img
        src={item.itemIcon}
        alt={item.name}
        className="relative z-10 w-[26px] h-[26px] sm:w-[28px] sm:h-[28px] object-contain drop-shadow-md"
      />

      {/* Cấp độ trang bị (Góc trên phải) */}
      {!isLocked && (
        <span className="absolute -top-1 -right-1 z-20 bg-amber-400 text-[#281500] font-black text-[7px] sm:text-[7.5px] px-1 rounded-full shadow-xs leading-none">
          +{item.level}
        </span>
      )}

      {/* Nhãn khóa nếu chưa mở */}
      {isLocked && (
        <span className="absolute inset-x-0 bottom-0.5 z-20 text-[5px] text-center font-bold text-slate-300 bg-black/70 rounded-b py-0.2 leading-none">
          Trúc Cơ
        </span>
      )}
    </div>
  );
};

export default MainGameScreen;
