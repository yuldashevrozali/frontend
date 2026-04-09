import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/client';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [createdTests, setCreatedTests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    try {
      // Fetch user
      const userRes = await API.get('/me');
      setUser(userRes.data);

      // Fetch results (optional)
      try {
        const resultsRes = await API.get('/results');
        setResults(resultsRes.data);
      } catch (err) {
        console.error('Results fetch error:', err);
        setResults([]);
      }

      // Fetch created tests (optional)
      try {
        const testsRes = await API.get('/my-created-tests');
        setCreatedTests(testsRes.data);
      } catch (err) {
        console.error('Created tests fetch error:', err);
        setCreatedTests([]);
      }
    } catch (err) {
      console.error('Profile fetch error:', err);
      setError('Server bilan bog\'lanib bo\'lmadi. Iltimos, keyinroq urinib ko\'ring.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
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

  if (error) {
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
          padding: '32px 20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.12)',
          maxWidth: '400px',
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>⚠️</span>
          <p style={{ opacity: 0.8, marginBottom: '16px' }}>{error}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'rgba(59,130,246,0.2)',
              color: '#93c5fd',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Bosh sahifaga qaytish
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '16px', paddingBottom: '120px' }}>
      {/* Profile card */}
      <div style={{
        background: 'rgba(255,255,255,0.08)',
        backdropFilter: 'blur(20px)',
        borderRadius: '24px',
        padding: '24px',
        marginBottom: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
          <div style={{
            width: '72px', height: '72px',
            background: 'linear-gradient(135deg, #a855f7, #ec4899)',
            borderRadius: '20px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '36px',
          }}>
            👤
          </div>
          <div>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginBottom: '4px' }}>
              {user?.name} {user?.surname}
            </h2>
            <p style={{ opacity: 0.6, fontSize: '16px' }}>{user?.phone}</p>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '14px',
          }}>
            <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>📍 Viloyat</p>
            <p style={{ fontWeight: '600', fontSize: '16px' }}>{user?.region}</p>
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '14px',
            padding: '14px',
          }}>
            <p style={{ fontSize: '12px', opacity: 0.6, marginBottom: '4px' }}>🏘️ Tuman</p>
            <p style={{ fontWeight: '600', fontSize: '16px' }}>{user?.district}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '24px' }}>
        {[
          { label: 'Testlar', value: results.length.toString(), color: '#60a5fa' },
          { label: 'Sertifikat', value: results.filter(r => r.isCertified).length.toString(), color: '#34d399' },
          { label: 'Eng yuqori', value: results.length > 0 ? Math.max(...results.map(r => r.scaledScore)).toString() : '0', color: '#f472b6' },
        ].map((stat, i) => (
          <div key={i} style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '16px 12px',
            textAlign: 'center',
            border: '1px solid rgba(255,255,255,0.12)',
          }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '12px', opacity: 0.6 }}>{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Created Tests */}
      {createdTests.length > 0 && (
        <>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>📝 Yaratgan Testlarim</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {createdTests.map((test) => (
              <div key={test.testCode} style={{
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(20px)',
                borderRadius: '16px',
                padding: '16px',
                border: '1px solid rgba(255,255,255,0.12)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '48px', height: '48px',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '20px', fontWeight: 'bold',
                      background: 'rgba(59,130,246,0.3)',
                      color: '#93c5fd',
                    }}>
                      #{test.testCode}
                    </div>
                    <div>
                      <p style={{ fontWeight: 'bold', fontSize: '16px' }}>{test.title}</p>
                      <p style={{ opacity: 0.5, fontSize: '12px' }}>
                        {new Date(test.createdAt).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#60a5fa' }}>{test.participantCount}</p>
                    <p style={{ opacity: 0.5, fontSize: '12px' }}>ishtirokchi</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontSize: '13px', opacity: 0.6 }}>⏳ Faol</span>
                  </div>
                  {test.participantCount >= 5 && (
                    <button
                      onClick={async () => {
                        if (window.confirm(`Test #${test.testCode} ni yakunlashni xohlaysizmi? Bu amalni qaytarib bo'lmaydi.`)) {
                          try {
                            await API.post(`/tests/${test.testCode}/finalize`, { adminTelegramId: user.telegramId });
                            alert('Test muvaffaqiyatli yakunlandi!');
                            fetchData(); // Refresh
                          } catch (err: any) {
                            alert('Xatolik: ' + (err.response?.data?.error || err.message));
                          }
                        }
                      }}
                      style={{
                        background: 'rgba(16,185,129,0.2)',
                        color: '#6ee7b7',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '8px 16px',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                      }}
                    >
                      ✅ Yakunlash
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Results */}
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '16px' }}>📊 Natijalar</h3>
      {results.length === 0 ? (
        <div style={{
          background: 'rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '32px 20px',
          textAlign: 'center',
          border: '1px solid rgba(255,255,255,0.12)',
        }}>
          <span style={{ fontSize: '48px', display: 'block', marginBottom: '12px' }}>📭</span>
          <p style={{ opacity: 0.6, marginBottom: '16px' }}>Hali natijalar yo'q</p>
          <button
            onClick={() => navigate('/take-test')}
            style={{
              background: 'rgba(59,130,246,0.2)',
              color: '#93c5fd',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 20px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            Test ishlash
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {results.map((r) => (
            <div key={r.id} style={{
              background: 'rgba(255,255,255,0.08)',
              backdropFilter: 'blur(20px)',
              borderRadius: '16px',
              padding: '16px',
              border: '1px solid rgba(255,255,255,0.12)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', fontWeight: 'bold',
                    background: r.grade.startsWith('A') ? 'rgba(16,185,129,0.3)' :
                      r.grade.startsWith('B') ? 'rgba(59,130,246,0.3)' :
                      r.grade.startsWith('C') ? 'rgba(245,158,11,0.3)' : 'rgba(239,68,68,0.3)',
                    color: r.grade.startsWith('A') ? '#6ee7b7' :
                      r.grade.startsWith('B') ? '#93c5fd' :
                      r.grade.startsWith('C') ? '#fcd34d' : '#fca5a5',
                  }}>
                    {r.grade}
                  </div>
                  <div>
                    <p style={{ fontWeight: 'bold', fontSize: '16px' }}>Test #{r.testCode}</p>
                    <p style={{ opacity: 0.5, fontSize: '12px' }}>
                      {new Date(r.createdAt).toLocaleDateString('uz-UZ')}
                    </p>
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '20px', color: '#60a5fa' }}>{r.scaledScore}</p>
                  <p style={{ opacity: 0.5, fontSize: '12px' }}>{r.score}/{r.total}</p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <span style={{ fontSize: '13px', opacity: 0.6 }}>📈 {r.rawScore}/88</span>
                  <span style={{ fontSize: '13px', opacity: 0.6 }}>📊 {r.percentage}%</span>
                </div>
                <span style={{
                  fontSize: '12px',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: '600',
                  background: r.isCertified ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
                  color: r.isCertified ? '#6ee7b7' : '#fca5a5',
                }}>
                  {r.isCertified ? '✅ Sertifikat' : '❌ Yo\'q'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
