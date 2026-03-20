import { NavLink, Navigate, Outlet } from 'react-router-dom';
import logo from '../../assets/logo.png';
import { APP_BRAND, APP_TAGLINE, homePathByRole } from '../../utils/constants';
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
        <div className="brand-lockup">
          <img className="brand-logo" src={logo} alt="UEDCL logo" />
          <div className="brand-block">
            <span className="brand-eyebrow">Uganda Electricity Distribution Company Limited</span>
            <h1>{APP_BRAND}</h1>
            <p>{APP_TAGLINE}</p>
          </div>
        </div>
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
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="footer">{APP_BRAND} | Institutional billing, payment, metering, and customer service management.</footer>
    </div>
  );
}