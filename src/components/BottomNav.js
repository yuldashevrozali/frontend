import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useNavigate, useLocation } from 'react-router-dom';
export default function BottomNav() {
    const navigate = useNavigate();
    const location = useLocation();
    const items = [
        { icon: '📋', label: 'Test Ishlash', path: '/take-test' },
        { icon: '📝', label: 'Test Yaratish', path: '/create-test' },
        { icon: '👤', label: 'Profil', path: '/profile' },
    ];
    return (_jsx("div", { className: "fixed bottom-0 left-0 right-0 z-50", children: _jsx("div", { className: "glass mx-4 mb-4 rounded-2xl px-4 py-2 flex justify-around items-center", children: items.map((item) => {
                const isActive = location.pathname === item.path;
                return (_jsxs("button", { onClick: () => navigate(item.path), className: `flex flex-col items-center py-2 px-4 rounded-xl transition-all ${isActive
                        ? 'bg-white/20 scale-105'
                        : 'hover:bg-white/10'}`, children: [_jsx("span", { className: `text-2xl mb-1 ${isActive ? 'scale-110' : ''} transition-transform`, children: item.icon }), _jsx("span", { className: `text-xs font-medium ${isActive ? 'text-white' : 'text-white/50'}`, children: item.label })] }, item.path));
            }) }) }));
}
//# sourceMappingURL=BottomNav.js.map