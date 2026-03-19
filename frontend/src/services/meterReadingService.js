import { apiRequest } from './api';

export function fetchMeterReadings(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/meter-readings${suffix}`);
}

export function createMeterReading(payload) {
  return apiRequest('/meter-readings', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
