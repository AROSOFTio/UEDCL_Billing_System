import StatusBadge from './StatusBadge';

export default function DataTable({ columns, rows, emptyTitle, emptyMessage }) {
  if (!rows?.length) {
    return (
      <div className="empty-state">
        <h3 className="section-title">{emptyTitle || 'No records yet'}</h3>
        <p>{emptyMessage || 'No records match the current view.'}</p>
      </div>
    );
  }

  return (
    <div className="table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column) => (
              <th key={column.key}>{column.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id || index}>
              {columns.map((column) => {
                const value = row[column.key];

                if (column.render) {
                  return <td key={column.key}>{column.render(row)}</td>;
                }

                if (column.type === 'status') {
                  return (
                    <td key={column.key}>
                      <StatusBadge value={value} />
                    </td>
                  );
                }

                return <td key={column.key}>{value}</td>;
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
