import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
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
export default function App() {
    useEffect(() => {
        if (window.Telegram?.WebApp) {
            window.Telegram.WebApp.ready();
            window.Telegram.WebApp.expand();
        }
    }, []);
    return (_jsx(BrowserRouter, { children: _jsx(Layout, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: _jsx(Home, {}) }), _jsx(Route, { path: "/create-test", element: _jsx(CreateTest, {}) }), _jsx(Route, { path: "/take-test", element: _jsx(TakeTest, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }) }) }));
}
//# sourceMappingURL=App.js.map