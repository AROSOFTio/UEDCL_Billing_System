import { NavLink, useNavigate } from 'react-router-dom';
import { APP_TITLE, navigationByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const items = navigationByRole[user?.role] || [];

  async function handleLogout() {
    await logout();
    navigate('/login', { replace: true });
  }

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-brand">{APP_TITLE}</div>
        <small>Utility operations workspace</small>
      </div>

      <div className="sidebar-user">
        <strong>{user?.name}</strong>
        <p>{user?.roleLabel}</p>
        {user?.customer?.account_number ? <small>{user.customer.account_number}</small> : null}
      </div>

      <nav className="sidebar-nav">
        {items.map((item) => (
          <NavLink key={item.path} to={item.path}>
            {item.label}
          </NavLink>
        ))}
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </aside>
  );
}