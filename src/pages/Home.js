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
        return (_jsx("div", { style: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }, children: _jsxs("div", { style: { textAlign: 'center' }, children: [_jsx("div", { style: {
                            width: '64px', height: '64px',
                            border: '4px solid rgba(255,255,255,0.2)',
                            borderTopColor: 'white',
                            borderRadius: '50%',
                            animation: 'spin 1s linear infinite',
                            margin: '0 auto 16px',
                        } }), _jsx("p", { style: { opacity: 0.8 }, children: "Yuklanmoqda..." })] }) }));
    }
    const menuItems = [
        { icon: '📝', title: 'Test Yaratish', desc: 'Yangi test yarating', gradient: 'linear-gradient(135deg, #10b981, #059669)', path: '/create-test' },
        { icon: '📋', title: 'Test Ishlash', desc: 'Test kodini kiriting', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', path: '/take-test' },
        { icon: '👤', title: 'Profil', desc: 'Natijalaringiz', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', path: '/profile' },
    ];
    return (_jsxs("div", { style: { padding: '16px', paddingBottom: '120px' }, children: [_jsx("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '24px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: {
                                width: '64px', height: '64px',
                                background: 'linear-gradient(135deg, #667eea, #764ba2)',
                                borderRadius: '18px',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                fontSize: '32px',
                            }, children: "\uD83D\uDC4B" }), _jsxs("div", { children: [_jsx("h1", { style: { fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }, children: "Xush kelibsiz!" }), _jsxs("p", { style: { opacity: 0.7, fontSize: '16px' }, children: [user?.name, " ", user?.surname] })] })] }) }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '16px' }, children: menuItems.map((item) => (_jsxs("button", { onClick: () => navigate(item.path), style: {
                        width: '100%',
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '20px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '16px',
                        transition: 'all 0.3s ease',
                        textAlign: 'left',
                    }, children: [_jsx("div", { style: {
                                width: '56px', height: '56px',
                                background: item.gradient,
                                borderRadius: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '28px',
                                flexShrink: 0,
                            }, children: item.icon }), _jsxs("div", { style: { flex: 1 }, children: [_jsx("h3", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', color: 'white' }, children: item.title }), _jsx("p", { style: { fontSize: '14px', opacity: 0.6, color: 'white' }, children: item.desc })] }), _jsx("svg", { style: { width: '24px', height: '24px', opacity: 0.4, color: 'white' }, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M9 5l7 7-7 7" }) })] }, item.path))) })] }));
}
//# sourceMappingURL=Home.js.map