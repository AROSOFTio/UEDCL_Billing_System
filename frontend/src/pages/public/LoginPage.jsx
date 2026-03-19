import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { demoUsers, homePathByRole, roleLabels } from '../../utils/constants';

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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const user = await login(form);
      const redirectTo = location.state?.from?.pathname || homePathByRole[user.role];
      navigate(redirectTo, { replace: true });
    } catch (loginError) {
      setError(loginError.message);
    }
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="page-header">
          <div>
            <h2 className="page-title">Secure Login</h2>
            <p className="section-copy">
              Choose a role and use the seeded demo credentials to access the scaffolded dashboards.
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
            <input id="email" name="email" value={form.email} onChange={handleChange} />
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
              {demoUsers.map((user) => (
                <option key={user.email} value={`${user.role}|${user.email}`}>
                  {roleLabels[user.role]} | {user.email}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button className="button" type="submit">
              Login
            </button>
          </div>
        </form>

        {error ? <p className="alert-text">{error}</p> : null}
      </div>
    </section>
  );
}
