import { apiRequest } from './api';

export function fetchBills() {
  return apiRequest('/bills');
}

export function generateBills(payload) {
  return apiRequest('/bills/generate', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
