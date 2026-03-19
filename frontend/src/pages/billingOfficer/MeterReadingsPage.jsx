import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
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

const initialForm = {
  meter_id: '',
  current_reading: '',
  reading_date: new Date().toISOString().slice(0, 10),
  notes: '',
};

export default function MeterReadingsPage() {
  const [meters, setMeters] = useState([]);
  const [readings, setReadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [form, setForm] = useState(initialForm);

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
      const response = await createMeterReading({
        ...form,
        meter_id: Number(form.meter_id),
        current_reading: Number(form.current_reading),
      });
      setReadings((current) => [response.data, ...current]);
      setForm(initialForm);
      setMessage('Meter reading recorded successfully.');
      const meterResponse = await fetchMeters();
      setMeters(meterResponse);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
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
      </section>
      <section className="table-card">
        <PageHeader title="Reading History" subtitle="Latest recorded readings across assigned service meters." />
        <DataTable columns={columns} rows={readings} />
      </section>
    </div>
  );
}