import PageHeader from '../../components/common/PageHeader';

export default function AddUserPage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Add User"
        subtitle="Starter administrative form for creating staff accounts and assigning platform roles."
      />
      <div className="form-grid">
        <div className="field"><label>Full Name</label><input placeholder="New staff member" /></div>
        <div className="field"><label>Email</label><input placeholder="staff@uedcl.local" /></div>
        <div className="field"><label>Phone</label><input placeholder="+256700000000" /></div>
        <div className="field"><label>Role</label><select><option>Administrator</option><option>Billing Officer</option><option>Helpdesk Officer</option></select></div>
        <div><button className="button" type="button">Create User</button></div>
      </div>
    </section>
  );
}
