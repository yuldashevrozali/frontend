import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
// 1-32: A,B,C,D variantlar
// 33-35: A,B,C,D,E,F variantlar
// 36-45: Input (2 ta javob: .1 va .2)
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
    // Majburiy kalitlar: 1-35
    const requiredKeys = Array.from({ length: 35 }, (_, i) => String(i + 1));
    // 36-45 uchun .1 va .2
    const optionalKeys = [];
    for (let i = 36; i <= 45; i++) {
        optionalKeys.push(`${i}.1`, `${i}.2`);
    }
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
            // Web App'ni yopish
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
    return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD83D\uDCDD Test Yaratish" }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "1-32 savollar (A/B/C/D)" }), Array.from({ length: 32 }, (_, i) => i + 1).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsx("div", { className: "flex gap-2", children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 p-2 rounded ${answerKeys[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`, children: opt }, opt))) })] }, q))), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "33-35 savollar (A/B/C/D/E/F)" }), Array.from({ length: 3 }, (_, i) => i + 33).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsx("div", { className: "flex gap-1 flex-wrap", children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 min-w-[40px] p-2 rounded ${answerKeys[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`, children: opt }, opt))) })] }, q))), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "36-45 savollar (Javob kiriting)" }), Array.from({ length: 10 }, (_, i) => i + 36).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: `${q}.1 javob`, value: answerKeys[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), className: "flex-1 p-2 border rounded", maxLength: 1 }), _jsx("input", { type: "text", placeholder: `${q}.2 javob`, value: answerKeys[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), className: "flex-1 p-2 border rounded", maxLength: 1 })] })] }, q))), _jsx("button", { onClick: handleSubmit, disabled: loading || !allRequiredFilled, className: "w-full mt-4 bg-green-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50", children: loading ? 'Yaratilmoqda...' : '✅ Test Yaratish' })] }));
}
//# sourceMappingURL=CreateTest.js.map