import React from 'react';

export const App: React.FC = () => {
  return (
    // Toàn bộ màn hình PC làm nền tối, căn khung mobile vào giữa
    <div className="w-full min-h-screen bg-[#05070a] flex items-center justify-center sm:p-4 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Khung mô phỏng màn hình Mobile (tối đa 430px, tỷ lệ chuẩn điện thoại) */}
      <main className="w-full max-w-[430px] min-h-screen sm:min-h-[844px] sm:max-h-[920px] bg-[#080b11] text-slate-100 flex flex-col items-center justify-center p-6 text-center relative shadow-2xl sm:border sm:border-slate-800/80 sm:rounded-3xl overflow-hidden">
        <div className="space-y-4">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif tracking-wider bg-gradient-to-r from-amber-200 via-sky-300 to-amber-100 bg-clip-text text-transparent">
            Phàm Lộ Tu Tiên
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-serif italic tracking-wide">
            &ldquo;Thân mang phàm cốt, tâm hướng tiên đồ.&rdquo;
          </p>
        </div>
      </main>
    </div>
  );
};

export default App;
