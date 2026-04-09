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
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px',
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '32px',
        maxWidth: '400px',
        width: '100%',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px',
            fontSize: '32px',
          }}>
            📝
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: 'white', marginBottom: '8px' }}>Ro'yxatdan o'tish</h2>
          <p style={{ color: 'rgba(255,255,255,0.6)' }}>Ma'lumotlaringizni kiriting</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <input
            {...register("name", { required: true })}
            placeholder="Ism"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '16px',
            }}
          />
          <input
            {...register("surname", { required: true })}
            placeholder="Familiya"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '16px',
            }}
          />
          <div>
            <input
              {...register("phone", { required: true, pattern: /^\+998\d{9}$/ })}
              placeholder="+998901234567"
              style={{
                width: '100%',
                padding: '16px',
                borderRadius: '12px',
                background: 'rgba(255,255,255,0.1)',
                border: '2px solid rgba(255,255,255,0.15)',
                color: 'white',
                fontSize: '16px',
              }}
            />
            {errors.phone && (
              <p style={{ color: '#fca5a5', fontSize: '14px', marginTop: '4px' }}>Telefon +998 bilan boshlanishi va 9 raqam bo'lishi kerak</p>
            )}
          </div>
          <input
            {...register("region", { required: true })}
            placeholder="Viloyat"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '16px',
            }}
          />
          <input
            {...register("district", { required: true })}
            placeholder="Tuman"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.1)',
              border: '2px solid rgba(255,255,255,0.15)',
              color: 'white',
              fontSize: '16px',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'white',
              color: '#9333ea',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
          >
            ✅ Yuborish
          </button>
        </form>
      </div>
    </div>
  );
}
