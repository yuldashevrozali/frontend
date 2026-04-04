import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
import MathKeyboard from '../components/MathKeyboard';

const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function TakeTest() {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState('');
  const [testInfo, setTestInfo] = useState<any>(null);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [theta, setTheta] = useState(0);
  const [answeredCount, setAnsweredCount] = useState(0);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);

  // Testni tekshirish va boshlash
  const loadTest = async () => {
    if (!testCode) return;
    
    // Telegram Web App tekshirish
    if (!window.Telegram?.WebApp?.initData) {
      setError('⚠️ Iltimos, testni Telegram orqali oching!\n\nBu Web App faqat Telegram\'da ishlaydi.');
      return;
    }
    
    setLoading(true);
    setError('');
    try {
      // 1. Test mavjudligini tekshirish
      console.log('Checking test:', testCode);
      const checkRes = await API.get(`/tests/${testCode}`);
      console.log('Test found:', checkRes.data);
      setTestInfo(checkRes.data);

      // 2. Testni boshlash
      console.log('Starting test...');
      const startRes = await API.post(`/tests/${testCode}/start`);
      console.log('Start response:', startRes.data);
      
      if (startRes.data.finished) {
        setError('Barcha savollarga javob berildi');
        setTestInfo(null);
        return;
      }
      
      setCurrentQuestion(startRes.data.question);
      setTheta(startRes.data.theta);
      setAnsweredCount(startRes.data.answeredCount);
      setUserAnswer('');
    } catch (e: any) {
      const errorMsg = e.response?.data?.error || 'Test topilmadi';
      console.error('Test error:', e.response?.data, e);
      setError(errorMsg);
      setTestInfo(null);
      setCurrentQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  // Javob yuborish
  const submitAnswer = async () => {
    if (!userAnswer || !currentQuestion) return;
    setLoading(true);
    try {
      const res = await API.post(`/tests/${testCode}/answer`, {
        questionKey: currentQuestion.key,
        userAnswer,
      });

      if (res.data.isFinished) {
        // Test tugadi — natijani ko'rsatish
        setResult({
          theta: res.data.newTheta,
          answeredCount: res.data.answeredCount,
        });
        setCurrentQuestion(null);
      } else {
        // Keyingi savol
        setCurrentQuestion(res.data.nextQuestion);
        setTheta(res.data.newTheta);
        setAnsweredCount(res.data.answeredCount);
        setUserAnswer('');
      }
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyboardInput = (value: string) => {
    if (value === 'backspace') {
      setUserAnswer(prev => prev.slice(0, -1));
    } else if (value === 'enter') {
      setShowKeyboard(false);
    } else {
      setUserAnswer(prev => prev + value);
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
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🎉</div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Test yakunlandi!</h2>
          <p style={{ opacity: 0.7, marginBottom: '24px' }}>
            Siz {result.answeredCount} ta savolga javob berdingiz
          </p>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '20px',
            marginBottom: '24px',
          }}>
            <p style={{ opacity: 0.6, marginBottom: '8px' }}>🧠 Theta (qobiliyat)</p>
            <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#60a5fa' }}>
              {result.theta}
            </p>
          </div>
          <p style={{ opacity: 0.5, fontSize: '14px', marginBottom: '24px' }}>
            Natijalar test egasi tomonidan yakunlangandan keyin ko'rinadi
          </p>
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

  // Savol sahifasi
  if (currentQuestion) {
    const { num, part, key, difficulty } = currentQuestion;
    const isMultipleChoice = num <= 35;
    const options = num <= 32 ? OPTIONS_4 : OPTIONS_6;

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
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: 'bold' }}>
                {part ? `${num}.${part}-savol` : `${num}-savol`}
              </h2>
              <p style={{ opacity: 0.6, fontSize: '14px' }}>
                Theta: {theta} | Javob berildi: {answeredCount}
              </p>
            </div>
            <button
              onClick={() => { setTestInfo(null); setCurrentQuestion(null); }}
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
              ✕
            </button>
          </div>
          <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.15)', borderRadius: '3px' }}>
            <div style={{
              height: '100%',
              width: `${Math.min((answeredCount / 55) * 100, 100)}%`,
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

        {/* Savol */}
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <p style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', textAlign: 'center' }}>
            {part ? `${num}.${part}` : num}-savolga javob bering
          </p>

          {isMultipleChoice ? (
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {options.map(opt => (
                <button
                  key={opt}
                  onClick={() => setUserAnswer(opt)}
                  style={{
                    flex: 1,
                    minWidth: '60px',
                    padding: '16px',
                    borderRadius: '14px',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    border: 'none',
                    cursor: 'pointer',
                    background: userAnswer === opt
                      ? 'linear-gradient(135deg, #3b82f6, #6366f1)'
                      : 'rgba(255,255,255,0.1)',
                    color: userAnswer === opt ? 'white' : 'rgba(255,255,255,0.6)',
                    transform: userAnswer === opt ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <div>
              <button
                onClick={() => setShowKeyboard(true)}
                style={{
                  width: '100%',
                  padding: '16px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '14px',
                  color: userAnswer ? 'white' : 'rgba(255,255,255,0.4)',
                  fontSize: '20px',
                  fontWeight: 'bold',
                  border: userAnswer ? '2px solid #3b82f6' : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'center',
                }}
              >
                {userAnswer || 'Javob kiriting...'}
              </button>
            </div>
          )}
        </div>

        {/* Yuborish tugmasi */}
        <button
          onClick={submitAnswer}
          disabled={loading || !userAnswer}
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
            opacity: loading || !userAnswer ? 0.5 : 1,
            boxShadow: '0 8px 24px rgba(16,185,129,0.3)',
          }}
        >
          {loading ? '⏳ Tekshirilmoqda...' : '✅ Javob yuborish'}
        </button>

        {/* Math Keyboard */}
        {showKeyboard && (
          <MathKeyboard onInput={handleKeyboardInput} onClose={() => setShowKeyboard(false)} />
        )}
      </div>
    );
  }

  // Loading state
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '64px', height: '64px',
          border: '4px solid rgba(255,255,255,0.2)',
          borderTopColor: 'white',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          margin: '0 auto 16px',
        }}></div>
        <p style={{ opacity: 0.8 }}>Yuklanmoqda...</p>
      </div>
    </div>
  );
}
