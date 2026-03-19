import { formatCurrency } from './formatters';

export const dashboardStats = {
  customer: [
    { label: 'Current Bill', value: formatCurrency(182500), helper: 'Due in 9 days' },
    { label: 'Outstanding Bills', value: '2', helper: 'One bill is approaching overdue' },
    { label: 'Active Meter', value: '1', helper: 'Domestic single-phase meter' },
  ],
  billing_officer: [
    { label: 'Registered Customers', value: '1,284', helper: 'Across active service areas' },
    { label: 'Bills Pending Review', value: '38', helper: 'Awaiting confirmation' },
    { label: 'Payments Posted Today', value: formatCurrency(12650000), helper: 'Cash, mobile money, bank' },
  ],
  helpdesk_officer: [
    { label: 'Open Complaints', value: '46', helper: 'Requires attention' },
    { label: 'Resolved Today', value: '13', helper: 'Service quality improving' },
    { label: 'Urgent Cases', value: '4', helper: 'Includes outage and billing disputes' },
  ],
  administrator: [
    { label: 'Total Customers', value: '12,540', helper: 'Institution-wide view' },
    { label: 'Unpaid Bills', value: formatCurrency(218900000), helper: 'Collections follow-up required' },
    { label: 'Collections This Month', value: formatCurrency(648300000), helper: 'All payment channels combined' },
  ],
};

export const sampleBills = [
  {
    id: 1,
    billNumber: 'BILL-2026-0001',
    customer: 'Grace Nansubuga',
    amount: formatCurrency(182500),
    dueDate: '2026-03-28',
    status: 'Unpaid',
  },
  {
    id: 2,
    billNumber: 'BILL-2026-0002',
    customer: 'Grace Nansubuga',
    amount: formatCurrency(154300),
    dueDate: '2026-02-28',
    status: 'Paid',
  },
];

export const sampleCustomers = [
  {
    id: 1,
    accountNumber: 'UEDCL-100245',
    name: 'Grace Nansubuga',
    phone: '+256700111222',
    status: 'Active',
  },
  {
    id: 2,
    accountNumber: 'UEDCL-100246',
    name: 'Kato Enterprises',
    phone: '+256700333444',
    status: 'Pending',
  },
];

export const sampleMeters = [
  {
    id: 1,
    meterNumber: 'MT-309225',
    customer: 'Grace Nansubuga',
    type: 'Domestic',
    status: 'Active',
  },
  {
    id: 2,
    meterNumber: 'MT-309226',
    customer: 'Kato Enterprises',
    type: 'Commercial',
    status: 'Active',
  },
];

export const samplePayments = [
  {
    id: 1,
    paymentNumber: 'PAY-2026-0001',
    bill: 'BILL-2026-0001',
    method: 'Mobile Money',
    amount: formatCurrency(182500),
    status: 'Success',
  },
];

export const sampleComplaints = [
  {
    id: 1,
    complaintNumber: 'CMP-2026-0001',
    subject: 'Estimated reading dispute',
    category: 'Billing',
    status: 'Pending',
  },
  {
    id: 2,
    complaintNumber: 'CMP-2026-0002',
    subject: 'Meter inspection request',
    category: 'Meter',
    status: 'Resolved',
  },
];
