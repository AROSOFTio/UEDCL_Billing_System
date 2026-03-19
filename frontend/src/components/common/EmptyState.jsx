export default function EmptyState({ title, message }) {
  return (
    <div className="empty-state">
      <h3 className="section-title">{title}</h3>
      <p>{message}</p>
    </div>
  );
}
