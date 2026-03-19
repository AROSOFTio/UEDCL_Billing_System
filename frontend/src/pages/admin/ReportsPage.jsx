import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const rows = [
  { id: 1, report: 'Total Customers', value: '12,540', status: 'Success' },
  { id: 2, report: 'Total Bills Generated', value: '11,980', status: 'Success' },
  { id: 3, report: 'Total Unpaid Bills', value: '1,460', status: 'Pending' },
  { id: 4, report: 'Unresolved Complaints', value: '46', status: 'Pending' },
];

const columns = [
  { key: 'report', label: 'Report' },
  { key: 'value', label: 'Value' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function ReportsPage() {
  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Reports"
          subtitle="Starter reporting filters for dashboards, collections, and service operations."
        />
        <div className="form-grid">
          <div className="field"><label>Date From</label><input type="date" /></div>
          <div className="field"><label>Date To</label><input type="date" /></div>
          <div className="field"><label>Report Type</label><select><option>Summary</option><option>Billing</option><option>Complaints</option></select></div>
          <div><button className="button" type="button">Run Report</button></div>
        </div>
      </section>
      <section className="table-card">
        <PageHeader title="Report Output" subtitle="Summary figures placeholder for admin monitoring." />
        <DataTable columns={columns} rows={rows} />
      </section>
    </>
  );
}
