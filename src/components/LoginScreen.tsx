import React, { useState } from 'react';
import bgLogin from '@/assets/images/login_screen/background_login.png';
import frameChat from '@/assets/images/login_screen/frame-chat.png';
import tabLogin from '@/assets/images/login_screen/select_login.png';
import tabRegister from '@/assets/images/login_screen/select_register.png';
import btnAction from '@/assets/images/login_screen/button_action.png';
import logoImg from '@/assets/images/common/logo_game_2d.png';
import sloganImg from '@/assets/images/common/slogan_game.png';
import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  signInAnonymously,
  sendPasswordResetEmail
} from 'firebase/auth';
import { auth } from '../services/firebase';

interface LoginScreenProps {
  onLoginSuccess: () => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    let normalizedEmail = email.trim();
    if (!normalizedEmail) {
      setErrorMsg('Vui lòng nhập tên tài khoản hoặc email!');
      return;
    }
    if (!normalizedEmail.includes('@')) {
      normalizedEmail = `${normalizedEmail}@phamlotutien.game`;
    }

    if (!password) {
      setErrorMsg('Vui lòng nhập mật khẩu!');
      return;
    }

    if (tab === 'register') {
      if (password.length < 6) {
        setErrorMsg('Mật khẩu tối thiểu cần 6 ký tự!');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMsg('Xác nhận mật khẩu không trùng khớp!');
        return;
      }
    }

    setLoading(true);
    try {
      if (tab === 'login') {
        await signInWithEmailAndPassword(auth, normalizedEmail, password);
        onLoginSuccess();
      } else {
        await createUserWithEmailAndPassword(auth, normalizedEmail, password);
        setSuccessMsg('Đăng ký tài khoản thành công!');
        setTimeout(() => {
          onLoginSuccess();
        }, 800);
      }
    } catch (err: any) {
      console.error('Firebase Auth error:', err);
      let msg = 'Đăng nhập thất bại. Vui lòng kiểm tra lại!';
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') {
        msg = 'Tài khoản hoặc mật khẩu không chính xác!';
      } else if (err.code === 'auth/email-already-in-use') {
        msg = 'Tên tài khoản/Email này đã được sử dụng!';
      } else if (err.code === 'auth/weak-password') {
        msg = 'Mật khẩu quá yếu (tối thiểu 6 ký tự)!';
      } else if (err.code === 'auth/user-not-found') {
        msg = 'Tài khoản không tồn tại. Hãy đăng ký!';
      } else if (err.code === 'auth/too-many-requests') {
        msg = 'Thử lại quá nhiều lần. Vui lòng đợi trong giây lát!';
      }
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    setErrorMsg(null);
    try {
      await signInAnonymously(auth);
      onLoginSuccess();
    } catch (err: any) {
      setErrorMsg('Đăng nhập ẩn danh thất bại: ' + (err.message || 'Lỗi mạng'));
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    let normalizedEmail = email.trim();
    if (!normalizedEmail || !normalizedEmail.includes('@')) {
      setErrorMsg('Vui lòng nhập đúng địa chỉ Email của bạn vào ô trên để khôi phục mật khẩu!');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, normalizedEmail);
      setSuccessMsg('Đã gửi email khôi phục mật khẩu! Vui lòng kiểm tra hòm thư.');
    } catch (err: any) {
      setErrorMsg('Không thể gửi email: ' + (err.message || 'Lỗi hệ thống'));
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-between items-center overflow-y-auto overflow-x-hidden p-2 select-none font-sans">
      {/* Background Tiên Cảnh 941x1672 bao phủ toàn bộ */}
      <img
        src={bgLogin}
        alt="Background Tiên Cảnh"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Lớp phủ ánh sáng tinh tế */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />

      {/* 1. Phần Trên: Logo & Khẩu Hiệu Slogan */}
      <header className="relative z-10 pt-2 sm:pt-4 flex flex-col items-center w-full shrink-0">
        <div className="w-[56%] max-w-[210px] aspect-[683/436] flex items-center justify-center">
          <img
            src={logoImg}
            alt="Phàm Lộ Tu Tiên Logo"
            className="w-full h-full object-contain drop-shadow-[0_6px_14px_rgba(0,0,0,0.6)]"
          />
        </div>
        <div className="w-[66%] max-w-[240px] aspect-[760/168] mt-[-2px] flex items-center justify-center">
          <img
            src={sloganImg}
            alt="Thân mang phàm cốt, tâm hướng tiên đồ"
            className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]"
          />
        </div>
      </header>

