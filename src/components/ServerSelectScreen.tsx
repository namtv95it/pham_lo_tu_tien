import React, { useState } from 'react';
import bgLogin from '@/assets/images/login_screen/background_login.png';
import btnBack from '@/assets/images/server_select/01_Nut_Tro_Ve.png';
import btnSettings from '@/assets/images/server_select/02_Nut_Cai_Dat.png';
import titleServer from '@/assets/images/server_select/03_Tieu_De_Chon_May_Chu.png';
import playedCardFrame from '@/assets/images/server_select/04_Khung_May_Chu_Da_Choi.png';
import tabActiveBg from '@/assets/images/server_select/05_Sidebar_Duoc_Chon.png';
import tabInactiveBg from '@/assets/images/server_select/06_Sidebar_Chua_Chon.png';
import btnAction from '@/assets/images/login_screen/button_action.png';
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
    statusColor: 'text-[#d92525]',
    dotColor: 'bg-emerald-500',
    hasCharacter: true,
    characterName: 'Tạ Văn Nam',
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
  const characterName = currentUser?.displayName || playedServer.characterName || 'Tạ Văn Nam';
  const serverCode = playedServer.name.split(' - ')[0] || playedServer.id.toUpperCase();

  // Danh mục sidebar
  const categories: { key: CategoryType; label: string; icon: React.ReactNode; badge?: string }[] = [
    {
      key: 'all',
      label: 'Tất Cả',
      icon: (
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
          <path d="M4 4h7v7H4V4zm9 0h7v7h-7V4zm-9 9h7v7H4v-7zm9 0h7v7h-7v-7z" />
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
    <div className="relative w-full h-full flex flex-col items-center justify-between overflow-hidden select-none">
      {/* 1. Hình nền tiên cảnh */}
      <img
        src={bgLogin}
        alt="Tiên Giới Nền"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#031514]/40 via-transparent to-[#041c19]/60 pointer-events-none z-0" />

      {/* 2. Top Header Navigation */}
      <header className="relative z-10 w-full px-3 pt-3 flex items-center justify-between">
        {/* Nút Trở Về */}
        <button
          onClick={onBack}
          className="w-10 h-10 flex-shrink-0 active:scale-90 transition-transform focus:outline-none drop-shadow-md"
          title="Quay lại"
        >
          <img src={btnBack} alt="Trở về" className="w-full h-full object-contain" />
        </button>

        {/* Tiêu Đề "Chọn Máy Chủ" */}
        <div className="flex-1 max-w-[210px] mx-2 flex justify-center">
          <img
            src={titleServer}
            alt="Chọn Máy Chủ"
            className="w-full max-h-12 object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
          />
        </div>

        {/* Nút Cài Đặt */}
        <button
          onClick={() => setShowSettingsModal(true)}
          className="w-10 h-10 flex-shrink-0 active:scale-90 transition-transform focus:outline-none drop-shadow-md"
          title="Cài đặt"
        >
          <img src={btnSettings} alt="Cài đặt" className="w-full h-full object-contain" />
        </button>
      </header>

      {/* 3. Phần Nội Dung Chính */}
      <div className="relative z-10 w-full flex-1 flex flex-col px-3 pt-2 pb-2 gap-2.5 overflow-hidden max-w-[430px]">
        {/* --- KHUNG MÁY CHỦ ĐÃ CHƠI (CARD TRÊN) --- */}
        <div className="relative w-full flex-shrink-0 drop-shadow-lg aspect-[1335/322]">
          {/* Background Khung Ornate */}
          <img
            src={playedCardFrame}
            alt="Khung Máy Chủ Đã Chơi"
            className="w-full h-full object-fill pointer-events-none"
          />

          {/* 1. Cụm Avatar nhân vật - Khớp chính xác tâm vòng tròn avatar của khung */}
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

          {/* 2. Cụm thông tin Máy chủ & Nhân vật - Tách riêng từng hàng theo toạ độ chuẩn của khung ảnh */}
          {/* Hàng 1: Nhãn "Đã chơi" - Căn giữa tuyệt đối cả ngang và dọc trong khung pill bên cạnh ngôi sao */}
          <div className="absolute left-[28%] right-[49.5%] top-[17%] h-[16.5%] flex items-center justify-center pointer-events-none">
            <span className="text-[10px] sm:text-[11px] text-amber-300 font-bold tracking-wide truncate leading-none select-none">
              Đã chơi
            </span>
          </div>

          {/* Hàng 2: Mã Server & Tên nhân vật cùng cỡ chữ, ngăn cách bằng dấu :, căn giữa hàng 2 */}
          <div className="absolute left-[28.5%] right-[33%] top-[41%] h-[18%] flex items-center gap-1.5 truncate pointer-events-none">
            <span className="text-white font-extrabold text-xs sm:text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] flex-shrink-0 leading-none">
              {serverCode}:
            </span>
            <span className="text-white font-extrabold text-xs sm:text-sm truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none">
              {characterName}
            </span>
          </div>

          {/* Hàng 3: Cảnh giới Tu Vi - To rõ, đặt ngay cạnh icon 2 thanh kiếm và căn cùng trục tâm */}
          <div className="absolute left-[34%] right-[33%] top-[65%] h-[18%] flex items-center pointer-events-none">
            <span className="text-amber-200 text-xs sm:text-sm font-extrabold truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] leading-none">
              {playedServer.cultivation || 'Trúc Cơ Kỳ'}
            </span>
          </div>

          {/* 3. Nút "Vào Game" trên Card - Khớp chuẩn vùng nút ngọc bích bên phải (bỏ 2 mũi tên) */}
          <button
            onClick={() => onEnterGame(playedServer)}
            className="absolute left-[67%] right-[2%] top-[16%] bottom-[16%] flex items-center justify-center font-extrabold text-xs sm:text-sm text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] active:scale-95 transition-transform focus:outline-none cursor-pointer"
            title="Vào Game"
          >
            <span>Vào Game</span>
          </button>
        </div>

        {/* --- KHUNG CHỌN MÁY CHỦ CHÍNH (CARD DƯỚI) --- */}
        <div className="relative w-full flex-1 flex flex-col bg-[#faf5e4] rounded-2xl border-2 border-emerald-900/60 shadow-2xl overflow-hidden min-h-0">
          {/* Thanh Chú Thích Trạng Thái (Status Legend Bar) */}
          <div className="w-full bg-[#f3ecda] border-b border-[#e2d5ba] px-4 py-1.5 flex items-center justify-around text-[11px] sm:text-xs font-bold text-[#382b1c] flex-shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-sm" />
              <span>Tốt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
              <span>Ổn Định</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
              <span>Đông</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-400 shadow-sm" />
              <span>Bảo Trì</span>
            </div>
          </div>

          {/* Vùng Body 2 Cột: Sidebar Trái + Danh Sách Phải */}
          <div className="w-full flex-1 flex overflow-hidden min-h-0">
            {/* Cột Trái: Sidebar Categories (bg đậm ngọc bích) */}
            <div className="w-[115px] sm:w-[130px] flex-shrink-0 bg-[#082a25] border-r border-emerald-950/40 p-1.5 flex flex-col gap-1.5 overflow-y-auto">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => setSelectedCategory(cat.key)}
                    style={{
                      backgroundImage: `url(${isSelected ? tabActiveBg : tabInactiveBg})`,
                      backgroundSize: '100% 100%',
                      backgroundRepeat: 'no-repeat',
                    }}
                    className={`relative w-full h-11 sm:h-12 rounded-xl flex items-center px-2 transition-all active:scale-95 focus:outline-none ${
                      isSelected ? 'drop-shadow-md' : 'opacity-90 hover:opacity-100'
                    }`}
                  >
                    {/* Icon hoặc Badge */}
                    <div className="mr-1.5 flex-shrink-0 flex items-center justify-center">
                      {cat.badge ? (
                        <span className="bg-red-600 text-white text-[9px] font-extrabold px-1 rounded shadow">
                          {cat.badge}
                        </span>
                      ) : (
                        <span
                          className={`text-sm ${
                            isSelected ? 'text-[#8b5a2b]' : 'text-amber-200/90'
                          }`}
                        >
                          {cat.icon}
                        </span>
                      )}
                    </div>

                    {/* Tiêu đề Tab */}
                    <span
                      className={`text-[11px] sm:text-xs tracking-tight text-left leading-tight ${
                        isSelected
                          ? 'font-extrabold text-[#241a0d]'
                          : 'font-semibold text-[#f0f9f6]'
                      }`}
                    >
                      {cat.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Cột Phải: Server List */}
            <div className="flex-1 p-2 sm:p-2.5 overflow-y-auto flex flex-col gap-2.5 bg-[#fcf9ee]">
              {/* Trường hợp chọn Tất Cả: Hiển thị phân nhóm rõ ràng theo Đề Xuất, Mới, Cũ */}
              {selectedCategory === 'all' ? (
                <>
                  {/* Nhóm 1: Đề Xuất */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-center">
                      <div className="relative px-5 py-0.5 bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-amber-200 border border-amber-400/80 rounded-full font-bold text-xs tracking-wide shadow-sm flex items-center gap-1">
                        <span>Đề Xuất</span>
                      </div>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('recommended')).map((srv) => (
                      <ServerRowItem
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>

                  {/* Nhóm 2: Máy Chủ Mới */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center justify-center">
                      <div className="relative px-5 py-0.5 bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-amber-200 border border-amber-400/80 rounded-full font-bold text-xs tracking-wide shadow-sm flex items-center gap-1.5">
                        <span>Máy Chủ Mới</span>
                        <span className="bg-red-600 text-white text-[9px] font-extrabold px-1 rounded shadow">
                          NEW
                        </span>
                      </div>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('new')).map((srv) => (
                      <ServerRowItem
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>

                  {/* Nhóm 3: Máy Chủ Cũ */}
                  <div className="flex flex-col gap-1.5 pt-1">
                    <div className="flex items-center justify-center">
                      <div className="relative px-5 py-0.5 bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-amber-200 border border-amber-400/80 rounded-full font-bold text-xs tracking-wide shadow-sm flex items-center gap-1">
                        <span>Máy Chủ Cũ</span>
                      </div>
                    </div>

                    {FAKE_SERVERS.filter((s) => s.category.includes('old')).map((srv) => (
                      <ServerRowItem
                        key={srv.id}
                        server={srv}
                        isSelected={selectedServerId === srv.id}
                        onSelect={() => setSelectedServerId(srv.id)}
                      />
                    ))}
                  </div>
                </>
              ) : (
                /* Trường hợp chọn một Category riêng lẻ */
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-center mb-1">
                    <div className="relative px-5 py-0.5 bg-gradient-to-r from-teal-800 via-emerald-700 to-teal-800 text-amber-200 border border-amber-400/80 rounded-full font-bold text-xs tracking-wide shadow-sm">
                      {categories.find((c) => c.key === selectedCategory)?.label}
                    </div>
                  </div>

                  {FAKE_SERVERS.filter((s) => s.category.includes(selectedCategory)).map((srv) => (
                    <ServerRowItem
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

      {/* 4. Bottom Action "Vào Game" Button */}
      <footer className="relative z-10 w-full flex items-center justify-center pb-4 pt-1 flex-shrink-0">
        <button
          onClick={() => onEnterGame(currentSelectedServer)}
          className="relative group active:scale-95 transition-transform duration-150 focus:outline-none"
        >
          {/* Nút Action Ornate Green */}
          <img
            src={btnAction}
            alt="Vào Game"
            className="w-[200px] sm:w-[220px] h-auto object-contain drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)]"
          />

          {/* Nhãn chữ Vào Game */}
          <span className="absolute inset-0 flex items-center justify-center font-extrabold text-base sm:text-lg text-[#fffdf2] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] tracking-wide pointer-events-none">
            Vào Game
          </span>
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
                <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span>Hiệu ứng Tiên thuật:</span>
                <input type="checkbox" defaultChecked className="accent-emerald-600 w-4 h-4" />
              </div>
              <div className="flex items-center justify-between">
                <span>Chất lượng hình ảnh:</span>
                <span className="font-semibold text-emerald-800">Cao (HD)</span>
              </div>
            </div>
            <button
              onClick={() => setShowSettingsModal(false)}
              className="w-full py-2 bg-gradient-to-r from-emerald-700 to-teal-600 text-white font-bold rounded-xl text-xs shadow hover:opacity-90 active:scale-95 transition-all"
            >
              Xác Nhận & Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// Component Dòng Server
interface ServerRowItemProps {
  server: ServerInfo;
  isSelected: boolean;
  onSelect: () => void;
}

const ServerRowItem: React.FC<ServerRowItemProps> = ({ server, isSelected, onSelect }) => {
  return (
    <button
      onClick={onSelect}
      className={`w-full px-2.5 py-2 rounded-xl flex items-center justify-between transition-all focus:outline-none ${
        isSelected
          ? 'bg-gradient-to-r from-[#fffcf0] via-[#fdefd0] to-[#fffcf0] border-2 border-amber-400 shadow-[0_2px_8px_rgba(217,119,6,0.25)] ring-1 ring-amber-300'
          : 'bg-[#fcfaf3] border border-[#e8dcb8] hover:border-amber-300/80 shadow-xs'
      }`}
    >
      {/* Vế Trái: Chấm Trạng Thái + Tên Server + Badge Có Nhân Vật */}
      <div className="flex items-center gap-1.5 min-w-0 pr-1">
        {/* Chấm tròn trạng thái */}
        <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${server.dotColor} shadow-xs`} />

        {/* Tên Server */}
        <span className="font-extrabold text-xs sm:text-sm text-[#1e2722] truncate">
          {server.name}
        </span>

        {/* Badge Có nhân vật */}
        {server.hasCharacter && (
          <span className="flex-shrink-0 bg-emerald-700 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 ml-1">
            <span>👤</span>
            <span>Có nhân vật</span>
          </span>
        )}
      </div>

      {/* Vế Phải: Trạng Thái Tốt / Đông / Ổn */}
      <span className={`text-xs sm:text-sm font-extrabold flex-shrink-0 ${server.statusColor}`}>
        {server.statusText}
      </span>
    </button>
  );
};

export default ServerSelectScreen;

