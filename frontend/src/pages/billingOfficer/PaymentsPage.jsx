import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { samplePayments } from '../../utils/mockData';

const columns = [
  { key: 'paymentNumber', label: 'Payment Number' },
  { key: 'bill', label: 'Bill' },
  { key: 'method', label: 'Method' },
  { key: 'amount', label: 'Amount' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function PaymentsPage() {
  return (
    <>
      <section className="form-card">
        <PageHeader
          title="Record Payment"
          subtitle="Starter form for cash, mobile money, and bank payment capture."
        />
        <div className="form-grid">
          <div className="field"><label>Bill Number</label><input placeholder="BILL-2026-0001" /></div>
          <div className="field"><label>Payment Method</label><select><option>Cash</option><option>Mobile Money</option><option>Bank</option></select></div>
          <div className="field"><label>Amount</label><input placeholder="182500" /></div>
          <div className="field"><label>Reference</label><input placeholder="Transaction reference" /></div>
          <div><button className="button" type="button">Record Payment</button></div>
        </div>
      </section>
      <section className="table-card">
        <PageHeader title="Payment History" subtitle="Recorded payments scaffold for staff review." />
        <DataTable columns={columns} rows={samplePayments} />
      </section>
    </>
  );
}
