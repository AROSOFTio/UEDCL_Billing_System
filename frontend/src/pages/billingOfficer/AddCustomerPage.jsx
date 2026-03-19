import PageHeader from '../../components/common/PageHeader';

export default function AddCustomerPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Add Customer"
        subtitle="Starter form for staff-assisted customer creation with account number and profile details."
      />
      <div className="form-grid">
        <div className="field"><label>Account Number</label><input placeholder="UEDCL-100247" /></div>
        <div className="field"><label>Full Name</label><input placeholder="Enter customer name" /></div>
        <div className="field"><label>Phone</label><input placeholder="+256700000000" /></div>
        <div className="field"><label>Email</label><input placeholder="customer@example.com" /></div>
        <div className="field"><label>National ID</label><input placeholder="National ID" /></div>
        <div className="field"><label>Status</label><select><option>Active</option><option>Pending</option></select></div>
        <div className="field" style={{ gridColumn: '1 / -1' }}><label>Address</label><textarea placeholder="Physical address" /></div>
        <div><button className="button" type="button">Save Customer</button></div>
      </div>
    </section>
  );
}
