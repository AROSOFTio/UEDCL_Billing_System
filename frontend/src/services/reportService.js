import { apiRequest } from './api';

export function fetchReportSummary() {
  return apiRequest('/reports/summary');
}

export function fetchReportOverview() {
  return apiRequest('/reports/overview');
}

export function fetchCustomReport(payload) {
  return apiRequest('/reports/custom', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}