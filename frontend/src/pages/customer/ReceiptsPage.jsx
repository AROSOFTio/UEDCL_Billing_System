import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const receipts = [
  {
    id: 1,
    receiptNumber: 'RCT-2026-0001',
    paymentNumber: 'PAY-2026-0001',
    amount: 'UGX 182,500',
    status: 'Success',
  },
];

const columns = [
  { key: 'receiptNumber', label: 'Receipt Number' },
  { key: 'paymentNumber', label: 'Payment Number' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ReceiptsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Receipts"
        subtitle="Printable receipt records scaffolded for download and receipt-view integrations."
      />
      <DataTable columns={columns} rows={receipts} />
    </section>
  );
}
