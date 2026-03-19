import { apiRequest } from './api';

export function fetchComplaints() {
  return apiRequest('/complaints');
}

export function createComplaint(payload) {
  return apiRequest('/complaints', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
