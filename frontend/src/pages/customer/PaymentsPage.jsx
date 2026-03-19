import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { samplePayments } from '../../utils/mockData';

const columns = [
  { key: 'paymentNumber', label: 'Payment Number' },
  { key: 'bill', label: 'Bill' },
  { key: 'method', label: 'Method' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function PaymentsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Payments"
        subtitle="Recorded payments for the customer account, ready to connect to backend receipts and gateways later."
      />
      <DataTable columns={columns} rows={samplePayments} />
    </section>
  );
}
