import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [tests, setTests] = useState<any[]>([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        setUser(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUser();
  }, []);

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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bosh sahifa</h1>
      {user && <p className="mb-2">Salom, {user.name}!</p>}
      <div className="space-y-2">
        {tests.map((test) => (
          <div
            key={test.id}
            className="p-4 bg-white rounded shadow cursor-pointer"
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
