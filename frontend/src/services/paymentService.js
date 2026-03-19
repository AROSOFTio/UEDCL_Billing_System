import { apiRequest } from './api';

export function fetchPayments(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/payments${suffix}`);
}

export function createPayment(payload) {
  return apiRequest('/payments', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
