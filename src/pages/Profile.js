import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Profile() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [results, setResults] = useState([]);
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
            }
            catch (err) {
                navigate('/register');
            }
            finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);
    if (loading) {
        return _jsx("div", { className: "p-4 text-center", children: "Yuklanmoqda..." });
    }
    return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD83D\uDC64 Profil" }), _jsxs("div", { className: "bg-white p-4 rounded-lg shadow mb-4", children: [_jsxs("p", { children: [_jsx("strong", { children: "Ism:" }), " ", user?.name] }), _jsxs("p", { children: [_jsx("strong", { children: "Familiya:" }), " ", user?.surname] }), _jsxs("p", { children: [_jsx("strong", { children: "Telefon:" }), " ", user?.phone] }), _jsxs("p", { children: [_jsx("strong", { children: "Viloyat:" }), " ", user?.region] }), _jsxs("p", { children: [_jsx("strong", { children: "Tuman:" }), " ", user?.district] })] }), _jsx("h3", { className: "text-lg font-semibold mb-2", children: "\uD83D\uDCCA Natijalar" }), results.length === 0 ? (_jsx("p", { className: "text-gray-500", children: "Hali natijalar yo'q" })) : (_jsx("div", { className: "space-y-2", children: results.map((r) => (_jsxs("div", { className: "bg-white p-3 rounded shadow", children: [_jsx("p", { children: _jsxs("strong", { children: ["Test #", r.testCode] }) }), _jsxs("p", { children: ["Natija: ", r.score, " / ", r.total] }), _jsx("p", { className: "text-sm text-gray-500", children: new Date(r.createdAt).toLocaleString('uz-UZ') })] }, r.id))) })), _jsx("button", { onClick: () => navigate('/'), className: "w-full mt-4 bg-blue-500 text-white p-3 rounded-lg font-semibold", children: "\uD83C\uDFE0 Bosh sahifaga qaytish" })] }));
}
//# sourceMappingURL=Profile.js.map