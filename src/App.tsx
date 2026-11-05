import React from 'react';
import { SplashScreen } from './components/SplashScreen';

export const App: React.FC = () => {
  return (
    // Nền tối trên màn hình PC, căn khung mobile vào chính giữa
    <div className="w-full min-h-screen bg-[#05070a] flex items-center justify-center sm:p-4 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Khung Mobile Viewport chuẩn tỉ lệ điện thoại */}
      <main className="w-full max-w-[430px] h-[100dvh] sm:h-[880px] sm:max-h-[920px] bg-[#080b11] relative shadow-2xl sm:border sm:border-slate-800/80 sm:rounded-3xl overflow-hidden">
        <SplashScreen />
      </main>
    </div>
  );
};

export default App;
