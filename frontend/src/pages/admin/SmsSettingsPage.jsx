import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import PageHeader from '../../components/common/PageHeader';

const STORAGE_KEY = 'uedcl-sms-settings';
const initialForm = {
  enabled: true,
  provider_name: 'Mock SMS Provider',
  api_key: '',
  sender_id: 'UEDCL',
};

export default function SmsSettingsPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);

    if (stored) {
      setForm(JSON.parse(stored));
    }
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(form));
    setMessage('SMS settings saved locally for mock-mode administration.');
  }

  return (
    <section className="form-card list-stack">
      <PageHeader
        title="SMS Settings"
        subtitle="Configure mock SMS behavior now and leave fields ready for a future live provider integration."
      />
      <AlertMessage tone="info">
        Backend SMS delivery is currently running in mock mode. These settings are stored locally in the frontend until a dedicated backend settings API is added.
      </AlertMessage>
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="enabled">Enable SMS</label>
          <input id="enabled" name="enabled" type="checkbox" checked={form.enabled} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="provider_name">Provider Name</label>
          <input id="provider_name" name="provider_name" value={form.provider_name} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="api_key">API Key</label>
          <input id="api_key" name="api_key" value={form.api_key} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="sender_id">Sender ID</label>
          <input id="sender_id" name="sender_id" value={form.sender_id} onChange={handleChange} />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit">Save Settings</button>
        </div>
      </form>
      <AlertMessage tone="success">{message}</AlertMessage>
    </section>
  );
}