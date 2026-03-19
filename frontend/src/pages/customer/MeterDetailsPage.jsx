import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchMeters } from '../../services/meterService';
import { formatDate, formatNumber, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'meter_number', label: 'Meter Number' },
  { key: 'meter_type', label: 'Meter Type' },
  { key: 'location', label: 'Location' },
  {
    key: 'latest_reading',
    label: 'Latest Reading',
    render: (meter) => formatNumber(meter.latestReading?.current_reading),
  },
  {
    key: 'installation_date',
    label: 'Installation Date',
    render: (meter) => formatDate(meter.installation_date),
  },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function MeterDetailsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [meters, setMeters] = useState([]);

  useEffect(() => {
    async function loadMeters() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchMeters();
        setMeters(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadMeters();
  }, []);

  if (loading) {
    return <LoadingState message="Loading meter details..." />;
  }

  return (
    <section className="table-card">
      <PageHeader
        title="Meter Details"
        subtitle="Review all meters assigned to your customer account and the latest recorded readings."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      <div className="detail-grid" style={{ marginBottom: '1rem' }}>
        {meters.map((meter) => (
          <div key={meter.id} className="detail-card">
            <span>{meter.meter_number}</span>
            <strong>{meter.location}</strong>
            <p className="helper-text">
              {titleCase(meter.meter_type)} | Installed {formatDate(meter.installation_date)}
            </p>
          </div>
        ))}
      </div>
      <DataTable
        columns={columns}
        rows={meters}
        emptyTitle="No meters assigned"
        emptyMessage="Meter records will appear here after meter assignment by the billing team."
      />
    </section>
  );
}