      {/* 2. Phần Giữa: Khối Card Khung Đăng Nhập Hoàn Chỉnh */}
      <main className="relative z-20 w-full max-w-[370px] my-auto px-2 pt-8 sm:pt-10 pb-2 flex flex-col items-center">
        {/* Khung Viền Giấy Trúc Cuộn Thư Tỷ Lệ Chuẩn (916/1136) */}
        <div className="relative w-full aspect-[916/1136] flex flex-col items-center">
          
          {/* 1. Lớp hình ảnh nền 2 nút Tab (z-10 NẰM DƯỚI Khung Đăng Nhập z-20) */}
          <div className="absolute -top-[5.2%] sm:-top-[5%] left-1/2 -translate-x-1/2 w-[88%] sm:w-[86%] aspect-[1958/397] z-10 pointer-events-none">
            <img
              src={tab === 'login' ? tabLogin : tabRegister}
              alt="Tab Selection"
              className="w-full h-full object-contain drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]"
            />
          </div>

          {/* 2. Ảnh nền Khung Card cuộn thư (Lớp phủ z-20 NẰM TRÊN ảnh tab) */}
          <img
            src={frameChat}
            alt="Frame Login Card"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none z-20 drop-shadow-[0_12px_28px_rgba(0,0,0,0.55)]"
          />

          {/* 3. Lớp văn bản & nút bấm click của 2 Tab (z-40 NẰM TRÊN CÙNG để click thoải mái) */}
          <div className="absolute -top-[5.2%] sm:-top-[5%] left-1/2 -translate-x-1/2 w-[88%] sm:w-[86%] aspect-[1958/397] z-40 flex pointer-events-auto">
            {/* Nút Tab Đăng Nhập (Trái) */}
            <button
              type="button"
              onClick={() => { setTab('login'); setErrorMsg(null); setSuccessMsg(null); }}
              className="w-1/2 h-full flex items-center justify-center pb-1 sm:pb-1.5 font-bold text-xs sm:text-sm tracking-wide cursor-pointer transition-opacity active:opacity-80"
            >
              <span className={tab === 'login' ? 'text-[#1c2e27] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#fbf7ee] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'}>
                Đăng nhập
              </span>
            </button>

            {/* Nút Tab Đăng Ký (Phải) */}
            <button
              type="button"
              onClick={() => { setTab('register'); setErrorMsg(null); setSuccessMsg(null); }}
              className="w-1/2 h-full flex items-center justify-center pb-1 sm:pb-1.5 font-bold text-xs sm:text-sm tracking-wide cursor-pointer transition-opacity active:opacity-80"
            >
              <span className={tab === 'register' ? 'text-[#1c2e27] drop-shadow-[0_1px_1px_rgba(255,255,255,0.8)]' : 'text-[#fbf7ee] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]'}>
                Đăng ký
              </span>
            </button>
          </div>

          {/* Vùng Form Nội Dung (z-30 nằm trên nền giấy cuộn thư, căn chỉnh gọn gàng bên trong không chạm rèm ngọc) */}
          <form
            onSubmit={handleSubmit}
            className="relative z-30 w-full h-full flex flex-col justify-start gap-1.5 sm:gap-2 pt-[13%] pb-[18%] px-[9%] sm:px-[10%]"
          >
            {/* Thông báo lỗi / thành công nếu có */}
            {errorMsg && (
              <div className="bg-red-100/90 border border-red-400 text-red-800 text-[10px] sm:text-[11px] px-2 py-0.5 rounded text-center leading-tight">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-emerald-100/90 border border-emerald-400 text-emerald-800 text-[10px] sm:text-[11px] px-2 py-0.5 rounded text-center leading-tight">
                {successMsg}
              </div>
            )}

