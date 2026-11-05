import { Enemy } from '../types/game';

export interface ExplorationArea {
  id: string;
  name: string;
  description: string;
  minRealmIndex: number;
  enemies: Enemy[];
}

export const EXPLORATION_AREAS: ExplorationArea[] = [
  {
    id: 'hac_suong_lam',
    name: 'Ngoại Vi Hắc Sương Lâm',
    description: 'Khu rừng quanh năm sương mù bao phủ, có dã thú và yêu thú cấp thấp kiếm ăn.',
    minRealmIndex: 0,
    enemies: [
      {
        id: 'hac_lang',
        name: 'Hắc Lang Dã Thú',
        realm: 'Phàm Thú',
        hp: 60,
        maxHp: 60,
        attack: 8,
        defense: 2,
        rewardExp: 25,
        rewardStones: 2,
        dropItems: [
          { itemId: 'linh_nhuoc_thao', chance: 0.5 },
          { itemId: 'tu_khi_dan', chance: 0.15 },
        ],
      },
      {
        id: 'thiet_giap_hung',
        name: 'Thiết Giáp Hùng',
        realm: 'Nhất Giai Hạ Phẩm Yêu Thú',
        hp: 140,
        maxHp: 140,
        attack: 16,
        defense: 8,
        rewardExp: 60,
        rewardStones: 6,
        dropItems: [
          { itemId: 'tu_khi_dan', chance: 0.35 },
          { itemId: 'o_thiet_giap', chance: 0.08 },
        ],
      },
    ],
  },
  {
    id: 'lac_ha_coc',
    name: 'Lạc Hà Sơn Cốc',
    description: 'Thung lũng ngập tràn linh thảo, nhưng đầy rẫy độc vật và tà tu ẩn dật.',
    minRealmIndex: 3,
    enemies: [
      {
        id: 'kich_doc_tri chu',
        name: 'Kịch Độc Chu',
        realm: 'Nhất Giai Trung Phẩm',
        hp: 350,
        maxHp: 350,
        attack: 35,
        defense: 15,
        rewardExp: 180,
        rewardStones: 15,
        dropItems: [
          { itemId: 'bach_nien_nhan_sam', chance: 0.3 },
          { itemId: 'boi_nguyen_dan', chance: 0.2 },
        ],
      },
      {
        id: 'tan_tu_ta_ma',
        name: 'Tán Tu Cướp Bóc',
        realm: 'Luyện Khí Tầng 5',
        hp: 600,
        maxHp: 600,
        attack: 55,
        defense: 25,
        rewardExp: 350,
        rewardStones: 35,
        dropItems: [
          { itemId: 'thanh_phong_kiem', chance: 0.1 },
          { itemId: 'boi_nguyen_dan', chance: 0.3 },
          { itemId: 'truc_co_dan', chance: 0.02 },
        ],
      },
    ],
  },
  {
    id: 'xich_viem_dong',
    name: 'Xích Viêm Cổ Động',
    description: 'Hang động nham thạch cổ xưa, linh khí cuồng bạo, nơi trú ngụ của Hỏa Viêm Thú.',
    minRealmIndex: 6,
    enemies: [
      {
        id: 'hoa_viem_mang',
        name: 'Xích Viêm Cự Mãng',
        realm: 'Nhất Giai Đỉnh Phong',
        hp: 1800,
        maxHp: 1800,
        attack: 140,
        defense: 60,
        rewardExp: 1200,
        rewardStones: 100,
        dropItems: [
          { itemId: 'truc_co_dan', chance: 0.15 },
          { itemId: 'truong_tho_dan', chance: 0.1 },
        ],
      },
    ],
  },
];
