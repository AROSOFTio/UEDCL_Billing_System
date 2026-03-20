import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import DetailGrid from '../../components/common/DetailGrid';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { complaintCategories } from '../../utils/constants';
import { createComplaint, fetchComplaints } from '../../services/complaintService';
import { formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'complaint_number', label: 'Complaint Number' },
  { key: 'subject', label: 'Subject' },
  { key: 'category', label: 'Category', render: (complaint) => titleCase(complaint.category) },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'created_at', label: 'Created', render: (complaint) => formatDateTime(complaint.created_at) },
  {
    key: 'actions',
    label: 'Action',
    render: (complaint) => (
      <button className="button-ghost" type="button" onClick={() => complaint.onSelect(complaint)}>
        View Replies
      </button>
    ),
  },
];

const initialForm = {
  subject: '',
  category: 'billing',
  message: '',
};

export default function ComplaintsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [complaints, setComplaints] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  useEffect(() => {
    async function loadComplaints() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchComplaints();
        setComplaints(response);
        setSelectedComplaint((current) =>
          current ? response.find((item) => item.id === current.id) || response[0] || null : response[0] || null,
        );
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadComplaints();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await createComplaint(form);
      setComplaints((current) => [response.data, ...current]);
      setSelectedComplaint(response.data);
      setForm(initialForm);
      setMessage('Complaint submitted successfully. Our helpdesk team will follow up.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading complaints..." />;
  }

  return (
    <div className="split-layout">
      <section className="form-card">
        <PageHeader
          title="Submit Complaint"
          subtitle="Raise billing, meter, outage, payment, or general service issues directly from your customer portal."
        />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="subject">Subject</label>
            <input id="subject" name="subject" value={form.subject} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="category">Category</label>
            <select id="category" name="category" value={form.category} onChange={handleChange}>
              {complaintCategories.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" value={form.message} onChange={handleChange} />
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Submitting...' : 'Submit Complaint'}
            </button>
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
      </section>
      <section className="table-card list-stack">
        <PageHeader title="Complaint History" subtitle="Track the progress of submitted customer complaints and helpdesk replies." />
        <DataTable
          columns={columns}
          rows={complaints.map((complaint) => ({ ...complaint, onSelect: setSelectedComplaint }))}
          emptyTitle="No complaints submitted"
          emptyMessage="Complaint history will appear here after you submit a case."
        />
        {selectedComplaint ? (
          <section className="section-card list-stack">
            <PageHeader
              title="Complaint Details"
              subtitle="Review the latest complaint details and any replies posted by the helpdesk team."
            />
            <DetailGrid
              items={[
                { label: 'Complaint Number', value: selectedComplaint.complaint_number },
                { label: 'Subject', value: selectedComplaint.subject },
                { label: 'Category', value: titleCase(selectedComplaint.category) },
                { label: 'Status', value: titleCase(selectedComplaint.status) },
                { label: 'Created', value: formatDateTime(selectedComplaint.created_at) },
                { label: 'Message', value: selectedComplaint.message },
              ]}
            />
            {(selectedComplaint.replies || []).length ? (
              <div className="list-stack">
                {selectedComplaint.replies.map((reply) => (
                  <article key={reply.id} className="detail-card">
                    <span>{reply.user?.name || 'Helpdesk Officer'}</span>
                    <strong>{formatDateTime(reply.created_at)}</strong>
                    <p className="helper-text">{reply.reply}</p>
                  </article>
                ))}
              </div>
            ) : (
              <AlertMessage tone="info">No helpdesk replies have been posted on this complaint yet.</AlertMessage>
            )}
          </section>
        ) : null}
      </section>
    </div>
  );
}