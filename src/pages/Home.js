import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';
export default function Home() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await API.get('/me');
                setUser(res.data);
            }
            catch (err) {
                navigate('/register');
            }
            finally {
                setLoading(false);
            }
        };
        fetchUser();
    }, [navigate]);
    if (loading) {
        return _jsx("div", { className: "p-4 text-center", children: "Yuklanmoqda..." });
    }
    return (_jsxs("div", { className: "p-4", children: [_jsxs("h1", { className: "text-2xl font-bold mb-2", children: ["\uD83D\uDC4B Xush kelibsiz, ", user?.name, "!"] }), _jsx("p", { className: "text-gray-500 mb-6", children: "Menularni tanlang:" }), _jsxs("div", { className: "space-y-3", children: [_jsx("button", { onClick: () => navigate('/create-test'), className: "w-full p-4 bg-green-500 text-white rounded-lg font-semibold text-lg hover:bg-green-600 transition", children: "\uD83D\uDCDD Test Yaratish" }), _jsx("button", { onClick: () => navigate('/take-test'), className: "w-full p-4 bg-blue-500 text-white rounded-lg font-semibold text-lg hover:bg-blue-600 transition", children: "\uD83D\uDCCB Test Ishlash" }), _jsx("button", { onClick: () => navigate('/profile'), className: "w-full p-4 bg-purple-500 text-white rounded-lg font-semibold text-lg hover:bg-purple-600 transition", children: "\uD83D\uDC64 Profil" })] })] }));
}
//# sourceMappingURL=Home.js.map