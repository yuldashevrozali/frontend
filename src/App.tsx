import { useEffect } from 'react';
// ✅ BrowserRouter o'rniga HashRouter import qilamiz
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  // HashRouter bilan ham pathname ishlaydi, shuning uchun o'zgartirish shart emas
  const showNav = location.pathname !== '/register';

  return (
    <div style={{
      minHeight: '100vh',
      paddingBottom: showNav ? '100px' : '0',
    }}>
      {children}
      {showNav && <BottomNav />}
    </div>
  );
}

export default function App() {
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.ready();
      window.Telegram.WebApp.expand();
    }
  }, []);

  return (
    // ✅ BrowserRouter o'rniga HashRouter ishlatamiz
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}