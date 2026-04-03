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
    return <div className="p-4 text-center">Yuklanmoqda...</div>;
  }

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">👤 Profil</h2>
      
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <p><strong>Ism:</strong> {user?.name}</p>
        <p><strong>Familiya:</strong> {user?.surname}</p>
        <p><strong>Telefon:</strong> {user?.phone}</p>
        <p><strong>Viloyat:</strong> {user?.region}</p>
        <p><strong>Tuman:</strong> {user?.district}</p>
      </div>

      <h3 className="text-lg font-semibold mb-2">📊 Natijalar</h3>
      {results.length === 0 ? (
        <p className="text-gray-500">Hali natijalar yo'q</p>
      ) : (
        <div className="space-y-2">
          {results.map((r) => (
            <div key={r.id} className="bg-white p-3 rounded shadow">
              <p><strong>Test #{r.testCode}</strong></p>
              <p>Natija: {r.score} / {r.total}</p>
              <p className="text-sm text-gray-500">
                {new Date(r.createdAt).toLocaleString('uz-UZ')}
              </p>
            </div>
          ))}
        </div>
      )}

      <button
        onClick={() => navigate('/')}
        className="w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-semibold"
      >
        🏠 Bosh sahifaga qaytish
      </button>
    </div>
  );
}
