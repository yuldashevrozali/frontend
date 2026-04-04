import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateTest from './pages/CreateTest';
import TakeTest from './pages/TakeTest';
import Profile from './pages/Profile';
import BottomNav from './components/BottomNav';
function Layout({ children }) {
    const location = useLocation();
    const showNav = location.pathname !== '/register';
    return (_jsxs("div", { style: {
            minHeight: '100vh',
            paddingBottom: showNav ? '100px' : '0',
        }, children: [children, showNav && _jsx(BottomNav, {})] }));
}
// Hash-based navigation handler (for bot buttons)
function HashRedirect() {
    const navigate = useNavigate();
    const [handled, setHandled] = useState(false);
    useEffect(() => {
        const hash = window.location.hash.replace('#', '');
        if (hash && !handled) {
            setHandled(true);
            if (hash === 'create-test')
                navigate('/create-test');
            else if (hash === 'take-test')
                navigate('/take-test');
            else if (hash === 'profile')
                navigate('/profile');
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
    return (_jsxs(BrowserRouter, { children: [_jsx(HashRedirect, {}), _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/create-test", element: _jsx(CreateTest, {}) }), _jsx(Route, { path: "/take-test", element: _jsx(TakeTest, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }) })] }));
}
//# sourceMappingURL=App.js.map