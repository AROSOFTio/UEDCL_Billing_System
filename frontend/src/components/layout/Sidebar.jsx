import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { APP_BRAND, navigationByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import AppIcon from '../common/AppIcon';

const workspaceCopyByRole = {
  customer: 'Customer account services',
  billing_officer: 'Billing and metering operations',
  helpdesk_officer: 'Complaints and service desk',
  administrator: 'Administration and control',
};

export default function Sidebar() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const items = navigationByRole[user?.role] || [];
  const exactItemMatch = items.find((item) => item.path === location.pathname);

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  function isItemActive(path) {
    if (exactItemMatch) {
      return exactItemMatch.path === path;
    }

    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-brand-panel">
        <div className="sidebar-brand-mark">
          <img className="sidebar-logo" src={logo} alt="UEDCL logo" />
        </div>
        <div className="sidebar-brand-copy">
          <strong>{APP_BRAND}</strong>
          <small>{workspaceCopyByRole[user?.role] || 'Utility operations workspace'}</small>
        </div>
      </div>

      <div className="sidebar-user">
        <span className="sidebar-section-label">Signed In Account</span>
        <strong>{user?.name}</strong>
        <p>{user?.roleLabel}</p>
        {user?.customer?.account_number ? <small>Account {user.customer.account_number}</small> : null}
      </div>

      <nav className="sidebar-nav">
        <span className="sidebar-section-label">Navigation</span>
        {items.map((item) => (
          <NavLink
            key={item.path}
            className={`sidebar-nav-link${isItemActive(item.path) ? ' active' : ''}`}
            to={item.path}
          >
            <span className="nav-icon-wrap">
              <AppIcon name={item.icon} />
            </span>
            <span className="nav-link-copy">{item.label}</span>
          </NavLink>
        ))}
        <button className="sidebar-nav-link sidebar-logout" type="button" onClick={handleLogout}>
          <span className="nav-icon-wrap">
            <AppIcon name="logout" />
          </span>
          <span className="nav-link-copy">Logout</span>
        </button>
      </nav>
    </aside>
  );
}