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
  const [result, setResult] = useState<{ score: number; total: number; rawScore: number; scaledScore: number; percentage: number; grade: string; isCertified: boolean } | null>(null);
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
      <div className="min-h-screen p-4">
        <div className="glass rounded-3xl p-6 mb-6 text-center">
          <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
            result.isCertified ? 'bg-gradient-to-br from-green-400 to-emerald-600' : 'bg-gradient-to-br from-red-400 to-pink-600'
          }`}>
            <span className="text-4xl">{result.isCertified ? '🏆' : '📊'}</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-1">Natija</h2>
          <p className="text-white/60">Test #{test?.testCode}</p>
        </div>

        <div className="glass rounded-2xl p-4 mb-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/60 text-xs">✅ To'g'ri</p>
              <p className="text-white font-bold text-xl">{result.score}/{result.total}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/60 text-xs">📈 Xom ball</p>
              <p className="text-white font-bold text-xl">{result.rawScore}/88</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/60 text-xs">🎯 Ball</p>
              <p className="text-blue-400 font-bold text-xl">{result.scaledScore}</p>
            </div>
            <div className="bg-white/10 rounded-xl p-3 text-center">
              <p className="text-white/60 text-xs">📊 Foiz</p>
              <p className="text-white font-bold text-xl">{result.percentage}%</p>
            </div>
          </div>
        </div>

        <div className="glass rounded-2xl p-4 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
                result.grade === 'A+' || result.grade === 'A' ? 'bg-green-500/30 text-green-300' :
                result.grade === 'B+' || result.grade === 'B' ? 'bg-blue-500/30 text-blue-300' :
                result.grade === 'C+' || result.grade === 'C' ? 'bg-yellow-500/30 text-yellow-300' :
                'bg-red-500/30 text-red-300'
              }`}>
                {result.grade}
              </div>
              <div>
                <p className="text-white font-bold">Daraja</p>
                <p className="text-white/60 text-sm">Milliy Sertifikat</p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-xl font-bold ${
              result.isCertified ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
            }`}>
              {result.isCertified ? '✅ Sertifikat' : '❌ No'}
            </div>
          </div>
        </div>

        {!result.isCertified && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mb-4">
            <p className="text-yellow-200 text-sm text-center">
              Sertifikat olish uchun kamida <strong>60.00</strong> ball (B daraja) to'plashingiz kerak
            </p>
          </div>
        )}

        <button
          onClick={() => navigate('/')}
          className="w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover"
        >
          🏠 Bosh sahifaga qaytish
        </button>
      </div>
    );
  }

  // Test kiritish sahifasi
  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 bg-blue-500/20 rounded-2xl flex items-center justify-center">
              <span className="text-3xl">📋</span>
            </div>
            <h2 className="text-2xl font-bold text-white">Test Ishlash</h2>
            <p className="text-white/60 mt-1">Test kodini kiriting</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-3 mb-4">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <input
              type="number"
              value={testCode}
              onChange={e => setTestCode(e.target.value)}
              placeholder="Masalan: 1"
              className="input-modern w-full p-4 rounded-xl text-gray-800 text-center text-2xl font-bold placeholder-gray-300"
            />
          </div>

          <button
            onClick={loadTest}
            disabled={loading || !testCode}
            className="w-full bg-gradient-to-r from-blue-400 to-indigo-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                Qidirilmoqda...
              </span>
            ) : '🔍 Testni topish'}
          </button>
        </div>
      </div>
    );
  }

  // Test ishlash sahifasi
  return (
    <div className="min-h-screen p-4 pb-8">
      {/* Header */}
      <div className="glass rounded-3xl p-6 mb-6 sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={() => { setTest(null); setAnswers({}); }} className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h2 className="text-lg font-bold text-white">Test #{test.testCode}</h2>
              <p className="text-white/60 text-sm">{Object.keys(answers).length} ta javob berildi</p>
            </div>
          </div>
        </div>
        <div className="w-full bg-white/20 rounded-full h-1.5 mt-3">
          <div
            className="bg-gradient-to-r from-blue-400 to-indigo-500 h-1.5 rounded-full transition-all duration-300"
            style={{ width: `${(Object.keys(answers).length / 55) * 100}%` }}
          ></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500/30 rounded-2xl p-4 mb-4">
          <p className="text-red-200 text-sm">{error}</p>
        </div>
      )}

      {/* 1-32 */}
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
                      answers[String(q)] === opt
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

      {/* 33-35 */}
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
                      answers[String(q)] === opt
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

      {/* 36-45 */}
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
                  value={answers[`${q}.1`] || ''}
                  onChange={e => setAnswer(`${q}.1`, e.target.value.toUpperCase())}
                  className="flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={1}
                />
                <input
                  type="text"
                  placeholder=".2"
                  value={answers[`${q}.2`] || ''}
                  onChange={e => setAnswer(`${q}.2`, e.target.value.toUpperCase())}
                  className="flex-1 p-2 bg-white/20 rounded-lg text-white text-center font-bold placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  maxLength={1}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={submitTest}
        disabled={loading}
        className="w-full bg-gradient-to-r from-green-400 to-emerald-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover disabled:opacity-50 shadow-lg"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            Tekshirilmoqda...
          </span>
        ) : "✅ Natijani ko'rish"}
      </button>
    </div>
  );
}
