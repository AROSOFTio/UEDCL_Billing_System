import { Link } from 'react-router-dom';
import StatCard from '../../components/common/StatCard';
import { APP_TITLE } from '../../utils/constants';

const highlights = [
  {
    label: 'Utility Roles',
    value: '4',
    helper: 'Customer, Billing Officer, Helpdesk Officer, Administrator',
  },
  {
    label: 'Core Modules',
    value: '9',
    helper: 'Billing, payments, complaints, notifications, and reports',
  },
  {
    label: 'Delivery Focus',
    value: 'Full Stack',
    helper: 'React frontend with Laravel API structure',
  },
];

export default function HomePage() {
  return (
    <div>
      <section className="hero-panel">
        <div>
          <p className="helper-text">Institution-grade electricity service operations</p>
          <h2 className="hero-title">{APP_TITLE}</h2>
          <p className="hero-copy">
            A modern platform for customer billing, meter operations, payment recording,
            complaints handling, and administrative monitoring for UEDCL.
          </p>
          <div className="hero-actions">
            <Link className="button" to="/login">
              Access Portal
            </Link>
            <Link className="button-outline" to="/about">
              Learn More
            </Link>
          </div>
        </div>
        <aside className="hero-aside">
          <h3>Scaffold Coverage</h3>
          <p>
            The repository already includes frontend role routes, backend API placeholders,
            migrations, seeders, documentation, and utility-themed UI foundations.
          </p>
          <ul className="hero-list">
            <li>Clean dashboards and operational tables</li>
            <li>Billing, payment, and receipt module structure</li>
            <li>Complaint and SMS workflow placeholders</li>
          </ul>
        </aside>
      </section>

      <section className="section-card">
        <div className="page-header">
          <div>
            <h3 className="section-title">Platform Snapshot</h3>
            <p className="section-copy">
              The starting point is designed for a professional utility-company experience.
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
