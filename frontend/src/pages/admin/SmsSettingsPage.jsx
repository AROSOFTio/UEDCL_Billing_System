import PageHeader from '../../components/common/PageHeader';

export default function SmsSettingsPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="SMS Settings"
        subtitle="Configuration placeholder for mock mode and future live provider credentials."
      />
      <div className="form-grid">
        <div className="field"><label>SMS Enabled</label><select><option>Enabled</option><option>Disabled</option></select></div>
        <div className="field"><label>Mode</label><select><option>Mock</option><option>Live</option></select></div>
        <div className="field"><label>Provider Name</label><input placeholder="Future SMS provider" /></div>
        <div className="field"><label>API Key</label><input placeholder="Provider API key" /></div>
        <div className="field" style={{ gridColumn: '1 / -1' }}><label>Sender ID</label><input placeholder="UEDCL" /></div>
        <div><button className="button" type="button">Save SMS Settings</button></div>
      </div>
    </section>
  );
}
