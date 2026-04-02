import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useForm } from 'react-hook-form';
import API from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
export default function Register() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const [registered, setRegistered] = useState(false);
    const [userName, setUserName] = useState('');
    useEffect(() => {
        window.Telegram?.WebApp?.BackButton.show();
        window.Telegram?.WebApp?.onEvent('backButtonClicked', () => navigate('/'));
    }, [navigate]);
    const onSubmit = async (data) => {
        try {
            const res = await API.post('/auth/register', data);
            setUserName(res.data.user?.name || data.name);
            setRegistered(true);
            // Botga ma'lumot yuborish (Web App orqali)
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.sendData(JSON.stringify({
                    action: 'registered',
                    name: res.data.user?.name || data.name
                }));
            }
        }
        catch (e) {
            alert("Xatolik: " + e.response?.data?.error);
        }
    };
    if (registered) {
        return (_jsxs("div", { className: "p-4 max-w-md mx-auto text-center", children: [_jsx("div", { className: "text-6xl mb-4", children: "\uD83C\uDF89" }), _jsxs("h2", { className: "text-2xl font-bold mb-2", children: ["Xush kelibsiz, ", userName, "!"] }), _jsx("p", { className: "text-gray-500 mb-6", children: "Siz muvaffaqiyatli ro'yxatdan o'tdingiz." }), _jsx("button", { onClick: () => navigate('/'), className: "w-full bg-blue-500 text-white p-3 rounded-lg font-semibold hover:bg-blue-600", children: "\uD83C\uDFE0 Bosh sahifaga o'tish" })] }));
    }
    return (_jsxs("div", { className: "p-4 max-w-md mx-auto", children: [_jsx("h2", { className: "text-xl font-bold mb-4", children: "\uD83D\uDCDD Ro'yxatdan o'tish" }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-3", children: [_jsx("input", { ...register("name", { required: true }), placeholder: "Ism", className: "w-full p-2 border rounded" }), _jsx("input", { ...register("surname", { required: true }), placeholder: "Familiya", className: "w-full p-2 border rounded" }), _jsxs("div", { children: [_jsx("input", { ...register("phone", { required: true, pattern: /^\+998\d{9}$/ }), placeholder: "+998901234567", className: "w-full p-2 border rounded" }), errors.phone && _jsx("p", { className: "text-red-500 text-sm", children: "Telefon +998 bilan boshlanishi va 9 raqam bo'lishi kerak" })] }), _jsx("input", { ...register("region", { required: true }), placeholder: "Viloyat", className: "w-full p-2 border rounded" }), _jsx("input", { ...register("district", { required: true }), placeholder: "Tuman", className: "w-full p-2 border rounded" }), _jsx("button", { type: "submit", className: "w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600", children: "\u2705 Yuborish" })] })] }));
}
//# sourceMappingURL=Register.js.map