import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import Profile from './pages/Profile';

export default function App() {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
      const tgUser = JSON.parse(window.Telegram.WebApp.initDataUnsafe.user || '{}');
      if (tgUser.id) {
        setIsAuth(true);
      }
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={isAuth ? <Home /> : <Register />} />
        <Route path="/create-test" element={<CreateTest />} />
        <Route path="/take-test" element={<TakeTest />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}
