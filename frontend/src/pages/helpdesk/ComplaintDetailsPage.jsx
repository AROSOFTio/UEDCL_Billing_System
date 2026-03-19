import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DetailGrid from '../../components/common/DetailGrid';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchComplaint, replyToComplaint, updateComplaintStatus } from '../../services/complaintService';
import { complaintStatuses } from '../../utils/constants';
import { formatDateTime, titleCase } from '../../utils/formatters';

export default function ComplaintDetailsPage() {
  const { complaintId } = useParams();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [statusSubmitting, setStatusSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [complaint, setComplaint] = useState(null);
  const [reply, setReply] = useState('');
  const [status, setStatus] = useState('pending');

  useEffect(() => {
    async function loadComplaint() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchComplaint(complaintId);
        setComplaint(response);
        setStatus(response.status);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadComplaint();
  }, [complaintId]);

  async function handleReplySubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await replyToComplaint(complaintId, { reply });
      setComplaint(response.complaint);
      setReply('');
      setStatus(response.complaint.status);
      setMessage('Reply added successfully.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleStatusUpdate() {
    setStatusSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await updateComplaintStatus(complaintId, { status });
      setComplaint(response.data);
      setMessage('Complaint status updated successfully.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setStatusSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading complaint details..." />;
  }

  return (
    <div className="list-stack">
      <PageHeader
        title="Complaint Details"
        subtitle="Review the selected case, update status, and post a professional response to the customer."
      />
      <AlertMessage tone="success">{message}</AlertMessage>
      <AlertMessage tone="error">{error}</AlertMessage>
      {complaint ? (
        <>
          <section className="section-card list-stack">
            <DetailGrid
              items={[
                { label: 'Complaint Number', value: complaint.complaint_number },
                { label: 'Customer', value: complaint.customer?.name },
                { label: 'Subject', value: complaint.subject },
                { label: 'Category', value: titleCase(complaint.category) },
                { label: 'Status', value: titleCase(complaint.status) },
                { label: 'Created', value: formatDateTime(complaint.created_at) },
                { label: 'Message', value: complaint.message },
              ]}
            />
            <div className="inline-actions">
              <div className="field" style={{ minWidth: '240px' }}>
                <label htmlFor="status">Update Status</label>
                <select id="status" value={status} onChange={(event) => setStatus(event.target.value)}>
                  {complaintStatuses.map((complaintStatus) => (
                    <option key={complaintStatus} value={complaintStatus}>
                      {complaintStatus}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-actions" style={{ alignItems: 'end' }}>
                <button className="button-outline" type="button" onClick={handleStatusUpdate} disabled={statusSubmitting}>
                  {statusSubmitting ? 'Updating...' : 'Save Status'}
                </button>
              </div>
            </div>
          </section>
          <section className="form-card list-stack">
            <PageHeader title="Reply to Customer" subtitle="Record the latest helpdesk response for this complaint." />
            <form className="form-grid" onSubmit={handleReplySubmit}>
              <div className="field" style={{ gridColumn: '1 / -1' }}>
                <label htmlFor="reply">Reply</label>
                <textarea id="reply" name="reply" value={reply} onChange={(event) => setReply(event.target.value)} />
              </div>
              <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
                <button className="button" type="submit" disabled={submitting}>
                  {submitting ? 'Saving...' : 'Post Reply'}
                </button>
              </div>
            </form>
          </section>
          <section className="section-card list-stack">
            <PageHeader title="Reply History" subtitle="Chronological record of responses posted on this complaint." />
            <div className="list-stack">
              {(complaint.replies || []).map((item) => (
                <article key={item.id} className="detail-card">
                  <span>{item.user?.name || 'System User'}</span>
                  <strong>{formatDateTime(item.created_at)}</strong>
                  <p className="helper-text">{item.reply}</p>
                </article>
              ))}
              {!complaint.replies?.length ? <AlertMessage tone="info">No replies have been posted yet.</AlertMessage> : null}
            </div>
          </section>
        </>
      ) : null}
    </div>
  );
}