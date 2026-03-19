import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { APP_TITLE, homePathByRole } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';
import LoadingState from '../common/LoadingState';

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
        <div className="brand-block">
          <h1>{APP_TITLE}</h1>
          <p>Electricity billing, payment, customer care, and utility monitoring in one platform.</p>
        </div>
        <nav className="public-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </nav>
      </header>
      <main className="public-main">
        <Outlet />
      </main>
      <footer className="footer">{APP_TITLE} | Institution-grade utility billing and payment management.</footer>
    </div>
  );
}