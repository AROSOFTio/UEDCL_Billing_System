import { apiRequest } from './api';

export function fetchCustomers(query = {}) {
  const params = new URLSearchParams(query);
  const suffix = params.toString() ? `?${params.toString()}` : '';
  return apiRequest(`/customers${suffix}`);
}

export function fetchCustomer(customerId) {
  return apiRequest(`/customers/${customerId}`);
}

export function createCustomer(payload) {
  return apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
