import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import MathKeyboard from '../components/MathKeyboard';
const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];
export default function TakeTest() {
    const navigate = useNavigate();
    const [testCode, setTestCode] = useState('');
    const [testInfo, setTestInfo] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showKeyboard, setShowKeyboard] = useState(false);
    const [activeInput, setActiveInput] = useState(null);
    // Testni tekshirish va yuklash
    const loadTest = async () => {
        if (!testCode)
            return;
        if (!window.Telegram?.WebApp?.initData) {
            setError('⚠️ Iltimos, testni Telegram orqali oching!');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const res = await API.get(`/tests/${testCode}`);
            setTestInfo(res.data);
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
    // Javobni o'zgartirish
    const setAnswer = (key, value) => {
        setAnswers(prev => ({ ...prev, [key]: value }));
    };
    // Klaviatura input
    const handleKeyboardInput = (value) => {
        if (!activeInput)
            return;
        if (value === 'backspace') {
            setAnswers(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '').slice(0, -1) }));
        }
        else if (value === 'enter') {
            setShowKeyboard(false);
            setActiveInput(null);
        }
        else {
            setAnswers(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '') + value }));
        }
    };
    // Testni yakunlash va natijani olish
    const submitTest = async () => {
        setLoading(true);
        setError('');
        try {
            await API.post(`/tests/${testCode}/submit`, { answers });
            // Natijani ko'rsatmaslik — faqat kutish xabari
            setResult({ waiting: true });
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
        if (result.waiting) {
            return (_jsx("div", { style: { padding: '20px', paddingBottom: '120px' }, children: _jsxs("div", { style: {
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '32px 20px',
                        textAlign: 'center',
                        marginBottom: '20px',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }, children: [_jsx("div", { style: { fontSize: '64px', marginBottom: '16px' }, children: "\u23F3" }), _jsx("h2", { style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }, children: "Javoblar qabul qilindi!" }), _jsxs("p", { style: { opacity: 0.7, marginBottom: '24px' }, children: ["Siz ", Object.keys(answers).length, " ta savolga javob berdingiz"] }), _jsxs("div", { style: {
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '20px',
                                marginBottom: '24px',
                            }, children: [_jsx("p", { style: { opacity: 0.6, marginBottom: '8px' }, children: "\uD83D\uDCCC Natijalar" }), _jsxs("p", { style: { fontSize: '16px', opacity: 0.8 }, children: ["Test egasi kamida 5 kishi ishlashini kutmoqda.", _jsx("br", {}), "Yakunlangandan keyin natijangiz bot orqali yuboriladi."] })] }), _jsx("button", { onClick: () => navigate('/'), style: {
                                width: '100%',
                                padding: '16px',
                                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '16px',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                            }, children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }) }));
        }
        return (_jsx("div", { style: { padding: '20px', paddingBottom: '120px' }, children: _jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '24px',
                    padding: '32px 20px',
                    textAlign: 'center',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsx("div", { style: {
                            width: '80px', height: '80px', margin: '0 auto 16px',
                            borderRadius: '50%',
                            background: result.isCertified
                                ? 'linear-gradient(135deg, #10b981, #059669)'
                                : 'linear-gradient(135deg, #ef4444, #dc2626)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '40px',
                        }, children: result.isCertified ? '🏆' : '📊' }), _jsx("h2", { style: { fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }, children: "Natija" }), _jsxs("p", { style: { opacity: 0.6, marginBottom: '24px' }, children: ["Test #", testCode] }), _jsx("div", { style: {
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '20px',
                        }, children: _jsxs("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [_jsxs("div", { children: [_jsx("p", { style: { opacity: 0.6, fontSize: '12px', marginBottom: '4px' }, children: "\u2705 To'g'ri" }), _jsxs("p", { style: { fontSize: '28px', fontWeight: 'bold' }, children: [result.score, "/", result.total] })] }), _jsxs("div", { children: [_jsx("p", { style: { opacity: 0.6, fontSize: '12px', marginBottom: '4px' }, children: "\uD83D\uDCC8 Xom ball" }), _jsxs("p", { style: { fontSize: '28px', fontWeight: 'bold' }, children: [result.rawScore, "/88"] })] }), _jsxs("div", { children: [_jsx("p", { style: { opacity: 0.6, fontSize: '12px', marginBottom: '4px' }, children: "\uD83C\uDFAF Ball" }), _jsx("p", { style: { fontSize: '28px', fontWeight: 'bold', color: '#60a5fa' }, children: result.scaledScore })] }), _jsxs("div", { children: [_jsx("p", { style: { opacity: 0.6, fontSize: '12px', marginBottom: '4px' }, children: "\uD83D\uDCCA Foiz" }), _jsxs("p", { style: { fontSize: '28px', fontWeight: 'bold' }, children: [result.percentage, "%"] })] })] }) }), _jsxs("div", { style: {
                            background: 'rgba(255,255,255,0.1)',
                            borderRadius: '16px',
                            padding: '20px',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("div", { style: {
                                            width: '56px', height: '56px', borderRadius: '14px',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: '24px', fontWeight: 'bold',
                                            background: result.grade.startsWith('A') ? 'rgba(16,185,129,0.3)' :
                                                result.grade.startsWith('B') ? 'rgba(59,130,246,0.3)' :
                                                    result.grade.startsWith('C') ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                                            color: result.grade.startsWith('A') ? '#6ee7b7' :
                                                result.grade.startsWith('B') ? '#93c5fd' :
                                                    result.grade.startsWith('C') ? '#fcd34d' : '#fca5a5',
                                        }, children: result.grade }), _jsxs("div", { children: [_jsx("p", { style: { fontWeight: 'bold', fontSize: '16px' }, children: "Daraja" }), _jsx("p", { style: { opacity: 0.6, fontSize: '14px' }, children: "Milliy Sertifikat" })] })] }), _jsx("div", { style: {
                                    padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold',
                                    background: result.isCertified ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                    color: result.isCertified ? '#6ee7b7' : '#fca5a5',
                                }, children: result.isCertified ? '✅ Sertifikat' : '❌ Yo\'q' })] }), !result.isCertified && (_jsx("div", { style: {
                            background: 'rgba(245,158,11,0.1)',
                            border: '1px solid rgba(245,158,11,0.2)',
                            borderRadius: '12px',
                            padding: '12px',
                            marginBottom: '20px',
                        }, children: _jsxs("p", { style: { color: '#fcd34d', fontSize: '14px' }, children: ["Sertifikat olish uchun kamida ", _jsx("strong", { children: "60.00" }), " ball (B daraja) to'plashingiz kerak"] }) })), _jsx("button", { onClick: () => navigate('/'), style: {
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '14px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                        }, children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }) }));
    }
    // Test kiritish sahifasi
    if (!testInfo) {
        return (_jsx("div", { style: {
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            }, children: _jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '28px',
                    padding: '32px 24px',
                    width: '100%',
                    maxWidth: '400px',
                    border: '1px solid rgba(255,255,255,0.12)',
                }, children: [_jsxs("div", { style: { textAlign: 'center', marginBottom: '32px' }, children: [_jsx("div", { style: {
                                    width: '72px', height: '72px', margin: '0 auto 16px',
                                    background: 'rgba(59,130,246,0.2)',
                                    borderRadius: '20px',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '36px',
                                }, children: "\uD83D\uDCCB" }), _jsx("h2", { style: { fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }, children: "Test Ishlash" }), _jsx("p", { style: { opacity: 0.6 }, children: "Test kodini kiriting" })] }), error && (_jsx("div", { style: {
                            background: 'rgba(239,68,68,0.2)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            borderRadius: '12px',
                            padding: '12px',
                            marginBottom: '20px',
                        }, children: _jsx("p", { style: { color: '#fca5a5', fontSize: '14px' }, children: error }) })), _jsx("div", { style: { marginBottom: '24px' }, children: _jsx("input", { type: "number", value: testCode, onChange: e => setTestCode(e.target.value), placeholder: "Masalan: 6", style: {
                                width: '100%',
                                padding: '18px',
                                background: 'rgba(255,255,255,0.1)',
                                border: '2px solid rgba(255,255,255,0.15)',
                                borderRadius: '16px',
                                color: 'white',
                                fontSize: '28px',
                                fontWeight: 'bold',
                                textAlign: 'center',
                                outline: 'none',
                            } }) }), _jsx("button", { onClick: loadTest, disabled: loading || !testCode, style: {
                            width: '100%',
                            padding: '18px',
                            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '16px',
                            fontSize: '18px',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            opacity: loading || !testCode ? 0.5 : 1,
                        }, children: loading ? '⏳ Yuklanmoqda...' : '🔍 Testni boshlash' })] }) }));
    }
    // Test sahifasi - barcha savollar bir vaqtda
    // Savollarni generatsiya qilish (1-45, 36-45 uchun 2 ta)
    const allQuestions = [];
    for (let i = 1; i <= 45; i++) {
        if (i >= 36 && i <= 45) {
            allQuestions.push({ num: i, part: '1', key: `${i}.1` });
            allQuestions.push({ num: i, part: '2', key: `${i}.2` });
        }
        else {
            allQuestions.push({ num: i, part: null, key: String(i) });
        }
    }
    const answeredCount = Object.keys(answers).length;
    const totalCount = allQuestions.length; // 55
    return (_jsxs("div", { style: { padding: '16px', paddingBottom: showKeyboard ? '320px' : '120px' }, children: [_jsxs("div", { style: {
                    background: 'rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid rgba(255,255,255,0.12)',
                    position: 'sticky',
                    top: '8px',
                    zIndex: 100,
                }, children: [_jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("button", { onClick: () => { setTestInfo(null); setAnswers({}); }, style: {
                                        width: '44px', height: '44px',
                                        background: 'rgba(255,255,255,0.15)',
                                        borderRadius: '12px',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '20px',
                                        cursor: 'pointer',
                                    }, children: "\u2190" }), _jsxs("div", { children: [_jsxs("h2", { style: { fontSize: '18px', fontWeight: 'bold' }, children: ["Test #", testCode] }), _jsxs("p", { style: { opacity: 0.6, fontSize: '14px' }, children: [answeredCount, "/", totalCount, " javob berildi"] })] })] }) }), _jsx("div", { style: { width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }, children: _jsx("div", { style: {
                                height: '100%',
                                width: `${(answeredCount / totalCount) * 100}%`,
                                background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
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
                                }, children: "1-32" }), "Savollar (A/B/C/D)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: allQuestions.filter(q => q.num <= 32).map(q => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q.num }), _jsx("div", { style: { display: 'flex', gap: '8px', flex: 1 }, children: OPTIONS_4.map(opt => (_jsx("button", { onClick: () => setAnswer(q.key, opt), style: {
                                            flex: 1,
                                            padding: '14px 8px',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            background: answers[q.key] === opt
                                                ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answers[q.key] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answers[q.key] === opt ? 'scale(1.05)' : 'scale(1)',
                                            transition: 'all 0.2s ease',
                                        }, children: opt }, opt))) })] }, q.key))) })] }), _jsxs("div", { style: {
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
                                }, children: "33-35" }), "Savollar (A-F)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: allQuestions.filter(q => q.num >= 33 && q.num <= 35).map(q => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q.num }), _jsx("div", { style: { display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }, children: OPTIONS_6.map(opt => (_jsx("button", { onClick: () => setAnswer(q.key, opt), style: {
                                            flex: 1,
                                            minWidth: '44px',
                                            padding: '14px 8px',
                                            borderRadius: '12px',
                                            fontWeight: 'bold',
                                            fontSize: '16px',
                                            border: 'none',
                                            cursor: 'pointer',
                                            background: answers[q.key] === opt
                                                ? 'linear-gradient(135deg, #a855f7, #9333ea)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answers[q.key] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answers[q.key] === opt ? 'scale(1.05)' : 'scale(1)',
                                            transition: 'all 0.2s ease',
                                        }, children: opt }, opt))) })] }, q.key))) })] }), _jsxs("div", { style: {
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
                                }, children: "36-45" }), "Savollar (2 ta javob)"] }), _jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '12px' }, children: allQuestions.filter(q => q.num >= 36 && q.num <= 45).reduce((acc, q) => {
                            const existing = acc.find(a => a.num === q.num);
                            if (existing) {
                                existing.parts.push(q);
                            }
                            else {
                                acc.push({ num: q.num, parts: [q] });
                            }
                            return acc;
                        }, []).map((group) => (_jsxs("div", { style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                background: 'rgba(255,255,255,0.08)',
                                borderRadius: '14px',
                                padding: '12px',
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '40px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: group.num }), _jsx("div", { style: { display: 'flex', gap: '8px', flex: 1 }, children: group.parts.map((q) => (_jsx("div", { style: { display: 'flex', flex: 1, gap: '4px' }, children: _jsx("button", { onClick: () => { setActiveInput(q.key); setShowKeyboard(true); }, style: {
                                                flex: 1,
                                                padding: '14px 10px',
                                                background: activeInput === q.key ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.15)',
                                                borderRadius: '12px',
                                                color: answers[q.key] ? 'white' : 'rgba(255,255,255,0.4)',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                                fontSize: '16px',
                                                border: activeInput === q.key ? '2px solid #f97316' : '2px solid transparent',
                                                cursor: 'pointer',
                                                minHeight: '52px',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                            }, children: answers[q.key] || q.part }) }, q.key))) })] }, group.num))) })] }), _jsx("button", { onClick: submitTest, disabled: loading, style: {
                    width: '100%',
                    padding: '18px',
                    background: 'linear-gradient(135deg, #10b981, #059669)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '16px',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    opacity: loading ? 0.5 : 1,
                    boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
                }, children: loading ? '⏳ Tekshirilmoqda...' : `✅ Natijani ko'rish (${answeredCount}/${totalCount})` }), showKeyboard && (_jsx(MathKeyboard, { onInput: handleKeyboardInput, onClose: () => { setShowKeyboard(false); setActiveInput(null); } }))] }));
}
//# sourceMappingURL=TakeTest.js.map