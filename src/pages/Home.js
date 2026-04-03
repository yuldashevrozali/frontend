import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/me');
                setUser(res.data);
            }
            catch (err) {
                navigate('/register');
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);
    if (loading) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-white/80", children: "Yuklanmoqda..." })] }) }));
    }
    const menuItems = [
        { icon: '📝', title: 'Test Yaratish', desc: 'Yangi test yarating', color: 'from-green-400 to-emerald-600', path: '/create-test' },
        { icon: '📋', title: 'Test Ishlash', desc: 'Test kodini kiriting', color: 'from-blue-400 to-indigo-600', path: '/take-test' },
        { icon: '👤', title: 'Profil', desc: 'Natijalaringiz', color: 'from-purple-400 to-pink-600', path: '/profile' },
    ];
    return (_jsxs("div", { className: "min-h-screen p-4", children: [_jsx("div", { className: "glass rounded-3xl p-6 mb-6", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center", children: _jsx("span", { className: "text-2xl", children: "\uD83D\uDC4B" }) }), _jsxs("div", { children: [_jsx("h1", { className: "text-xl font-bold text-white", children: "Xush kelibsiz!" }), _jsxs("p", { className: "text-white/70", children: [user?.name, " ", user?.surname] })] })] }) }), _jsx("div", { className: "space-y-4", children: menuItems.map((item) => (_jsx("button", { onClick: () => navigate(item.path), className: "w-full glass rounded-2xl p-4 btn-hover text-left", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: `w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center`, children: _jsx("span", { className: "text-2xl", children: item.icon }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-bold text-white", children: item.title }), _jsx("p", { className: "text-white/60 text-sm", children: item.desc })] }), _jsx("div", { className: "ml-auto", children: _jsx("svg", { className: "w-6 h-6 text-white/40", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) }) })] }) }, item.path))) })] }));
}
//# sourceMappingURL=Home.js.map