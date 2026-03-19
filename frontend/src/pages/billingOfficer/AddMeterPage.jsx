import PageHeader from '../../components/common/PageHeader';

export default function AddMeterPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Add Meter"
        subtitle="Starter form for meter registration and customer assignment."
      />
      <div className="form-grid">
        <div className="field"><label>Meter Number</label><input placeholder="MT-309230" /></div>
        <div className="field"><label>Meter Type</label><select><option>Domestic</option><option>Commercial</option></select></div>
        <div className="field"><label>Assigned Customer</label><input placeholder="Grace Nansubuga" /></div>
        <div className="field"><label>Installation Date</label><input type="date" /></div>
        <div className="field"><label>Status</label><select><option>Active</option><option>Inactive</option></select></div>
        <div className="field"><label>Location</label><input placeholder="Transformer zone / village" /></div>
        <div><button className="button" type="button">Save Meter</button></div>
      </div>
    </section>
  );
}
