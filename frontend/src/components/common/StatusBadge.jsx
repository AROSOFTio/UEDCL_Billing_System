const toneMap = {
  paid: 'success',
  active: 'success',
  resolved: 'success',
  success: 'success',
  unpaid: 'warning',
  overdue: 'warning',
  failed: 'warning',
  pending: 'info',
  'in progress': 'info',
  info: 'info',
};

export default function StatusBadge({ value }) {
  const normalized = String(value || 'info').toLowerCase();
  const tone = toneMap[normalized] || 'info';

  return <span className={`badge badge-${tone}`}>{value}</span>;
}
