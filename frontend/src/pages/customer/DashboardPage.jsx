import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { dashboardStats, sampleBills } from '../../utils/mockData';

const columns = [
  { key: 'billNumber', label: 'Bill Number' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Customer Dashboard"
        subtitle="Track your current bills, payments, notifications, and service requests from one place."
      />
      <div className="card-grid">
        {dashboardStats.customer.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <section className="table-card">
        <PageHeader
          title="Recent Bills"
          subtitle="Latest bill records available in the scaffolded customer workspace."
        />
        <DataTable columns={columns} rows={sampleBills} />
      </section>
    </>
  );
}
