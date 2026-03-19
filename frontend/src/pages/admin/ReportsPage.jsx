import { useEffect, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import { fetchReportSummary } from '../../services/reportService';
import { formatNumber } from '../../utils/formatters';

const columns = [
  { key: 'report', label: 'Report Metric' },
  { key: 'value', label: 'Value' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchReportSummary();
        const summary = response.data;
        setRows([
          { id: 1, report: 'Total Customers', value: formatNumber(summary.total_customers), status: 'success' },
          { id: 2, report: 'Total Meters', value: formatNumber(summary.total_meters), status: 'success' },
          { id: 3, report: 'Total Bills Generated', value: formatNumber(summary.total_bills_generated), status: 'success' },
          { id: 4, report: 'Total Unpaid Bills', value: formatNumber(summary.total_unpaid_bills), status: 'pending' },
          { id: 5, report: 'Total Payments', value: formatNumber(summary.total_payments), status: 'success' },
          { id: 6, report: 'Unresolved Complaints', value: formatNumber(summary.unresolved_complaints), status: 'pending' },
        ]);
      } catch (loadError) {
        setError(loadError.message);
      } finally {
        setLoading(false);
      }
    }

    loadReport();
  }, []);

  if (loading) {
    return <LoadingState message="Loading reports..." />;
  }

  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Reports"
          subtitle="Administrative summary metrics for operational monitoring and decision support."
        />
        <AlertMessage tone="info">This report view is driven by the backend summary API and refreshes live system totals.</AlertMessage>
      </section>
      <section className="table-card">
        <PageHeader title="Report Output" subtitle="Current summary figures returned by the reporting service." />
        <AlertMessage tone="error">{error}</AlertMessage>
        <DataTable columns={columns} rows={rows} />
      </section>
    </>
  );
}