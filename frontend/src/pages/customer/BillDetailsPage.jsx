import PageHeader from '../../components/common/PageHeader';

export default function BillDetailsPage() {
  return (
    <>
      <PageHeader
        title="Bill Details"
        subtitle="Detailed breakdown of the current electricity bill using the agreed billing formula."
      />
      <div className="card-grid">
        <article className="stat-card">
          <h3>Previous Reading</h3>
          <p className="stat-value">4,320</p>
        </article>
        <article className="stat-card">
          <h3>Current Reading</h3>
          <p className="stat-value">4,615</p>
        </article>
        <article className="stat-card">
          <h3>Units Consumed</h3>
          <p className="stat-value">295</p>
        </article>
      </div>
      <section className="section-card">
        <p>Energy Charge = 295 × UGX 550</p>
        <p>Fixed Charge = UGX 20,000</p>
        <p><strong>Total Bill = UGX 182,500</strong></p>
      </section>
    </>
  );
}
