export default function AlertMessage({ tone = 'info', children }) {
  if (!children) {
    return null;
  }

  return <div className={`alert alert-${tone}`}>{children}</div>;
}
