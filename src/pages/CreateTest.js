import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];
export default function CreateTest() {
    const navigate = useNavigate();
    const [answerKeys, setAnswerKeys] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const setAnswer = (key, value) => {
        setAnswerKeys(prev => ({ ...prev, [key]: value }));
    };
    const requiredKeys = Array.from({ length: 35 }, (_, i) => String(i + 1));
    const allRequiredFilled = requiredKeys.every(k => answerKeys[k]);
    const handleSubmit = async () => {
        if (!allRequiredFilled) {
            setError('1 dan 35 gacha barcha javoblarni kiriting!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await API.post('/tests/create', { answerKeys });
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.sendData(JSON.stringify({
                    action: 'test_created',
                    testCode: res.data.testCode,
                    authorName: res.data.authorName
                }));
                setTimeout(() => window.Telegram.WebApp.close(), 500);
            }
        }
        catch (e) {
            setError(e.response?.data?.error || 'Xatolik yuz berdi');
        }
        finally {
            setLoading(false);
        }
    };
    return (_jsxs("div", { className: "min-h-screen p-4 pb-8", children: [_jsxs("div", { className: "glass rounded-3xl p-6 mb-6 sticky top-0 z-10", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: () => navigate('/'), className: "w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-white", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-bold text-white", children: "Test Yaratish" }), _jsx("p", { className: "text-white/60 text-sm", children: "Javob kalitlarini kiriting" })] })] }), _jsxs("div", { className: "text-right", children: [_jsx("span", { className: "text-white/60 text-xs", children: "Progress" }), _jsxs("p", { className: "text-white font-bold", children: [Object.keys(answerKeys).length, " ta"] })] })] }), _jsx("div", { className: "w-full bg-white/20 rounded-full h-1.5 mt-3", children: _jsx("div", { className: "bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full transition-all duration-300", style: { width: `${(Object.keys(answerKeys).length / 55) * 100}%` } }) })] }), error && (_jsx("div", { className: "bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-4", children: _jsx("p", { className: "text-red-200 text-sm", children: error }) })), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center text-sm", children: "1-32" }), "Savollar (A/B/C/D)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 32 }, (_, i) => i + 1).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-8 text-center font-mono text-sm", children: q }), _jsx("div", { className: "flex gap-1 flex-1", children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 py-2 rounded-lg font-bold text-sm transition-all ${answerKeys[String(q)] === opt
                                            ? 'bg-blue-500 text-white shadow-lg'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm", children: "33-35" }), "Savollar (A-F)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 3 }, (_, i) => i + 33).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-8 text-center font-mono text-sm", children: q }), _jsx("div", { className: "flex gap-1 flex-1 flex-wrap", children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 min-w-[36px] py-2 rounded-lg font-bold text-sm transition-all ${answerKeys[String(q)] === opt
                                            ? 'bg-purple-500 text-white shadow-lg'
                                            : 'bg-white/10 text-white/60 hover:bg-white/20'}`, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { className: "glass rounded-2xl p-4 mb-4", children: [_jsxs("h3", { className: "text-white font-bold mb-3 flex items-center gap-2", children: [_jsx("span", { className: "w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center text-sm", children: "36-45" }), "Savollar (2 ta javob)"] }), _jsx("div", { className: "space-y-2", children: Array.from({ length: 10 }, (_, i) => i + 36).map(q => (_jsxs("div", { className: "flex items-center gap-2 bg-white/10 rounded-xl p-2", children: [_jsx("span", { className: "text-white/60 w-10 text-center font-mono text-sm", children: q }), _jsxs("div", { className: "flex gap-2 flex-1", children: [_jsx("input", { type: "text", placeholder: ".1", value: answerKeys[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), className: "flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500", maxLength: 1 }), _jsx("input", { type: "text", placeholder: ".2", value: answerKeys[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), className: "flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500", maxLength: 1 })] })] }, q))) })] }), _jsx("button", { onClick: handleSubmit, disabled: loading || !allRequiredFilled, className: "w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-lg", children: loading ? (_jsxs("span", { className: "flex items-center justify-center gap-2", children: [_jsx("div", { className: "w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" }), "Yaratilmoqda..."] })) : ('✅ Test Yaratish') })] }));
}
//# sourceMappingURL=CreateTest.js.map