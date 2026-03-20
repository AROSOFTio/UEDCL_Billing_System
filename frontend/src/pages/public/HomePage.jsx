import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AppIcon from '../../components/common/AppIcon';

const serviceAreas = [
  {
    icon: 'profile',
    title: 'Customer Self-Service',
    summary: 'Customers can log in securely to review bills, confirm payments, download receipts, and track complaint responses.',
    points: ['Current and historical bills', 'Receipts and payment visibility', 'Complaint submission and follow-up'],
  },
  {
    icon: 'readings',
    title: 'Billing and Metering Operations',
    summary: 'Billing officers can register customers, assign meters, capture readings, and generate tariff-based bills through a controlled workflow.',
    points: ['Customer and meter registration', 'Validated meter readings', 'Bill generation with fixed charge support'],
  },
  {
    icon: 'reports',
    title: 'Helpdesk and Administrative Oversight',
    summary: 'Helpdesk teams manage complaints while administrators supervise tariffs, users, reports, and overall service performance.',
    points: ['Complaint response and resolution', 'Tariff and user administration', 'Reports across bills, payments, and service cases'],
  },
];

const workflowSteps = [
  {
    title: 'Register the service account',
    copy: 'Create the customer profile, account number, and linked service details before metering and billing operations begin.',
  },
  {
    title: 'Assign the meter and capture readings',
    copy: 'Record installations, validate current readings against previous values, and preserve a reliable meter history.',
  },
  {
    title: 'Generate bills and post payments',
    copy: 'Apply the active tariff, calculate charges, produce customer bills, record payments, and issue receipts.',
  },
  {
    title: 'Notify customers and manage support',
    copy: 'Store SMS notification records, track overdue accounts, and resolve customer complaints through the helpdesk workflow.',
  },
];

const portalAccess = [
  {
    icon: 'dashboard',
    title: 'Customer Portal',
    copy: 'View bills, receipts, payment activity, notifications, and complaint history.',
  },
  {
    icon: 'customers',
    title: 'Billing Desk',
    copy: 'Manage customers, meters, readings, bill generation, and payment recording.',
  },
  {
    icon: 'support',
    title: 'Helpdesk and Control',
    copy: 'Respond to complaints, monitor service cases, manage tariffs, and review reports.',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-panel">
        <div>
          <p className="helper-text utility-kicker">Formal digital utility operations platform</p>
          <h2 className="hero-title">
            Manage electricity billing, metering, payments, receipts, and customer support through one controlled service portal.
          </h2>
          <p className="hero-copy">
            Built for a professional UEDCL workflow with structured access for customers, billing officers, helpdesk officers,
            and administrators across the full electricity billing lifecycle.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/login">
              Access Portal
            </Link>
            <Link className="button-outline" to="/register">
              Register Customer Account
            </Link>
          </div>
        </div>
        <aside className="hero-summary">
          <div className="hero-summary-brand">
            <img className="hero-summary-logo" src={logo} alt="UEDCL logo" />
            <div>
              <span className="brand-eyebrow">Operational Coverage</span>
              <h3>Utility Control Centre</h3>
            </div>
          </div>
          <ul className="summary-list">
            <li>Tariff-driven bill generation with unit rate and fixed charge support</li>
            <li>Customer access to bills, receipts, payments, and complaint history</li>
            <li>Meter registration, reading capture, validation, and billing history</li>
            <li>Administrative reporting across customers, bills, payments, and complaints</li>
          </ul>
          <div className="notice-card">
            <span className="sidebar-section-label">Payment and Notification Channels</span>
            <p>Supports cash, mobile money, and bank payment recording with stored SMS notification records for generated bills, payments, and overdue reminders.</p>
          </div>
        </aside>
      </section>

      <section className="section-card">
        <div className="page-header">
          <div>
            <h3 className="section-title">Core Service Areas</h3>
            <p className="section-copy">The platform is organized around the actual operating responsibilities expected within an electricity distribution utility.</p>
          </div>
        </div>
        <div className="service-grid">
          {serviceAreas.map((area) => (
            <article key={area.title} className="service-card">
              <div className="service-card-header">
                <span className="service-card-icon">
                  <AppIcon name={area.icon} />
                </span>
                <div>
                  <h4>{area.title}</h4>
                  <p>{area.summary}</p>
                </div>
              </div>
              <ul className="service-points">
                {area.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="split-layout">
        <section className="section-card">
          <div className="page-header">
            <div>
              <h3 className="section-title">Operational Workflow</h3>
              <p className="section-copy">A structured end-to-end process for registration, billing, payment, notification, and customer support.</p>
            </div>
          </div>
          <div className="operations-list">
            {workflowSteps.map((step, index) => (
              <article key={step.title} className="operations-item">
                <span className="operations-step">{index + 1}</span>
                <div>
                  <h4>{step.title}</h4>
                  <p>{step.copy}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section-card">
          <div className="page-header">
            <div>
              <h3 className="section-title">Portal Access</h3>
              <p className="section-copy">Role-based access keeps customer self-service, billing operations, helpdesk, and administration clearly separated.</p>
            </div>
          </div>
          <div className="quick-link-grid">
            {portalAccess.map((item) => (
              <article key={item.title} className="quick-link-card">
                <span className="service-card-icon">
                  <AppIcon name={item.icon} />
                </span>
                <h4>{item.title}</h4>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
}