import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [userRes, resultsRes] = await Promise.all([
                    API.get('/me'),
                    API.get('/results'),
                ]);
                setUser(userRes.data);
                setResults(resultsRes.data);
            }
            catch (err) {
                navigate('/register');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
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
    return (_jsxs("div", { style: { padding: '16px', paddingBottom: '120px' }, children: [_jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '24px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }, children: [_jsx("div", { style: {
                                    width: '72px', height: '72px',
                                    background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                                    borderRadius: '20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '36px',
                                }, children: "\uD83D\uDC64" }), _jsxs("div", { children: [_jsxs("h2", { style: { fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }, children: [user?.name, " ", user?.surname] }), _jsx("p", { style: { opacity: 0.6, fontSize: '16px' }, children: user?.phone })] })] }), _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }, children: [_jsxs("div", { style: {
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                }, children: [_jsx("p", { style: { fontSize: '12px', opacity: 0.6, marginBottom: '4px' }, children: "\uD83D\uDCCD Viloyat" }), _jsx("p", { style: { fontWeight: '600', fontSize: '16px' }, children: user?.region })] }), _jsxs("div", { style: {
                                    background: 'rgba(255,255,255,0.1)',
                                    borderRadius: '14px',
                                    padding: '14px',
                                }, children: [_jsx("p", { style: { fontSize: '12px', opacity: 0.6, marginBottom: '4px' }, children: "\uD83C\uDFD8\uFE0F Tuman" }), _jsx("p", { style: { fontWeight: '600', fontSize: '16px' }, children: user?.district })] })] })] }), _jsx("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }, children: [
                    { label: 'Testlar', value: results.length.toString(), color: '#60a5fa' },
                    { label: 'Sertifikat', value: results.filter(r => r.isCertified).length.toString(), color: '#34d399' },
                    { label: 'Eng yuqori', value: results.length > 0 ? Math.max(...results.map(r => r.scaledScore)).toString() : '0', color: '#f472b6' },
                ].map((stat, i) => (_jsxs("div", { style: {
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '16px 12px',
                        textAlign: 'center',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }, children: [_jsx("p", { style: { fontSize: '24px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }, children: stat.value }), _jsx("p", { style: { fontSize: '12px', opacity: 0.6 }, children: stat.label })] }, i))) }), _jsx("h3", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }, children: "\uD83D\uDCCA Natijalar" }), results.length === 0 ? (_jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsx("span", { style: { fontSize: '48px', display: 'block', marginBottom: '12px' }, children: "\uD83D\uDCED" }), _jsx("p", { style: { opacity: 0.6, marginBottom: '16px' }, children: "Hali natijalar yo'q" }), _jsx("button", { onClick: () => navigate('/take-test'), style: {
                            background: 'rgba(59,130,246,0.2)',
                            color: '#93c5fd',
                            border: 'none',
                            borderRadius: '12px',
                            padding: '12px 20px',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer',
                        }, children: "Test ishlash" })] })) : (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: results.map((r) => (_jsxs("div", { style: {
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '16px',
                        padding: '16px',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("div", { style: {
                                                width: '48px', height: '48px',
                                                borderRadius: '14px',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                fontSize: '20px', fontWeight: 'bold',
                                                background: r.grade.startsWith('A') ? 'rgba(16,185,129,0.3)' :
                                                    r.grade.startsWith('B') ? 'rgba(59,130,246,0.3)' :
                                                        r.grade.startsWith('C') ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                                                color: r.grade.startsWith('A') ? '#6ee7b7' :
                                                    r.grade.startsWith('B') ? '#93c5fd' :
                                                        r.grade.startsWith('C') ? '#fcd34d' : '#fca5a5',
                                            }, children: r.grade }), _jsxs("div", { children: [_jsxs("p", { style: { fontWeight: 'bold', fontSize: '16px' }, children: ["Test #", r.testCode] }), _jsx("p", { style: { opacity: 0.5, fontSize: '12px' }, children: new Date(r.createdAt).toLocaleDateString('uz-UZ') })] })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsx("p", { style: { fontWeight: 'bold', fontSize: '20px', color: '#60a5fa' }, children: r.scaledScore }), _jsxs("p", { style: { opacity: 0.5, fontSize: '12px' }, children: [r.score, "/", r.total] })] })] }), _jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between' }, children: [_jsxs("div", { style: { display: 'flex', gap: '12px' }, children: [_jsxs("span", { style: { fontSize: '13px', opacity: 0.6 }, children: ["\uD83D\uDCC8 ", r.rawScore, "/88"] }), _jsxs("span", { style: { fontSize: '13px', opacity: 0.6 }, children: ["\uD83D\uDCCA ", r.percentage, "%"] })] }), _jsx("span", { style: {
                                        fontSize: '12px',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontWeight: '600',
                                        background: r.isCertified ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                        color: r.isCertified ? '#6ee7b7' : '#fca5a5',
                                    }, children: r.isCertified ? '✅ Sertifikat' : '❌ Yo\'q' })] })] }, r.id))) }))] }));
}
//# sourceMappingURL=Profile.js.map