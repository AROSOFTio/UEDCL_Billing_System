import PageHeader from '../../components/common/PageHeader';

export default function AboutPage() {
  return (
    <div className="section-card">
      <PageHeader
        title="About"
        subtitle="A controlled utility platform for billing, metering, customer service, and reporting."
      />
      <div className="card-grid compact-dashboard-grid">
        <article className="stat-card">
          <h3>Billing</h3>
          <p>Meter reading capture, tariff application, and bill generation.</p>
        </article>
        <article className="stat-card">
          <h3>Customer Service</h3>
          <p>Customer self-service for bills, receipts, notifications, and complaints.</p>
        </article>
        <article className="stat-card">
          <h3>Administration</h3>
          <p>Tariffs, payments, complaints, and operational reporting in one place.</p>
        </article>
      </div>
    </div>
  );
}