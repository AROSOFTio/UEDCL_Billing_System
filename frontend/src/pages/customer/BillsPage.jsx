import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleBills } from '../../utils/mockData';

const columns = [
  { key: 'billNumber', label: 'Bill Number' },
  { key: 'customer', label: 'Customer' },
  { key: 'amount', label: 'Amount' },
  { key: 'dueDate', label: 'Due Date' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function BillsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="My Bills"
        subtitle="Complete billing history placeholder for the customer portal."
      />
      <DataTable columns={columns} rows={sampleBills} />
    </section>
  );
}
