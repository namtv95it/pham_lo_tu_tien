import React, { useState } from 'react';
import bgCreate from '@/assets/images/character_create/background_create.png';
import logoImg from '@/assets/images/common/logo_game_2d.png';
import titleCreate from '@/assets/images/character_create/title_create.png';
import maleChar from '@/assets/images/character_create/male.png';
import femaleChar from '@/assets/images/character_create/female.png';
import frameUnselected from '@/assets/images/character_create/khung_character.png';
import frameSelected from '@/assets/images/character_create/khung_selected.png';
import inpNameFrame from '@/assets/images/character_create/inp_name.png';
import btnRandom from '@/assets/images/character_create/btn_random.png';
import btnCreate from '@/assets/images/character_create/btn_create.png';
import btnBack from '@/assets/images/server_select/01_Nut_Tro_Ve.png';
import { ServerInfo } from './ServerSelectScreen';
import { User } from 'firebase/auth';

export interface CreatedCharacterData {
  name: string;
  gender: 'male' | 'female';
  level: number;
  cultivation: string;
  serverId: string;
  serverName: string;
}

interface CharacterCreateScreenProps {
  server: ServerInfo;
  currentUser: User | null;
  onBack: () => void;
  onCreateSuccess: (character: CreatedCharacterData) => void;
}

// Danh sách tên Tu Tiên phong phú cho đạo hữu
const MALE_NAMES = [
  'Lăng Tiêu', 'Diệp Trần', 'Hàn Tuyệt', 'Cố Trường Ca', 'Bạch Phong',
  'Mạc Phàm', 'Sở Huyền', 'Thẩm Dạ', 'Tiêu Viêm', 'Lâm Động',
  'Quân Thường Tiếu', 'Vương Lâm', 'Lý Thất Dạ', 'Chu Nguyên', 'Dương Khai',
  'Tần Vũ', 'Bạch Tiểu Thuần', 'Phong Vô Nhai', 'Huyền Dạ', 'Trần Bắc Huyền'
];

const FEMALE_NAMES = [
  'Lạc Ly', 'Vân Hi', 'Liễu Như Yên', 'Bạch Thiển', 'Nam Cung Uyển',
  'Khương Chỉ Vi', 'Ngu Cơ', 'Tô Cửu Nhi', 'Mục Tuyết', 'Thanh Y',
  'Diệp Tinh Hà', 'Hạ Thanh Nguyệt', 'Phượng Cửu', 'Triệu Linh Nhi', 'Mộ Dung Tuyết',
  'Nguyệt Thiền', 'Lãnh Như Sương', 'Bạch Lạc Dao', 'Thẩm Mộng Dao', 'Yêu Nguyệt'
];

