import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const rows = [
  { id: 1, name: 'Domestic Standard', unitPrice: 'UGX 550', fixedCharge: 'UGX 20,000', status: 'Active' },
  { id: 2, name: 'Commercial Standard', unitPrice: 'UGX 680', fixedCharge: 'UGX 35,000', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'Tariff Name' },
  { key: 'unitPrice', label: 'Unit Price' },
  { key: 'fixedCharge', label: 'Fixed Charge' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function TariffsPage() {
  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Tariffs"
          subtitle="Tariff management placeholder for unit price, fixed charge, and activation dates."
        />
        <div className="form-grid">
          <div className="field"><label>Tariff Name</label><input placeholder="Domestic Standard" /></div>
          <div className="field"><label>Unit Price</label><input placeholder="550" /></div>
          <div className="field"><label>Fixed Charge</label><input placeholder="20000" /></div>
          <div className="field"><label>Effective From</label><input type="date" /></div>
          <div><button className="button" type="button">Save Tariff</button></div>
        </div>
      </section>
      <section className="table-card">
        <PageHeader title="Active Tariffs" subtitle="Current tariff records in the scaffold." />
        <DataTable columns={columns} rows={rows} />
      </section>
    </>
  );
}
