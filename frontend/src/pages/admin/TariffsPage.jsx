import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { createTariff, fetchTariffs, updateTariff } from '../../services/tariffService';
import { tariffStatuses } from '../../utils/constants';
import { formatCurrency, formatDate } from '../../utils/formatters';

const columns = [
  { key: 'name', label: 'Tariff Name' },
  { key: 'unit_price', label: 'Unit Price', render: (tariff) => formatCurrency(tariff.unit_price) },
  { key: 'fixed_charge', label: 'Fixed Charge', render: (tariff) => formatCurrency(tariff.fixed_charge) },
  { key: 'effective_from', label: 'Effective From', render: (tariff) => formatDate(tariff.effective_from) },
  { key: 'status', label: 'Status', type: 'status' },
  {
    key: 'actions',
    label: 'Action',
    render: (tariff) => (
      <button className="button-ghost" type="button" onClick={() => tariff.onEdit(tariff)}>
        Edit
      </button>
    ),
  },
];

const initialForm = {
  name: '',
  unit_price: '',
  fixed_charge: '',
  effective_from: new Date().toISOString().slice(0, 10),
  status: 'active',
};

export default function TariffsPage() {
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [tariffs, setTariffs] = useState([]);
  const [editingTariff, setEditingTariff] = useState(null);
  const [form, setForm] = useState(initialForm);

  useEffect(() => {
    async function loadTariffs() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchTariffs();
        setTariffs(response);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadTariffs();
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleEdit(tariff) {
    setEditingTariff(tariff);
    setForm({
      name: tariff.name,
      unit_price: tariff.unit_price,
      fixed_charge: tariff.fixed_charge,
      effective_from: tariff.effective_from,
      status: tariff.status,
    });
    setMessage('');
    setError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const payload = {
        ...form,
        unit_price: Number(form.unit_price),
        fixed_charge: Number(form.fixed_charge),
      };

      if (editingTariff) {
        const response = await updateTariff(editingTariff.id, payload);
        setTariffs((current) => current.map((item) => (item.id === editingTariff.id ? response.data : item)));
        setMessage('Tariff updated successfully.');
      } else {
        const response = await createTariff(payload);
        setTariffs((current) => [response.data, ...current]);
        setMessage('Tariff created successfully.');
      }

      setEditingTariff(null);
      setForm(initialForm);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <LoadingState message="Loading tariffs..." />;
  }

  return (
    <div className="split-layout">
      <section className="form-card list-stack">
        <PageHeader
          title="Tariffs"
          subtitle="Manage tariff rates, fixed charges, effective dates, and activation status."
        />
        <form className="form-grid" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="name">Tariff Name</label>
            <input id="name" name="name" value={form.name} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="unit_price">Unit Price</label>
            <input id="unit_price" name="unit_price" type="number" value={form.unit_price} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="fixed_charge">Fixed Charge</label>
            <input id="fixed_charge" name="fixed_charge" type="number" value={form.fixed_charge} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="effective_from">Effective From</label>
            <input id="effective_from" name="effective_from" type="date" value={form.effective_from} onChange={handleChange} />
          </div>
          <div className="field">
            <label htmlFor="status">Status</label>
            <select id="status" name="status" value={form.status} onChange={handleChange}>
              {tariffStatuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
          <div className="form-actions" style={{ gridColumn: '1 / -1' }}>
            <button className="button" type="submit" disabled={submitting}>
              {submitting ? 'Saving...' : editingTariff ? 'Update Tariff' : 'Create Tariff'}
            </button>
            {editingTariff ? (
              <button
                className="button-outline"
                type="button"
                onClick={() => {
                  setEditingTariff(null);
                  setForm(initialForm);
                }}
              >
                Cancel Edit
              </button>
            ) : null}
          </div>
        </form>
        <AlertMessage tone="success">{message}</AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
      </section>
      <section className="table-card">
        <PageHeader title="Tariff Records" subtitle="Active and historical tariff settings available in the system." />
        <DataTable columns={columns} rows={tariffs.map((tariff) => ({ ...tariff, onEdit: handleEdit }))} />
      </section>
    </div>
  );
}