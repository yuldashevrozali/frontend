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
    if (result) {
        return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsxs("div", { className: "text-center mb-4", children: [_jsx("div", { className: "text-6xl mb-2", children: "\uD83D\uDCCA" }), _jsx("h2", { className: "text-2xl font-bold", children: "Natija" })] }), _jsxs("div", { className: "bg-white rounded-lg shadow p-4 space-y-3", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "\u2705 To'g'ri javoblar:" }), _jsxs("span", { className: "font-bold text-lg", children: [result.score, "/", result.total] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "\uD83D\uDCC8 Xom ball:" }), _jsxs("span", { className: "font-bold", children: [result.rawScore, "/88.0"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "\uD83C\uDFAF Standart ball:" }), _jsx("span", { className: "font-bold text-xl text-blue-600", children: result.scaledScore })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "\uD83D\uDCCA Foiz:" }), _jsxs("span", { className: "font-bold", children: [result.percentage, "%"] })] }), _jsxs("div", { className: "flex justify-between items-center", children: [_jsx("span", { className: "text-gray-600", children: "\uD83C\uDFC5 Daraja:" }), _jsx("span", { className: `font-bold text-xl px-3 py-1 rounded ${result.grade === 'A+' || result.grade === 'A' ? 'bg-green-100 text-green-700' :
                                        result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-100 text-blue-700' :
                                            result.grade === 'C+' || result.grade === 'C' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'}`, children: result.grade })] }), _jsxs("div", { className: "flex justify-between items-center border-t pt-3", children: [_jsx("span", { className: "text-gray-600", children: "\uD83D\uDD16 Sertifikat:" }), _jsx("span", { className: `font-bold text-lg ${result.isCertified ? 'text-green-600' : 'text-red-600'}`, children: result.isCertified ? '✅ Ha' : '❌ Yo\'q' })] })] }), !result.isCertified && (_jsx("p", { className: "text-sm text-gray-500 mt-3 text-center", children: "Sertifikat olish uchun kamida 60.00 ball (B daraja) to'plashingiz kerak" })), _jsx("button", { onClick: () => navigate('/'), className: "w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-semibold", children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }));
    }
    if (!test) {
        return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD83D\uDCCB Test Ishlash" }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsxs("div", { className: "mb-4", children: [_jsx("label", { className: "block mb-2 font-medium", children: "Test kodini kiriting:" }), _jsx("input", { type: "number", value: testCode, onChange: e => setTestCode(e.target.value), placeholder: "Masalan: 1", className: "w-full p-3 border rounded text-lg" })] }), _jsx("button", { onClick: loadTest, disabled: loading || !testCode, className: "w-full bg-blue-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50", children: loading ? 'Qidirilmoqda...' : '🔍 Testni topish' })] }));
    }
    const answerKeys = test.answerKeys;
    const requiredKeys = Array.from({ length: 35 }, (_, i) => String(i + 1));
    const optionalKeys = [];
    for (let i = 36; i <= 45; i++) {
        optionalKeys.push(`${i}.1`, `${i}.2`);
    }
    return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsxs("h2", { className: "text-xl font-bold mb-4", children: ["\uD83D\uDCCB Test #", test.testCode] }), error && _jsx("p", { className: "text-red-500 mb-2", children: error }), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "1-32 savollar (A/B/C/D)" }), Array.from({ length: 32 }, (_, i) => i + 1).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsx("div", { className: "flex gap-2", children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 p-2 rounded ${answers[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`, children: opt }, opt))) })] }, q))), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "33-35 savollar (A/B/C/D/E/F)" }), Array.from({ length: 3 }, (_, i) => i + 33).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsx("div", { className: "flex gap-1 flex-wrap", children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), className: `flex-1 min-w-[40px] p-2 rounded ${answers[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`, children: opt }, opt))) })] }, q))), _jsx("h3", { className: "font-semibold mt-4 mb-2", children: "36-45 savollar (Javob kiriting)" }), Array.from({ length: 10 }, (_, i) => i + 36).map(q => (_jsxs("div", { className: "mb-2 p-2 border rounded", children: [_jsxs("p", { className: "font-medium mb-1", children: [q, "-savol"] }), _jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "text", placeholder: `${q}.1 javob`, value: answers[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), className: "flex-1 p-2 border rounded", maxLength: 1 }), _jsx("input", { type: "text", placeholder: `${q}.2 javob`, value: answers[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), className: "flex-1 p-2 border rounded", maxLength: 1 })] })] }, q))), _jsx("button", { onClick: submitTest, disabled: loading, className: "w-full mt-4 bg-green-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50", children: loading ? 'Tekshirilmoqda...' : '✅ Natijani ko\'rish' })] }));
}
//# sourceMappingURL=TakeTest.js.map