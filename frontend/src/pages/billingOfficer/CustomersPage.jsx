import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchCustomers } from '../../services/customerService';
import { customerStatuses } from '../../utils/constants';

const columns = [
  { key: 'account_number', label: 'Account Number' },
  { key: 'name', label: 'Customer Name' },
  { key: 'phone', label: 'Phone' },
  { key: 'email', label: 'Email' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function CustomersPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [customers, setCustomers] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '' });

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchCustomers(filters);
        setCustomers(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, [filters]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  if (loading) {
    return <LoadingState message="Loading customers..." />;
  }

  return (
    <section className="table-card list-stack">
      <PageHeader
        title="Customers"
        subtitle="Search and review registered customer accounts across billing operations."
      />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="search">Search</label>
          <input id="search" name="search" value={filters.search} onChange={handleChange} placeholder="Name, phone, or account number" />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={filters.status} onChange={handleChange}>
            <option value="">All</option>
            {customerStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable
        columns={columns}
        rows={customers}
        emptyTitle="No customers found"
        emptyMessage="No customer records matched the selected search or filter."
      />
    </section>
  );
}