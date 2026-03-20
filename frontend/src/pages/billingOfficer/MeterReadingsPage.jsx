import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import DetailGrid from '../../components/common/DetailGrid';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { createMeterReading, fetchMeterReadings } from '../../services/meterReadingService';
import { fetchMeters } from '../../services/meterService';
import { formatDate, formatNumber } from '../../utils/formatters';

const columns = [
  { key: 'meter_number', label: 'Meter Number', render: (reading) => reading.meter?.meter_number || '-' },
  { key: 'customer', label: 'Customer', render: (reading) => reading.meter?.customer?.name || '-' },
  { key: 'previous_reading', label: 'Previous', render: (reading) => formatNumber(reading.previous_reading) },
  { key: 'current_reading', label: 'Current', render: (reading) => formatNumber(reading.current_reading) },
  { key: 'units_consumed', label: 'Units', render: (reading) => formatNumber(reading.units_consumed) },
  { key: 'reading_date', label: 'Reading Date', render: (reading) => formatDate(reading.reading_date) },
];

function buildInitialForm(meterId = '') {
  return {
    meter_id: meterId,
    current_reading: '',
    reading_date: new Date().toISOString().slice(0, 10),
    notes: '',
  };
}

export default function MeterReadingsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const preselectedMeterId = searchParams.get('meterId') || '';
  const [meters, setMeters] = useState([]);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [createdReading, setCreatedReading] = useState(null);
  const [form, setForm] = useState(() => buildInitialForm(preselectedMeterId));

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      setError('');

      try {
        const [meterResponse, readingResponse] = await Promise.all([
          fetchMeters(),
          fetchMeterReadings(),
        ]);

        setMeters(meterResponse);
        setReadings(readingResponse);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    if (!preselectedMeterId) {
      return;
    }

    setForm((current) => (current.meter_id ? current : { ...current, meter_id: preselectedMeterId }));
  }, [preselectedMeterId]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');
    setCreatedReading(null);

    try {
      const response = await createMeterReading({
        ...form,
        meter_id: Number(form.meter_id),
        current_reading: Number(form.current_reading),
      });
      setCreatedReading(response.data);
      setReadings((current) => [response.data, ...current]);
      setForm(buildInitialForm(String(response.data.meter_id || form.meter_id)));
      setMessage(`Meter reading recorded successfully. ${formatNumber(response.data.units_consumed)} units are now ready for billing.`);
      const meterResponse = await fetchMeters();
      setMeters(meterResponse);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  function handleContinueToBilling() {
    const params = new URLSearchParams();

    if (createdReading?.meter?.customer?.id) {
      params.set('customerId', createdReading.meter.customer.id);
    }

    if (createdReading?.meter_id) {
      params.set('meterId', createdReading.meter_id);
    }

    const suffix = params.toString() ? `?${params.toString()}` : '';
    navigate(`/billing/generate-bills${suffix}`);
  }

  const selectedMeter = meters.find((meter) => String(meter.id) === String(form.meter_id));

  if (loading) {
    return <LoadingState message="Loading meter reading workspace..." />;
  }

  return (
    <div className="split-layout">
      <section className="form-card list-stack">
        <PageHeader
          title="Capture Meter Reading"
          subtitle="Enter the latest meter reading. The system will validate against the previous reading automatically."
        />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="meter_id">Meter</label>
            <select id="meter_id" name="meter_id" value={form.meter_id} onChange={handleChange}>
              <option value="">Select meter</option>
              {meters.map((meter) => (
                <option key={meter.id} value={meter.id}>
                  {meter.meter_number} | {meter.customer?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="current_reading">Current Reading</label>
            <input id="current_reading" name="current_reading" type="number" value={form.current_reading} onChange={handleChange} />
            <span className="field-note">
              Previous reading: {formatNumber(selectedMeter?.latestReading?.current_reading)}
            </span>
          </div>
          <div className="field">
            <label htmlFor="reading_date">Reading Date</label>
            <input id="reading_date" name="reading_date" type="date" value={form.reading_date} onChange={handleChange} />
          </div>
          <div className="field" style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="notes">Notes</label>
            <textarea id="notes" name="notes" value={form.notes} onChange={handleChange} />
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : 'Save Reading'}
            </button>
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
        {createdReading ? (
          <section className="section-card list-stack">
            <PageHeader
              title="Recorded Reading"
              subtitle="The next step is to generate a bill using the latest captured reading and the active tariff."
            />
            <DetailGrid
              items={[
                { label: 'Meter Number', value: createdReading.meter?.meter_number },
                { label: 'Customer', value: createdReading.meter?.customer?.name },
                { label: 'Previous Reading', value: formatNumber(createdReading.previous_reading) },
                { label: 'Current Reading', value: formatNumber(createdReading.current_reading) },
                { label: 'Units Consumed', value: formatNumber(createdReading.units_consumed) },
              ]}
            />
            <div className="form-actions">
              <button className="button" type="button" onClick={handleContinueToBilling}>
                Generate Bill for This Meter
              </button>
            </div>
          </section>
        ) : null}
      </section>
      <section className="table-card">
        <PageHeader title="Reading History" subtitle="Latest recorded readings across assigned service meters." />
        <DataTable columns={columns} rows={readings} />
      </section>
    </div>
  );
}
