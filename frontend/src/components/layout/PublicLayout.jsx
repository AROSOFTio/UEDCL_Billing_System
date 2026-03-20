import { NavLink, Navigate, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { APP_BRAND, homePathByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import LoadingState from '../common/LoadingState';

function publicLinkClass({ isActive }) {
  return isActive ? 'active' : '';
}

export default function PublicLayout() {
  const { authLoading, isAuthenticated, user } = useAuth();

  if (authLoading) {
    return <LoadingState message="Loading portal..." />;
  }

  if (isAuthenticated && user?.role) {
    return <Navigate to={homePathByRole[user.role]} replace />;
  }

  return (
    <div className="public-shell">
      <header className="public-header">
        <div className="public-header-inner">
          <NavLink className="brand-lockup" to="/" aria-label={APP_BRAND}>
            <img className="brand-logo" src={logo} alt="UEDCL logo" />
          </NavLink>
          <nav className="public-nav">
            <NavLink className={publicLinkClass} end to="/">
              Home
            </NavLink>
            <NavLink className={publicLinkClass} to="/about">
              About
            </NavLink>
            <NavLink className={publicLinkClass} to="/contact">
              Contact
            </NavLink>
            <NavLink className={publicLinkClass} to="/login">
              Login
            </NavLink>
            <NavLink className={publicLinkClass} to="/register">
              Register
            </NavLink>
          </nav>
        </div>
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-title">UEDCL Service Portal</span>
          <span className="footer-copy">Electricity billing, receipts, and customer service.</span>
        </div>
      </footer>
    </div>
  );
}