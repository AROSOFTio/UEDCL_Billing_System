import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchComplaints } from '../../services/complaintService';
import { formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'complaint_number', label: 'Complaint Number' },
  { key: 'customer', label: 'Customer', render: (complaint) => complaint.customer?.name || '-' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category', render: (complaint) => titleCase(complaint.category) },
  { key: 'created_at', label: 'Resolved Date', render: (complaint) => formatDateTime(complaint.updated_at || complaint.created_at) },
  {
    key: 'actions',
    label: 'Action',
    render: (complaint) => (
      <Link className="link-button" to={`/helpdesk/complaints/${complaint.id}`}>
        Review Case
      </Link>
    ),
  },
];

export default function ResolvedComplaintsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    async function loadComplaints() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchComplaints({ status: 'resolved' });
        setComplaints(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadComplaints();
  }, []);

  if (loading) {
    return <LoadingState message="Loading resolved complaints..." />;
  }

  return (
    <section className="table-card list-stack">
      <PageHeader
        title="Resolved Complaints"
        subtitle="Archive of completed complaint cases for service quality review and audit."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable columns={columns} rows={complaints} emptyTitle="No resolved complaints" emptyMessage="Resolved complaint cases will appear here once helpdesk teams close them." />
    </section>
  );
}