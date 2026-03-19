import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const rows = [
  {
    id: 1,
    meterNumber: 'MT-309225',
    previousReading: '4,320',
    currentReading: '4,615',
    unitsConsumed: '295',
    status: 'Success',
  },
];

const columns = [
  { key: 'meterNumber', label: 'Meter Number' },
  { key: 'previousReading', label: 'Previous' },
  { key: 'currentReading', label: 'Current' },
  { key: 'unitsConsumed', label: 'Units Consumed' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function MeterReadingsPage() {
  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Meter Readings"
          subtitle="Capture current readings while validating against previous recorded values."
        />
        <div className="form-grid">
          <div className="field"><label>Meter Number</label><input placeholder="MT-309225" /></div>
          <div className="field"><label>Previous Reading</label><input value="4320" readOnly /></div>
          <div className="field"><label>Current Reading</label><input placeholder="4615" /></div>
          <div><button className="button" type="button">Record Reading</button></div>
        </div>
      </section>
      <section className="table-card">
        <PageHeader title="Reading History" subtitle="Most recent meter reading entries in scaffold mode." />
        <DataTable columns={columns} rows={rows} />
      </section>
    </>
  );
}
