import { useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    
    // Simulating API reset call securely without leaking existence
    setTimeout(() => {
      setMessage(`If an account exists for ${email}, a secure password reset link has been sent.`);
      setSubmitting(false);
      setEmail('');
    }, 1200);
  }

  return (
    <section className="auth-page" style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      padding: '4rem 2rem',
      background: 'var(--color-background)',
      minHeight: 'calc(100vh - 84px)',
      margin: '20px 0'
    }}>
      <div className="auth-panel" style={{ 
        maxWidth: '480px', 
        width: '100%', 
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-lg)',
        padding: '2.5rem',
        borderRadius: 'var(--radius-xl)'
      }}>
        <div className="page-header" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div>
            <h2 className="page-title" style={{ fontWeight: '800', letterSpacing: '-0.02em', fontSize: '2.2rem', margin: 0, color: 'var(--color-text)' }}>Reset Password</h2>
            <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem', fontSize: '0.95rem' }}>Enter your email to receive recovery instructions.</p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div className="field">
            <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: '500', color: 'var(--color-text-muted)' }}>Email Address</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              placeholder="Enter your registered email"
              required
            />
          </div>

          <div className="form-actions" style={{ marginTop: '0.5rem' }}>
            <button 
              className="button" 
              type="submit" 
              disabled={submitting || !email}
              style={{ width: '100%', padding: '0.875rem', fontSize: '1rem', fontWeight: '600', transition: 'transform 0.2s ease' }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {submitting ? 'Authenticating...' : 'Send Reset Link'}
            </button>
          </div>
        </form>

        {message && (
          <div style={{ marginTop: '1.5rem' }}>
            <AlertMessage tone="success">{message}</AlertMessage>
          </div>
        )}

        <div style={{ marginTop: '2.5rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-text-muted)', borderTop: '1px solid var(--color-border)', paddingTop: '1.5rem' }}>
          Remembered your password? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Back to Sign In</Link>
        </div>
      </div>
    </section>
  );
}
