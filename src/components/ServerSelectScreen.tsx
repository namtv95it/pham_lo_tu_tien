import React, { useState } from 'react';
import bgLogin from '@/assets/images/login_screen/background_login.png';
import btnBack from '@/assets/images/server_select/01_Nut_Tro_Ve.png';
import btnSettings from '@/assets/images/server_select/02_Nut_Cai_Dat.png';
import titleChonMayChu from '@/assets/images/server_select/title_chon_may_chu.png';
import playedCardFrame from '@/assets/images/server_select/04_Khung_May_Chu_Da_Choi.png';
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
    dotColor: 'bg-red-500', // Màu tương ứng với Đông (Đỏ)
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
    dotColor: 'bg-emerald-500', // Màu tương ứng với Tốt (Xanh lá)
    isNew: true,
    category: ['all', 'new'],
  },
  {
    id: 's3',
    name: 'S3 - Linh Sơn',
    status: 'good',
    statusText: 'Tốt',
    statusColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500', // Màu tương ứng với Tốt (Xanh lá)
    isNew: true,
    category: ['all', 'new'],
  },
  {
    id: 's4',
    name: 'S4 - Thanh Vân',
    status: 'stable',
    statusText: 'Ổn',
    statusColor: 'text-amber-700',
    dotColor: 'bg-amber-400', // Màu tương ứng với Ổn Định (Vàng)
    category: ['all', 'old'],
  },
  {
    id: 's5',
    name: 'S5 - Cửu Tiêu',
    status: 'good',
    statusText: 'Tốt',
    statusColor: 'text-emerald-700',
    dotColor: 'bg-emerald-500', // Màu tương ứng với Tốt (Xanh lá)
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

  // Danh mục sidebar tabs (Bỏ icon và badge theo yêu cầu)
  const categories: { key: CategoryType; label: string }[] = [
    {
      key: 'all',
      label: 'Tất Cả',
    },
    {
      key: 'recommended',
      label: 'Đề Xuất',
    },
    {
      key: 'new',
      label: 'Máy Chủ Mới',
    },
    {
      key: 'played',
      label: 'Đã Chơi',
    },
    {
      key: 'old',
      label: 'Máy Chủ Cũ',
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
      <div className="absolute inset-0 bg-gradient-to-b from-[#031514]/25 via-transparent to-[#041c19]/45 pointer-events-none z-0" />

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

        {/* Tiêu Đề "Chọn Máy Chủ" */}
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

      {/* 3. Phần Nội Dung Chính: Gắn kết liền mạch */}
      <div className="relative z-10 w-full flex-1 flex flex-col px-3 pt-1 pb-1 gap-1.5 overflow-hidden max-w-[430px]">
        {/* --- KHUNG MÁY CHỦ ĐÃ CHƠI (CARD TRÊN) --- */}
        <div className="relative w-full flex-shrink-0 drop-shadow-md aspect-[1335/322]">
          {/* Background Khung Ornate chuẩn */}
          <img
            src={playedCardFrame}
            alt="Khung Máy Chủ Đã Chơi"
            className="w-full h-full object-fill pointer-events-none"
          />

          {/* 1. Cụm Avatar nhân vật - Khớp chính xác tâm vòng tròn avatar */}
          <div className="absolute left-[15.5%] top-[48%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center pointer-events-none">
            <div className="w-[48px] h-[48px] sm:w-[54px] sm:h-[54px] rounded-full overflow-hidden flex items-center justify-center bg-[#072520]">
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
          <div className="absolute left-[28%] right-[49.5%] top-[17%] h-[16.5%] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold tracking-wide truncate leading-none select-none">
              Đã chơi
            </span>
          </div>

          {/* Hàng 2: Mã Server & Tên nhân vật cùng cỡ chữ, ngăn cách bằng dấu : */}
          <div className="absolute left-[28.5%] right-[33%] top-[41%] h-[18%] flex items-center gap-1.5 truncate pointer-events-none">
            <span className="text-white font-extrabold text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] flex-shrink-0 leading-none">
              {serverCode}:
            </span>
            <span className="text-white font-extrabold text-xs sm:text-sm truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">
              {characterName}
            </span>
          </div>

          {/* Hàng 3: Cảnh giới Tu Vi - Đặt cạnh icon 2 thanh kiếm */}
          <div className="absolute left-[34%] right-[33%] top-[65%] h-[18%] flex items-center pointer-events-none">
            <span className="text-amber-200 text-xs sm:text-sm font-extrabold truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-none">
              {playedServer.cultivation || 'Trúc Cơ Kỳ'}
            </span>
          </div>

          {/* 3. Nút "Vào Game" trên Card trên */}
          <button
            onClick={() => onEnterGame(playedServer)}
            className="absolute left-[67%] right-[2%] top-[16%] bottom-[16%] flex items-center justify-center font-extrabold text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] active:scale-95 transition-transform focus:outline-none cursor-pointer"
            title="Vào Game"
          >
            <span>Vào Game</span>
          </button>
        </div>

        {/* --- THANH TRẠNG THÁI MÁY CHỦ (Giữ nguyên tỉ lệ tự nhiên, chữ và chấm tròn to rõ không bị co bẹp) --- */}
        <div className="relative w-full h-[46px] sm:h-[50px] overflow-hidden flex items-center justify-center drop-shadow-sm flex-shrink-0">
          <img
            src={khungTrangThai}
            alt="Trạng thái máy chủ"
            className="w-full max-w-[430px] h-[225%] object-contain pointer-events-none"
          />
        </div>

        {/* --- KHU VỰC HIỂN THỊ DANH SÁCH: TĂNG KÍCH THƯỚC, ÁP SÁT NHAU HƠN, BỎ ICON TAB, HIỂN THỊ TRỌN VẸN KHUNG TITLE --- */}
        <div className="relative w-full h-[395px] sm:h-[425px] max-h-[50dvh] flex items-center justify-between gap-1 sm:gap-1.5 my-auto">
          {/* CỘT TRÁI: KHUNG DANH MỤC TRỰC TIẾP TỪ ẢNH khung_list_filter.png (Rộng hơn một chút) */}
          <div className="relative w-[116px] sm:w-[130px] h-full flex-shrink-0 flex flex-col overflow-hidden drop-shadow-md">
            {/* Ảnh nền khung sidebar với chim hạc bay bên dưới */}
            <img
              src={khungListFilter}
              alt="Khung Danh Mục"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* Danh sách 5 Tabs - Chữ căn giữa đẹp mắt, BỎ HOÀN TOÀN ICON */}
            <div className="relative z-10 p-1.5 flex flex-col gap-1.5">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    className={`relative w-full h-[36px] sm:h-[40px] flex items-center justify-center transition-all focus:outline-none cursor-pointer active:scale-95 ${
                      isSelected ? 'drop-shadow-md' : 'hover:brightness-110'
                    }`}
                  >
                    {/* Background nút tab */}
                    {isSelected ? (
                      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                        <img
                          src={khungFilterSelected}
                          alt={cat.label}
                          className="w-full h-[115%] object-fill -translate-y-[7%]"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
                        <img
                          src={khungFilter}
                          alt={cat.label}
                          className="w-full h-[270%] object-fill -translate-y-[31%]"
                        />
                      </div>
                    )}

                    {/* Nội dung Tab: Chữ căn giữa chuẩn chỉnh, không icon hay badge */}
                    <div className="relative z-10 flex items-center justify-center w-full px-1.5">
                      <span
                        className={`text-[11px] sm:text-xs truncate tracking-tight text-center ${
                          isSelected
                            ? 'font-black text-[#1a382b]'
                            : 'font-extrabold text-[#f3f9f6]'
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

          {/* CỘT PHẢI: KHUNG DANH SÁCH MÁY CHỦ TRỰC TIẾP TỪ ẢNH khung_list_server.png */}
          <div className="relative flex-1 h-full flex flex-col overflow-hidden drop-shadow-md">
            {/* Ảnh nền cuộn giấy parchment */}
            <img
              src={khungListServer}
              alt="Khung Danh Sách Máy Chủ"
              className="absolute inset-0 w-full h-full object-fill pointer-events-none z-0"
            />

            {/* Vùng cuộn danh sách máy chủ - Bố cục gọn gàng, khoảng cách chuẩn */}
            <div className="relative z-10 w-full h-full p-2 sm:p-2.5 overflow-y-auto flex flex-col gap-1.5">
              {/* TRƯỜNG HỢP: TẤT CẢ (HIỂN THỊ ĐỦ CÁC NHÓM) */}
              {selectedCategory === 'all' ? (
                <>
                  {/* NHÓM 1: ĐỀ XUẤT */}
                  <div className="flex flex-col gap-1">
                    {/* Header Ribbon Đề Xuất - Không bị cắt mất viền ảnh */}
                    <div className="relative w-[140px] sm:w-[155px] aspect-[2172/724] mx-auto -my-1.5 flex items-center justify-center flex-shrink-0">
                      <img
                        src={khungTitleFilter}
                        alt="Đề Xuất"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                      />
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
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
                  <div className="flex flex-col gap-1 pt-0.5">
                    {/* Header Ribbon Máy Chủ Mới - Đồng bộ kích thước và bỏ badge NEW */}
                    <div className="relative w-[140px] sm:w-[155px] aspect-[2172/724] mx-auto -my-1.5 flex items-center justify-center flex-shrink-0">
                      <img
                        src={khungTitleFilter}
                        alt="Máy Chủ Mới"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                      />
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
                        Máy Chủ Mới
                      </span>
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
                  <div className="flex flex-col gap-1 pt-0.5">
                    {/* Header Ribbon Máy Chủ Cũ - Không bị cắt mất viền ảnh */}
                    <div className="relative w-[140px] sm:w-[155px] aspect-[2172/724] mx-auto -my-1.5 flex items-center justify-center flex-shrink-0">
                      <img
                        src={khungTitleFilter}
                        alt="Máy Chủ Cũ"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                      />
                      <span className="absolute inset-0 flex items-center justify-center font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
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
                  <div className="relative w-[140px] sm:w-[155px] aspect-[2172/724] mx-auto -my-1.5 flex items-center justify-center flex-shrink-0">
                    <img
                      src={khungTitleFilter}
                      alt="Tiêu đề"
                      className="w-full h-full object-contain pointer-events-none drop-shadow-xs"
                    />
                    <span className="absolute inset-0 flex items-center justify-center font-bold text-[11px] sm:text-xs text-amber-200 tracking-wide drop-shadow-xs">
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
      <footer className="relative z-10 w-full flex items-center justify-center pb-2.5 pt-0.5 flex-shrink-0">
        <button
          onClick={() => onEnterGame(currentSelectedServer)}
          className="relative w-[210px] sm:w-[240px] h-[48px] sm:h-[54px] overflow-hidden flex items-center justify-center active:scale-95 transition-transform duration-150 focus:outline-none cursor-pointer drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]"
          title="Vào Game"
        >
          <img
            src={btnVaoGame}
            alt="Vào Game"
            className="w-full h-[135%] object-fill -translate-y-[13%] pointer-events-none"
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
      className={`relative w-full h-[40px] sm:h-[44px] overflow-hidden rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] flex-shrink-0 ${
        isSelected
          ? 'ring-2 ring-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)] scale-[1.01]'
          : 'hover:brightness-105 shadow-xs'
      }`}
    >
      {/* Background Frame: Xử lý lấp đầy vùng đồ họa thực tế */}
      {server.hasCharacter ? (
        <img
          src={khungServerCoNhanVat}
          alt={server.name}
          className="w-full h-[188%] object-fill -translate-y-[24%] pointer-events-none"
        />
      ) : (
        <img
          src={khungServer}
          alt={server.name}
          className="w-full h-[215%] object-fill -translate-y-[27%] pointer-events-none"
        />
      )}

      {/* Nội dung bên trong dòng server */}
      <div className="absolute inset-0 pl-[22px] sm:pl-[25px] pr-3 sm:pr-3.5 flex items-center pointer-events-none">
        {/* Vế Trái: Chấm trạng thái màu tương ứng + Tên máy chủ (dịch sang phải một chút) */}
        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
          {/* Chấm tròn trạng thái với màu tương ứng (Đông = Đỏ, Tốt = Xanh lá, Ổn = Vàng) */}
          <span
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full flex-shrink-0 ${server.dotColor} shadow-xs ring-1 ring-black/15`}
          />

          {/* Tên Máy Chủ */}
          <span className="font-black text-xs sm:text-sm text-[#14231b] truncate drop-shadow-xs">
            {server.name}
          </span>
        </div>

        {/* Huy hiệu Có Nhân Vật - Giữ nguyên vị trí ban đầu */}
        {server.hasCharacter && (
          <span className="absolute left-[114px] sm:left-[122px] bg-[#1b4332] text-[#8cf0c8] text-[8px] sm:text-[9px] font-extrabold px-1.5 py-0.5 rounded-full shadow-xs flex-shrink-0">
            Có nhân vật
          </span>
        )}
      </div>
    </div>
  );
};

export default ServerSelectScreen;
