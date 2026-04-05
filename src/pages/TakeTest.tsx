import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import MathKeyboard from '../components/MathKeyboard';

const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function TakeTest() {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState('');
  const [testInfo, setTestInfo] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  // Testni tekshirish va yuklash
  const loadTest = async () => {
    if (!testCode) return;
    
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
    } catch (e: any) {
      setError(e.response?.data?.error || 'Test topilmadi');
    } finally {
      setLoading(false);
    }
  };

  // Javobni o'zgartirish
  const setAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  // Klaviatura input
  const handleKeyboardInput = (value: string) => {
    if (!activeInput) return;
    if (value === 'backspace') {
      setAnswers(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '').slice(0, -1) }));
    } else if (value === 'enter') {
      setShowKeyboard(false);
      setActiveInput(null);
    } else {
      setAnswers(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '') + value }));
    }
  };

  // Barcha 55 ta savol kalitlari
  const allKeys = [
    ...Array.from({ length: 35 }, (_, i) => String(i + 1)),
    ...Array.from({ length: 10 }, (_, i) => `${i + 36}.1`),
    ...Array.from({ length: 10 }, (_, i) => `${i + 36}.2`),
  ];
  const allAnswersFilled = allKeys.every(k => answers[k]);
  const filledCount = allKeys.filter(k => answers[k]).length;

  // Testni yakunlash va natijani olish
  const submitTest = async () => {
    if (!allAnswersFilled) {
      const missing = allKeys.filter(k => !answers[k]);
      setError(`Iltimos, barcha 55 ta javobni kiriting! Hozir: ${filledCount}/55. Yetishmayotgan: ${missing.slice(0, 5).join(', ')}${missing.length > 5 ? '...' : ''}`);
      return;
    }
    setLoading(true);
    setError('');
    try {
      await API.post(`/tests/${testCode}/submit`, { answers });
      // Natijani ko'rsatmaslik — faqat kutish xabari
      setResult({ waiting: true });
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  // Natija sahifasi
  if (result) {
    if (result.waiting) {
      return (
        <div style={{ padding: '20px', paddingBottom: '120px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '24px',
            padding: '32px 20px',
            textAlign: 'center',
            marginBottom: '20px',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>⏳</div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Javoblar qabul qilindi!</h2>
            <p style={{ opacity: 0.7, marginBottom: '24px' }}>
              Siz {Object.keys(answers).length} ta savolga javob berdingiz
            </p>
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              borderRadius: '16px',
              padding: '20px',
              marginBottom: '24px',
            }}>
              <p style={{ opacity: 0.6, marginBottom: '8px' }}>📌 Natijalar</p>
              <p style={{ fontSize: '16px', opacity: 0.8 }}>
                Test egasi kamida 5 kishi ishlashini kutmoqda.<br/>
                Yakunlangandan keyin natijangiz bot orqali yuboriladi.
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
                color: 'white',
                border: 'none',
                borderRadius: '14px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
            >
              🏠 Bosh sahifaga qaytish
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={{ padding: '20px', paddingBottom: '120px' }}>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px 20px',
          textAlign: 'center',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{
            width: '80px', height: '80px', margin: '0 auto 16px',
            borderRadius: '50%',
            background: result.isCertified
              ? 'linear-gradient(135deg, #10b981, #059669)'
              : 'linear-gradient(135deg, #ef4444, #dc2626)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '40px',
          }}>
            {result.isCertified ? '🏆' : '📊'}
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Natija</h2>
          <p style={{ opacity: 0.6, marginBottom: '24px' }}>Test #{testCode}</p>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '20px',
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <p style={{ opacity: 0.6, fontSize: '12px', marginBottom: '4px' }}>✅ To'g'ri</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{result.score}/{result.total}</p>
              </div>
              <div>
                <p style={{ opacity: 0.6, fontSize: '12px', marginBottom: '4px' }}>📈 Xom ball</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{result.rawScore}/88</p>
              </div>
              <div>
                <p style={{ opacity: 0.6, fontSize: '12px', marginBottom: '4px' }}>🎯 Ball</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#60a5fa' }}>{result.scaledScore}</p>
              </div>
              <div>
                <p style={{ opacity: 0.6, fontSize: '12px', marginBottom: '4px' }}>📊 Foiz</p>
                <p style={{ fontSize: '28px', fontWeight: 'bold' }}>{result.percentage}%</p>
              </div>
            </div>
          </div>

          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '24px', fontWeight: 'bold',
                background: result.grade.startsWith('A') ? 'rgba(16,185,129,0.3)' :
                  result.grade.startsWith('B') ? 'rgba(59,130,246,0.3)' :
                  result.grade.startsWith('C') ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                color: result.grade.startsWith('A') ? '#6ee7b7' :
                  result.grade.startsWith('B') ? '#93c5fd' :
                  result.grade.startsWith('C') ? '#fcd34d' : '#fca5a5',
              }}>
                {result.grade}
              </div>
              <div>
                <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Daraja</p>
                <p style={{ opacity: 0.6, fontSize: '14px' }}>Milliy Sertifikat</p>
              </div>
            </div>
            <div style={{
              padding: '10px 20px', borderRadius: '12px', fontWeight: 'bold',
              background: result.isCertified ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
              color: result.isCertified ? '#6ee7b7' : '#fca5a5',
            }}>
              {result.isCertified ? '✅ Sertifikat' : '❌ Yo\'q'}
            </div>
          </div>

          {!result.isCertified && (
            <div style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.2)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '20px',
            }}>
              <p style={{ color: '#fcd34d', fontSize: '14px' }}>
                Sertifikat olish uchun kamida <strong>60.00</strong> ball (B daraja) to'plashingiz kerak
              </p>
            </div>
          )}

          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%',
              padding: '16px',
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
            }}
          >
            🏠 Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  // Test kiritish sahifasi
  if (!testInfo) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '28px',
          padding: '32px 24px',
          width: '100%',
          maxWidth: '400px',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '72px', height: '72px', margin: '0 auto 16px',
              background: 'rgba(59,130,246,0.2)',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '36px',
            }}>
              📋
            </div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Test Ishlash</h2>
            <p style={{ opacity: 0.6 }}>Test kodini kiriting</p>
          </div>

          {error && (
            <div style={{
              background: 'rgba(239,68,68,0.2)',
              border: '1px solid rgba(239,68,68,0.3)',
              borderRadius: '12px',
              padding: '12px',
              marginBottom: '20px',
            }}>
              <p style={{ color: '#fca5a5', fontSize: '14px' }}>{error}</p>
            </div>
          )}

          <div style={{ marginBottom: '24px' }}>
            <input
              type="number"
              value={testCode}
              onChange={e => setTestCode(e.target.value)}
              placeholder="Masalan: 6"
              style={{
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
              }}
            />
          </div>

          <button
            onClick={loadTest}
            disabled={loading || !testCode}
            style={{
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
            }}
          >
            {loading ? '⏳ Yuklanmoqda...' : '🔍 Testni boshlash'}
          </button>
        </div>
      </div>
    );
  }

  // Test sahifasi - barcha savollar bir vaqtda
  // Savollarni generatsiya qilish (1-45, 36-45 uchun 2 ta)
  const allQuestions = [];
  for (let i = 1; i <= 45; i++) {
    if (i >= 36 && i <= 45) {
      allQuestions.push({ num: i, part: '1', key: `${i}.1` });
      allQuestions.push({ num: i, part: '2', key: `${i}.2` });
    } else {
      allQuestions.push({ num: i, part: null, key: String(i) });
    }
  }

  const answeredCount = Object.keys(answers).length;
  const totalCount = allQuestions.length; // 55

  return (
    <div style={{ padding: '16px', paddingBottom: showKeyboard ? '320px' : '120px' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
        position: 'sticky',
        top: '8px',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={() => { setTestInfo(null); setAnswers({}); }}
              style={{
                width: '44px', height: '44px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '12px',
                border: 'none',
                color: 'white',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ←
            </button>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>Test #{testCode}</h2>
              <p style={{ opacity: 0.6, fontSize: '14px' }}>{answeredCount}/{totalCount} javob berildi</p>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }}>
          <div style={{
            height: '100%',
            width: `${(answeredCount / totalCount) * 100}%`,
            background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
            borderRadius: '3px',
            transition: 'width 0.3s ease',
          }}></div>
        </div>
      </div>

      {error && (
        <div style={{
          background: 'rgba(239,68,68,0.2)',
          border: '1px solid rgba(239,68,68,0.3)',
          borderRadius: '16px',
          padding: '16px',
          marginBottom: '20px',
        }}>
          <p style={{ color: '#fca5a5', fontSize: '14px' }}>{error}</p>
        </div>
      )}

      {/* 1-32: A/B/C/D */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            width: '36px', height: '36px',
            background: 'rgba(59,130,246,0.3)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
          }}>1-32</span>
          Savollar (A/B/C/D)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allQuestions.filter(q => q.num <= 32).map(q => (
            <div key={q.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{q.num}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                {OPTIONS_4.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(q.key, opt)}
                    style={{
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
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 33-35: A-F */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            width: '36px', height: '36px',
            background: 'rgba(168,85,247,0.3)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
          }}>33-35</span>
          Savollar (A-F)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allQuestions.filter(q => q.num >= 33 && q.num <= 35).map(q => (
            <div key={q.key} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{q.num}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
                {OPTIONS_6.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(q.key, opt)}
                    style={{
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
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 36-45: 2 ta javob */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{
            width: '36px', height: '36px',
            background: 'rgba(249,115,22,0.3)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '14px',
          }}>36-45</span>
          Savollar (2 ta javob)
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {allQuestions.filter(q => q.num >= 36 && q.num <= 45).reduce((acc: any[], q) => {
            const existing = acc.find(a => a.num === q.num);
            if (existing) {
              existing.parts.push(q);
            } else {
              acc.push({ num: q.num, parts: [q] });
            }
            return acc;
          }, [] as any[]).map((group: any) => (
            <div key={group.num} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '40px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{group.num}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                {group.parts.map((q: any) => (
                  <div key={q.key} style={{ display: 'flex', flex: 1, gap: '4px' }}>
                    <button
                      onClick={() => { setActiveInput(q.key); setShowKeyboard(true); }}
                      style={{
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
                      }}
                    >
                      {answers[q.key] || q.part}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Yuborish tugmasi */}
      <button
        onClick={submitTest}
        disabled={loading}
        style={{
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
        }}
      >
        {loading ? '⏳ Tekshirilmoqda...' : `✅ Natijani ko'rish (${answeredCount}/${totalCount})`}
      </button>

      {/* Math Keyboard */}
      {showKeyboard && (
        <MathKeyboard onInput={handleKeyboardInput} onClose={() => { setShowKeyboard(false); setActiveInput(null); }} />
      )}
    </div>
  );
}
