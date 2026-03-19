import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchRoles } from '../../services/roleService';
import { createUser } from '../../services/userService';
import { userStatuses } from '../../utils/constants';

const initialForm = {
  role_id: '',
  name: '',
  email: '',
  phone: '',
  password: '',
  status: 'active',
};

export default function AddUserPage() {
  const navigate = useNavigate();
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    async function loadRoles() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchRoles();
        setRoles(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadRoles();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      await createUser({
        ...form,
        role_id: Number(form.role_id),
      });
      setMessage('User created successfully. Redirecting to user registry...');
      setForm(initialForm);
      window.setTimeout(() => {
        navigate('/admin/users', { replace: true });
      }, 700);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading roles..." />;
  }

  return (
    <section className="form-card">
      <PageHeader
        title="Add User"
        subtitle="Create a new staff or system user with the appropriate role assignment and account status."
      />
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="role_id">Role</label>
          <select id="role_id" name="role_id" value={form.role_id} onChange={handleChange}>
            <option value="">Select role</option>
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="name">Full Name</label>
          <input id="name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" value={form.phone} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {userStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Create User'}
          </button>
        </div>
      </form>
      <AlertMessage tone="success">{message}</AlertMessage>
      <AlertMessage tone="error">{error}</AlertMessage>
    </section>
  );
}