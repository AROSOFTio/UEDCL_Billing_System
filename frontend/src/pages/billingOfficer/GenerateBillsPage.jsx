import PageHeader from '../../components/common/PageHeader';

export default function GenerateBillsPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Generate Bills"
        subtitle="Billing generation placeholder using tariff rate, fixed charge, units consumed, and due date."
      />
      <div className="form-grid">
        <div className="field"><label>Billing Cycle</label><input type="month" /></div>
        <div className="field"><label>Tariff</label><select><option>Domestic Standard</option><option>Commercial Standard</option></select></div>
        <div className="field"><label>Due Date</label><input type="date" /></div>
        <div className="field"><label>Scope</label><select><option>All Active Meters</option><option>Single Customer</option></select></div>
        <div><button className="button" type="button">Generate Bills</button></div>
      </div>
    </section>
  );
}
