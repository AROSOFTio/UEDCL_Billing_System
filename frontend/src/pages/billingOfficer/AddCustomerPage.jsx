import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import PageHeader from '../../components/common/PageHeader';
import { createCustomer } from '../../services/customerService';
import { customerStatuses } from '../../utils/constants';

const initialForm = {
  account_number: `UEDCL-${String(Date.now()).slice(-6)}`,
  name: '',
  phone: '',
  email: '',
  national_id: '',
  address: '',
  status: 'active',
};

export default function AddCustomerPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

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
      await createCustomer(form);
      setMessage('Customer created successfully. Redirecting to customer list...');
      setForm({ ...initialForm, account_number: `UEDCL-${String(Date.now()).slice(-6)}` });
      window.setTimeout(() => {
        navigate('/billing/customers', { replace: true });
      }, 700);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="form-card">
      <PageHeader
        title="Add Customer"
        subtitle="Create a new customer account record with a formal account number and service details."
      />
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="account_number">Account Number</label>
          <input id="account_number" name="account_number" value={form.account_number} onChange={handleChange} />
        </div>
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
          <input id="email" name="email" value={form.email} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="national_id">National ID</label>
          <input id="national_id" name="national_id" value={form.national_id} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {customerStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label htmlFor="address">Address</label>
          <textarea id="address" name="address" value={form.address} onChange={handleChange} />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Create Customer'}
          </button>
        </div>
      </form>
      <AlertMessage tone="success">{message}</AlertMessage>
      <AlertMessage tone="error">{error}</AlertMessage>
    </section>
  );
}