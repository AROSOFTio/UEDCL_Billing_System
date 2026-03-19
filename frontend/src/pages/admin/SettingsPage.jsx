import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import PageHeader from '../../components/common/PageHeader';

const STORAGE_KEY = 'uedcl-admin-settings';
const initialForm = {
  organization_name: 'UEDCL',
  default_due_days: '14',
  complaint_sla_days: '3',
  support_email: 'support@uedcl.local',
};

export default function SettingsPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setForm(JSON.parse(stored));
    }
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setMessage('Administrative settings saved locally in the frontend workspace.');
  }

  return (
    <section className="form-card list-stack">
      <PageHeader
        title="Settings"
        subtitle="Administrative defaults for the utility workspace."
      />
      <AlertMessage tone="info">
        This page currently stores UI-level settings locally. A backend settings endpoint can be added later if you want centralized persistence.
      </AlertMessage>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="organization_name">Organization Name</label>
          <input id="organization_name" name="organization_name" value={form.organization_name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="default_due_days">Default Due Days</label>
          <input id="default_due_days" name="default_due_days" type="number" value={form.default_due_days} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="complaint_sla_days">Complaint SLA Days</label>
          <input id="complaint_sla_days" name="complaint_sla_days" type="number" value={form.complaint_sla_days} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="support_email">Support Email</label>
          <input id="support_email" name="support_email" value={form.support_email} onChange={handleChange} />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit">Save Settings</button>
        </div>
      </form>
      <AlertMessage tone="success">{message}</AlertMessage>
    </section>
  );
}