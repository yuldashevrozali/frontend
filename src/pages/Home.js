import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [tests, setTests] = useState([]);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/me');
                setUser(res.data);
            }
            catch (err) {
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
            }
            catch (err) {
                console.error(err);
            }
        };
        fetchTests();
    }, []);
    return (_jsxs("div", { className: "p-4", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Bosh sahifa" }), user && _jsxs("p", { className: "mb-2", children: ["Salom, ", user.name, "!"] }), _jsx("div", { className: "space-y-2", children: tests.map((test) => (_jsxs("div", { className: "p-4 bg-white rounded shadow cursor-pointer", onClick: () => navigate(`/test/${test.id}`), children: [_jsx("h2", { className: "font-semibold", children: test.title }), _jsx("p", { className: "text-sm text-gray-500", children: test.description })] }, test.id))) })] }));
}
//# sourceMappingURL=Home.js.map