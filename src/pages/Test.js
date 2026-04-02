import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Test() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [question, setQuestion] = useState(null);
    const [attemptId, setAttemptId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [count, setCount] = useState(0);
    useEffect(() => {
        const start = async () => {
            try {
                const { data } = await API.post(`/tests/${id}/start`);
                setAttemptId(data.attemptId);
                setQuestion(data.question);
            }
            catch {
                alert('Testni boshlab bo\'lmadi');
            }
            finally {
                setLoading(false);
            }
        };
        start();
    }, [id]);
    const submitAnswer = async (option) => {
        if (!question || !attemptId)
            return;
        try {
            const { data } = await API.post(`/tests/${id}/answer`, {
                attemptId, questionId: question.id, selectedOption: option
            });
            setCount(data.answersCount);
            if (data.isFinished) {
                const res = await API.post(`/tests/${id}/finish`, { attemptId });
                alert(`✅ Natija: ${res.data.score} ball | ${res.data.grade}`);
                navigate('/');
            }
            else {
                setQuestion(data.nextQuestion);
            }
        }
        catch {
            alert('Xatolik yuz berdi');
        }
    };
    if (loading)
        return _jsx("div", { className: "p-4", children: "\u23F3 Test yuklanmoqda..." });
    if (!question)
        return _jsx("div", { className: "p-4", children: "\u274C Savollar tugagan." });
    return (_jsxs("div", { className: "p-4 max-w-lg mx-auto", children: [_jsxs("div", { className: "flex justify-between mb-2 text-sm text-gray-500", children: [_jsxs("span", { children: ["Savol #", count + 1] }), _jsxs("span", { children: ["\u03B8 \u2248 ", Math.round(window.currentTheta * 100) / 100 || 0] })] }), _jsx("h3", { className: "text-lg font-semibold mb-4", children: question.text }), _jsx("div", { className: "space-y-2", children: ['A', 'B', 'C', 'D'].map(opt => (_jsx("button", { onClick: () => submitAnswer(opt), className: "w-full text-left p-3 border rounded hover:bg-gray-100", children: question[`option${opt}`] }, opt))) })] }));
}
//# sourceMappingURL=Test.js.map