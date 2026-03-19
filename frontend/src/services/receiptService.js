import { apiRequest } from './api';

export function fetchReceipt(receiptId) {
  return apiRequest(`/receipts/${receiptId}`);
}
