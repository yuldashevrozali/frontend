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
    return (_jsx("div", { style: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            padding: '8px 16px 16px 16px',
        }, children: _jsx("div", { style: {
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '12px 8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }, children: items.map((item) => {
                const isActive = location.pathname === item.path;
                return (_jsxs("button", { onClick: () => navigate(item.path), style: {
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: '8px 16px',
                        borderRadius: '12px',
                        border: 'none',
                        background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        transform: isActive ? 'scale(1.05)' : 'scale(1)',
                    }, children: [_jsx("span", { style: {
                                fontSize: '24px',
                                marginBottom: '4px',
                                filter: isActive ? 'none' : 'grayscale(0.5)',
                            }, children: item.icon }), _jsx("span", { style: {
                                fontSize: '11px',
                                fontWeight: 600,
                                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
                            }, children: item.label })] }, item.path));
            }) }) }));
}
//# sourceMappingURL=BottomNav.js.map