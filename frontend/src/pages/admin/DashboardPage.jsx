import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { fetchReportSummary } from '../../services/reportService';
import { fetchTariffs } from '../../services/tariffService';
import { formatCurrency, formatNumber } from '../../utils/formatters';

const columns = [
  { key: 'name', label: 'Tariff Name' },
  { key: 'unit_price', label: 'Unit Price', render: (tariff) => formatCurrency(tariff.unit_price) },
  { key: 'fixed_charge', label: 'Fixed Charge', render: (tariff) => formatCurrency(tariff.fixed_charge) },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [summary, setSummary] = useState(null);
  const [tariffs, setTariffs] = useState([]);

  useEffect(() => {
    async function loadDashboard() {
      setLoading(true);
      setError('');

      try {
        const [reportResponse, tariffResponse] = await Promise.all([
          fetchReportSummary(),
          fetchTariffs(),
        ]);
        setSummary(reportResponse.data);
        setTariffs(tariffResponse);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <LoadingState message="Loading admin dashboard..." />;
  }

  return (
    <>
      <PageHeader
        title="Administrator Dashboard"
        subtitle="Track high-level operational performance, compliance indicators, and current tariff settings."
      />
      <AlertMessage tone="error">{error}</AlertMessage>
      {summary ? (
        <div className="card-grid">
          <StatCard label="Customers" value={formatNumber(summary.total_customers)} helper="Total registered customers" />
          <StatCard label="Meters" value={formatNumber(summary.total_meters)} helper="Meter inventory across service areas" />
          <StatCard label="Bills Generated" value={formatNumber(summary.total_bills_generated)} helper="All billing cycles to date" />
          <StatCard label="Unpaid Bills" value={formatNumber(summary.total_unpaid_bills)} helper="Requires collection follow-up" />
          <StatCard label="Payments" value={formatNumber(summary.total_payments)} helper="Recorded payment entries" />
          <StatCard label="Unresolved Complaints" value={formatNumber(summary.unresolved_complaints)} helper="Pending or in-progress service cases" />
        </div>
      ) : null}
      <section className="table-card">
        <PageHeader title="Current Tariffs" subtitle="Tariff settings available to the billing engine." />
        <DataTable columns={columns} rows={tariffs} />
      </section>
    </>
  );
}