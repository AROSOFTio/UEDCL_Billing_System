export const APP_TITLE = 'Online Electricity Billing and Payment System for UEDCL';

export const roleLabels = {
  customer: 'Customer',
  billing_officer: 'Billing Officer',
  helpdesk_officer: 'Helpdesk Officer',
  administrator: 'Administrator',
};

export const homePathByRole = {
  customer: '/customer/dashboard',
  billing_officer: '/billing/dashboard',
  helpdesk_officer: '/helpdesk/dashboard',
  administrator: '/admin/dashboard',
};

export const demoCredentials = [
  {
    name: 'Admin User',
    email: 'admin@uedcl.local',
    password: 'password123',
    role: 'administrator',
  },
  {
    name: 'Billing Officer',
    email: 'billing@uedcl.local',
    password: 'password123',
    role: 'billing_officer',
  },
  {
    name: 'Helpdesk Officer',
    email: 'helpdesk@uedcl.local',
    password: 'password123',
    role: 'helpdesk_officer',
  },
  {
    name: 'Grace Nansubuga',
    email: 'customer@uedcl.local',
    password: 'password123',
    role: 'customer',
  },
];

export const navigationByRole = {
  customer: [
    { label: 'Dashboard', path: '/customer/dashboard' },
    { label: 'Profile', path: '/customer/profile' },
    { label: 'Meter Details', path: '/customer/meter-details' },
    { label: 'My Bills', path: '/customer/bills' },
    { label: 'Payments', path: '/customer/payments' },
    { label: 'Receipts', path: '/customer/receipts' },
    { label: 'Notifications', path: '/customer/notifications' },
    { label: 'Complaints', path: '/customer/complaints' },
  ],
  billing_officer: [
    { label: 'Dashboard', path: '/billing/dashboard' },
    { label: 'Customers', path: '/billing/customers' },
    { label: 'Add Customer', path: '/billing/customers/new' },
    { label: 'Meters', path: '/billing/meters' },
    { label: 'Add Meter', path: '/billing/meters/new' },
    { label: 'Meter Readings', path: '/billing/meter-readings' },
    { label: 'Generate Bills', path: '/billing/generate-bills' },
    { label: 'Bills', path: '/billing/bills' },
    { label: 'Payments', path: '/billing/payments' },
  ],
  helpdesk_officer: [
    { label: 'Dashboard', path: '/helpdesk/dashboard' },
    { label: 'Complaints List', path: '/helpdesk/complaints' },
    { label: 'Resolved Complaints', path: '/helpdesk/resolved' },
  ],
  administrator: [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Users', path: '/admin/users' },
    { label: 'Add User', path: '/admin/users/new' },
    { label: 'Tariffs', path: '/admin/tariffs' },
    { label: 'SMS Settings', path: '/admin/sms-settings' },
    { label: 'Reports', path: '/admin/reports' },
    { label: 'Settings', path: '/admin/settings' },
  ],
};

export const complaintCategories = [
  { label: 'Billing', value: 'billing' },
  { label: 'Meter', value: 'meter' },
  { label: 'Outage', value: 'outage' },
  { label: 'Payment', value: 'payment' },
  { label: 'Service', value: 'service' },
  { label: 'Other', value: 'other' },
];

export const paymentMethods = [
  { label: 'Cash', value: 'cash' },
  { label: 'Mobile Money', value: 'mobile_money' },
  { label: 'Bank', value: 'bank' },
];

export const billStatuses = ['unpaid', 'paid', 'overdue', 'partially_paid'];
export const customerStatuses = ['active', 'inactive', 'pending'];
export const meterStatuses = ['active', 'inactive', 'faulty'];
export const complaintStatuses = ['pending', 'in_progress', 'resolved'];
export const userStatuses = ['active', 'inactive'];
export const tariffStatuses = ['active', 'inactive'];
