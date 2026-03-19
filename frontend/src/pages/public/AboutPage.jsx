import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  return (
    <div className="section-card">
      <PageHeader
        title="About the Platform"
        subtitle="The Online Electricity Billing and Payment System for UEDCL is designed to centralize service delivery, customer care, and revenue operations."
      />
      <div className="card-grid">
        <article className="stat-card">
          <h3>Billing Accuracy</h3>
          <p>Supports meter reading capture, unit consumption calculation, and bill generation.</p>
        </article>
        <article className="stat-card">
          <h3>Customer Experience</h3>
          <p>Customers can view bills, payments, receipts, notifications, and complaints in one place.</p>
        </article>
        <article className="stat-card">
          <h3>Administrative Oversight</h3>
          <p>Administrators can monitor revenue, tariffs, complaints, and SMS settings from one workspace.</p>
        </article>
      </div>
    </div>
  );
}
