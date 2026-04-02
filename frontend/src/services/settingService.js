import api from './api';

export async function fetchSettings() {
  const response = await api.get('/settings');
  return response.data;
}

export async function saveSettings(settings) {
  const response = await api.post('/settings', { settings });
  return response.data;
}
