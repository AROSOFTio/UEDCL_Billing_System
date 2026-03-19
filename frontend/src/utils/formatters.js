export function formatCurrency(value) {
  return new Intl.NumberFormat('en-UG', {
    style: 'currency',
    currency: 'UGX',
    maximumFractionDigits: 0,
  }).format(value || 0);
}

export function formatDate(value) {
  return new Intl.DateTimeFormat('en-UG', {
    dateStyle: 'medium',
  }).format(new Date(value));
}
