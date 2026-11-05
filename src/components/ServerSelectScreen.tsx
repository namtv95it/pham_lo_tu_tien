import React, { useState } from 'react';
import bgLogin from '@/assets/images/login_screen/background_login.png';
import btnBack from '@/assets/images/server_select/01_Nut_Tro_Ve.png';
import btnSettings from '@/assets/images/server_select/02_Nut_Cai_Dat.png';
import titleChonMayChu from '@/assets/images/server_select/title_chon_may_chu.png';
import khungDaChoi from '@/assets/images/server_select/khung_da_choi.png';
import khungTrangThai from '@/assets/images/server_select/khung_trang_thai.png';
import khungListFilter from '@/assets/images/server_select/khung_list_filter.png';
import khungFilterSelected from '@/assets/images/server_select/khung_filter_selected.png';
import khungFilter from '@/assets/images/server_select/khung_filter.png';
import khungListServer from '@/assets/images/server_select/khung_list_server.png';
import khungTitleFilter from '@/assets/images/server_select/khung_title_filter.png';
import khungServer from '@/assets/images/server_select/khung_server.png';
import khungServerCoNhanVat from '@/assets/images/server_select/khung_server_co_nhan_vat.png';
import btnVaoGame from '@/assets/images/server_select/vao_game.png';
import characterAvatar from '@/assets/images/common/character_transparent.png';
import { User } from 'firebase/auth';

export interface ServerInfo {
  id: string;
  name: string;
  status: 'good' | 'stable' | 'crowded' | 'maintenance';
  statusText: string;
  statusColor: string;
  dotColor: string;
  hasCharacter?: boolean;
  characterName?: string;
  level?: number;
  cultivation?: string;
  isNew?: boolean;
  category: ('all' | 'recommended' | 'new' | 'played' | 'old')[];
}

const FAKE_SERVERS: ServerInfo[] = [
  {
    id: 's1',
    name: 'S1 - Phàm Lộ',
    status: 'crowded',
    statusText: 'Đông',
    statusColor: 'text-[#dc2626]',
    dotColor: 'bg-emerald-500',
    hasCharacter: true,
    characterName: 'Nam Tạ Vân',
    level: 85,
    cultivation: 'Trúc Cơ Kỳ',
    category: ['all', 'recommended', 'played'],
  },
  {
    id: 's2',
    name: 'S2 - Vân Mộng',
    status: 'good',
    statusText: 'Tốt',
    statusColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    isNew: true,
    category: ['all', 'new'],
  },
  {
    id: 's3',
    name: 'S3 - Linh Sơn',
    status: 'good',
    statusText: 'Tốt',
    statusColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    isNew: true,
    category: ['all', 'new'],
  },
  {
    id: 's4',
    name: 'S4 - Thanh Vân',
    status: 'stable',
    statusText: 'Ổn',
    statusColor: 'text-amber-700',
    dotColor: 'bg-amber-500',
    category: ['all', 'old'],
  },
  {
    id: 's5',
    name: 'S5 - Cửu Tiêu',
    status: 'good',
    statusText: 'Tốt',
    statusColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500',
    category: ['all', 'old'],
  },
];

type CategoryType = 'all' | 'recommended' | 'new' | 'played' | 'old';

interface ServerSelectScreenProps {
  currentUser?: User | null;
  onEnterGame: (server: ServerInfo) => void;
  onBack: () => void;
}

