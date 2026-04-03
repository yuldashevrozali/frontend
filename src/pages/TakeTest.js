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
        return (_jsxs("div", { style: { padding: '20px', paddingBottom: '120px' }, children: [_jsxs("div", { style: {
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
                            }, children: result.isCertified ? '🏆' : '📊' }), _jsx("h2", { style: { fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }, children: "Natija" }), _jsxs("p", { style: { opacity: 0.6 }, children: ["Test #", test?.testCode] })] }), _jsx("div", { style: {
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '20px',
                        border: '1px solid rgba(255,255,255,0.12)',
                    }, children: _jsx("div", { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }, children: [
                            { label: "✅ To'g'ri", value: `${result.score}/${result.total}` },
                            { label: '📈 Xom ball', value: `${result.rawScore}/88` },
                            { label: '🎯 Ball', value: result.scaledScore.toString() },
                            { label: '📊 Foiz', value: `${result.percentage}%` },
                        ].map((item, i) => (_jsxs("div", { style: {
                                background: 'rgba(255,255,255,0.1)',
                                borderRadius: '16px',
                                padding: '16px',
                                textAlign: 'center',
                            }, children: [_jsx("p", { style: { fontSize: '12px', opacity: 0.6, marginBottom: '4px' }, children: item.label }), _jsx("p", { style: { fontSize: '24px', fontWeight: 'bold', color: i === 2 ? '#60a5fa' : '#fff' }, children: item.value })] }, i))) }) }), _jsxs("div", { style: {
                        background: 'rgba(255,255,255,0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '20px',
                        padding: '20px',
                        marginBottom: '20px',
                        border: '1px solid rgba(255,255,255,0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }, children: [_jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '16px' }, children: [_jsx("div", { style: {
                                        width: '56px', height: '56px', borderRadius: '16px',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        fontSize: '24px', fontWeight: 'bold',
                                        background: result.grade.startsWith('A') ? 'rgba(16,185,129,0.3)' :
                                            result.grade.startsWith('B') ? 'rgba(59,130,246,0.3)' :
                                                result.grade.startsWith('C') ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                                        color: result.grade.startsWith('A') ? '#6ee7b7' :
                                            result.grade.startsWith('B') ? '#93c5fd' :
                                                result.grade.startsWith('C') ? '#fcd34d' : '#fca5a5',
                                    }, children: result.grade }), _jsxs("div", { children: [_jsx("p", { style: { fontWeight: 'bold', fontSize: '16px' }, children: "Daraja" }), _jsx("p", { style: { opacity: 0.6, fontSize: '14px' }, children: "Milliy Sertifikat" })] })] }), _jsx("div", { style: {
                                padding: '10px 20px',
                                borderRadius: '12px',
                                fontWeight: 'bold',
                                background: result.isCertified ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                                color: result.isCertified ? '#6ee7b7' : '#fca5a5',
                            }, children: result.isCertified ? '✅ Sertifikat' : '❌ Yo\'q' })] }), !result.isCertified && (_jsx("div", { style: {
                        background: 'rgba(245,158,11,0.1)',
                        border: '1px solid rgba(245,158,11,0.2)',
                        borderRadius: '16px',
                        padding: '16px',
                        marginBottom: '20px',
                        textAlign: 'center',
                    }, children: _jsxs("p", { style: { color: '#fcd34d', fontSize: '14px' }, children: ["Sertifikat olish uchun kamida ", _jsx("strong", { children: "60.00" }), " ball (B daraja) to'plashingiz kerak"] }) })), _jsx("button", { onClick: () => navigate('/'), style: {
                        width: '100%',
                        padding: '18px',
                        background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '16px',
                        fontSize: '18px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                    }, children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }));
    }
    // Test kiritish sahifasi
    if (!test) {
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
                        }, children: _jsx("p", { style: { color: '#fca5a5', fontSize: '14px' }, children: error }) })), _jsx("div", { style: { marginBottom: '24px' }, children: _jsx("input", { type: "number", value: testCode, onChange: e => setTestCode(e.target.value), placeholder: "Masalan: 1", style: {
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
                        }, children: loading ? '🔍 Qidirilmoqda...' : '🔍 Testni topish' })] }) }));
    }
    // Test ishlash sahifasi
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
                }, children: [_jsx("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }, children: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '12px' }, children: [_jsx("button", { onClick: () => { setTest(null); setAnswers({}); }, style: {
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
                                    }, children: "\u2190" }), _jsxs("div", { children: [_jsxs("h2", { style: { fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }, children: ["Test #", test.testCode] }), _jsxs("p", { style: { opacity: 0.6, fontSize: '14px' }, children: [Object.keys(answers).length, " ta javob berildi"] })] })] }) }), _jsx("div", { style: { width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }, children: _jsx("div", { style: {
                                height: '100%',
                                width: `${(Object.keys(answers).length / 55) * 100}%`,
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
                                            background: answers[String(q)] === opt
                                                ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answers[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answers[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
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
                                            background: answers[String(q)] === opt
                                                ? 'linear-gradient(135deg, #a855f7, #9333ea)'
                                                : 'rgba(255,255,255,0.1)',
                                            color: answers[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                                            transform: answers[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
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
                            }, children: [_jsx("span", { style: { opacity: 0.6, width: '40px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }, children: q }), _jsxs("div", { style: { display: 'flex', gap: '12px', flex: 1 }, children: [_jsx("input", { type: "text", placeholder: ".1", value: answers[`${q}.1`] || '', onChange: e => setAnswer(`${q}.1`, e.target.value.toUpperCase()), style: {
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
                                            }, maxLength: 1 }), _jsx("input", { type: "text", placeholder: ".2", value: answers[`${q}.2`] || '', onChange: e => setAnswer(`${q}.2`, e.target.value.toUpperCase()), style: {
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
                                            }, maxLength: 1 })] })] }, q))) })] }), _jsx("button", { onClick: submitTest, disabled: loading, style: {
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
                }, children: loading ? "⏳ Tekshirilmoqda..." : "✅ Natijani ko'rish" })] }));
}
//# sourceMappingURL=TakeTest.js.map