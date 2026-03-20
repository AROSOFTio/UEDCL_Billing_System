import { Link } from 'react-router-dom';
import AppIcon from '../../components/common/AppIcon';

const portalAccess = [
  {
    icon: 'profile',
    title: 'Customer Portal',
    copy: 'Bills, payments, receipts, and complaints.',
  },
  {
    icon: 'readings',
    title: 'Billing Operations',
    copy: 'Customers, meters, readings, and billing.',
  },
  {
    icon: 'support',
    title: 'Helpdesk and Admin',
    copy: 'Tariffs, complaints, notifications, and reports.',
  },
];

export default function HomePage() {
  return (
    <div className="public-stack">
      <section className="hero-panel hero-panel-compact">
        <p className="utility-kicker">UEDCL Digital Services</p>
        <h2 className="hero-title hero-title-compact">Billing, metering, payments, and customer support.</h2>
        <p className="hero-copy hero-copy-compact">
          One controlled portal for customers, billing staff, helpdesk officers, and administrators.
        </p>
        <div className="hero-actions">
          <Link className="button" to="/login">
            Access Portal
          </Link>
          <Link className="button-outline" to="/register">
            Register Account
          </Link>
        </div>
      </section>

      <section className="section-card compact-section">
        <div className="page-header compact-page-header">
          <div>
            <h3 className="section-title">Core Access</h3>
          </div>
        </div>
        <div className="quick-link-grid">
          {portalAccess.map((item) => (
            <article key={item.title} className="quick-link-card minimal-card">
              <span className="service-card-icon">
                <AppIcon name={item.icon} />
              </span>
              <h4>{item.title}</h4>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}