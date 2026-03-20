import { useAuth } from '../../context/AuthContext';

const workspaceTitles = {
  customer: 'Customer',
  billing_officer: 'Billing',
  helpdesk_officer: 'Helpdesk',
  administrator: 'Administration',
};

export default function Topbar() {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div className="topbar-inner">
        <strong className="topbar-title">{workspaceTitles[user?.role] || 'Workspace'}</strong>
        <div className="topbar-user-meta">
          <strong>{user?.email}</strong>
          <span>{user?.roleLabel}</span>
        </div>
      </div>
    </div>
  );
}