import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchPayments } from '../../services/paymentService';
import { formatCurrency, formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'payment_number', label: 'Payment Number' },
  {
    key: 'bill',
    label: 'Bill Number',
    render: (payment) => payment.bill?.bill_number || '-',
  },
  {
    key: 'payment_method',
    label: 'Payment Method',
    render: (payment) => titleCase(payment.payment_method),
  },
  {
    key: 'amount',
    label: 'Amount',
    render: (payment) => formatCurrency(payment.amount),
  },
  {
    key: 'paid_at',
    label: 'Paid At',
    render: (payment) => formatDateTime(payment.paid_at),
  },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    async function loadPayments() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchPayments();
        setPayments(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadPayments();
  }, []);

  if (loading) {
    return <LoadingState message="Loading payment history..." />;
  }

  return (
    <section className="table-card">
      <PageHeader
        title="Payments"
        subtitle="Payment records captured against your customer bills."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable
        columns={columns}
        rows={payments}
        emptyTitle="No payments recorded"
        emptyMessage="Payments will appear here after successful bill settlement."
      />
    </section>
  );
}