import { NavLink, Outlet } from 'react-router-dom';
import { APP_TITLE } from '../../utils/constants';

export default function PublicLayout() {
  return (
    <div className="public-shell">
      <header className="public-header">
        <div className="brand-block">
          <h1>{APP_TITLE}</h1>
          <p>Electricity billing, payment, support, and monitoring in one platform.</p>
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
      <footer className="footer">
        {APP_TITLE} | Utility-grade billing and payment management scaffold.
      </footer>
    </div>
  );
}