export const ServerSelectScreen: React.FC<ServerSelectScreenProps> = ({
  currentUser,
  onEnterGame,
  onBack,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>('all');
  const [selectedServerId, setSelectedServerId] = useState<string>('s1');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // Máy chủ đã chơi chính (mặc định lấy S1)
  const playedServer = FAKE_SERVERS.find((s) => s.hasCharacter) || FAKE_SERVERS[0];
  const currentSelectedServer = FAKE_SERVERS.find((s) => s.id === selectedServerId) || playedServer;

  // Tên đạo hữu hiển thị & Mã server ngắn gọn (S1, S2...)
  const characterName = currentUser?.displayName || playedServer.characterName || 'Nam Tạ Vân';
  const serverCode = playedServer.name.split(' - ')[0] || playedServer.id.toUpperCase();

  // Danh mục sidebar tabs
  const categories: { key: CategoryType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'all',
      label: 'Tất Cả',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h6v6H4V4zm10 0h6v6h-6V4zM4 14h6v6H4v-6zm10 0h6v6h-6v-6z" />
        </svg>
      ),
    },
    {
      key: 'recommended',
      label: 'Đề Xuất',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M2 20h2c.55 0 1-.45 1-1v-9c0-.55-.45-1-1-1H2v11zm19.83-7.12c.11-.25.17-.52.17-.8V11c0-1.1-.9-2-2-2h-5.5l.92-4.65c.05-.22.02-.46-.08-.66-.23-.45-.72-.69-1.22-.59L12.7 3.5 7.6 9.6c-.38.45-.6 1.03-.6 1.62V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.83-1.21l3-7.91z" />
        </svg>
      ),
    },
    {
      key: 'new',
      label: 'Máy Chủ Mới',
      icon: null,
      badge: 'NEW',
    },
    {
      key: 'played',
      label: 'Đã Chơi',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
        </svg>
      ),
    },
    {
      key: 'old',
      label: 'Máy Chủ Cũ',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 7H5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2zm0 7H5c-1.1 0-2 .9-2 2v3c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-3c0-1.1-.9-2-2-2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden select-none bg-[#041a17]">
      {/* 1. Hình nền tiên cảnh */}
      <img
        src={bgLogin}
        alt="Tiên Giới Nền"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#031514]/30 via-transparent to-[#041c19]/50 pointer-events-none z-0" />

      {/* 2. Top Header Navigation: Trở Về + Tiêu Đề "Chọn Máy Chủ" + Cài Đặt */}
      <header className="relative z-10 w-full px-3 pt-2.5 flex items-center justify-between">
        {/* Nút Trở Về */}
        <button
          onClick={onBack}
          className="w-10 h-10 flex-shrink-0 active:scale-90 transition-transform focus:outline-none cursor-pointer drop-shadow-md"
          title="Quay lại"
        >
          <img src={btnBack} alt="Trở về" className="w-full h-full object-contain" />
        </button>

        {/* Tiêu Đề "Chọn Máy Chủ" chuẩn ảnh mới */}
        <div className="flex-1 max-w-[220px] mx-2 flex justify-center">
          <img
            src={titleChonMayChu}
            alt="Chọn Máy Chủ"
            className="w-full max-h-12 object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.7)]"
          />
        </div>

        {/* Nút Cài Đặt */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-10 h-10 flex-shrink-0 active:scale-90 transition-transform focus:outline-none cursor-pointer drop-shadow-md"
          title="Cài đặt"
        >
          <img src={btnSettings} alt="Cài đặt" className="w-full h-full object-contain" />
        </button>
      </header>

      {/* 3. Phần Nội Dung Chính */}
      <div className="relative z-10 w-full flex-1 flex flex-col px-2.5 pt-1.5 pb-1 gap-2 overflow-hidden max-w-[430px]">
        {/* --- KHUNG MÁY CHỦ ĐÃ CHƠI (CARD TRÊN) --- */}
        <div className="relative w-full flex-shrink-0 drop-shadow-lg aspect-[1916/821]">
          {/* Background Khung Ornate chuẩn ảnh mới */}
          <img
            src={khungDaChoi}
            alt="Khung Máy Chủ Đã Chơi"
            className="w-full h-full object-fill pointer-events-none"
          />

          {/* 1. Cụm Avatar nhân vật - Khớp chính xác tâm vòng tròn avatar */}
          <div className="absolute left-[16.65%] top-[51.34%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full overflow-hidden flex items-center justify-center bg-[#072520]">
              <img
                src={characterAvatar}
                alt="Nhân vật"
                className="w-full h-full object-cover object-top scale-125 translate-y-1"
              />
            </div>
            {/* Huy hiệu Cấp độ */}
            <div className="absolute -bottom-1 bg-gradient-to-r from-amber-400 to-amber-200 text-[#2b1800] border border-amber-600 font-extrabold text-[8px] sm:text-[9px] px-1.5 py-0.2 rounded-full shadow-md z-10 leading-none">
              Lv.{playedServer.level || 85}
            </div>
          </div>

          {/* 2. Cụm thông tin Máy chủ & Nhân vật */}
          {/* Hàng 1: Nhãn "Đã chơi" - Căn giữa trong khung pill bên cạnh ngôi sao */}
          <div className="absolute left-[29.7%] right-[49.6%] top-[20%] bottom-[65%] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold tracking-wide truncate leading-none select-none">
              Đã chơi
            </span>
          </div>

          {/* Hàng 2: Mã Server & Tên nhân vật cùng cỡ chữ, ngăn cách bằng dấu : */}
          <div className="absolute left-[28.5%] right-[34%] top-[41%] h-[18%] flex items-center gap-1.5 truncate pointer-events-none">
            <span className="text-white font-extrabold text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] flex-shrink-0 leading-none">
              {serverCode}:
            </span>
            <span className="text-white font-extrabold text-xs sm:text-sm truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">
              {characterName}
            </span>
          </div>

          {/* Hàng 3: Cảnh giới Tu Vi - Đặt cạnh icon 2 thanh kiếm */}
          <div className="absolute left-[32%] right-[34%] top-[64%] h-[18%] flex items-center pointer-events-none">
            <span className="text-amber-200 text-xs sm:text-sm font-extrabold truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-none">
              {playedServer.cultivation || 'Trúc Cơ Kỳ'}
            </span>
          </div>

          {/* 3. Nút "Vào Game >>" trên Card trên - Vùng bấm đè lên nút có sẵn trên ảnh */}
          <button
            onClick={() => onEnterGame(playedServer)}
            className="absolute left-[65%] right-[4%] top-[25%] bottom-[25%] flex items-center justify-center active:scale-95 transition-transform focus:outline-none cursor-pointer"
            title="Vào Game"
          />
        </div>

        {/* --- THANH TRẠNG THÁI MÁY CHỦ (4 CHẤM) --- */}
        <div className="relative w-full flex-shrink-0 aspect-[2172/294] max-h-8 drop-shadow-sm">
          <img
            src={khungTrangThai}
            alt="Trạng thái máy chủ"
            className="w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* --- KHUNG CHỌN MÁY CHỦ CHÍNH (2 CỘT: SIDEBAR TRÁI + LIST SERVER PHẢI) --- */}
        <div className="relative w-full flex-1 flex overflow-hidden min-h-0 gap-1.5 sm:gap-2">
          {/* CỘT TRÁI: SIDEBAR FILTER TABS */}
          <div className="relative w-[105px] sm:w-[122px] flex-shrink-0 flex flex-col overflow-hidden rounded-xl drop-shadow-md">
            {/* Ảnh nền khung sidebar với chim hạc bay bên dưới */}
            <img
              src={khungListFilter}
              alt="Khung Danh Mục"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* Danh sách 5 Tabs ở nửa trên */}
            <div className="relative z-10 p-1.5 sm:p-2 flex flex-col gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`relative w-full aspect-[2172/724] flex items-center justify-center transition-all focus:outline-none cursor-pointer active:scale-95 ${
                      isSelected ? 'drop-shadow-md' : 'hover:brightness-110'
                    }`}
                  >
                    {/* Background nút tab: Selected (Vàng kim) hoặc Unselected (Ngọc lục) */}
                    <img
                      src={isSelected ? khungFilterSelected : khungFilter}
                      alt={cat.label}
                      className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                    />

                    {/* Nội dung Tab: Icon / Badge + Nhãn */}
                    <div className="relative z-10 flex items-center gap-1 px-1.5">
                      {cat.badge ? (
                        <span className="bg-red-600 text-white text-[8px] sm:text-[9px] font-black px-1 rounded shadow-xs leading-none">
                          {cat.badge}
                        </span>
                      ) : (
                        <span
                          className={`text-xs ${
                            isSelected ? 'text-[#194030]' : 'text-[#f0f9f6]'
                          }`}
                        >
                          {cat.icon}
                        </span>
                      )}

                      <span
                        className={`text-[10px] sm:text-[11px] truncate tracking-tight ${
                          isSelected
                            ? 'font-black text-[#1a382b]'
                            : 'font-bold text-[#f3f9f6]'
                        }`}
                      >
                        {cat.label}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* CỘT PHẢI: SERVER LIST TRÊN CUỘN GIẤY TIÊN GIỚI */}
          <div className="relative flex-1 flex flex-col overflow-hidden rounded-xl drop-shadow-md">
            {/* Ảnh nền cuộn giấy parchment */}
            <img
              src={khungListServer}
              alt="Khung Danh Sách Máy Chủ"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* Vùng cuộn danh sách máy chủ */}
            <div className="relative z-10 w-full h-full p-2 sm:p-2.5 overflow-y-auto flex flex-col gap-1.5">
              {/* TRƯỜNG HỢP: TẤT CẢ (HIỂN THỊ ĐỦ CÁC NHÓM) */}
              {selectedCategory === 'all' ? (
                <>
                  {/* NHÓM 1: ĐỀ XUẤT */}
                  <div className="flex flex-col gap-1">
                    {/* Header Ribbon Đề Xuất */}
                    <div className="relative w-[50%] max-w-[140px] mx-auto aspect-[2172/724] flex items-center justify-center my-0.5">
                      <img
                        src={khungTitleFilter}
                        alt="Đề Xuất"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      />
                      <span className="relative z-10 font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
                        Đề Xuất
                      </span>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('recommended')).map((srv) => (
                      <ServerRow
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>

                  {/* NHÓM 2: MÁY CHỦ MỚI */}
                  <div className="flex flex-col gap-1 pt-1">
                    {/* Header Ribbon Máy Chủ Mới */}
                    <div className="relative w-[60%] max-w-[160px] mx-auto aspect-[2172/724] flex items-center justify-center my-0.5">
                      <img
                        src={khungTitleFilter}
                        alt="Máy Chủ Mới"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      />
                      <div className="relative z-10 flex items-center gap-1">
                        <span className="font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
                          Máy Chủ Mới
                        </span>
                        <span className="bg-red-600 text-white text-[8px] font-black px-1 rounded shadow-xs leading-none">
                          NEW
                        </span>
                      </div>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('new')).map((srv) => (
                      <ServerRow
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>

                  {/* NHÓM 3: MÁY CHỦ CŨ */}
                  <div className="flex flex-col gap-1 pt-1">
                    {/* Header Ribbon Máy Chủ Cũ */}
                    <div className="relative w-[50%] max-w-[140px] mx-auto aspect-[2172/724] flex items-center justify-center my-0.5">
                      <img
                        src={khungTitleFilter}
                        alt="Máy Chủ Cũ"
                        className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                      />
                      <span className="relative z-10 font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
                        Máy Chủ Cũ
                      </span>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('old')).map((srv) => (
                      <ServerRow
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                /* TRƯỜNG HỢP: CHỌN MỘT CATEGORY CỤ THỂ */
                <div className="flex flex-col gap-1">
                  <div className="relative w-[55%] max-w-[150px] mx-auto aspect-[2172/724] flex items-center justify-center my-0.5">
                    <img
                      src={khungTitleFilter}
                      alt="Tiêu đề"
                      className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    />
                    <span className="relative z-10 font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
                      {categories.find((c) => c.key === selectedCategory)?.label}
                    </span>
                  </div>

                  {FAKE_SERVERS.filter((s) => s.category.includes(selectedCategory)).map((srv) => (
                    <ServerRow
                      key={srv.id}
                      server={srv}
                      isSelected={selectedServerId === srv.id}
                      onSelect={() => setSelectedServerId(srv.id)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Action "Vào Game" Button - Nút ngọc bích chuẩn ảnh mới */}
      <footer className="relative z-10 w-full flex items-center justify-center pb-3 pt-0.5 flex-shrink-0">
        <button
          onClick={() => onEnterGame(currentSelectedServer)}
          className="relative w-[230px] sm:w-[260px] aspect-[2172/724] flex items-center justify-center active:scale-95 transition-transform duration-150 focus:outline-none cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          title="Vào Game"
        >
          <img
            src={btnVaoGame}
            alt="Vào Game"
            className="w-full h-full object-contain pointer-events-none"
          />
        </button>
      </footer>

      {/* 5. Modal Cài Đặt (Khi nhấn nút bánh răng) */}
      {showSettingsModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] bg-[#fbf6e8] border-2 border-amber-500 rounded-2xl p-4 shadow-2xl text-center space-y-3 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-extrabold text-lg text-emerald-950 font-serif border-b border-amber-300 pb-2">
              ⚙️ Cài Đặt Trò Chơi
            </h3>
            <div className="space-y-2 text-xs text-slate-700 text-left py-1">
              <div className="flex items-center justify-between">
                <span>Âm thanh Tiên nhạc:</span>
                <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <span>Hiệu ứng Tiên thuật:</span>
                <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between">
                <span>Chất lượng hình ảnh:</span>
                <span className="font-semibold text-emerald-800">Cao (HD)</span>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-gradient-to-r from-emerald-700 to-teal-600 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Xác Nhận & Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component Dòng Server sử dụng khung_server.png hoặc khung_server_co_nhan_vat.png
interface ServerRowProps {
  server: ServerInfo;
  isSelected: boolean;
  onSelect: () => void;
}

const ServerRow: React.FC<ServerRowProps> = ({ server, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`relative w-full aspect-[2172/724] cursor-pointer transition-all duration-150 active:scale-[0.98] ${
        isSelected ? 'scale-[1.01] drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]' : 'hover:brightness-105'
      }`}
    >
      {/* Background Frame: khung_server_co_nhan_vat hoặc khung_server thường */}
      <img
        src={server.hasCharacter ? khungServerCoNhanVat : khungServer}
        alt={server.name}
        className="w-full h-full object-fill pointer-events-none"
      />

      {/* Nội dung bên trong dòng server */}
      <div className="absolute inset-0 px-3 sm:px-4 flex items-center justify-between pointer-events-none">
        {/* Vế Trái: Chấm trạng thái + Tên máy chủ + Huy hiệu Có nhân vật */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 pr-1">
          {/* Chấm tròn trạng thái */}
          <span className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full flex-shrink-0 ${server.dotColor} shadow-xs`} />

          {/* Tên Máy Chủ */}
          <span className="font-black text-xs sm:text-sm text-[#14231b] truncate drop-shadow-xs">
            {server.name}
          </span>

          {/* Huy hiệu Có Nhân Vật */}
          {server.hasCharacter && (
            <span className="bg-[#1b4332] text-white text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full flex items-center gap-0.5 ml-1 shadow-xs flex-shrink-0">
              <span>👤</span>
              <span>Có nhân vật</span>
            </span>
          )}
        </div>

        {/* Vế Phải: Chữ trạng thái (Đông, Tốt, Ổn) */}
        <span
          className={`text-xs sm:text-sm font-black flex-shrink-0 drop-shadow-xs ${server.statusColor}`}
        >
          {server.statusText}
        </span>
      </div>
    </div>
  );
};

export default ServerSelectScreen;
