import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleMeters } from '../../utils/mockData';

const columns = [
  { key: 'meterNumber', label: 'Meter Number' },
  { key: 'customer', label: 'Assigned Customer' },
  { key: 'type', label: 'Meter Type' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function MeterDetailsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Meter Details"
        subtitle="Assigned meter information and operational status for the customer account."
      />
      <DataTable columns={columns} rows={[sampleMeters[0]]} />
    </section>
  );
}
