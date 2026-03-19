import { APP_TITLE } from '../../utils/constants';
import { useAuth } from '../../context/AuthContext';

export default function Topbar() {
  const { user } = useAuth();

  return (
    <div className="topbar">
      <div>
        <strong>{APP_TITLE}</strong>
        <p className="topbar-subtitle">
          Role workspace for {user?.roleLabel}. Routes and modules are scaffolded for the next phases.
        </p>
      </div>
      <div>
        <strong>{user?.email}</strong>
      </div>
    </div>
  );
}
