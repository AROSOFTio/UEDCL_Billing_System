import StatusBadge from './StatusBadge';

export default function DataTable({ columns, rows }) {
  if (!rows?.length) {
    return (
      <div className="empty-state">
        <h3 className="section-title">No records yet</h3>
        <p>Data will appear here once the module is connected to the backend API.</p>
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
