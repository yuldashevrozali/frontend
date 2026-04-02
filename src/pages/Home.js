import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/me');
                setUser(res.data);
            }
            catch (err) {
                console.error(err);
                // Agar user ro'yxatdan o'tmagan bo'lsa, register sahifasiga yo'naltirish
                navigate('/register');
            }
            finally {
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
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchTests();
    }, []);
    if (loading) {
        return _jsx("div", { className: "p-4 text-center", children: "Yuklanmoqda..." });
    }
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "\uD83C\uDFE0 Bosh sahifa" }), user && (_jsx("div", { className: "mb-4 p-3 bg-green-100 rounded-lg", children: _jsxs("p", { className: "text-lg", children: ["\uD83D\uDC4B Xush kelibsiz, ", _jsx("strong", { children: user.name }), "!"] }) })), _jsx("h2", { className: "text-xl font-semibold mb-2", children: "\uD83D\uDCDA Mavjud testlar" }), _jsxs("div", { className: "space-y-2", children: [tests.length === 0 && _jsx("p", { className: "text-gray-500", children: "Hozircha testlar mavjud emas." }), tests.map((test) => (_jsxs("div", { className: "p-4 bg-white rounded shadow cursor-pointer hover:bg-gray-50", onClick: () => navigate(`/test/${test.id}`), children: [_jsx("h2", { className: "font-semibold", children: test.title }), _jsx("p", { className: "text-sm text-gray-500", children: test.description })] }, test.id)))] })] }));
}
//# sourceMappingURL=Home.js.map