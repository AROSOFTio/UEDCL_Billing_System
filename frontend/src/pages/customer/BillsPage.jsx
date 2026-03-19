import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchBills } from '../../services/billingService';
import { formatCurrency, formatDate } from '../../utils/formatters';

const columns = [
  { key: 'bill_number', label: 'Bill Number' },
  {
    key: 'billing_cycle',
    label: 'Billing Cycle',
  },
  {
    key: 'total_amount',
    label: 'Amount',
    render: (bill) => formatCurrency(bill.total_amount),
  },
  {
    key: 'due_date',
    label: 'Due Date',
    render: (bill) => formatDate(bill.due_date),
  },
  { key: 'status', label: 'Status', type: 'status' },
  {
    key: 'actions',
    label: 'Action',
    render: (bill) => (
      <Link className="link-button" to={`/customer/bills/${bill.id}`}>
        View Details
      </Link>
    ),
  },
];

export default function BillsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bills, setBills] = useState([]);

  useEffect(() => {
    async function loadBills() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchBills();
        setBills(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, []);

  if (loading) {
    return <LoadingState message="Loading bill history..." />;
  }

  return (
    <section className="table-card">
      <PageHeader
        title="My Bills"
        subtitle="View your complete bill history, payment status, and due dates."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable
        columns={columns}
        rows={bills}
        emptyTitle="No bills available"
        emptyMessage="Generated bills will appear here once meter readings are processed."
      />
    </section>
  );
}