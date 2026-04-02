import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import PageHeader from '../../components/common/PageHeader';
import { fetchSettings, saveSettings } from '../../services/settingService';
import LoadingState from '../../components/common/LoadingState';

const initialForm = {
  'sms.enabled': 'false',
  'sms.provider': 'mock',
  'sms.at_username': 'sandbox',
  'sms.at_api_key': '',
  'sms.sender_id': 'UEDCL',
};

export default function SmsSettingsPage() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const data = await fetchSettings();
        setForm((prev) => ({ ...prev, ...data }));
      } catch (err) {
        console.error("Failed to load settings from database:", err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? (checked ? 'true' : 'false') : value,
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    try {
      await saveSettings(form);
      setMessage('SMS settings successfully synchronized to the secure live database.');
    } catch (err) {
      setError(err.message || 'Failed to save settings permanently.');
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading secure configuration..." />;
  }

  return (
    <section className="form-card list-stack">
      <PageHeader
        title="SMS API Configuration"
        subtitle="Manage the Live Telecom bindings mapping to your Africa's Talking corporate proxy interface."
      />
      <AlertMessage tone="info">
        Ensure your Africa's Talking API keys are securely entered. Leave the provider as 'mock' and enabled as 'false' if testing without telecom credits.
      </AlertMessage>
      {error && <AlertMessage tone="error">{error}</AlertMessage>}
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="sms.enabled">Enable Live Telecom Routing</label>
          <input 
            id="sms.enabled" 
            name="sms.enabled" 
            type="checkbox" 
            checked={form['sms.enabled'] === 'true'} 
            onChange={handleChange} 
          />
        </div>
        <div className="field">
          <label htmlFor="sms.provider">SMS Provider API Profile</label>
          <select 
            id="sms.provider" 
            name="sms.provider" 
            value={form['sms.provider']} 
            onChange={handleChange}
            className="input-field"
          >
            <option value="mock">Local Development Mock Console</option>
            <option value="africastalking">Africa's Talking SDK Mode</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="sms.at_username">Account Username</label>
          <input 
            id="sms.at_username" 
            name="sms.at_username" 
            value={form['sms.at_username'] || ''} 
            onChange={handleChange} 
            placeholder="sandbox"
          />
        </div>
        <div className="field">
          <label htmlFor="sms.at_api_key">API Secret Interface Key</label>
          <input 
            id="sms.at_api_key" 
            name="sms.at_api_key" 
            type="password"
            value={form['sms.at_api_key'] || ''} 
            onChange={handleChange} 
            placeholder="atsk_xxxxx"
          />
        </div>
        <div className="field">
          <label htmlFor="sms.sender_id">Whitelisted Sender ID</label>
          <input 
            id="sms.sender_id" 
            name="sms.sender_id" 
            value={form['sms.sender_id'] || ''} 
            onChange={handleChange} 
            placeholder="UEDCL"
          />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit" disabled={saving}>
            {saving ? 'Synchronizing API Keys...' : 'Commit Settings Core'}
          </button>
        </div>
      </form>
      {message && <AlertMessage tone="success">{message}</AlertMessage>}
    </section>
  );
}