import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

const OPTIONS_4 = ['A', 'B', 'C', 'D'];
const OPTIONS_6 = ['A', 'B', 'C', 'D', 'E', 'F'];

export default function TakeTest() {
  const navigate = useNavigate();
  const [testCode, setTestCode] = useState('');
  const [test, setTest] = useState<any>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ score: number; total: number } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

  const submitTest = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await API.post(`/tests/${testCode}/submit`, { answers });
      setResult({ score: res.data.score, total: res.data.total });
    } catch (e: any) {
      setError(e.response?.data?.error || 'Xatolik yuz berdi');
    } finally {
      setLoading(false);
    }
  };

  if (result) {
    return (
      <div className="p-4 max-w-md mx-auto text-center">
        <div className="text-6xl mb-4">📊</div>
        <h2 className="text-2xl font-bold mb-4">Natija</h2>
        <div className="text-4xl font-bold text-blue-500 mb-2">
          {result.score} / {result.total}
        </div>
        <p className="text-gray-500 mb-6">
          Siz {result.total} ta savoldan {result.score} tasini to'g'ri javob berdingiz
        </p>
        <button
          onClick={() => navigate('/')}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold"
        >
          🏠 Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-bold mb-4">📋 Test Ishlash</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Test kodini kiriting:</label>
          <input
            type="number"
            value={testCode}
            onChange={e => setTestCode(e.target.value)}
            placeholder="Masalan: 1"
            className="w-full p-3 border rounded text-lg"
          />
        </div>
        <button
          onClick={loadTest}
          disabled={loading || !testCode}
          className="w-full bg-blue-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading ? 'Qidirilmoqda...' : '🔍 Testni topish'}
        </button>
      </div>
    );
  }

  const answerKeys = test.answerKeys as Record<string, string>;
  const requiredKeys = Array.from({ length: 35 }, (_, i) => String(i + 1));
  const optionalKeys: string[] = [];
  for (let i = 36; i <= 45; i++) {
    optionalKeys.push(`${i}.1`, `${i}.2`);
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📋 Test #{test.testCode}</h2>
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
                className={`flex-1 p-2 rounded ${answers[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
                className={`flex-1 min-w-[40px] p-2 rounded ${answers[String(q)] === opt ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
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
              value={answers[`${q}.1`] || ''}
              onChange={e => setAnswer(`${q}.1`, e.target.value.toUpperCase())}
              className="flex-1 p-2 border rounded"
              maxLength={1}
            />
            <input
              type="text"
              placeholder={`${q}.2 javob`}
              value={answers[`${q}.2`] || ''}
              onChange={e => setAnswer(`${q}.2`, e.target.value.toUpperCase())}
              className="flex-1 p-2 border rounded"
              maxLength={1}
            />
          </div>
        </div>
      ))}

      <button
        onClick={submitTest}
        disabled={loading}
        className="w-full mt-4 bg-green-500 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
      >
        {loading ? 'Tekshirilmoqda...' : '✅ Natijani ko\'rish'}
      </button>
    </div>
  );
}
