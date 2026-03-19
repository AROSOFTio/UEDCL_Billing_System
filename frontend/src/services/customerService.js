import { apiRequest } from './api';

export function fetchCustomers() {
  return apiRequest('/customers');
}

export function createCustomer(payload) {
  return apiRequest('/customers', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
