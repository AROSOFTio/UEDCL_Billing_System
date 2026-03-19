import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { sampleComplaints } from '../../utils/mockData';

const columns = [
  { key: 'complaintNumber', label: 'Complaint Number' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ComplaintsListPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Complaints List"
        subtitle="Complaint queue placeholder for helpdesk triage and assignment."
      />
      <DataTable columns={columns} rows={sampleComplaints} />
    </section>
  );
}
