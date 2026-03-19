import { apiRequest } from './api';

export function fetchNotifications(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/notifications${suffix}`);
}