export const CharacterCreateScreen: React.FC<CharacterCreateScreenProps> = ({
  server,
  currentUser: _currentUser,
  onBack,
  onCreateSuccess,
}) => {
  const [gender, setGender] = useState<'male' | 'female'>('male');
  const [characterName, setCharacterName] = useState<string>(() => {
    return MALE_NAMES[Math.floor(Math.random() * MALE_NAMES.length)];
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  // Xử lý đổi tên ngẫu nhiên (bỏ hiệu ứng xoay xúc xắc)
  const handleRandomName = () => {
    setErrorMsg(null);

    const pool = gender === 'male' ? MALE_NAMES : FEMALE_NAMES;
    const currentName = characterName;
    const filtered = pool.filter((n) => n !== currentName);
    const chosen = filtered[Math.floor(Math.random() * filtered.length)] || pool[0];

    setCharacterName(chosen);
  };

  // Chọn giới tính nhân vật
  const handleSelectGender = (newGender: 'male' | 'female') => {
    if (gender === newGender) return;
    setGender(newGender);
    setErrorMsg(null);

    // Đổi tên ngẫu nhiên phù hợp với giới tính mới
    const pool = newGender === 'male' ? MALE_NAMES : FEMALE_NAMES;
    const randomPick = pool[Math.floor(Math.random() * pool.length)];
    setCharacterName(randomPick);
  };

  // Xử lý tạo nhân vật
  const handleCreate = () => {
    const trimmed = characterName.trim();
    if (!trimmed) {
      setErrorMsg('Vui lòng nhập đạo hiệu!');
      return;
    }
    if (trimmed.length < 2) {
      setErrorMsg('Đạo hiệu tối thiểu 2 ký tự!');
      return;
    }
    if (trimmed.length > 14) {
      setErrorMsg('Đạo hiệu tối đa 14 ký tự!');
      return;
    }

    setIsCreating(true);
    setErrorMsg(null);

    const newChar: CreatedCharacterData = {
      name: trimmed,
      gender,
      level: 1,
      cultivation: 'Phàm Nhân',
      serverId: server.id,
      serverName: server.name,
    };

    setTimeout(() => {
      setIsCreating(false);
      onCreateSuccess(newChar);
    }, 400);
  };

  return (
    <div className="w-full h-full relative overflow-hidden flex flex-col justify-between select-none bg-[#0a1a17]">
      {/* 1. Ảnh nền Tiên Giới bao phủ toàn màn hình */}
      <img
        src={bgCreate}
        alt="Bối cảnh Tạo Nhân Vật"
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      />

      {/* Lớp phủ sáng nhẹ tạo chiều sâu tiên cảnh */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-400/10 via-transparent to-black/30 pointer-events-none" />

      {/* 2. Thanh điều hướng trên cùng (Nút trở về & Huy hiệu Server) */}
      <div className="relative z-20 w-full pt-3 px-3 flex items-center justify-between">
        {/* Nút trở về chọn máy chủ */}
        <button
          onClick={onBack}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center active:scale-90 transition-transform focus:outline-none cursor-pointer drop-shadow-md"
          title="Quay lại chọn máy chủ"
        >
          <img
            src={btnBack}
            alt="Trở về"
            className="w-full h-full object-contain"
          />
        </button>

        {/* Huy hiệu Máy Chủ đang chọn */}
        <div className="bg-[#0b2923]/80 backdrop-blur-sm border border-amber-400/60 rounded-full px-3 py-1 flex items-center gap-1.5 shadow-lg">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[11px] sm:text-xs font-bold text-amber-200 tracking-wide drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {server.name}
          </span>
        </div>
      </div>

      {/* 3. Phần Đầu: Logo Game & Banner "Tạo Nhân Vật" - Tạo khoảng cách thoáng đãng, không bị đè lên nhau */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-0.5 sm:pt-1">
        {/* Logo Game 2D */}
        <div className="w-[150px] sm:w-[180px] drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)]">
          <img
            src={logoImg}
            alt="Phàm Lộ Tu Tiên 2D"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Tiêu đề "Tạo Nhân Vật" - Tách khoảng cách vừa vặn dưới Logo */}
        <div className="w-[220px] sm:w-[260px] mt-1 sm:mt-1.5 drop-shadow-[0_3px_8px_rgba(0,0,0,0.7)]">
          <img
            src={titleCreate}
            alt="Tạo Nhân Vật"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* 4. Phần Giữa: Hai Thẻ Chọn Giới Tính (Nam / Nữ) - Tăng kích thước thẻ chọn, thu nhỏ thẻ không chọn */}
      <div className="relative z-10 w-full px-2 sm:px-3 flex items-center justify-center gap-1 sm:gap-2 my-auto">
        {/* Thẻ Nam */}
        <div
          onClick={() => handleSelectGender('male')}
          className={`relative aspect-[1024/1536] w-[48%] max-w-[195px] cursor-pointer transition-all duration-300 origin-center ${
            gender === 'male'
              ? 'scale-110 sm:scale-[1.12] z-20 drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]'
              : 'scale-[0.88] sm:scale-[0.86] opacity-70 hover:opacity-90 z-10 brightness-90'
          }`}
        >
          {/* 1. Nền tiên cảnh & Khung viền cơ bản */}
          <img
            src={frameUnselected}
            alt="Khung Nền Nam"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* 2. Khung viền vàng kim hào quang & Dấu tick (chỉ hiện khi chọn) */}
          {gender === 'male' && (
            <img
              src={frameSelected}
              alt="Khung Nam Đang Chọn"
              className="absolute inset-0 w-full h-full object-contain scale-[1.06] -translate-y-[1px] pointer-events-none"
            />
          )}

          {/* 3. Ảnh nhân vật Nam hiển thị trọn vẹn ở phía trên nền khung */}
          <img
            src={maleChar}
            alt="Nhân vật Nam"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        </div>

        {/* Thẻ Nữ */}
        <div
          onClick={() => handleSelectGender('female')}
          className={`relative aspect-[1024/1536] w-[48%] max-w-[195px] cursor-pointer transition-all duration-300 origin-center ${
            gender === 'female'
              ? 'scale-110 sm:scale-[1.12] z-20 drop-shadow-[0_0_20px_rgba(251,191,36,0.7)]'
              : 'scale-[0.88] sm:scale-[0.86] opacity-70 hover:opacity-90 z-10 brightness-90'
          }`}
        >
          {/* 1. Nền tiên cảnh & Khung viền cơ bản */}
          <img
            src={frameUnselected}
            alt="Khung Nền Nữ"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />

          {/* 2. Khung viền vàng kim hào quang & Dấu tick (chỉ hiện khi chọn) */}
          {gender === 'female' && (
            <img
              src={frameSelected}
              alt="Khung Nữ Đang Chọn"
              className="absolute inset-0 w-full h-full object-contain scale-[1.06] -translate-y-[1px] pointer-events-none"
            />
          )}

          {/* 3. Ảnh nhân vật Nữ hiển thị trọn vẹn ở phía trên nền khung */}
          <img
            src={femaleChar}
            alt="Nhân vật Nữ"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
          />
        </div>
      </div>

      {/* Thông báo lỗi nếu có */}
      {errorMsg && (
        <div className="relative z-30 mx-auto px-4 py-1 -mb-1 bg-red-950/90 text-amber-200 border border-red-600/80 rounded-full text-xs font-bold shadow-lg animate-bounce">
          ⚠️ {errorMsg}
        </div>
      )}

      {/* 5. Phần Dưới: Ô Nhập Tên & Nút "Tạo Nhân Vật" */}
      <div className="relative z-20 w-full flex flex-col items-center pb-4 sm:pb-6 space-y-1 sm:space-y-2">
        {/* Khung nhập tên nhân vật */}
        <div className="relative w-[90%] max-w-[360px] aspect-[2172/724] drop-shadow-[0_4px_12px_rgba(0,0,0,0.7)]">
          {/* Toàn bộ khung đồ họa nhập tên (gồm cả ribbon "Tên nhân vật" và ô cuộn) */}
          <img
            src={inpNameFrame}
            alt="Khung nhập tên"
            className="w-full h-full object-contain pointer-events-none"
          />

          {/* Ô Input văn bản đè chính xác lên vùng nền giấy trắng ngà bên trái */}
          <div className="absolute left-[15%] right-[42%] top-[48%] bottom-[16%] flex items-center">
            <input
              type="text"
              value={characterName}
              onChange={(e) => {
                setCharacterName(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Nhập tên của bạn"
              maxLength={14}
              className="w-full bg-transparent text-[#2d1b0e] placeholder-[#8a7663] font-extrabold text-xs sm:text-sm outline-none px-2 text-center truncate drop-shadow-sm"
            />
          </div>

          {/* Nút Random tên (icon xúc xắc + chữ) phóng to nổi bật bên phải - Không xoay khi bấm */}
          <button
            type="button"
            onClick={handleRandomName}
            className="absolute right-[13%] top-[40%] bottom-[13%] w-[28%] flex items-center justify-center active:scale-95 transition-transform focus:outline-none cursor-pointer"
            title="Đổi tên ngẫu nhiên"
          >
            <img
              src={btnRandom}
              alt="Random tên"
              className="w-full h-full object-contain scale-110 sm:scale-120"
            />
          </button>
        </div>

        {/* Nút to dưới cùng: "Tạo Nhân Vật" */}
        <button
          type="button"
          onClick={handleCreate}
          disabled={isCreating}
          className={`relative w-[78%] max-w-[310px] aspect-[2172/724] flex items-center justify-center active:scale-95 transition-transform duration-150 focus:outline-none cursor-pointer drop-shadow-[0_6px_16px_rgba(0,0,0,0.85)] ${
            isCreating ? 'opacity-80 cursor-wait' : ''
          }`}
          title="Tạo Nhân Vật & Vào Game"
        >
          <img
            src={btnCreate}
            alt="Tạo Nhân Vật"
            className="w-full h-full object-contain"
          />
        </button>
      </div>
    </div>
  );
};

