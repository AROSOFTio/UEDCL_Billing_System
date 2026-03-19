import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleComplaints } from '../../utils/mockData';

const columns = [
  { key: 'complaintNumber', label: 'Complaint Number' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ComplaintsPage() {
  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Submit Complaint"
          subtitle="Customer complaint capture form scaffold for billing and service support cases."
        />
        <div className="form-grid">
          <div className="field">
            <label>Subject</label>
            <input placeholder="Meter reading dispute" />
          </div>
          <div className="field">
            <label>Category</label>
            <select defaultValue="Billing">
              <option>Billing</option>
              <option>Meter</option>
              <option>Outage</option>
            </select>
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label>Message</label>
            <textarea placeholder="Describe the issue in detail" />
          </div>
          <div>
            <button className="button" type="button">
              Submit Complaint
            </button>
          </div>
        </div>
      </section>
      <section className="table-card">
        <PageHeader title="Complaint History" subtitle="Track submitted complaints and current status." />
        <DataTable columns={columns} rows={sampleComplaints} />
      </section>
    </>
  );
}
