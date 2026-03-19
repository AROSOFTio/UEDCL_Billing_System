import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { dashboardStats, sampleComplaints } from '../../utils/mockData';

const columns = [
  { key: 'complaintNumber', label: 'Complaint Number' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Helpdesk Dashboard"
        subtitle="Service request oversight with focus on open cases, updates, and resolution tracking."
      />
      <div className="card-grid">
        {dashboardStats.helpdesk_officer.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <section className="table-card">
        <PageHeader title="Recent Complaints" subtitle="Latest complaint queue in scaffold mode." />
        <DataTable columns={columns} rows={sampleComplaints} />
      </section>
    </>
  );
}
