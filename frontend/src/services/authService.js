import { apiRequest } from './api';

export function loginRequest(payload) {
  return apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function registerRequest(payload) {
  return apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function fetchAuthenticatedUser() {
  return apiRequest('/auth/me');
}

export function logoutRequest() {
  return apiRequest('/auth/logout', {
    method: 'POST',
  });
}
