import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchBills } from '../../services/billingService';
import { billStatuses } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';

const columns = [
  { key: 'bill_number', label: 'Bill Number' },
  { key: 'customer', label: 'Customer', render: (bill) => bill.customer?.name || '-' },
  { key: 'meter', label: 'Meter', render: (bill) => bill.meter?.meter_number || '-' },
  { key: 'billing_cycle', label: 'Billing Cycle' },
  { key: 'total_amount', label: 'Amount', render: (bill) => formatCurrency(bill.total_amount) },
  { key: 'due_date', label: 'Due Date', render: (bill) => formatDate(bill.due_date) },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function BillsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [bills, setBills] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function loadBills() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchBills(status ? { status } : {});
        setBills(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadBills();
  }, [status]);

  if (loading) {
    return <LoadingState message="Loading generated bills..." />;
  }

  return (
    <section className="table-card list-stack">
      <PageHeader
        title="Bills"
        subtitle="Review generated bills, customer assignments, and current collection status."
      />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="status">Status Filter</label>
          <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All</option>
            {billStatuses.map((billStatus) => (
              <option key={billStatus} value={billStatus}>
                {billStatus}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable columns={columns} rows={bills} emptyTitle="No bills found" emptyMessage="No bill records matched the selected filter." />
    </section>
  );
}