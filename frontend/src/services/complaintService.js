import { apiRequest } from './api';

export function fetchComplaints(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/complaints${suffix}`);
}

export function fetchComplaint(complaintId) {
  return apiRequest(`/complaints/${complaintId}`);
}

export function createComplaint(payload) {
  return apiRequest('/complaints', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function replyToComplaint(complaintId, payload) {
  return apiRequest(`/complaints/${complaintId}/reply`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function updateComplaintStatus(complaintId, payload) {
  return apiRequest(`/complaints/${complaintId}/status`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
