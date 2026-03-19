import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchComplaints } from '../../services/complaintService';
import { complaintStatuses } from '../../utils/constants';
import { formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'complaint_number', label: 'Complaint Number' },
  { key: 'customer', label: 'Customer', render: (complaint) => complaint.customer?.name || '-' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category', render: (complaint) => titleCase(complaint.category) },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'created_at', label: 'Created', render: (complaint) => formatDateTime(complaint.created_at) },
  {
    key: 'actions',
    label: 'Action',
    render: (complaint) => (
      <Link className="link-button" to={`/helpdesk/complaints/${complaint.id}`}>
        View Details
      </Link>
    ),
  },
];

export default function ComplaintsListPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    async function loadComplaints() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchComplaints(status ? { status } : {});
        setComplaints(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadComplaints();
  }, [status]);

  if (loading) {
    return <LoadingState message="Loading complaints list..." />;
  }

  return (
    <section className="table-card list-stack">
      <PageHeader
        title="Complaints List"
        subtitle="Review all submitted complaints and drill into individual customer cases."
      />
      <div className="form-grid">
        <div className="field">
          <label htmlFor="status">Status Filter</label>
          <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
            <option value="">All</option>
            {complaintStatuses.map((complaintStatus) => (
              <option key={complaintStatus} value={complaintStatus}>
                {complaintStatus}
              </option>
            ))}
          </select>
        </div>
      </div>
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable columns={columns} rows={complaints} emptyTitle="No complaints found" emptyMessage="No complaints matched the selected status filter." />
    </section>
  );
}