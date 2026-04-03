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
    return <div className="p-4 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">👋 Xush kelibsiz, {user?.name}!</h1>
      <p className="text-gray-500 mb-6">Menularni tanlang:</p>

      <div className="space-y-3">
        <button
          onClick={() => navigate('/create-test')}
          className="w-full p-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition"
        >
          📝 Test Yaratish
        </button>

        <button
          onClick={() => navigate('/take-test')}
          className="w-full p-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition"
        >
          📋 Test Ishlash
        </button>

        <button
          onClick={() => navigate('/profile')}
          className="w-full p-4 bg-purple-500 text-white rounded-lg font-semibold text-lg hover:bg-purple-600 transition"
        >
          👤 Profil
        </button>
      </div>
    </div>
  );
}
