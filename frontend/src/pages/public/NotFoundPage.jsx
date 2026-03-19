import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <section className="auth-page">
      <div className="auth-panel">
        <h2 className="page-title">Page Not Found</h2>
        <p className="section-copy">The page you requested could not be found in the portal.</p>
        <Link className="button" to="/">
          Return Home
        </Link>
      </div>
    </section>
  );
}