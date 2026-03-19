import { Link, useLocation } from 'react-router-dom';
import { APP_TITLE, homePathByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

const pageTitles = {
  customer: 'Customer Self-Service',
  billing_officer: 'Billing Operations',
  helpdesk_officer: 'Helpdesk Workspace',
  administrator: 'Administration Console',
};

export default function Topbar() {
  const { user } = useAuth();
  const location = useLocation();
  const sectionTitle = pageTitles[user?.role] || APP_TITLE;

  return (
    <div className="topbar">
      <div>
        <strong>{sectionTitle}</strong>
        <p className="topbar-subtitle">
          {APP_TITLE} | {location.pathname}
        </p>
      </div>
      <div className="topbar-actions">
        <div className="topbar-user-meta">
          <strong>{user?.email}</strong>
          <span>{user?.roleLabel}</span>
        </div>
        <Link className="button-outline topbar-link" to={homePathByRole[user?.role] || '/'}>
          Dashboard
        </Link>
      </div>
    </div>
  );
}
