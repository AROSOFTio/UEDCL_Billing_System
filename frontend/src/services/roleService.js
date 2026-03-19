import { apiRequest } from './api';

export function fetchRoles() {
  return apiRequest('/roles');
}
