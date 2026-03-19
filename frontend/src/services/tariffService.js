import { apiRequest } from './api';

export function fetchTariffs(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/tariffs${suffix}`);
}

export function createTariff(payload) {
  return apiRequest('/tariffs', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateTariff(tariffId, payload) {
  return apiRequest(`/tariffs/${tariffId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });
}
