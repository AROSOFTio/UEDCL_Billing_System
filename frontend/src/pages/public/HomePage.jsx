import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import { APP_TITLE } from '../../utils/constants';

const highlights = [
  {
    label: 'Operational Roles',
    value: '4',
    helper: 'Customer, Billing Officer, Helpdesk Officer, and Administrator',
  },
  {
    label: 'Core Modules',
    value: '9',
    helper: 'Billing, payments, complaints, notifications, reports, and meter operations',
  },
  {
    label: 'Deployment Style',
    value: 'Web-Based',
    helper: 'Responsive React frontend with Laravel REST API integration',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-panel">
        <div>
          <p className="helper-text">Formal digital utility service platform</p>
          <h2 className="hero-title">{APP_TITLE}</h2>
          <p className="hero-copy">
            A complete service portal for electricity billing, payment recording, meter management,
            customer support, and administrative oversight for UEDCL operations.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/login">
              Access Portal
            </Link>
            <Link className="button-outline" to="/register">
              Create Customer Account
            </Link>
          </div>
        </div>
        <aside className="hero-aside">
          <h3>Platform Coverage</h3>
          <p>
            The interface is designed for institution-grade operations with clean dashboards,
            structured workflows, and role-based access across the utility lifecycle.
          </p>
          <ul className="hero-list">
            <li>Customer self-service for bills, payments, receipts, and complaints</li>
            <li>Billing tools for meter readings, bill generation, and payment posting</li>
            <li>Helpdesk and admin monitoring for service quality and reporting</li>
          </ul>
        </aside>
      </section>

      <section className="section-card">
        <div className="page-header">
          <div>
            <h3 className="section-title">Platform Snapshot</h3>
            <p className="section-copy">
              Built for a professional utility-company experience on desktop, tablet, and mobile.
            </p>
          </div>
        </div>
        <div className="card-grid">
          {highlights.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>
      </section>
    </div>
  );
}