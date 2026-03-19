import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchNotifications } from '../../services/notificationService';
import { formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'type', label: 'Type', render: (notification) => titleCase(notification.type) },
  { key: 'channel', label: 'Channel', render: (notification) => titleCase(notification.channel) },
  { key: 'message', label: 'Message' },
  { key: 'status', label: 'Status', type: 'status' },
  { key: 'sent_at', label: 'Sent At', render: (notification) => formatDateTime(notification.sent_at) },
];

export default function NotificationsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function loadNotifications() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchNotifications();
        setNotifications(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadNotifications();
  }, []);

  if (loading) {
    return <LoadingState message="Loading notifications..." />;
  }

  return (
    <section className="table-card">
      <PageHeader
        title="Notifications"
        subtitle="SMS and system notifications generated for bill creation, payments, and reminders."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      <DataTable
        columns={columns}
        rows={notifications}
        emptyTitle="No notifications available"
        emptyMessage="Notification history will appear here when billing and payment alerts are created."
      />
    </section>
  );
}