import { Link, useLocation } from 'react-router-dom';
import { APP_BRAND, homePathByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  customer: 'Customer Services',
  billing_officer: 'Billing Operations',
  helpdesk_officer: 'Helpdesk Operations',
  administrator: 'Administration Console',
};

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();
  const sectionTitle = pageTitles[user?.role] || APP_BRAND;
  const locationLabel = location.pathname.split('/').filter(Boolean).join(' / ') || 'overview';

  return (
    <div className="topbar">
      <div>
        <span className="topbar-badge">{user?.roleLabel || 'Portal Access'}</span>
        <h2 className="page-title">{sectionTitle}</h2>
        <p className="topbar-subtitle">
          {APP_BRAND} | {locationLabel}
        </p>
      </div>
      <div className="topbar-actions">
        <div className="topbar-user-meta">
          <strong>{user?.email}</strong>
          <span>{user?.roleLabel}</span>
        </div>
        <Link className="button-ghost topbar-link" to={homePathByRole[user?.role] || '/'}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}