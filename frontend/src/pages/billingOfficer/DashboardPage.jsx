import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import DataTable from '../../components/common/DataTable';
import { dashboardStats, sampleBills } from '../../utils/mockData';

const columns = [
  { key: 'billNumber', label: 'Bill Number' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Billing Officer Dashboard"
        subtitle="Operational view for customer registration, meter activity, bill generation, and payment follow-up."
      />
      <div className="card-grid">
        {dashboardStats.billing_officer.map((item) => (
          <StatCard key={item.label} {...item} />
        ))}
      </div>
      <section className="table-card">
        <PageHeader title="Recent Bills" subtitle="Quick review of the latest billing activity." />
        <DataTable columns={columns} rows={sampleBills} />
      </section>
    </>
  );
}
