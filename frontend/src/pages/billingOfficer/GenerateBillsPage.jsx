import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchBills, generateBills } from '../../services/billingService';
import { fetchCustomers } from '../../services/customerService';
import { fetchMeters } from '../../services/meterService';
import { fetchTariffs } from '../../services/tariffService';
import { billStatuses } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';

const columns = [
  { key: 'bill_number', label: 'Bill Number' },
  { key: 'customer', label: 'Customer', render: (bill) => bill.customer?.name || '-' },
  { key: 'meter', label: 'Meter', render: (bill) => bill.meter?.meter_number || '-' },
  { key: 'total_amount', label: 'Amount', render: (bill) => formatCurrency(bill.total_amount) },
  { key: 'due_date', label: 'Due Date', render: (bill) => formatDate(bill.due_date) },
  { key: 'status', label: 'Status', type: 'status' },
];

function buildInitialForm(customerId = '', meterId = '') {
  return {
    billing_cycle: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
    tariff_id: '',
    due_date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10),
    customer_id: customerId,
    meter_id: meterId,
    status: 'unpaid',
  };
}

export default function GenerateBillsPage() {
  const [searchParams] = useSearchParams();
  const preselectedCustomerId = searchParams.get('customerId') || '';
  const preselectedMeterId = searchParams.get('meterId') || '';
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(() => buildInitialForm(preselectedCustomerId, preselectedMeterId));
  const [tariffs, setTariffs] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [meters, setMeters] = useState([]);
  const [generatedBills, setGeneratedBills] = useState([]);
  const [skipped, setSkipped] = useState([]);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const [tariffResponse, customerResponse, meterResponse] = await Promise.all([
          fetchTariffs(),
          fetchCustomers(),
          fetchMeters(),
        ]);

        setTariffs(tariffResponse);
        setCustomers(customerResponse);
        setMeters(meterResponse);
        setForm((current) => ({
          ...current,
          tariff_id: current.tariff_id || tariffResponse.find((tariff) => tariff.status === 'active')?.id || '',
          customer_id: current.customer_id || preselectedCustomerId,
          meter_id: current.meter_id || preselectedMeterId,
        }));
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [preselectedCustomerId, preselectedMeterId]);

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
      const payload = {
        ...form,
        tariff_id: Number(form.tariff_id),
        customer_id: form.customer_id ? Number(form.customer_id) : undefined,
        meter_id: form.meter_id ? Number(form.meter_id) : undefined,
      };
      const response = await generateBills(payload);
      const generated = response.data || [];
      const latestBill = generated[0];
      setGeneratedBills(generated);
      setSkipped(response.skipped || []);
      setMessage(
        latestBill
          ? `Bill generation completed. ${response.generated_count} bill(s) created, including ${latestBill.bill_number} for ${latestBill.customer?.name || 'the selected customer'}.`
          : `Bill generation completed. ${response.generated_count} bill(s) created.`,
      );
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading bill generation workspace..." />;
  }

  return (
    <div className="split-layout">
      <section className="form-card list-stack">
        <PageHeader
          title="Generate Bills"
          subtitle="Generate bills from captured meter readings using the selected tariff and due date."
        />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="billing_cycle">Billing Cycle</label>
            <input id="billing_cycle" name="billing_cycle" value={form.billing_cycle} onChange={handleChange} placeholder="YYYY-MM" />
          </div>
          <div className="field">
            <label htmlFor="tariff_id">Tariff</label>
            <select id="tariff_id" name="tariff_id" value={form.tariff_id} onChange={handleChange}>
              <option value="">Select tariff</option>
              {tariffs.map((tariff) => (
                <option key={tariff.id} value={tariff.id}>
                  {tariff.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="due_date">Due Date</label>
            <input id="due_date" name="due_date" type="date" value={form.due_date} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="customer_id">Customer</label>
            <select id="customer_id" name="customer_id" value={form.customer_id} onChange={handleChange}>
              <option value="">All matched customers</option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.account_number} | {customer.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="meter_id">Meter</label>
            <select id="meter_id" name="meter_id" value={form.meter_id} onChange={handleChange}>
              <option value="">All matched meters</option>
              {meters.map((meter) => (
                <option key={meter.id} value={meter.id}>
                  {meter.meter_number} | {meter.customer?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="status">Bill Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              {billStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Generating...' : 'Generate Bills'}
            </button>
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
        {skipped.length ? (
          <AlertMessage tone="warning">Skipped meters: {skipped.map((item) => item.meter_number).join(', ')}</AlertMessage>
        ) : null}
      </section>
      <section className="table-card">
        <PageHeader title="Generated Bills" subtitle="Latest bills created in the current generation run." />
        <DataTable columns={columns} rows={generatedBills} emptyTitle="No bills generated yet" emptyMessage="Run bill generation to see the created bill records here." />
      </section>
    </div>
  );
}
