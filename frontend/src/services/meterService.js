import { apiRequest } from './api';

export function fetchMeters(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/meters${suffix}`);
}

export function fetchMeter(meterId) {
  return apiRequest(`/meters/${meterId}`);
}

export function createMeter(payload) {
  return apiRequest('/meters', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
