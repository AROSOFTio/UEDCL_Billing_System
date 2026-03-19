import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const notifications = [
  {
    id: 1,
    type: 'Bill Generated',
    channel: 'SMS',
    message: 'Dear Grace Nansubuga, your electricity bill of UGX 182,500 has been generated.',
    status: 'Success',
  },
  {
    id: 2,
    type: 'Payment Received',
    channel: 'SMS',
    message: 'Dear Grace Nansubuga, payment of UGX 182,500 has been received successfully.',
    status: 'Success',
  },
];

const columns = [
  { key: 'type', label: 'Type' },
  { key: 'channel', label: 'Channel' },
  { key: 'message', label: 'Message' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function NotificationsPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Notifications"
        subtitle="Notification history scaffold for bill, payment, and overdue reminder messages."
      />
      <DataTable columns={columns} rows={notifications} />
    </section>
  );
}
