import React, { useState, useEffect } from 'react';
import bgImage from '../assets/images/splash_screen/03_Background_Clean_1080x1920.png';
import logoImage from '../assets/images/splash_screen/01_Logo_Pham_Lo_Tu_Tien_2D.png';
import sloganImage from '../assets/images/splash_screen/02_Slogan.png';
import textFrameImage from '../assets/images/splash_screen/04_Khung_Van_Ban_Loading_Rong.png';
import barEmptyImage from '../assets/images/splash_screen/05_Thanh_Loading_0_Phan_Tram.png';
import barFullImage from '../assets/images/splash_screen/06_Thanh_Loading_100_Phan_Tram.png';

interface SplashScreenProps {
  onLoadComplete?: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onLoadComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Giả lập tiến trình tải tài nguyên game chân thực (0% -> 100%)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoaded(true);
          if (onLoadComplete) {
            setTimeout(onLoadComplete, 600);
          }
          return 100;
        }
        // Tải từng đợt ngẫu nhiên 3% - 12%
        const increment = Math.floor(Math.random() * 9) + 3;
        return Math.min(100, prev + increment);
      });
    }, 180);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden select-none">
      {/* Background Phong Cảnh Tu Tiên 1080x1920 */}
      <img
        src={bgImage}
        alt="Phàm Lộ Tu Tiên Background"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Hiệu ứng ánh sáng hào quang nhẹ phủ trên màn hình */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Phần Trên: Logo & Khẩu Hiệu Slogan */}
      <header className="relative z-10 pt-8 sm:pt-10 flex flex-col items-center">
        {/* Logo Game 2D */}
        <div className="w-[74%] max-w-[290px] aspect-[683/436] flex items-center justify-center">
          <img
            src={logoImage}
            alt="Phàm Lộ Tu Tiên 2D Logo"
            className="w-full h-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)] animate-in fade-in duration-700"
          />
        </div>

        {/* Khẩu hiệu: Thân mang phàm cốt, tâm hướng tiên đồ */}
        <div className="w-[82%] max-w-[320px] aspect-[760/168] mt-1 flex items-center justify-center">
          <img
            src={sloganImage}
            alt="Thân mang phàm cốt, tâm hướng tiên đồ"
            className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)] animate-in fade-in duration-1000"
          />
        </div>
      </header>

      {/* Phần Giữa: Để trống để lộ trọn vẹn Bảo Bình Ngọc linh khí và bàn thạch ở background */}
      <div className="flex-1" />

      {/* Phần Dưới: Khung Văn Bản & Thanh Tiến Độ Tải */}
      <footer className="relative z-10 pb-8 sm:pb-10 px-4 flex flex-col items-center gap-2">
        {/* Khung Văn Bản: "Đang tải tài nguyên... {progress}%" */}
        <div className="relative w-[84%] max-w-[330px] aspect-[741/132] flex items-center justify-center">
          <img
            src={textFrameImage}
            alt="Khung tải"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
          <span className="relative z-10 text-white font-serif font-medium text-xs sm:text-sm tracking-wide drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] pt-0.5">
            {isLoaded ? 'Khởi tạo hoàn tất!' : `Đang tải tài nguyên... ${progress}%`}
          </span>
        </div>

        {/* Thanh Loading (Ghép từ ảnh 0% khung rỗng và ảnh 100% đầy) */}
        <div className="relative w-[88%] max-w-[350px] aspect-[760/100] flex items-center justify-center mt-0.5">
          {/* Thanh Khung Rỗng (0%) */}
          <img
            src={barEmptyImage}
            alt="Loading Frame"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
          />

          {/* Thanh Vàng Sáng (100%) - Cắt bằng clipPath theo % tiến độ */}
          <img
            src={barFullImage}
            alt="Loading Progress"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none transition-[clip-path] duration-200 ease-out"
            style={{
              clipPath: `inset(0 ${(100 - progress).toFixed(1)}% 0 0)`,
            }}
          />
        </div>

        {/* Thông tin phiên bản chân trang */}
        <div className="text-[10px] text-amber-100/70 font-mono tracking-widest uppercase drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)] mt-1">
          v0.1.0 • Phàm Lộ Tu Tiên
        </div>
      </footer>
    </div>
  );
};
