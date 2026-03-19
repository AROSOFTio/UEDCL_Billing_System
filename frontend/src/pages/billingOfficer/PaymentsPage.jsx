import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchBills } from '../../services/billingService';
import { createPayment, fetchPayments } from '../../services/paymentService';
import { paymentMethods } from '../../utils/constants';
import { formatCurrency, formatDateTime, titleCase } from '../../utils/formatters';

const columns = [
  { key: 'payment_number', label: 'Payment Number' },
  { key: 'bill', label: 'Bill Number', render: (payment) => payment.bill?.bill_number || '-' },
  { key: 'customer', label: 'Customer', render: (payment) => payment.bill?.customer?.name || '-' },
  { key: 'payment_method', label: 'Method', render: (payment) => titleCase(payment.payment_method) },
  { key: 'amount', label: 'Amount', render: (payment) => formatCurrency(payment.amount) },
  { key: 'paid_at', label: 'Paid At', render: (payment) => formatDateTime(payment.paid_at) },
  { key: 'status', label: 'Status', type: 'status' },
];

const initialForm = {
  bill_id: '',
  payment_method: 'cash',
  amount: '',
  reference_number: '',
};

function calculateOutstandingAmount(bill) {
  if (!bill) {
    return 0;
  }

  const paid = (bill.payments || [])
    .filter((payment) => payment.status === 'success')
    .reduce((total, payment) => total + Number(payment.amount || 0), 0);

  return Number(bill.total_amount || 0) - paid;
}

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [payments, setPayments] = useState([]);
  const [bills, setBills] = useState([]);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const [paymentResponse, billResponse] = await Promise.all([
          fetchPayments(),
          fetchBills(),
        ]);
        setPayments(paymentResponse);
        setBills(billResponse.filter((bill) => calculateOutstandingAmount(bill) > 0));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const response = await createPayment({
        ...form,
        bill_id: Number(form.bill_id),
        amount: Number(form.amount),
      });
      setPayments((current) => [response.data, ...current]);
      const refreshedBills = await fetchBills();
      setBills(refreshedBills.filter((bill) => calculateOutstandingAmount(bill) > 0));
      setForm(initialForm);
      setMessage('Payment recorded successfully and receipt generated.');
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  const selectedBill = bills.find((bill) => String(bill.id) === String(form.bill_id));
  const outstandingAmount = calculateOutstandingAmount(selectedBill);

  if (loading) {
    return <LoadingState message="Loading payments workspace..." />;
  }

  return (
    <div className="split-layout">
      <section className="form-card list-stack">
        <PageHeader
          title="Record Payment"
          subtitle="Post bill payments received by cash, mobile money, or bank and generate receipts automatically."
        />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="bill_id">Bill</label>
            <select id="bill_id" name="bill_id" value={form.bill_id} onChange={handleChange}>
              <option value="">Select bill</option>
              {bills.map((bill) => (
                <option key={bill.id} value={bill.id}>
                  {bill.bill_number} | {bill.customer?.name}
                </option>
              ))}
            </select>
            <span className="field-note">Outstanding balance: {formatCurrency(outstandingAmount)}</span>
          </div>
          <div className="field">
            <label htmlFor="payment_method">Payment Method</label>
            <select id="payment_method" name="payment_method" value={form.payment_method} onChange={handleChange}>
              {paymentMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="amount">Amount</label>
            <input id="amount" name="amount" type="number" value={form.amount} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="reference_number">Reference</label>
            <input id="reference_number" name="reference_number" value={form.reference_number} onChange={handleChange} />
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Posting...' : 'Record Payment'}
            </button>
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
      </section>
      <section className="table-card">
        <PageHeader title="Payment History" subtitle="Review posted payments and their linked bill records." />
        <DataTable columns={columns} rows={payments} />
      </section>
    </div>
  );
}