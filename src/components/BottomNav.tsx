import { useNavigate, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    { icon: '📋', label: 'Test Ishlash', path: '/take-test' },
    { icon: '📝', label: 'Test Yaratish', path: '/create-test' },
    { icon: '👤', label: 'Profil', path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <div className="glass mx-4 mb-4 rounded-2xl px-4 py-2 flex justify-around items-center">
        {items.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center py-2 px-4 rounded-xl transition-all ${
                isActive
                  ? 'bg-white/20 scale-105'
                  : 'hover:bg-white/10'
              }`}
            >
              <span className={`text-2xl mb-1 ${isActive ? 'scale-110' : ''} transition-transform`}>
                {item.icon}
              </span>
              <span className={`text-xs font-medium ${isActive ? 'text-white' : 'text-white/50'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
