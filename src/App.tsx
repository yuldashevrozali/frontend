import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import Test from './pages/Test';
import API from './api/client';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      // Oddiy tekshiruv: agar foydalanuvchi oldin ro'yxatdan o'tgan bo'lsa
      const checkUser = async () => {
        const tgUser = JSON.parse(window.Telegram.WebApp.initDataUnsafe.user || '{}');
        if (tgUser.id) {
          // Bu yerda backend'dan /me endpoint chaqirish mumkin
          setIsAuth(true); // Demo uchun true
        }
      };
      checkUser();
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuth ? <Home /> : <Register />} />
        <Route path="/test/:id" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}