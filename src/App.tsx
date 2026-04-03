import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';

function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const showNav = location.pathname !== '/register';

  return (
    <div className="min-h-screen pb-24">
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
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/create-test" element={<CreateTest />} />
          <Route path="/take-test" element={<TakeTest />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
