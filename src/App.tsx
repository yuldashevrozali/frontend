import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
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
    <div style={{
      minHeight: '100vh',
      paddingBottom: showNav ? '100px' : '0',
    }}>
      {children}
      {showNav && <BottomNav />}
    </div>
  );
}

// Hash-based navigation handler (for bot buttons)
function HashRedirect() {
  const navigate = useNavigate();
  const [handled, setHandled] = useState(false);

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && !handled) {
      setHandled(true);
      if (hash === 'create-test') navigate('/create-test');
      else if (hash === 'take-test') navigate('/take-test');
      else if (hash === 'profile') navigate('/profile');
    }
  }, [navigate, handled]);

  return null;
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
      <HashRedirect />
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
