import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [tests, setTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
        // Agar user ro'yxatdan o'tmagan bo'lsa, register sahifasiga yo'naltirish
        navigate('/register');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const res = await API.get('/tests');
        setTests(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTests();
  }, []);

  if (loading) {
    return <div className="p-4 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🏠 Bosh sahifa</h1>
      {user && (
        <div className="mb-4 p-3 bg-green-100 rounded-lg">
          <p className="text-lg">👋 Xush kelibsiz, <strong>{user.name}</strong>!</p>
        </div>
      )}
      <h2 className="text-xl font-semibold mb-2">📚 Mavjud testlar</h2>
      <div className="space-y-2">
        {tests.length === 0 && <p className="text-gray-500">Hozircha testlar mavjud emas.</p>}
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50"
            onClick={() => navigate(`/test/${test.id}`)}
          >
            <h2 className="font-semibold">{test.title}</h2>
            <p className="text-sm text-gray-500">{test.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
