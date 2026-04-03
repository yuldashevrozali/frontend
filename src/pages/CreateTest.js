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
    return (_jsxs("div", { style: { padding: '16px', paddingBottom: '120px' }, children: [_jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    position: 'sticky',
                    top: '8px',
                    zIndex: 100,
                }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("button", { onClick: () => navigate('/'), style: {
                                            width: '44px', height: '44px',
                                            background: 'rgba(255,255,255,0.15)',
                                            borderRadius: '12px',
                                            border: 'none',
                                            color: 'white',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }, children: "\u2190" }), _jsxs("div", { children: [_jsx("h2", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }, children: "Test Yaratish" }), _jsx("p", { style: { opacity: 0.6, fontSize: '14px' }, children: "Javob kalitlarini kiriting" })] })] }), _jsxs("div", { style: { textAlign: 'right' }, children: [_jsx("span", { style: { fontSize: '12px', opacity: 0.6 }, children: "Progress" }), _jsxs("p", { style: { fontWeight: 'bold', fontSize: '16px' }, children: [Object.keys(answerKeys).length, " ta"] })] })] }), _jsx("div", { style: { width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }, children: _jsx("div", { style: {
                                height: '100%',
                                width: `${(Object.keys(answerKeys).length / 55) * 100}%`,
                                background: 'linear-gradient(90deg, #10b981, #059669)',
                                borderRadius: '3px',
                                transition: 'width 0.3s ease',
                            } }) })] }), error && (_jsx("div", { style: {
                    background: 'rgba(239,68,68,0.2)',
                    border: '1px solid rgba(239,68,68,0.3)',
                    borderRadius: '16px',
                    padding: '16px',
                    marginBottom: '20px',
                }, children: _jsx("p", { style: { color: '#fca5a5', fontSize: '14px' }, children: error }) })), _jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsxs("h3", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }, children: [_jsx("span", { style: {
                                    width: '36px', height: '36px',
                                    background: 'rgba(59,130,246,0.3)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px',
                                }, children: "1-32" }), "Savollar (A/B/C/D)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: Array.from({ length: 32 }, (_, i) => i + 1).map(q => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q }), _jsx("div", { style: { display: 'flex', gap: '8px', flex: 1 }, children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), style: {
                                            flex: 1,
                                            padding: '14px 8px',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            background: answerKeys[String(q)] === opt
                                                ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answerKeys[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answerKeys[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
                                        }, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsxs("h3", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }, children: [_jsx("span", { style: {
                                    width: '36px', height: '36px',
                                    background: 'rgba(168,85,247,0.3)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px',
                                }, children: "33-35" }), "Savollar (A-F)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: Array.from({ length: 3 }, (_, i) => i + 33).map(q => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q }), _jsx("div", { style: { display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }, children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(String(q), opt), style: {
                                            flex: 1,
                                            minWidth: '44px',
                                            padding: '14px 8px',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            background: answerKeys[String(q)] === opt
                                                ? 'linear-gradient(135deg, #a855f7, #9333ea)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answerKeys[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answerKeys[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
                                        }, children: opt }, opt))) })] }, q))) })] }), _jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsxs("h3", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }, children: [_jsx("span", { style: {
                                    width: '36px', height: '36px',
                                    background: 'rgba(249,115,22,0.3)',
                                    borderRadius: '10px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '14px',
                                }, children: "36-45" }), "Savollar (2 ta javob)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: Array.from({ length: 10 }, (_, i) => i + 36).map(q => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '40px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q }), _jsxs("div", { style: { display: 'flex', gap: '12px', flex: 1 }, children: [_jsx("input", { type: "text", placeholder: ".1", value: answerKeys[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), style: {
                                                flex: 1,
                                                padding: '14px',
                                                background: 'rgba(255,255,255,0.15)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                border: '2px solid transparent',
                                                outline: 'none',
                                            }, maxLength: 1 }), _jsx("input", { type: "text", placeholder: ".2", value: answerKeys[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), style: {
                                                flex: 1,
                                                padding: '14px',
                                                background: 'rgba(255,255,255,0.15)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '18px',
                                                border: '2px solid transparent',
                                                outline: 'none',
                                            }, maxLength: 1 })] })] }, q))) })] }), _jsx("button", { onClick: handleSubmit, disabled: loading || !allRequiredFilled, style: {
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    opacity: loading || !allRequiredFilled ? 0.5 : 1,
                    boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                }, children: loading ? '⏳ Yaratilmoqda...' : '✅ Test Yaratish' })] }));
}
//# sourceMappingURL=CreateTest.js.map