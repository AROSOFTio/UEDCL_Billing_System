import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DetailGrid from '../../components/common/DetailGrid';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchCustomers } from '../../services/customerService';
import { createMeter } from '../../services/meterService';
import { meterStatuses } from '../../utils/constants';

function buildInitialForm(customerId = '') {
  return {
    customer_id: customerId,
    meter_number: `MT-${String(Date.now()).slice(-6)}`,
    meter_type: 'Domestic',
    installation_date: new Date().toISOString().slice(0, 10),
    status: 'active',
    location: '',
  };
}

export default function AddMeterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedCustomerId = searchParams.get('customerId') || '';
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [createdMeter, setCreatedMeter] = useState(null);
  const [form, setForm] = useState(() => buildInitialForm(preselectedCustomerId));

  useEffect(() => {
    async function loadCustomers() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchCustomers();
        setCustomers(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadCustomers();
  }, []);

  useEffect(() => {
    if (!preselectedCustomerId) {
      return;
    }

    setForm((current) => (current.customer_id ? current : { ...current, customer_id: preselectedCustomerId }));
  }, [preselectedCustomerId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');
    setCreatedMeter(null);

    try {
      const response = await createMeter({
        ...form,
        customer_id: Number(form.customer_id),
      });
      const meter = response.data;
      setCreatedMeter(meter);
      setMessage('Meter added successfully. You can continue by capturing the first meter reading.');
      setForm(buildInitialForm(String(meter.customer_id || preselectedCustomerId)));
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  const selectedCustomer = customers.find((customer) => String(customer.id) === String(form.customer_id));

  if (loading) {
    return <LoadingState message="Loading customer registry..." />;
  }

  return (
    <section className="form-card list-stack">
      <PageHeader
        title="Add Meter"
        subtitle="Assign a meter to a registered customer with installation details and service status."
      />
      <form className="form-grid" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="meter_number">Meter Number</label>
          <input id="meter_number" name="meter_number" value={form.meter_number} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="meter_type">Meter Type</label>
          <select id="meter_type" name="meter_type" value={form.meter_type} onChange={handleChange}>
            <option value="Domestic">Domestic</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
        <div className="field">
          <label htmlFor="customer_id">Assigned Customer</label>
          <select id="customer_id" name="customer_id" value={form.customer_id} onChange={handleChange}>
            <option value="">Select customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.account_number} | {customer.name}
              </option>
            ))}
          </select>
          <span className="field-note">
            {selectedCustomer ? `Portal login: ${selectedCustomer.user?.email || selectedCustomer.email}` : 'Choose the customer receiving this meter.'}
          </span>
        </div>
        <div className="field">
          <label htmlFor="installation_date">Installation Date</label>
          <input id="installation_date" name="installation_date" type="date" value={form.installation_date} onChange={handleChange} />
        </div>
        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={form.status} onChange={handleChange}>
            {meterStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" value={form.location} onChange={handleChange} />
        </div>
        <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
          <button className="button" type="submit" disabled={submitting}>
            {submitting ? 'Saving...' : 'Create Meter'}
          </button>
          <button className="button-outline" type="button" onClick={() => navigate('/billing/meters')}>
            View Meter Registry
          </button>
        </div>
      </form>
      <AlertMessage tone="success">{message}</AlertMessage>
      <AlertMessage tone="error">{error}</AlertMessage>
      {createdMeter ? (
        <section className="section-card list-stack">
          <PageHeader
            title="Created Meter"
            subtitle="Proceed to the next step by capturing the first meter reading for this installation."
          />
          <DetailGrid
            items={[
              { label: 'Meter Number', value: createdMeter.meter_number },
              { label: 'Customer', value: createdMeter.customer?.name || selectedCustomer?.name },
              { label: 'Meter Type', value: createdMeter.meter_type },
              { label: 'Location', value: createdMeter.location },
            ]}
          />
          <div className="form-actions">
            <button
              className="button"
              type="button"
              onClick={() => navigate(`/billing/meter-readings?meterId=${createdMeter.id}`)}
            >
              Capture First Reading
            </button>
          </div>
        </section>
      ) : null}
    </section>
  );
}
