import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const rows = [
  {
    id: 1,
    complaintNumber: 'CMP-2026-0002',
    subject: 'Meter inspection request',
    category: 'Meter',
    status: 'Resolved',
  },
];

const columns = [
  { key: 'complaintNumber', label: 'Complaint Number' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ResolvedComplaintsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Resolved Complaints"
        subtitle="Resolved cases archive placeholder for service quality review."
      />
      <DataTable columns={columns} rows={rows} />
    </section>
  );
}
