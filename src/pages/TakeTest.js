import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];
export default function TakeTest() {
    const navigate = useNavigate();
    const [testCode, setTestCode] = useState('');
    const [test, setTest] = useState(null);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const loadTest = async () => {
        if (!testCode)
            return;
        setLoading(true);
        setError('');
        try {
            const res = await API.get(`/tests/${testCode}`);
            setTest(res.data.test);
            setAnswers({});
            setResult(null);
        }
        catch (e) {
            setError(e.response?.data?.error || 'Test topilmadi');
        }
        finally {
            setLoading(false);
        }
    };
    const setAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };
    const submitTest = async () => {
        setLoading(true);
        setError('');
        try {
            const res = await API.post(`/tests/${testCode}/submit`, { answers });
            setResult({ score: res.data.score, total: res.data.total, rawScore: res.data.rawScore, scaledScore: res.data.scaledScore, percentage: res.data.percentage, grade: res.data.grade, isCertified: res.data.isCertified });
        }
        catch (e) {
            setError(e.response?.data?.error || 'Xatolik yuz berdi');
        }
        finally {
            setLoading(false);
        }
    };
    // Natija sahifasi
    if (result) {
        return (_jsxs("div", { className: "min-h-screen p-4", children: [_jsxs("div", { className: "glass rounded-3xl p-6 mb-6 text-center", children: [_jsx("div", { className: `w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${result.isCertified ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-red-400 to-pink-600'}`, children: _jsx("span", { className: "text-4xl", children: result.isCertified ? '🏆' : '📊' }) }), _jsx("h2", { className: "text-2xl font-bold text-white mb-1", children: "Natija" }), _jsxs("p", { className: "text-white/60", children: ["Test #", test?.testCode] })] }), _jsx("div", { className: "glass rounded-2xl p-4 mb-4", children: _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "bg-white/10 rounded-xl p-3 text-center", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\u2705 To'g'ri" }), _jsxs("p", { className: "text-white font-bold text-xl", children: [result.score, "/", result.total] })] }), _jsxs("div", { className: "bg-white/10 rounded-xl p-3 text-center", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\uD83D\uDCC8 Xom ball" }), _jsxs("p", { className: "text-white font-bold text-xl", children: [result.rawScore, "/88"] })] }), _jsxs("div", { className: "bg-white/10 rounded-xl p-3 text-center", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\uD83C\uDFAF Ball" }), _jsx("p", { className: "text-blue-400 font-bold text-xl", children: result.scaledScore })] }), _jsxs("div", { className: "bg-white/10 rounded-xl p-3 text-center", children: [_jsx("p", { className: "text-white/60 text-xs", children: "\uD83D\uDCCA Foiz" }), _jsxs("p", { className: "text-white font-bold text-xl", children: [result.percentage, "%"] })] })] }) }), _jsx("div", { className: "glass rounded-2xl p-4 mb-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: `w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${result.grade === 'A+' || result.grade === 'A' ? 'bg-green-500/30 text-green-300' :
                                            result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-500/30 text-blue-300' :
                                                result.grade === 'C+' || result.grade === 'C' ? 'bg-yellow-500/30 text-yellow-300' :
                                                    'bg-red-500/30 text-red-300'}`, children: result.grade }), _jsxs("div", { children: [_jsx("p", { className: "text-white font-bold", children: "Daraja" }), _jsx("p", { className: "text-white/60 text-sm", children: "Milliy Sertifikat" })] })] }), _jsx("div", { className: `px-4 py-2 rounded-xl font-bold ${result.isCertified ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`, children: result.isCertified ? '✅ Sertifikat' : '❌ No' })] }) }), !result.isCertified && (_jsx("div", { className: "bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-4", children: _jsxs("p", { className: "text-yellow-200 text-sm text-center", children: ["Sertifikat olish uchun kamida ", _jsx("strong", { children: "60.00" }), " ball (B daraja) to'plashingiz kerak"] }) })), _jsx("button", { onClick: () => navigate('/'), className: "w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover", children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }));
    }
    // Test kiritish sahifasi
    if (!test) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("div", { className: "glass rounded-3xl p-8 w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center", children: _jsx("span", { className: "text-3xl", children: "\uD83D\uDCCB" }) }), _jsx("h2", { className: "text-2xl font-bold text-white", children: "Test Ishlash" }), _jsx("p", { className: "text-white/60 mt-1", children: "Test kodini kiriting" })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4", children: _jsx("p", { className: "text-red-200 text-sm", children: error }) })), _jsx("div", { className: "mb-6", children: _jsx("input", { type: "number", value: testCode, onChange: e => setTestCode(e.target.value), placeholder: "Masalan: 1", className: "input-modern w-full p-4 rounded-xl text-gray-800 text-center text-2xl font-bold placeholder-gray-300" }) }), _jsx("button", { onClick: loadTest, disabled: loading || !testCode, className: "w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50", children: loading ? (_jsxs("span", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Qidirilmoqda..."] })) : '🔍 Testni topish' })] }) }));
    }
    // Test ishlash sahifasi
    return (_jsxs("div", { className: "min-h-screen p-4 pb-8", children: [_jsxs("div", { className: "glass rounded-3xl p-6 mb-6 sticky top-0 z-10", children: [_jsx("div", { className: "flex items-center justify-between", children: _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => { setTest(null); setAnswers({}); }, className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-lg font-bold text-white", children: ["Test #", test.testCode] }), _jsxs("p", { className: "text-white/60 text-sm", children: [Object.keys(answers).length, " ta javob berildi"] })] })] }) }), _jsx("div", { className: "w-full bg-white/20 rounded-full h-1.5 mt-3", children: _jsx("div", { className: "bg-gradient-to-r from-blue-400 to-indigo-500 h-1.5 rounded-full transition-all duration-300", style: { width: `${(Object.keys(answers).length / 55) * 100}%` } }) })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-4", children: _jsx("p", { className: "text-red-200 text-sm", children: error }) })), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center text-sm", children: "1-32" }), "Savollar (A/B/C/D)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 32 }, (_, i) => i + 1).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-8 text-center font-mono text-sm", children: q }), _jsx("div", { className: "flex gap-1 flex-1", children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 py-2 rounded-lg font-bold text-sm transition-all ${answers[String(q)] === opt
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm", children: "33-35" }), "Savollar (A-F)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }, (_, i) => i + 33).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-8 text-center font-mono text-sm", children: q }), _jsx("div", { className: "flex gap-1 flex-1 flex-wrap", children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 min-w-[36px] py-2 rounded-lg font-bold text-sm transition-all ${answers[String(q)] === opt
                                            ? 'bg-purple-500 text-white shadow-lg'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center text-sm", children: "36-45" }), "Savollar (2 ta javob)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 10 }, (_, i) => i + 36).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-10 text-center font-mono text-sm", children: q }), _jsxs("div", { className: "flex gap-2 flex-1", children: [_jsx("input", { type: "text", placeholder: ".1", value: answers[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), className: "flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500", maxLength: 1 }), _jsx("input", { type: "text", placeholder: ".2", value: answers[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), className: "flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500", maxLength: 1 })] })] }, q))) })] }), _jsx("button", { onClick: submitTest, disabled: loading, className: "w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50 shadow-lg", children: loading ? (_jsxs("span", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Tekshirilmoqda..."] })) : "✅ Natijani ko'rish" })] }));
}
//# sourceMappingURL=TakeTest.js.map