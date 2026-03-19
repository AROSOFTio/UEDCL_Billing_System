import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleCustomers } from '../../utils/mockData';

const columns = [
  { key: 'accountNumber', label: 'Account Number' },
  { key: 'name', label: 'Customer Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function CustomersPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Customers"
        subtitle="Customer registry placeholder with room for search, filters, and editing workflows."
      />
      <DataTable columns={columns} rows={sampleCustomers} />
    </section>
  );
}
