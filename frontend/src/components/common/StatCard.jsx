export default function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <p>{label}</p>
      <p className="stat-value">{value}</p>
      {helper ? <p className="helper-text">{helper}</p> : null}
    </article>
  );
}
