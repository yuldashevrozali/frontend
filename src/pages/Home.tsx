import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        setUser(res.data);
      } catch (err) {
        navigate('/register');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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

  const menuItems = [
    { icon: '📝', title: 'Test Yaratish', desc: 'Yangi test yarating', color: 'from-green-400 to-emerald-600', path: '/create-test' },
    { icon: '📋', title: 'Test Ishlash', desc: 'Test kodini kiriting', color: 'from-blue-400 to-indigo-600', path: '/take-test' },
    { icon: '👤', title: 'Profil', desc: 'Natijalaringiz', color: 'from-purple-400 to-pink-600', path: '/profile' },
  ];

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="glass rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-2xl">👋</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Xush kelibsiz!</h1>
            <p className="text-white/70">{user?.name} {user?.surname}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div className="space-y-4">
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="w-full glass rounded-2xl p-4 btn-hover text-left"
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center`}>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.desc}</p>
              </div>
              <div className="ml-auto">
                <svg className="w-6 h-6 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
