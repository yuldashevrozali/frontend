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
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4" }), _jsx("p", { className: "text-white/80", children: "Yuklanmoqda..." })] }) }));
    }
    return (_jsxs("div", { className: "min-h-screen p-4", children: [_jsxs("div", { className: "glass rounded-3xl p-6 mb-6", children: [_jsxs("div", { className: "flex items-center gap-4 mb-4", children: [_jsx("div", { className: "w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center", children: _jsx("span", { className: "text-3xl", children: "\uD83D\uDC64" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-white", children: [user?.name, " ", user?.surname] }), _jsx("p", { className: "text-white/60", children: user?.phone })] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-3", children: [_jsxs("div", { className: "bg-white/10 rounded-xl p-3", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\uD83D\uDCCD Viloyat" }), _jsx("p", { className: "text-white font-semibold", children: user?.region })] }), _jsxs("div", { className: "bg-white/10 rounded-xl p-3", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\uD83C\uDFD8\uFE0F Tuman" }), _jsx("p", { className: "text-white font-semibold", children: user?.district })] })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-6", children: [_jsxs("div", { className: "glass rounded-2xl p-3 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-white", children: results.length }), _jsx("p", { className: "text-white/60 text-xs", children: "Testlar" })] }), _jsxs("div", { className: "glass rounded-2xl p-3 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-green-400", children: results.filter(r => r.isCertified).length }), _jsx("p", { className: "text-white/60 text-xs", children: "Sertifikat" })] }), _jsxs("div", { className: "glass rounded-2xl p-3 text-center", children: [_jsx("p", { className: "text-2xl font-bold text-blue-400", children: results.length > 0 ? Math.max(...results.map(r => r.scaledScore)) : 0 }), _jsx("p", { className: "text-white/60 text-xs", children: "Eng yuqori" })] })] }), _jsx("h3", { className: "text-lg font-bold text-white mb-3", children: "\uD83D\uDCCA Natijalar" }), results.length === 0 ? (_jsxs("div", { className: "glass rounded-2xl p-8 text-center", children: [_jsx("span", { className: "text-4xl mb-3 block", children: "\uD83D\uDCED" }), _jsx("p", { className: "text-white/60", children: "Hali natijalar yo'q" }), _jsx("button", { onClick: () => navigate('/take-test'), className: "mt-4 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-xl", children: "Test ishlash" })] })) : (_jsx("div", { className: "space-y-3", children: results.map((r) => (_jsxs("div", { className: "glass rounded-2xl p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-10 h-10 rounded-xl flex items-center justify-center font-bold ${r.grade === 'A+' || r.grade === 'A' ? 'bg-green-500/30 text-green-300' :
                                                r.grade === 'B+' || r.grade === 'B' ? 'bg-blue-500/30 text-blue-300' :
                                                    r.grade === 'C+' || r.grade === 'C' ? 'bg-yellow-500/30 text-yellow-300' :
                                                        'bg-red-500/30 text-red-300'}`, children: r.grade }), _jsxs("div", { children: [_jsxs("p", { className: "text-white font-semibold", children: ["Test #", r.testCode] }), _jsx("p", { className: "text-white/50 text-xs", children: new Date(r.createdAt).toLocaleDateString('uz-UZ') })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("p", { className: "text-white font-bold", children: r.scaledScore }), _jsxs("p", { className: "text-white/50 text-xs", children: [r.score, "/", r.total] })] })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("span", { className: "text-white/60 text-sm", children: ["\uD83D\uDCC8 ", r.rawScore, "/88 xom ball"] }), _jsxs("span", { className: "text-white/60 text-sm", children: ["\uD83D\uDCCA ", r.percentage, "%"] })] }), _jsx("span", { className: `text-xs px-2 py-1 rounded-lg ${r.isCertified ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`, children: r.isCertified ? '✅ Sertifikat' : '❌ Yo\'q' })] })] }, r.id))) })), _jsx("button", { onClick: () => navigate('/'), className: "w-full mt-6 bg-gradient-to-r from-purple-400 to-pink-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover", children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }));
}
//# sourceMappingURL=Profile.js.map