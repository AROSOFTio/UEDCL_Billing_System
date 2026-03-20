export function formatCurrency(value) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

export function formatDate(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
  }).format(new Date(value));
}

export function formatDateTime(value) {
  if (!value) {
    return '-';
  }

  return new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function formatNumber(value) {
  return new Intl.NumberFormat('en-UG').format(Number(value || 0));
}

export function formatPercent(value, maximumFractionDigits = 1) {
  return `${new Intl.NumberFormat('en-UG', {
    minimumFractionDigits: 0,
    maximumFractionDigits,
  }).format(Number(value || 0))}%`;
}

export function titleCase(value) {
  return String(value || '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());
}