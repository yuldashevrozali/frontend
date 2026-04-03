import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx(BrowserRouter, { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/register", element: _jsx(Register, {}) }), _jsx(Route, { path: "/", element: isAuth ? _jsx(Home, {}) : _jsx(Register, {}) }), _jsx(Route, { path: "/create-test", element: _jsx(CreateTest, {}) }), _jsx(Route, { path: "/take-test", element: _jsx(TakeTest, {}) }), _jsx(Route, { path: "/profile", element: _jsx(Profile, {}) })] }) }));
}
//# sourceMappingURL=App.js.map