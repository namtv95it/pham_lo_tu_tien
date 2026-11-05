export type SpiritualRootQuality = 
  | 'Phàm Cốt (Ngũ Tạp Linh Căn)'
  | 'Hạ Phẩm Linh Căn'
  | 'Trung Phẩm Linh Căn'
  | 'Thượng Phẩm Linh Căn'
  | 'Cực Phẩm Thiên Linh Căn';

export interface SpiritualRoot {
  name: string;
  quality: SpiritualRootQuality;
  rateMultiplier: number; // Tốc độ hấp thu linh khí
  breakthroughBonus: number; // Tỉ lệ thành công khi đột phá (%)
  description: string;
}

export interface Realm {
  id: string;
  name: string;           // e.g. "Luyện Khí Kỳ", "Trúc Cơ Kỳ"
  stage: string;          // e.g. "Tầng 1", "Tầng 2", "Sơ Kỳ", "Viên Mãn"
  maxCultivation: number; // Tu vi cần để đột phá
  baseSuccessRate: number;// Tỉ lệ đột phá cơ bản (0 - 100)
  lifespanBonus: number;  // Tăng tuổi thọ tối đa
  attackBonus: number;    // Công kích
  hpBonus: number;        // Khí huyết
  description: string;
}

export type ItemRarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
export type ItemType = 'pill' | 'herb' | 'stone' | 'equipment' | 'material';

export interface Item {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  rarity: ItemRarity;
  stackable: boolean;
  value: number; // Giá trị linh thạch
  effect?: {
    cultivationBonus?: number; // Thêm tu vi
    successRateBonus?: number; // Tăng tỉ lệ đột phá (%)
    lifespanBonus?: number;    // Kéo dài tuổi thọ
    attackBonus?: number;
    hpBonus?: number;
  };
}

export interface InventorySlot {
  item: Item;
  quantity: number;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: 'info' | 'breakthrough' | 'danger' | 'loot' | 'story';
}

export interface Enemy {
  id: string;
  name: string;
  realm: string;
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;
  rewardExp: number;
  rewardStones: number;
  dropItems: { itemId: string; chance: number }[];
}

export interface CharacterState {
  name: string;
  title: string;
  slogan: string;
  gender: 'male' | 'female';
  spiritualRoot: SpiritualRoot;
  currentRealmIndex: number; // Chỉ mục trong danh sách REALMS
  cultivation: number;       // Điểm tu vi hiện tại
  lifespan: number;          // Tuổi thọ hiện tại (năm)
  maxLifespan: number;       // Giới hạn tuổi thọ (năm)
  spiritStones: number;      // Linh thạch hạ phẩm
  
  // Thuộc tính chiến đấu
  hp: number;
  maxHp: number;
  attack: number;
  defense: number;

  // Trạng thái tu luyện
  isMeditating: boolean;     // Đang bế quan thổ nạp
  autoBreakthrough: boolean; // Tự động đột phá (mở khóa sau này)
  totalPlayTime: number;     // Tổng thời gian tu luyện (giây)
  breakthroughCount: number; // Số lần đột phá thành công
  failureCount: number;      // Số lần thất bại/tẩu hỏa nhập ma
}
