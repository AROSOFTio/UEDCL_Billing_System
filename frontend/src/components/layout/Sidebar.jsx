import { NavLink } from 'react-router-dom';
import { APP_TITLE, navigationByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const items = navigationByRole[user?.role] || [];

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">{APP_TITLE}</div>
        <small>Formal utility operations workspace</small>
      </div>

      <div className="sidebar-user">
        <strong>{user?.name}</strong>
        <p>{user?.roleLabel}</p>
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
        <button type="button" onClick={logout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}
