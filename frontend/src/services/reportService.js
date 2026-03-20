import { apiRequest } from './api';

export function fetchReportSummary() {
  return apiRequest('/reports/summary');
}

export function fetchReportOverview() {
  return apiRequest('/reports/overview');
}