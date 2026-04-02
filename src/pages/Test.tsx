import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/client';

interface Question {
  id: number; text: string; optionA: string; optionB: string; optionC: string; optionD: string; difficulty: number;
}

export default function Test() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [attemptId, setAttemptId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const start = async () => {
      try {
        const { data } = await API.post(`/tests/${id}/start`);
        setAttemptId(data.attemptId);
        setQuestion(data.question);
      } catch { alert('Testni boshlab bo\'lmadi'); }
      finally { setLoading(false); }
    };
    start();
  }, [id]);

  const submitAnswer = async (option: string) => {
    if (!question || !attemptId) return;
    try {
      const { data } = await API.post(`/tests/${id}/answer`, {
        attemptId, questionId: question.id, selectedOption: option
      });
      setCount(data.answersCount);
      if (data.isFinished) {
        const res = await API.post(`/tests/${id}/finish`, { attemptId });
        alert(`✅ Natija: ${res.data.score} ball | ${res.data.grade}`);
        navigate('/');
      } else {
        setQuestion(data.nextQuestion);
      }
    } catch { alert('Xatolik yuz berdi'); }
  };

  if (loading) return <div className="p-4">⏳ Test yuklanmoqda...</div>;
  if (!question) return <div className="p-4">❌ Savollar tugagan.</div>;

  return (
    <div className="p-4 max-w-lg mx-auto">
      <div className="flex justify-between mb-2 text-sm text-gray-500">
        <span>Savol #{count + 1}</span>
        <span>θ ≈ {Math.round((window as any).currentTheta * 100)/100 || 0}</span>
      </div>
      <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
      <div className="space-y-2">
        {(['A', 'B', 'C', 'D'] as const).map(opt => (
          <button key={opt} onClick={() => submitAnswer(opt)} 
            className="w-full text-left p-3 border rounded hover:bg-gray-100">
            {question[`option${opt}` as keyof Question]}
          </button>
        ))}
      </div>
    </div>
  );
}