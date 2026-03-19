import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchMeters } from '../../services/meterService';
import { meterStatuses } from '../../utils/constants';
import { formatDate, formatNumber } from '../../utils/formatters';

const columns = [
  { key: 'meter_number', label: 'Meter Number' },
  { key: 'customer', label: 'Customer', render: (meter) => meter.customer?.name || '-' },
  { key: 'meter_type', label: 'Meter Type' },
  { key: 'location', label: 'Location' },
  { key: 'installation_date', label: 'Installed', render: (meter) => formatDate(meter.installation_date) },
  { key: 'latest_reading', label: 'Latest Reading', render: (meter) => formatNumber(meter.latestReading?.current_reading) },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function MetersPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [meters, setMeters] = useState([]);
  const [filters, setFilters] = useState({ search: '', status: '' });

  useEffect(() => {
    async function loadMeters() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchMeters(filters);
        setMeters(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMeters();
  }, [filters]);

  function handleChange(event) {
    const { name, value } = event.target;
    setFilters((current) => ({ ...current, [name]: value }));
  }

  if (loading) {
    return <LoadingState message="Loading meters..." />;
  }

  return (
    <section className="table-card list-stack">
      <PageHeader
        title="Meters"
        subtitle="Search active, inactive, and faulty meters assigned to customers."
      />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="search">Search</label>
          <input id="search" name="search" value={filters.search} onChange={handleChange} placeholder="Meter number or location" />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={filters.status} onChange={handleChange}>
            <option value="">All</option>
            {meterStatuses.map((status) => (
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
        rows={meters}
        emptyTitle="No meters found"
        emptyMessage="No meter records matched the current search or filter."
      />
    </section>
  );
}