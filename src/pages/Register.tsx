import { useForm } from 'react-hook-form';
import API from '../api/client';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

type FormValues = {
  name: string; surname: string; phone: string; region: string; district: string;
};

export default function Register() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const navigate = useNavigate();

  useEffect(() => {
    window.Telegram?.WebApp?.BackButton.show();
    window.Telegram?.WebApp?.onEvent('backButtonClicked', () => navigate('/'));
  }, [navigate]);

  const onSubmit = async (data: FormValues) => {
    try {
      await API.post('/auth/register', data);
      window.location.href = '/'; // Yoki state update
    } catch (e) {
      alert("Xatolik: " + (e as any).response?.data?.error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">📝 Ro'yxatdan o'tish</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        <input {...register("name", { required: true })} placeholder="Ism" className="w-full p-2 border rounded" />
        <input {...register("surname", { required: true })} placeholder="Familiya" className="w-full p-2 border rounded" />
        <div>
          <input {...register("phone", { required: true, pattern: /^\+998\d{9}$/ })} placeholder="+998901234567" className="w-full p-2 border rounded" />
          {errors.phone && <p className="text-red-500 text-sm">Telefon +998 bilan boshlanishi va 9 raqam bo'lishi kerak</p>}
        </div>
        <input {...register("region", { required: true })} placeholder="Viloyat" className="w-full p-2 border rounded" />
        <input {...register("district", { required: true })} placeholder="Tuman" className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
          ✅ Yuborish
        </button>
      </form>
    </div>
  );
}