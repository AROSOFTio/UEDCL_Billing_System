import PageHeader from '../../components/common/PageHeader';

export default function SettingsPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Settings"
        subtitle="General system settings placeholder for branding, defaults, and operational preferences."
      />
      <div className="form-grid">
        <div className="field"><label>Company Name</label><input value="UEDCL" readOnly /></div>
        <div className="field"><label>Default Currency</label><input value="UGX" readOnly /></div>
        <div className="field"><label>Notification Channel</label><select><option>SMS</option><option>Email</option></select></div>
        <div className="field"><label>Complaint SLA (days)</label><input placeholder="3" /></div>
        <div><button className="button" type="button">Save Settings</button></div>
      </div>
    </section>
  );
}
