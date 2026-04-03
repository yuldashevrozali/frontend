import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
const navItems = [
    { label: 'Test yaratish', icon: '📝', path: '/create-test' },
    { label: 'Test ishlash', icon: '🧑‍💻', path: '/take-test' },
    { label: 'Profil', icon: '👤', path: '/profile' },
];
export default function MainLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    return (_jsxs("div", { className: "min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-gray-900 flex flex-col", children: [_jsx("div", { className: "flex-1 pb-20", children: _jsx(Outlet, {}) }), _jsx("nav", { className: "fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/10 flex justify-around items-center h-20 z-50", children: navItems.map((item) => {
                    const active = location.pathname === item.path;
                    return (_jsxs("button", { onClick: () => navigate(item.path), className: `flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200 ${active ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-110' : 'text-white/60'}`, children: [_jsx("span", { className: "text-2xl", children: item.icon }), _jsx("span", { className: "text-xs font-semibold", children: item.label })] }, item.path));
                }) })] }));
}
//# sourceMappingURL=MainLayout.js.map