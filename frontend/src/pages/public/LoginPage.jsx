import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials, homePathByRole } from '../../utils/constants';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState('');

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const user = await login(form);
      const redirectTo = location.state?.from?.pathname || homePathByRole[user.role];
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    } finally {
      setSubmitting(false);
    }
  }

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    setCopyFeedback(`Copied ${label}!`);
    setTimeout(() => setCopyFeedback(''), 2000);
  };

  return (
    <section className="auth-page" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '4rem 2rem',
      background: 'linear-gradient(135deg, #0B0E17 0%, #1A1F35 100%)',
      minHeight: 'calc(100vh - 84px)',
      borderRadius: '20px',
      margin: '20px 0'
    }}>
      <div className="auth-panel" style={{ 
        maxWidth: '480px', 
        width: '100%', 
        background: 'rgba(255, 255, 255, 0.05)', 
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        color: '#fff',
        boxShadow: '0 24px 48px rgba(0, 0, 0, 0.2)',
        padding: '2.5rem'
      }}>
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 className="page-title" style={{ color: '#fff', fontWeight: '800', letterSpacing: '-0.02em', fontSize: '2.5rem' }}>Secure Login</h2>
            <p style={{ color: '#8A94A6', marginTop: '0.5rem', fontSize: '0.95rem' }}>Welcome back. Please enter your details.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="field">
            <label htmlFor="email" style={{ color: '#E4E8F1', fontSize: '0.85rem', fontWeight: '500' }}>Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={form.email} 
              onChange={handleChange} 
              placeholder="Enter your email"
              style={{ background: 'rgba(0, 0, 0, 0.2)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.875rem 1rem', borderRadius: '10px' }}
              required
            />
          </div>
          <div className="field">
            <label htmlFor="password" style={{ color: '#E4E8F1', fontSize: '0.85rem', fontWeight: '500' }}>Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              style={{ background: 'rgba(0, 0, 0, 0.2)', color: '#fff', border: '1px solid rgba(255, 255, 255, 0.1)', padding: '0.875rem 1rem', borderRadius: '10px' }}
              required
            />
          </div>

          <div className="form-actions" style={{ marginTop: '0.5rem' }}>
            <button 
              className="button" 
              type="submit" 
              disabled={submitting}
              style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', fontWeight: '600', background: 'linear-gradient(135deg, #4A3AFF 0%, #3225B5 100%)', border: 'none', borderRadius: '10px', color: '#fff', cursor: 'pointer', boxShadow: '0 8px 24px rgba(74, 58, 255, 0.25)', transition: 'transform 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </div>
        </form>

        {error && (
          <div style={{ marginTop: '1.5rem' }}>
            <AlertMessage tone="error">{error}</AlertMessage>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1.25rem', textAlign: 'center', color: '#8A94A6', fontWeight: '600' }}>Demo Quick Access</h4>
          
          <div style={{ minHeight: '24px', marginBottom: '0.75rem' }}>
            {copyFeedback && <div style={{ color: '#05C168', textAlign: 'center', fontSize: '0.85rem', fontWeight: '500', background: 'rgba(5, 193, 104, 0.1)', padding: '0.25rem', borderRadius: '6px' }}>{copyFeedback}</div>}
          </div>
          
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {demoCredentials.map((creds, index) => (
              <div key={index} style={{ 
                background: 'rgba(0,0,0,0.2)', 
                padding: '1rem', 
                borderRadius: '12px', 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                border: '1px solid rgba(255,255,255,0.05)',
                transition: 'border-color 0.2s',
              }}
              onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'}
              onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
                  <div style={{ color: '#fff', fontWeight: '600', fontSize: '0.9rem' }}>{creds.name}</div>
                  <div style={{ color: '#8A94A6', fontSize: '0.8rem' }}>{creds.email}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    type="button" 
                    onClick={() => handleCopy(creds.email, 'Email')}
                    title={`Copy Email: ${creds.email}`}
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)', color: '#E4E8F1', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
                  >
                    Copy Email
                  </button>
                  <button 
                    type="button" 
                    onClick={() => handleCopy(creds.password, 'Password')}
                    title="Copy Password"
                    style={{ background: 'rgba(74, 58, 255, 0.15)', border: '1px solid rgba(74, 58, 255, 0.25)', color: '#A399FF', padding: '0.4rem 0.6rem', borderRadius: '6px', cursor: 'pointer', fontSize: '0.75rem', fontWeight: '500', transition: 'background 0.2s' }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(74, 58, 255, 0.25)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(74, 58, 255, 0.15)'}
                  >
                    Copy Pwd
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}