import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

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
    <div className="min-h-screen p-4 pb-8">
      {/* Header */}
      <div className="glass rounded-3xl p-6 mb-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate('/')} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-bold text-white">Test Yaratish</h2>
              <p className="text-white/60 text-sm">Javob kalitlarini kiriting</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-white/60 text-xs">Progress</span>
            <p className="text-white font-bold">{Object.keys(answerKeys).length} ta</p>
          </div>
        </div>
        {/* Progress bar */}
        <div className="w-full bg-white/20 rounded-full h-1.5 mt-3">
          <div
            className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(answerKeys).length / 55) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-4">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* 1-32: 4 ta variant */}
      <div className="glass rounded-2xl p-4 mb-4">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-blue-500/30 rounded-lg flex items-center justify-center text-sm">1-32</span>
          Savollar (A/B/C/D)
        </h3>
        <div className="space-y-2">
          {Array.from({ length: 32 }, (_, i) => i + 1).map(q => (
            <div key={q} className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
              <span className="text-white/60 w-8 text-center font-mono text-sm">{q}</span>
              <div className="flex gap-1 flex-1">
                {OPTIONS_4.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(String(q), opt)}
                    className={`flex-1 py-2 rounded-lg font-bold text-sm transition-all ${
                      answerKeys[String(q)] === opt
                        ? 'bg-blue-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 33-35: 6 ta variant */}
      <div className="glass rounded-2xl p-4 mb-4">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center text-sm">33-35</span>
          Savollar (A-F)
        </h3>
        <div className="space-y-2">
          {Array.from({ length: 3 }, (_, i) => i + 33).map(q => (
            <div key={q} className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
              <span className="text-white/60 w-8 text-center font-mono text-sm">{q}</span>
              <div className="flex gap-1 flex-1 flex-wrap">
                {OPTIONS_6.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setAnswer(String(q), opt)}
                    className={`flex-1 min-w-[36px] py-2 rounded-lg font-bold text-sm transition-all ${
                      answerKeys[String(q)] === opt
                        ? 'bg-purple-500 text-white shadow-lg'
                        : 'bg-white/10 text-white/60 hover:bg-white/20'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 36-45: Input */}
      <div className="glass rounded-2xl p-4 mb-4">
        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
          <span className="w-8 h-8 bg-orange-500/30 rounded-lg flex items-center justify-center text-sm">36-45</span>
          Savollar (2 ta javob)
        </h3>
        <div className="space-y-2">
          {Array.from({ length: 10 }, (_, i) => i + 36).map(q => (
            <div key={q} className="flex items-center gap-2 bg-white/10 rounded-xl p-2">
              <span className="text-white/60 w-10 text-center font-mono text-sm">{q}</span>
              <div className="flex gap-2 flex-1">
                <input
                  type="text"
                  placeholder=".1"
                  value={answerKeys[`${q}.1`] || ''}
                  onChange={e => setAnswer(`${q}.1`, e.target.value.toUpperCase())}
                  className="flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={1}
                />
                <input
                  type="text"
                  placeholder=".2"
                  value={answerKeys[`${q}.2`] || ''}
                  onChange={e => setAnswer(`${q}.2`, e.target.value.toUpperCase())}
                  className="flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submit button */}
      <button
        onClick={handleSubmit}
        disabled={loading || !allRequiredFilled}
        className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Yaratilmoqda...
          </span>
        ) : (
          '✅ Test Yaratish'
        )}
      </button>
    </div>
  );
}
