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
  const [answerKeys, setAnswerKeys] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setAnswer = (key: string, value: string) => {
    setAnswerKeys(prev => ({ ...prev, [key]: value }));
  };

  // Majburiy kalitlar: 1-35
  const requiredKeys = Array.from({ length: 35 }, (_, i) => String(i + 1));
  // 36-45 uchun .1 va .2
  const optionalKeys: string[] = [];
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
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📝 Test Yaratish</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* 1-32: 4 ta variant */}
      <h3 className="font-semibold mt-4 mb-2">1-32 savollar (A/B/C/D)</h3>
      {Array.from({ length: 32 }, (_, i) => i + 1).map(q => (
        <div key={q} className="mb-2 p-2 border rounded">
          <p className="font-medium mb-1">{q}-savol</p>
          <div className="flex gap-2">
            {OPTIONS_4.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswer(String(q), opt)}
                className={`flex-1 p-2 rounded ${answerKeys[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 33-35: 6 ta variant */}
      <h3 className="font-semibold mt-4 mb-2">33-35 savollar (A/B/C/D/E/F)</h3>
      {Array.from({ length: 3 }, (_, i) => i + 33).map(q => (
        <div key={q} className="mb-2 p-2 border rounded">
          <p className="font-medium mb-1">{q}-savol</p>
          <div className="flex gap-1 flex-wrap">
            {OPTIONS_6.map(opt => (
              <button
                key={opt}
                onClick={() => setAnswer(String(q), opt)}
                className={`flex-1 min-w-[40px] p-2 rounded ${answerKeys[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 36-45: Input */}
      <h3 className="font-semibold mt-4 mb-2">36-45 savollar (Javob kiriting)</h3>
      {Array.from({ length: 10 }, (_, i) => i + 36).map(q => (
        <div key={q} className="mb-2 p-2 border rounded">
          <p className="font-medium mb-1">{q}-savol</p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder={`${q}.1 javob`}
              value={answerKeys[`${q}.1`] || ''}
              onChange={e => setAnswer(`${q}.1`, e.target.value.toUpperCase())}
              className="flex-1 p-2 border rounded"
              maxLength={1}
            />
            <input
              type="text"
              placeholder={`${q}.2 javob`}
              value={answerKeys[`${q}.2`] || ''}
              onChange={e => setAnswer(`${q}.2`, e.target.value.toUpperCase())}
              className="flex-1 p-2 border rounded"
              maxLength={1}
            />
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading || !allRequiredFilled}
        className="w-full mt-4 bg-green-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Yaratilmoqda...' : '✅ Test Yaratish'}
      </button>
    </div>
  );
}
