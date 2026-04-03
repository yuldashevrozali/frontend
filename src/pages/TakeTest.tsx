import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import MathKeyboard from '../components/MathKeyboard';

const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function TakeTest() {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState('');
  const [test, setTest] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; total: number; rawScore: number; scaledScore: number; percentage: number; grade: string; isCertified: boolean } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const loadTest = async () => {
    if (!testCode) return;
    setLoading(true);
    setError('');
    try {
      const res = await API.get(`/tests/${testCode}`);
      setTest(res.data.test);
      setAnswers({});
      setResult(null);
    } catch (e: any) {
      setError(e.response?.data?.error || 'Test topilmadi');
    } finally {
      setLoading(false);
    }
  };

  const setAnswer = (key: string, value: string) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

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

  const openKeyboard = (key: string) => {
    setActiveInput(key);
    setShowKeyboard(true);
  };

  const submitTest = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.post(`/tests/${testCode}/submit`, { answers });
      setResult({ score: res.data.score, total: res.data.total, rawScore: res.data.rawScore, scaledScore: res.data.scaledScore, percentage: res.data.percentage, grade: res.data.grade, isCertified: res.data.isCertified });
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  // Natija sahifasi
  if (result) {
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
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '8px' }}>Natija</h2>
          <p style={{ opacity: 0.6 }}>Test #{test?.testCode}</p>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: "✅ To'g'ri", value: `${result.score}/${result.total}` },
              { label: '📈 Xom ball', value: `${result.rawScore}/88` },
              { label: '🎯 Ball', value: result.scaledScore.toString() },
              { label: '📊 Foiz', value: `${result.percentage}%` },
            ].map((item, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '16px',
                padding: '16px',
                textAlign: 'center',
              }}>
                <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>{item.label}</p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: i === 2 ? '#60a5fa' : '#fff' }}>
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '20px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '56px', height: '56px', borderRadius: '16px',
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
            padding: '10px 20px',
            borderRadius: '12px',
            fontWeight: 'bold',
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
            borderRadius: '16px',
            padding: '16px',
            marginBottom: '20px',
            textAlign: 'center',
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
            padding: '18px',
            background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
            color: 'white',
            border: 'none',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
          }}
        >
          🏠 Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  // Test kiritish sahifasi
  if (!test) {
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
              placeholder="Masalan: 1"
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
            {loading ? '🔍 Qidirilmoqda...' : '🔍 Testni topish'}
          </button>
        </div>
      </div>
    );
  }

  // Test ishlash sahifasi
  return (
    <div style={{ padding: '16px', paddingBottom: '120px' }}>
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
              onClick={() => { setTest(null); setAnswers({}); }}
              style={{
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
              }}
            >
              ←
            </button>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }}>Test #{test.testCode}</h2>
              <p style={{ opacity: 0.6, fontSize: '14px' }}>{Object.keys(answers).length} ta javob berildi</p>
            </div>
          </div>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }}>
          <div style={{
            height: '100%',
            width: `${(Object.keys(answers).length / 55) * 100}%`,
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

      {/* 1-32 */}
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
          {Array.from({ length: 32 }, (_, i) => i + 1).map(q => (
            <div key={q} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{q}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                {OPTIONS_4.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(String(q), opt)}
                    style={{
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

      {/* 33-35 */}
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
          {Array.from({ length: 3 }, (_, i) => i + 33).map(q => (
            <div key={q} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '32px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{q}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1, flexWrap: 'wrap' }}>
                {OPTIONS_6.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(String(q), opt)}
                    style={{
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

      {/* 36-45 */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '20px',
        marginBottom: showKeyboard ? '320px' : '20px',
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
          {Array.from({ length: 10 }, (_, i) => i + 36).map(q => (
            <div key={q} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              background: 'rgba(255,255,255,0.08)',
              borderRadius: '14px',
              padding: '12px',
            }}>
              <span style={{ opacity: 0.6, width: '40px', textAlign: 'center', fontFamily: 'monospace', fontSize: '16px' }}>{q}</span>
              <div style={{ display: 'flex', gap: '8px', flex: 1 }}>
                {/* .1 input + keyboard button */}
                <div style={{ display: 'flex', flex: 1, gap: '4px' }}>
                  <button
                    onClick={() => openKeyboard(`${q}.1`)}
                    style={{
                      flex: 1,
                      padding: '14px 10px',
                      background: activeInput === `${q}.1` ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      border: activeInput === `${q}.1` ? '2px solid #f97316' : '2px solid transparent',
                      cursor: 'pointer',
                      minHeight: '52px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {answers[`${q}.1`] || <span style={{ opacity: 0.4 }}>.1</span>}
                  </button>
                  <button
                    onClick={() => openKeyboard(`${q}.1`)}
                    style={{
                      width: '44px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ⌨
                  </button>
                </div>
                {/* .2 input + keyboard button */}
                <div style={{ display: 'flex', flex: 1, gap: '4px' }}>
                  <button
                    onClick={() => openKeyboard(`${q}.2`)}
                    style={{
                      flex: 1,
                      padding: '14px 10px',
                      background: activeInput === `${q}.2` ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.15)',
                      borderRadius: '12px',
                      color: 'white',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      fontSize: '16px',
                      border: activeInput === `${q}.2` ? '2px solid #f97316' : '2px solid transparent',
                      cursor: 'pointer',
                      minHeight: '52px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {answers[`${q}.2`] || <span style={{ opacity: 0.4 }}>.2</span>}
                  </button>
                  <button
                    onClick={() => openKeyboard(`${q}.2`)}
                    style={{
                      width: '44px',
                      background: 'rgba(255,255,255,0.1)',
                      borderRadius: '12px',
                      border: 'none',
                      color: 'rgba(255,255,255,0.6)',
                      fontSize: '18px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ⌨
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Math Keyboard */}
      {showKeyboard && (
        <MathKeyboard onInput={handleKeyboardInput} onClose={() => { setShowKeyboard(false); setActiveInput(null); }} />
      )}

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
        {loading ? "⏳ Tekshirilmoqda..." : "✅ Natijani ko'rish"}
      </button>
    </div>
  );
}
