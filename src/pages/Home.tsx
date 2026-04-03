import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Home() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await API.get('/me');
        setUser(res.data);
      } catch (err) {
        navigate('/register');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [navigate]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px', height: '64px',
            border: '4px solid rgba(255,255,255,0.2)',
            borderTopColor: 'white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px',
          }}></div>
          <p style={{ opacity: 0.8 }}>Yuklanmoqda...</p>
        </div>
      </div>
    );
  }

  const menuItems = [
    { icon: '📝', title: 'Test Yaratish', desc: 'Yangi test yarating', gradient: 'linear-gradient(135deg, #10b981, #059669)', path: '/create-test' },
    { icon: '📋', title: 'Test Ishlash', desc: 'Test kodini kiriting', gradient: 'linear-gradient(135deg, #3b82f6, #6366f1)', path: '/take-test' },
    { icon: '👤', title: 'Profil', desc: 'Natijalaringiz', gradient: 'linear-gradient(135deg, #a855f7, #ec4899)', path: '/profile' },
  ];

  return (
    <div style={{ padding: '16px', paddingBottom: '120px' }}>
      {/* Header */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '24px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '64px', height: '64px',
            background: 'linear-gradient(135deg, #667eea, #764ba2)',
            borderRadius: '18px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '32px',
          }}>
            👋
          </div>
          <div>
            <h1 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>Xush kelibsiz!</h1>
            <p style={{ opacity: 0.7, fontSize: '16px' }}>{user?.name} {user?.surname}</p>
          </div>
        </div>
      </div>

      {/* Menu */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {menuItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              width: '100%',
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '20px',
              padding: '20px',
              border: '1px solid rgba(255,255,255,0.12)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              transition: 'all 0.3s ease',
              textAlign: 'left',
            }}
          >
            <div style={{
              width: '56px', height: '56px',
              background: item.gradient,
              borderRadius: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '4px', color: 'white' }}>
                {item.title}
              </h3>
              <p style={{ fontSize: '14px', opacity: 0.6, color: 'white' }}>{item.desc}</p>
            </div>
            <svg style={{ width: '24px', height: '24px', opacity: 0.4, color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
