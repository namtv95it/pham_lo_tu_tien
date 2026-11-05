import React from 'react';

export const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080b11] text-slate-100 flex flex-col items-center justify-center p-6 selection:bg-amber-500/20 selection:text-amber-300">
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl md:text-6xl font-extrabold font-serif tracking-wider bg-gradient-to-r from-amber-200 via-sky-300 to-amber-100 bg-clip-text text-transparent">
          Phàm Lộ Tu Tiên
        </h1>
        <p className="text-lg md:text-xl text-slate-300 font-serif italic tracking-wide">
          &ldquo;Thân mang phàm cốt, tâm hướng tiên đồ.&rdquo;
        </p>
      </div>
    </div>
  );
};

export default App;
