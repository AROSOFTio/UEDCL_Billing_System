import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleMeters } from '../../utils/mockData';

const columns = [
  { key: 'meterNumber', label: 'Meter Number' },
  { key: 'customer', label: 'Customer' },
  { key: 'type', label: 'Type' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function MetersPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Meters"
        subtitle="Meter inventory view with room for search, assignment, and status filtering."
      />
      <DataTable columns={columns} rows={sampleMeters} />
    </section>
  );
}
