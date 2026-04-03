import { useForm } from 'react-hook-form';
import API from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

type FormValues = {
  name: string; surname: string; phone: string; region: string; district: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();
  const [registered, setRegistered] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    window.Telegram?.WebApp?.BackButton.show();
    window.Telegram?.WebApp?.onEvent('backButtonClicked', () => navigate('/'));
  }, [navigate]);

  const onSubmit = async (data: FormValues) => {
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
    } catch (e) {
      alert("Xatolik: " + (e as any).response?.data?.error);
    }
  };

  if (registered) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="glass rounded-3xl p-8 w-full max-w-md text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-4xl">🎉</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Xush kelibsiz!</h2>
          <p className="text-white/80 text-lg mb-2">{userName}</p>
          <p className="text-white/60 mb-6">Siz muvaffaqiyatli ro'yxatdan o'tdingiz</p>
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div className="bg-green-400 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
          </div>
          <p className="text-white/50 text-sm">Web App yopilmoqda...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass rounded-3xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-2xl flex items-center justify-center">
            <span className="text-3xl">📝</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Ro'yxatdan o'tish</h2>
          <p className="text-white/60 mt-1">Ma'lumotlaringizni kiriting</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register("name", { required: true })}
              placeholder="Ism"
              className="input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              {...register("surname", { required: true })}
              placeholder="Familiya"
              className="input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              {...register("phone", { required: true, pattern: /^\+998\d{9}$/ })}
              placeholder="+998901234567"
              className="input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400"
            />
            {errors.phone && (
              <p className="text-red-300 text-sm mt-1">Telefon +998 bilan boshlanishi va 9 raqam bo'lishi kerak</p>
            )}
          </div>
          <div>
            <input
              {...register("region", { required: true })}
              placeholder="Viloyat"
              className="input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400"
            />
          </div>
          <div>
            <input
              {...register("district", { required: true })}
              placeholder="Tuman"
              className="input-modern w-full p-4 rounded-xl text-gray-800 placeholder-gray-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-white text-purple-600 p-4 rounded-xl font-bold text-lg btn-hover"
          >
            ✅ Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}
