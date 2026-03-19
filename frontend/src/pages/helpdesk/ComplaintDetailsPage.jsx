import PageHeader from '../../components/common/PageHeader';

export default function ComplaintDetailsPage() {
  return (
    <>
      <section className="section-card">
        <PageHeader
          title="Complaint Details"
          subtitle="Helpdesk review view for status updates, internal notes, and customer reply handling."
        />
        <p><strong>Complaint Number:</strong> CMP-2026-0001</p>
        <p><strong>Subject:</strong> Estimated reading dispute</p>
        <p><strong>Category:</strong> Billing</p>
        <p><strong>Status:</strong> Pending</p>
        <p><strong>Message:</strong> The last reading appears higher than the usage pattern at the premises.</p>
      </section>
      <section className="form-card">
        <PageHeader title="Reply and Status Update" subtitle="Starter workflow for helpdesk response." />
        <div className="form-grid">
          <div className="field"><label>Status</label><select><option>Pending</option><option>In Progress</option><option>Resolved</option></select></div>
          <div className="field" style={{ gridColumn: '1 / -1' }}><label>Reply</label><textarea placeholder="Provide a professional response to the customer" /></div>
          <div><button className="button" type="button">Save Update</button></div>
        </div>
      </section>
    </>
  );
}
