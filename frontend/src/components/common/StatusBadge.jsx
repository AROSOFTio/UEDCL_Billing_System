const toneMap = {
  paid: 'success',
  active: 'success',
  resolved: 'success',
  success: 'success',
  unpaid: 'warning',
  overdue: 'warning',
  failed: 'warning',
  inactive: 'warning',
  faulty: 'warning',
  'partially paid': 'warning',
  pending: 'info',
  'in progress': 'info',
  info: 'info',
};

function formatLabel(value) {
  return String(value || 'info')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function StatusBadge({ value }) {
  const normalized = String(value || 'info').toLowerCase().replace(/_/g, ' ');
  const tone = toneMap[normalized] || 'info';

  return <span className={`badge badge-${tone}`}>{formatLabel(value)}</span>;
}