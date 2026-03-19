import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import { useAuth } from '../../context/AuthContext';
import { demoCredentials, homePathByRole, roleLabels } from '../../utils/constants';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({
    email: 'admin@uedcl.local',
    password: 'password123',
    role: 'administrator',
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

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

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="page-header">
          <div>
            <h2 className="page-title">Secure Login</h2>
            <p className="section-copy">
              Sign in with one of the seeded demo users or with your registered customer account.
            </p>
          </div>
        </div>

        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="role">Role</label>
            <select id="role" name="role" value={form.role} onChange={handleChange}>
              {Object.entries(roleLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label>Quick Demo Accounts</label>
            <select
              value={`${form.role}|${form.email}`}
              onChange={(event) => {
                const [role, email] = event.target.value.split('|');
                setForm({ email, password: 'password123', role });
              }}
            >
              {demoCredentials.map((user) => (
                <option key={user.email} value={`${user.role}|${user.email}`}>
                  {roleLabels[user.role]} | {user.email}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Signing In...' : 'Login'}
            </button>
          </div>
        </form>

        <AlertMessage tone="info">
          Demo password for seeded accounts: <strong>password123</strong>
        </AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
      </div>
    </section>
  );
}