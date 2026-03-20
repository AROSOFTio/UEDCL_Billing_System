import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { homePathByRole, navigationByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import AppIcon from '../common/AppIcon';

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
      <NavLink className="sidebar-brand-panel" to={homePathByRole[user?.role] || '/'} aria-label="Workspace home">
        <div className="sidebar-brand-mark">
          <img className="sidebar-logo" src={logo} alt="UEDCL logo" />
        </div>
      </NavLink>

      <nav className="sidebar-nav">
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