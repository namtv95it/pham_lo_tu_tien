import React, { useState, useEffect } from 'react';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { ServerSelectScreen, ServerInfo } from './components/ServerSelectScreen';
import { CharacterCreateScreen, CreatedCharacterData } from './components/CharacterCreateScreen';
import { MainGameScreen } from './components/MainGameScreen';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from './services/firebase';

export const App: React.FC = () => {
  const [appState, setAppState] = useState<'splash' | 'login' | 'server_select' | 'character_create' | 'game'>('splash');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedServer, setSelectedServer] = useState<ServerInfo | null>(null);
  const [activeCharacter, setActiveCharacter] = useState<CreatedCharacterData | null>(null);

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
              // Nếu máy chủ đã có nhân vật -> vào game luôn
              if (server.hasCharacter) {
                setActiveCharacter({
                  name: server.characterName || 'Đạo Hữu',
                  gender: 'male',
                  level: server.level || 1,
                  cultivation: server.cultivation || 'Phàm Nhân',
                  serverId: server.id,
                  serverName: server.name,
                });
                setAppState('game');
              } else {
                // Nếu máy chủ chưa có nhân vật -> chuyển sang trang Tạo Nhân Vật
                setAppState('character_create');
              }
            }}
            onBack={() => {
              // Nhấn nút trở về có thể đăng xuất hoặc quay lại màn đăng nhập
              handleLogout();
            }}
          />
        )}

        {/* 4. Màn hình Tạo Nhân Vật (khi chọn server chưa có nhân vật) */}
        {appState === 'character_create' && selectedServer && (
          <CharacterCreateScreen
            server={selectedServer}
            currentUser={currentUser}
            onBack={() => setAppState('server_select')}
            onCreateSuccess={(charData) => {
              setActiveCharacter(charData);
              // Cập nhật trạng thái máy chủ hiện tại đã có nhân vật
              setSelectedServer({
                ...selectedServer,
                hasCharacter: true,
                characterName: charData.name,
                level: charData.level,
                cultivation: charData.cultivation,
              });
              setAppState('game');
            }}
          />
        )}

        {/* 5. Màn hình Gameplay Chính (Huyền Lộ Bình & Chiến Đấu Nấm Lùn) */}
        {appState === 'game' && (
          <MainGameScreen
            server={selectedServer}
            character={activeCharacter}
            onBackToServerSelect={() => setAppState('server_select')}
            onLogout={handleLogout}
          />
        )}
      </main>
    </div>
  );
};

export default App;
