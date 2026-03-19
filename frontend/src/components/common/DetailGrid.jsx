export default function DetailGrid({ items }) {
  return (
    <div className="detail-grid">
      {items.map((item) => (
        <div key={item.label} className="detail-card">
          <span>{item.label}</span>
          <strong>{item.value || '-'}</strong>
        </div>
      ))}
    </div>
  );
}
