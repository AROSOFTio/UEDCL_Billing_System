import { useEffect, useMemo, useState } from 'react';
import AlertMessage from '../../components/common/AlertMessage';
import DataTable from '../../components/common/DataTable';
import LoadingState from '../../components/common/LoadingState';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import { fetchReportOverview } from '../../services/reportService';
import { exportExecutiveReportExcel, exportExecutiveReportPdf } from '../../utils/exporters';
import { formatCurrency, formatDate, formatNumber, formatPercent, titleCase } from '../../utils/formatters';

const billingColumns = [
  { key: 'status', label: 'Bill Status', render: (row) => titleCase(row.status) },
  { key: 'bill_count', label: 'Bills', render: (row) => formatNumber(row.bill_count) },
  { key: 'billed_amount', label: 'Billed Value', render: (row) => formatCurrency(row.billed_amount) },
  { key: 'outstanding_amount', label: 'Outstanding', render: (row) => formatCurrency(row.outstanding_amount) },
];

const paymentColumns = [
  { key: 'payment_method', label: 'Payment Method', render: (row) => titleCase(row.payment_method) },
  { key: 'payment_count', label: 'Transactions', render: (row) => formatNumber(row.payment_count) },
  { key: 'collected_amount', label: 'Collected Value', render: (row) => formatCurrency(row.collected_amount) },
];

const complaintColumns = [
  { key: 'status', label: 'Complaint Status', render: (row) => titleCase(row.status) },
  { key: 'complaint_count', label: 'Cases', render: (row) => formatNumber(row.complaint_count) },
];

const monthlyColumns = [
  { key: 'period', label: 'Period' },
  { key: 'bills_generated', label: 'Bills', render: (row) => formatNumber(row.bills_generated) },
  { key: 'billed_amount', label: 'Billed Value', render: (row) => formatCurrency(row.billed_amount) },
  { key: 'payments_recorded', label: 'Payments', render: (row) => formatNumber(row.payments_recorded) },
  { key: 'collected_amount', label: 'Collected Value', render: (row) => formatCurrency(row.collected_amount) },
  { key: 'complaints_logged', label: 'Complaints', render: (row) => formatNumber(row.complaints_logged) },
];

export default function ReportsPage() {
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [report, setReport] = useState(null);
  const generatedAt = useMemo(() => new Date().toISOString(), []);

  useEffect(() => {
    async function loadReport() {
      setLoading(true);
      setError('');

      try {
        const response = await fetchReportOverview();
        setReport(response.data);
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

  const summary = report?.summary || {};
  const revenue = report?.revenue_overview || {};
  const operations = report?.operational_overview || {};
  const activeTariff = operations.active_tariff;

  async function handleExport(exporter) {
    if (!report) {
      return;
    }

    setExporting(true);
    setError('');

    try {
      await exporter({ ...report, generated_at: generatedAt });
    } catch (exportError) {
      setError(exportError.message || 'Unable to prepare export.');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="list-stack">
      <section className="form-card">
        <PageHeader
          title="Executive Reports"
          subtitle="Management reporting pack for administrators, directors, and senior utility decision makers."
          actions={(
            <div className="toolbar">
              <button className="button-ghost" type="button" onClick={() => handleExport(exportExecutiveReportPdf)} disabled={exporting}>
                {exporting ? 'Preparing...' : 'Download PDF'}
              </button>
              <button className="button" type="button" onClick={() => handleExport(exportExecutiveReportExcel)} disabled={exporting}>
                Export Excel
              </button>
            </div>
          )}
        />
        <AlertMessage tone="info">
          Report pack generated from live billing, payment, tariff, and complaint records. Reporting date: {formatDate(generatedAt)}
        </AlertMessage>
        <AlertMessage tone="error">{error}</AlertMessage>
      </section>

      <section className="card-grid compact-dashboard-grid">
        <StatCard label="Total Billed Value" value={formatCurrency(revenue.total_billed_amount)} helper="Gross billed portfolio" />
        <StatCard label="Collected Revenue" value={formatCurrency(revenue.total_collected_amount)} helper="Successful posted payments" />
        <StatCard label="Outstanding Balance" value={formatCurrency(revenue.outstanding_balance)} helper="Open receivables across unpaid bills" />
        <StatCard label="Collection Rate" value={formatPercent(revenue.collection_rate)} helper="Collected value versus billed value" />
      </section>

      <section className="section-card">
        <PageHeader title="Management Brief" subtitle="Core operational indicators for administrative review." />
        <div className="report-summary-grid">
          <div className="report-summary-item">
            <span className="utility-kicker">Customers</span>
            <strong>{formatNumber(summary.total_customers)}</strong>
            <p>{formatNumber(summary.active_customers)} active accounts</p>
          </div>
          <div className="report-summary-item">
            <span className="utility-kicker">Meters</span>
            <strong>{formatNumber(summary.total_meters)}</strong>
            <p>{formatNumber(summary.active_meters)} active service points</p>
          </div>
          <div className="report-summary-item">
            <span className="utility-kicker">Bills</span>
            <strong>{formatNumber(summary.total_bills_generated)}</strong>
            <p>{formatNumber(summary.total_unpaid_bills)} open billing records</p>
          </div>
          <div className="report-summary-item">
            <span className="utility-kicker">Complaints</span>
            <strong>{formatNumber(summary.unresolved_complaints)}</strong>
            <p>{formatNumber(summary.resolved_complaints)} resolved service cases</p>
          </div>
          <div className="report-summary-item">
            <span className="utility-kicker">Average Bill</span>
            <strong>{formatCurrency(revenue.average_bill_value)}</strong>
            <p>{formatNumber(revenue.average_units_consumed)} units average consumption</p>
          </div>
          <div className="report-summary-item">
            <span className="utility-kicker">Active Tariff</span>
            <strong>{activeTariff?.name || 'Not set'}</strong>
            <p>
              {activeTariff
                ? `${formatCurrency(activeTariff.unit_price)} per unit | Fixed ${formatCurrency(activeTariff.fixed_charge)}`
                : 'No active tariff is currently configured.'}
            </p>
          </div>
        </div>
      </section>

      <section className="table-card">
        <PageHeader title="Billing Status Breakdown" subtitle="Billed value and exposure by payment state." />
        <DataTable columns={billingColumns} rows={report?.billing_status_breakdown || []} />
      </section>

      <section className="report-two-column">
        <section className="table-card">
          <PageHeader title="Payment Channel Performance" subtitle="Collections captured by payment method." />
          <DataTable columns={paymentColumns} rows={report?.payment_method_breakdown || []} />
        </section>
        <section className="table-card">
          <PageHeader title="Complaint Resolution Status" subtitle="Current service desk workload distribution." />
          <DataTable columns={complaintColumns} rows={report?.complaint_status_breakdown || []} />
        </section>
      </section>

      <section className="table-card">
        <PageHeader title="Monthly Operating Performance" subtitle="Six-month view of billing, collections, and service issues." />
        <DataTable columns={monthlyColumns} rows={report?.monthly_performance || []} />
      </section>
    </div>
  );
}