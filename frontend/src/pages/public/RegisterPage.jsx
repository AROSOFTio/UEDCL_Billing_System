import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const initialForm = {
  fullName: '',
  phone: '',
  email: '',
  nationalId: '',
  address: '',
};

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await register(form);
    setSubmitted(true);
    setForm(initialForm);
  };

  return (
    <section className="auth-page">
      <div className="auth-panel">
        <div className="page-header">
          <div>
            <h2 className="page-title">Customer Registration</h2>
            <p className="section-copy">
              This starter form prepares the public account creation flow for customer onboarding.
            </p>
          </div>
        </div>
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="fullName">Full Name</label>
            <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} />
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
            <label htmlFor="nationalId">National ID</label>
            <input id="nationalId" name="nationalId" value={form.nationalId} onChange={handleChange} />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="address">Address</label>
            <textarea id="address" name="address" value={form.address} onChange={handleChange} />
          </div>
          <div>
            <button className="button" type="submit">
              Create Account
            </button>
          </div>
        </form>
        {submitted ? (
          <p className="helper-text">Registration request captured in scaffold mode. Backend integration comes next.</p>
        ) : null}
      </div>
    </section>
  );
}
