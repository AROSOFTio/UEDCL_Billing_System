import PageHeader from '../../components/common/PageHeader';

export default function ContactPage() {
  return (
    <div className="section-card">
      <PageHeader
        title="Contact"
        subtitle="Professional contact placeholders for the utility-company website section."
      />
      <div className="card-grid">
        <article className="stat-card">
          <h3>Customer Support</h3>
          <p>support@uedcl.local</p>
          <p>+256 700 000 111</p>
        </article>
        <article className="stat-card">
          <h3>Billing Office</h3>
          <p>billing@uedcl.local</p>
          <p>+256 700 000 222</p>
        </article>
        <article className="stat-card">
          <h3>Head Office</h3>
          <p>Plot 1 Utility Avenue, Kampala</p>
          <p>Mon to Fri, 8:00 AM to 5:00 PM</p>
        </article>
      </div>
    </div>
  );
}
