import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [userRes, resultsRes] = await Promise.all([
          API.get('/me'),
          API.get('/results'),
        ]);
        setUser(userRes.data);
        setResults(resultsRes.data);
      } catch (err) {
        navigate('/register');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80">Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Profile card */}
      <div className="glass rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-600 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">👤</span>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{user?.name} {user?.surname}</h2>
            <p className="text-white/60">{user?.phone}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/60 text-xs">📍 Viloyat</p>
            <p className="text-white font-semibold">{user?.region}</p>
          </div>
          <div className="bg-white/10 rounded-xl p-3">
            <p className="text-white/60 text-xs">🏘️ Tuman</p>
            <p className="text-white font-semibold">{user?.district}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="glass rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-white">{results.length}</p>
          <p className="text-white/60 text-xs">Testlar</p>
        </div>
        <div className="glass rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-green-400">
            {results.filter(r => r.isCertified).length}
          </p>
          <p className="text-white/60 text-xs">Sertifikat</p>
        </div>
        <div className="glass rounded-2xl p-3 text-center">
          <p className="text-2xl font-bold text-blue-400">
            {results.length > 0 ? Math.max(...results.map(r => r.scaledScore)) : 0}
          </p>
          <p className="text-white/60 text-xs">Eng yuqori</p>
        </div>
      </div>

      {/* Results */}
      <h3 className="text-lg font-bold text-white mb-3">📊 Natijalar</h3>
      {results.length === 0 ? (
        <div className="glass rounded-2xl p-8 text-center">
          <span className="text-4xl mb-3 block">📭</span>
          <p className="text-white/60">Hali natijalar yo'q</p>
          <button
            onClick={() => navigate('/take-test')}
            className="mt-4 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-xl"
          >
            Test ishlash
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {results.map((r) => (
            <div key={r.id} className="glass rounded-2xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                    r.grade === 'A+' || r.grade === 'A' ? 'bg-green-500/30 text-green-300' :
                    r.grade === 'B+' || r.grade === 'B' ? 'bg-blue-500/30 text-blue-300' :
                    r.grade === 'C+' || r.grade === 'C' ? 'bg-yellow-500/30 text-yellow-300' :
                    'bg-red-500/30 text-red-300'
                  }`}>
                    {r.grade}
                  </div>
                  <div>
                    <p className="text-white font-semibold">Test #{r.testCode}</p>
                    <p className="text-white/50 text-xs">
                      {new Date(r.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold">{r.scaledScore}</p>
                  <p className="text-white/50 text-xs">{r.score}/{r.total}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white/60 text-sm">📈 {r.rawScore}/88 xom ball</span>
                  <span className="text-white/60 text-sm">📊 {r.percentage}%</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-lg ${
                  r.isCertified ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                }`}>
                  {r.isCertified ? '✅ Sertifikat' : '❌ Yo\'q'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="w-full mt-6 bg-gradient-to-r from-purple-400 to-pink-600 text-white p-4 rounded-2xl font-bold text-lg btn-hover"
      >
        🏠 Bosh sahifaga qaytish
      </button>
    </div>
  );
}
