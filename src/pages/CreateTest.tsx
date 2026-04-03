import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import MathKeyboard from '../components/MathKeyboard';

const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function CreateTest() {
  const navigate = useNavigate();
  const [answerKeys, setAnswerKeys] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  const [activeInput, setActiveInput] = useState<string | null>(null);

  const setAnswer = (key: string, value: string) => {
    setAnswerKeys(prev => ({ ...prev, [key]: value }));
  };

  const handleKeyboardInput = (value: string) => {
    if (!activeInput) return;
    if (value === 'backspace') {
      setAnswerKeys(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '').slice(0, -1) }));
    } else if (value === 'enter') {
      setShowKeyboard(false);
      setActiveInput(null);
    } else {
      setAnswerKeys(prev => ({ ...prev, [activeInput]: (prev[activeInput] || '') + value }));
    }
  };

  const openKeyboard = (key: string) => {
    setActiveInput(key);
    setShowKeyboard(true);
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
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

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
              onClick={() => navigate('/')}
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
              <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '2px' }}>Test Yaratish</h2>
              <p style={{ opacity: 0.6, fontSize: '14px' }}>Javob kalitlarini kiriting</p>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '12px', opacity: 0.6 }}>Progress</span>
            <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{Object.keys(answerKeys).length} ta</p>
          </div>
        </div>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }}>
          <div style={{
            height: '100%',
            width: `${(Object.keys(answerKeys).length / 55) * 100}%`,
            background: 'linear-gradient(90deg, #10b981, #059669)',
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
                      background: answerKeys[String(q)] === opt
                        ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                        : 'rgba(255,255,255,0.1)',
                      color: answerKeys[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                      transform: answerKeys[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
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
                      background: answerKeys[String(q)] === opt
                        ? 'linear-gradient(135deg, #a855f7, #9333ea)'
                        : 'rgba(255,255,255,0.1)',
                      color: answerKeys[String(q)] === opt ? 'white' : 'rgba(255,255,255,0.6)',
                      transform: answerKeys[String(q)] === opt ? 'scale(1.05)' : 'scale(1)',
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
              <div style={{ display: 'flex', gap: '12px', flex: 1 }}>
                <button
                  onClick={() => openKeyboard(`${q}.1`)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: activeInput === `${q}.1` ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: activeInput === `${q}.1` ? '2px solid #f97316' : '2px solid transparent',
                    cursor: 'pointer',
                    minHeight: '52px',
                  }}
                >
                  {answerKeys[`${q}.1`] || <span style={{ opacity: 0.4 }}>.1</span>}
                </button>
                <button
                  onClick={() => openKeyboard(`${q}.2`)}
                  style={{
                    flex: 1,
                    padding: '14px',
                    background: activeInput === `${q}.2` ? 'rgba(249,115,22,0.3)' : 'rgba(255,255,255,0.15)',
                    borderRadius: '12px',
                    color: 'white',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: activeInput === `${q}.2` ? '2px solid #f97316' : '2px solid transparent',
                    cursor: 'pointer',
                    minHeight: '52px',
                  }}
                >
                  {answerKeys[`${q}.2`] || <span style={{ opacity: 0.4 }}>.2</span>}
                </button>
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
        onClick={handleSubmit}
        disabled={loading || !allRequiredFilled}
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
          opacity: loading || !allRequiredFilled ? 0.5 : 1,
          boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
        }}
      >
        {loading ? '⏳ Yaratilmoqda...' : '✅ Test Yaratish'}
      </button>
    </div>
  );
}