            {/* Ô 1: Tên tài khoản / Email */}
            <div className="flex items-center bg-[#fdf9f0] border border-[#d8c7a7] rounded-full px-3.5 py-1.5 sm:py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus-within:border-emerald-600">
              <span className="text-[#846b45] mr-2 shrink-0">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Tên tài khoản / Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm text-slate-800 placeholder-[#9b8969] font-medium"
              />
            </div>

            {/* Ô 2: Mật khẩu */}
            <div className="flex items-center bg-[#fdf9f0] border border-[#d8c7a7] rounded-full px-3.5 py-1.5 sm:py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus-within:border-emerald-600">
              <span className="text-[#846b45] mr-2 shrink-0">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent outline-none text-xs sm:text-sm text-slate-800 placeholder-[#9b8969] font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#846b45] hover:text-slate-800 ml-1.5 shrink-0 p-0.5"
              >
                {showPassword ? (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Ô 3: Xác nhận mật khẩu (khi ở Tab Đăng Ký) */}
            {tab === 'register' && (
              <div className="flex items-center bg-[#fdf9f0] border border-[#d8c7a7] rounded-full px-3.5 py-1.5 sm:py-2 shadow-[inset_0_2px_4px_rgba(0,0,0,0.06)] focus-within:border-emerald-600 animate-in fade-in duration-200">
                <span className="text-[#846b45] mr-2 shrink-0">
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Xác nhận lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-transparent outline-none text-xs sm:text-sm text-slate-800 placeholder-[#9b8969] font-medium"
                />
              </div>
            )}

            {/* Hàng: Ghi nhớ đăng nhập & Quên mật khẩu */}
            <div className="flex items-center justify-between text-[11px] sm:text-xs px-1 text-[#2c3e38] pt-0.5">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-3.5 h-3.5 rounded accent-emerald-700 cursor-pointer"
                />
                <span className="font-semibold text-[#1c2e27]">Ghi nhớ đăng nhập</span>
              </label>

              {tab === 'login' && (
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="underline text-[#1c2e27] hover:text-emerald-800 font-semibold"
                >
                  Quên mật khẩu?
                </button>
              )}
            </div>

            {/* Nút Hành Động Chính (button_action.png) */}
            <div className="flex justify-center mt-0.5 sm:mt-1">
              <button
                type="submit"
                disabled={loading}
                className="relative w-[88%] sm:w-[86%] max-w-[280px] aspect-[2052/422] flex items-center justify-center transition-transform active:scale-95 disabled:opacity-70 group cursor-pointer"
              >
                <img
                  src={btnAction}
                  alt="Action Button"
                  className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)] group-hover:brightness-105"
                />
                <span className="relative z-10 text-[#fffcf0] font-bold text-xs sm:text-sm tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.85)]">
                  {loading ? 'Đang xử lý...' : tab === 'login' ? 'Đăng Nhập' : 'Đăng Ký'}
                </span>
              </button>
            </div>

            {/* Đường phân cách: ── Hoặc đăng nhập bằng ── */}
            <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-[#846b45] font-medium pt-0.5">
              <span className="h-[1px] w-7 sm:w-10 bg-gradient-to-r from-transparent to-[#c8b798]" />
              <span className="font-serif">Hoặc đăng nhập bằng</span>
              <span className="h-[1px] w-7 sm:w-10 bg-gradient-to-l from-transparent to-[#c8b798]" />
            </div>

            {/* 4 Icon Mạng Xã Hội Tròn */}
            <div className="flex items-center justify-center gap-3 pt-0.5">
              {/* Google */}
              <button
                type="button"
                onClick={handleGuestLogin}
                title="Đăng nhập Google"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-white border border-[#dfd4be] shadow-sm flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
              </button>

              {/* Facebook */}
              <button
                type="button"
                onClick={handleGuestLogin}
                title="Đăng nhập Facebook"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-[#1877F2] text-white shadow-sm flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </button>

              {/* Apple */}
              <button
                type="button"
                onClick={handleGuestLogin}
                title="Đăng nhập Apple"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-black text-white shadow-sm flex items-center justify-center hover:scale-105 transition-transform cursor-pointer"
              >
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.66-.82 1.11-1.96.99-3.1-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.83-.98 2.94 1.08.08 2.17-.55 2.79-1.28z" />
                </svg>
              </button>

              {/* Zalo */}
              <button
                type="button"
                onClick={handleGuestLogin}
                title="Đăng nhập Zalo / Chơi Nhanh"
                className="w-7.5 h-7.5 sm:w-8 sm:h-8 rounded-full bg-[#0068FF] text-white shadow-sm flex items-center justify-center font-bold text-[8.5px] sm:text-[9px] hover:scale-105 transition-transform tracking-tight cursor-pointer"
              >
                Zalo
              </button>
            </div>
          </form>
        </div>
      </main>

      {/* 3. Phần Dưới: Chân Trang */}
      <footer className="relative z-10 pb-1 text-center text-[10px] text-white/70 tracking-wider font-mono">
        Phàm Lộ Tu Tiên • v0.1.0
      </footer>
    </div>
  );
};
