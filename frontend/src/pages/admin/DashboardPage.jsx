import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { dashboardStats } from '../../utils/mockData';

const rows = [
  { id: 1, metric: 'Total Customers', value: '12,540', status: 'Success' },
  { id: 2, metric: 'Total Meters', value: '12,110', status: 'Success' },
  { id: 3, metric: 'Unresolved Complaints', value: '46', status: 'Pending' },
];

const columns = [
  { key: 'metric', label: 'Metric' },
  { key: 'value', label: 'Value' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Administrator Dashboard"
        subtitle="Executive monitoring view for utility operations, collections, complaints, and system controls."
      />
      <div className="card-grid">
        {dashboardStats.administrator.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <section className="table-card">
        <PageHeader title="Summary Snapshot" subtitle="Starter reporting block for institutional monitoring." />
        <DataTable columns={columns} rows={rows} />
      </section>
    </>
  );
}
