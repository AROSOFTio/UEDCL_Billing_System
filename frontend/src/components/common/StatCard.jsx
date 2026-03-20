export default function StatCard({ label, value, helper }) {
  return (
    <article className="stat-card">
      <div className="stat-card-head">
        <p className="stat-label">{label}</p>
      </div>
      <p className="stat-value">{value}</p>
      {helper ? <p className="stat-helper">{helper}</p> : null}
    </article>
  );
}