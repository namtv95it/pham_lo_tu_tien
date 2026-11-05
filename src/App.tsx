import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { ServerSelectScreen, ServerInfo } from './components/ServerSelectScreen';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './services/firebase';

export const App: React.FC = () => {
  const [appState, setAppState] = useState<'splash' | 'login' | 'server_select' | 'game'>('splash');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerInfo | null>(null);

  // Lắng nghe trạng thái đăng nhập Firebase trong nền
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);

  // Xử lý khi màn hình Splash chạy tải xong (100%)
  const handleSplashComplete = () => {
    if (auth.currentUser) {
      setAppState('server_select');
    } else {
      setAppState('login');
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setAppState('login');
  };

  return (
    // Nền tối trên màn hình PC, căn khung mobile vào chính giữa
    <div className="w-full min-h-screen bg-[#05070a] flex items-center justify-center sm:p-4 selection:bg-amber-500/20 selection:text-amber-300">
      {/* Khung Mobile Viewport chuẩn tỉ lệ điện thoại */}
      <main className="w-full max-w-[430px] h-[100dvh] sm:h-[880px] sm:max-h-[920px] bg-[#080b11] relative shadow-2xl sm:border sm:border-slate-800/80 sm:rounded-3xl overflow-hidden">
        {/* 1. Màn hình Splash Loading */}
        {appState === 'splash' && (
          <SplashScreen onLoadComplete={handleSplashComplete} />
        )}

        {/* 2. Màn hình Đăng Nhập / Đăng Ký (khi chưa đăng nhập) */}
        {appState === 'login' && (
          <LoginScreen onLoginSuccess={() => setAppState('server_select')} />
        )}

        {/* 3. Màn hình Chọn Máy Chủ (sau khi đăng nhập thành công) */}
        {appState === 'server_select' && (
          <ServerSelectScreen
            currentUser={currentUser}
            onEnterGame={(server) => {
              setSelectedServer(server);
              setAppState('game');
            }}
            onBack={() => {
              // Nhấn nút trở về có thể đăng xuất hoặc quay lại màn đăng nhập
              handleLogout();
            }}
          />
        )}

        {/* 4. Màn hình Trạng Thái Trong Game */}
        {appState === 'game' && (
          <div className="w-full h-full bg-[#080b11] text-slate-100 flex flex-col items-center justify-center p-6 text-center relative">
            <div className="space-y-4 max-w-xs">
              <span className="text-xs px-3 py-1 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800/60 font-mono">
                Đã Đăng Nhập Tiên Môn
              </span>
              <h1 className="text-3xl font-extrabold font-serif tracking-wider bg-gradient-to-r from-amber-200 via-sky-300 to-amber-100 bg-clip-text text-transparent">
                Phàm Lộ Tu Tiên
              </h1>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-left space-y-1 text-xs font-mono">
                <p className="text-amber-300 font-bold">
                  Máy chủ: {selectedServer?.name || 'S1 - Phàm Lộ'}
                </p>
                <p className="text-slate-300">
                  Tài khoản: {currentUser?.email || (currentUser?.isAnonymous ? 'Đạo Hữu Ẩn Danh' : 'Đạo Hữu')}
                </p>
                <p className="text-emerald-400">
                  Trạng thái máy chủ: {selectedServer?.statusText || 'Đông'}
                </p>
              </div>
              <p className="text-sm text-slate-300 font-serif italic tracking-wide">
                &ldquo;Thân mang phàm cốt, tâm hướng tiên đồ.&rdquo;
              </p>

              <div className="pt-4 flex items-center justify-center gap-2">
                <button
                  onClick={() => setAppState('server_select')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/50 text-xs font-semibold transition-colors"
                >
                  Đổi Máy Chủ
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2.5 rounded-xl bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-800/50 text-xs font-semibold transition-colors"
                >
                  Đăng Xuất
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
