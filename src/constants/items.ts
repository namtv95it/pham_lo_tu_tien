import { Item } from '../types/game';

export const INITIAL_ITEMS: Record<string, Item> = {
  // Đan dược
  tu_khi_dan: {
    id: 'tu_khi_dan',
    name: 'Tụ Khí Đan',
    description: 'Đan dược nhập môn luyện chế từ Linh Nhược Thảo, dùng để ngưng tụ linh khí nhanh chóng.',
    type: 'pill',
    rarity: 'common',
    stackable: true,
    value: 10,
    effect: {
      cultivationBonus: 50,
    },
  },
  boi_nguyen_dan: {
    id: 'boi_nguyen_dan',
    name: 'Bồi Nguyên Đan',
    description: 'Củng cố căn cơ, bổ sung chân nguyên cho tu sĩ Luyện Khí trung hậu kỳ.',
    type: 'pill',
    rarity: 'uncommon',
    stackable: true,
    value: 50,
    effect: {
      cultivationBonus: 300,
    },
  },
  truc_co_dan: {
    id: 'truc_co_dan',
    name: 'Trúc Cơ Đan',
    description: 'Thánh phẩm đan dược mà mọi tu sĩ Luyện Khí viên mãn đều khao khát! Tăng 35% tỉ lệ thành công khi Trúc Cơ.',
    type: 'pill',
    rarity: 'epic',
    stackable: true,
    value: 500,
    effect: {
      successRateBonus: 35,
    },
  },
  truong_tho_dan: {
    id: 'truong_tho_dan',
    name: 'Trường Thọ Đan',
    description: 'Đan dược luyện từ thiên niên dược tài, tăng thêm 20 năm thọ nguyên cho phàm nhân và tu sĩ.',
    type: 'pill',
    rarity: 'rare',
    stackable: true,
    value: 200,
    effect: {
      lifespanBonus: 20,
    },
  },

  // Thảo dược
  linh_nhuoc_thao: {
    id: 'linh_nhuoc_thao',
    name: 'Linh Nhược Thảo',
    description: 'Dược thảo cơ bản thường mọc ở các khe suối linh khí dồi dào, dùng để luyện Tụ Khí Đan.',
    type: 'herb',
    rarity: 'common',
    stackable: true,
    value: 5,
  },
  bach_nien_nhan_sam: {
    id: 'bach_nien_nhan_sam',
    name: 'Bách Niên Nhân Sâm',
    description: 'Nhân sâm trăm năm hấp thu nhật nguyệt tinh hoa, đại bổ khí huyết.',
    type: 'herb',
    rarity: 'uncommon',
    stackable: true,
    value: 30,
    effect: {
      hpBonus: 50,
    },
  },

  // Pháp bảo / Trang bị
  thanh_phong_kiem: {
    id: 'thanh_phong_kiem',
    name: 'Thanh Phong Kiếm (Hạ Phẩm)',
    description: 'Phi kiếm chế tác từ phong đồng khoáng, sắc bén dị thường, tăng công kích.',
    type: 'equipment',
    rarity: 'uncommon',
    stackable: false,
    value: 80,
    effect: {
      attackBonus: 25,
    },
  },
  o_thiet_giap: {
    id: 'o_thiet_giap',
    name: 'Ô Thiết Bảo Giáp',
    description: 'Giáp hộ thân tôi luyện từ thiên ngoại ô thiết, gia tăng sinh mệnh.',
    type: 'equipment',
    rarity: 'uncommon',
    stackable: false,
    value: 90,
    effect: {
      hpBonus: 180,
    },
  },
};
