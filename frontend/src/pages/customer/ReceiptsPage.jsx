import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import DetailGrid from '../../components/common/DetailGrid';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchPayments } from '../../services/paymentService';
import { fetchReceipt } from '../../services/receiptService';
import { formatCurrency, formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'receipt_number', label: 'Receipt Number', render: (payment) => payment.receipt?.receipt_number || '-' },
  { key: 'payment_number', label: 'Payment Number' },
  { key: 'bill_number', label: 'Bill Number', render: (payment) => payment.bill?.bill_number || '-' },
  { key: 'payment_method', label: 'Payment Method', render: (payment) => titleCase(payment.payment_method) },
  { key: 'amount', label: 'Amount', render: (payment) => formatCurrency(payment.amount) },
  {
    key: 'actions',
    label: 'Action',
    render: (payment) =>
      payment.receipt ? (
        <button className="button-ghost" type="button" onClick={() => payment.onSelect(payment.receipt.id)}>
          View Receipt
        </button>
      ) : (
        '-'
      ),
  },
];

export default function ReceiptsPage() {
  const [loading, setLoading] = useState(true);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState([]);
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  useEffect(() => {
    async function loadPayments() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchPayments();
        setPayments(response.filter((payment) => payment.receipt));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  async function handleSelectReceipt(receiptId) {
    setDetailLoading(true);
    setError('');

    try {
      const response = await fetchReceipt(receiptId);
      setSelectedReceipt(response);
    } catch (loadError) {
      setError(loadError.message);
    } finally {
      setDetailLoading(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading receipt records..." />;
  }

  return (
    <div className="list-stack">
      <section className="table-card">
        <PageHeader
          title="Receipts"
          subtitle="Open recorded receipts for printing or verification."
        />
        <AlertMessage tone="error">{error}</AlertMessage>
        <DataTable
          columns={columns}
          rows={payments.map((payment) => ({ ...payment, onSelect: handleSelectReceipt }))}
          emptyTitle="No receipts available"
          emptyMessage="Receipts will be available here after successful payment posting."
        />
      </section>
      {detailLoading ? <LoadingState message="Loading receipt details..." /> : null}
      {selectedReceipt ? (
        <section className="section-card list-stack">
          <PageHeader title="Receipt View" subtitle="Printable receipt information generated from the payment record." />
          <DetailGrid
            items={[
              { label: 'Receipt Number', value: selectedReceipt.receipt_number },
              { label: 'Issued At', value: formatDateTime(selectedReceipt.issued_at) },
              { label: 'Payment Number', value: selectedReceipt.payment?.payment_number },
              { label: 'Bill Number', value: selectedReceipt.payment?.bill?.bill_number },
              { label: 'Customer', value: selectedReceipt.payment?.bill?.customer?.name },
              { label: 'Amount', value: formatCurrency(selectedReceipt.payment?.amount) },
              { label: 'Payment Method', value: titleCase(selectedReceipt.payment?.payment_method) },
              { label: 'Recorded By', value: selectedReceipt.payment?.staff?.name },
            ]}
          />
        </section>
      ) : null}
    </div>
  );
}