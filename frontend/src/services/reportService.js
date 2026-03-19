import { apiRequest } from './api';

export function fetchReportSummary() {
  return apiRequest('/reports/summary');
}
