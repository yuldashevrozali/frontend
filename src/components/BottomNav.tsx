import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: '📝', label: 'Test Yaratish', path: '/create-test' },
    { icon: '📋', label: 'Test Ishlash', path: '/take-test' },
    { icon: '📊', label: 'Natijalarim', path: '/profile' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: '8px 16px 16px 16px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '12px 8px',
        border: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      }}>
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '8px 16px',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isActive ? 'scale(1.05)' : 'scale(1)',
              }}
            >
              <span style={{
                fontSize: '24px',
                marginBottom: '4px',
                filter: isActive ? 'none' : 'grayscale(0.5)',
              }}>
                {item.icon}
              </span>
              <span style={{
                fontSize: '11px',
                fontWeight: 600,
                color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.5)',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
