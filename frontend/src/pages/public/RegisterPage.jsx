import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import { useAuth } from '../../context/AuthContext';
import { homePathByRole } from '../../utils/constants';

const initialForm = {
  name: '',
  phone: '',
  email: '',
  national_id: '',
  address: '',
  password: '',
  password_confirmation: '',
};

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setMessage('');
    setError('');

    try {
      const user = await register(form);
      setMessage('Customer account created successfully. Redirecting to your dashboard...');
      setForm(initialForm);
      window.setTimeout(() => {
        navigate(homePathByRole[user.role], { replace: true });
      }, 700);
    } catch (registerError) {
      setError(registerError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="page-header">
          <div>
            <h2 className="page-title">Customer Registration</h2>
            <p className="section-copy">
              Open a secure customer account to view bills, payments, receipts, notifications, and complaints online.
            </p>
          </div>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Full Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="phone">Phone</label>
            <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="national_id">National ID</label>
            <input id="national_id" name="national_id" value={form.national_id} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="password_confirmation">Confirm Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={form.password_confirmation}
              onChange={handleChange}
            />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Create Account'}
            </button>
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>

        <div style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.95rem', color: 'var(--color-text-muted)' }}>
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: '600', textDecoration: 'none' }} onMouseOver={(e) => e.target.style.textDecoration = 'underline'} onMouseOut={(e) => e.target.style.textDecoration = 'none'}>Sign in</Link>
        </div>
      </div>
    </section>
  );
}