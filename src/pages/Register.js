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
            if (window.Telegram?.WebApp) {
                window.Telegram.WebApp.sendData(JSON.stringify({
                    action: 'registered',
                    name: res.data.user?.name || data.name
                }));
                setTimeout(() => {
                    window.Telegram.WebApp.close();
                }, 1500);
            }
        }
        catch (e) {
            alert("Xatolik: " + e.response?.data?.error);
        }
    };
    if (registered) {
        return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("div", { className: "glass rounded-3xl p-8 w-full max-w-md text-center animate-fade-in", children: [_jsx("div", { className: "w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center", children: _jsx("span", { className: "text-4xl", children: "\uD83C\uDF89" }) }), _jsx("h2", { className: "text-3xl font-bold text-white mb-2", children: "Xush kelibsiz!" }), _jsx("p", { className: "text-white/80 text-lg mb-2", children: userName }), _jsx("p", { className: "text-white/60 mb-6", children: "Siz muvaffaqiyatli ro'yxatdan o'tdingiz" }), _jsx("div", { className: "w-full bg-white/20 rounded-full h-2 mb-4", children: _jsx("div", { className: "bg-green-400 h-2 rounded-full animate-pulse", style: { width: '100%' } }) }), _jsx("p", { className: "text-white/50 text-sm", children: "Web App yopilmoqda..." })] }) }));
    }
    return (_jsx("div", { className: "min-h-screen flex items-center justify-center p-4", children: _jsxs("div", { className: "glass rounded-3xl p-8 w-full max-w-md", children: [_jsxs("div", { className: "text-center mb-8", children: [_jsx("div", { className: "w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center", children: _jsx("span", { className: "text-3xl", children: "\uD83D\uDCDD" }) }), _jsx("h2", { className: "text-2xl font-bold text-white", children: "Ro'yxatdan o'tish" }), _jsx("p", { className: "text-white/60 mt-1", children: "Ma'lumotlaringizni kiriting" })] }), _jsxs("form", { onSubmit: handleSubmit(onSubmit), className: "space-y-4", children: [_jsx("div", { children: _jsx("input", { ...register("name", { required: true }), placeholder: "Ism", className: "input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" }) }), _jsx("div", { children: _jsx("input", { ...register("surname", { required: true }), placeholder: "Familiya", className: "input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" }) }), _jsxs("div", { children: [_jsx("input", { ...register("phone", { required: true, pattern: /^\+998\d{9}$/ }), placeholder: "+998901234567", className: "input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" }), errors.phone && (_jsx("p", { className: "text-red-300 text-sm mt-1", children: "Telefon +998 bilan boshlanishi va 9 raqam bo'lishi kerak" }))] }), _jsx("div", { children: _jsx("input", { ...register("region", { required: true }), placeholder: "Viloyat", className: "input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" }) }), _jsx("div", { children: _jsx("input", { ...register("district", { required: true }), placeholder: "Tuman", className: "input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400" }) }), _jsx("button", { type: "submit", className: "w-full bg-white text-purple-600 p-4 rounded-xl font-bold text-lg btn-hover", children: "\u2705 Yuborish" })] })] }) }));
}
//# sourceMappingURL=Register.js.map