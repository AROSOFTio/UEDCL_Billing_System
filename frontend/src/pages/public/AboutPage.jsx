import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  return (
    <div className="section-card">
      <PageHeader
        title="About the Platform"
        subtitle="A secure utility platform for electricity billing, metering, customer service, and administrative oversight."
      />
      <div className="card-grid">
        <article className="stat-card">
          <h3>Billing Accuracy</h3>
          <p>Supports meter reading capture, unit consumption calculation, and professional bill generation workflows.</p>
        </article>
        <article className="stat-card">
          <h3>Customer Experience</h3>
          <p>Customers can securely view their profile, bills, payments, receipts, notifications, and complaints.</p>
        </article>
        <article className="stat-card">
          <h3>Operational Oversight</h3>
          <p>Billing, helpdesk, and administrative teams can manage service delivery from dedicated workspaces.</p>
        </article>
      </div>
    </div>
  );
}