import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';

const rows = [
  { id: 1, name: 'Admin User', email: 'admin@uedcl.local', role: 'Administrator', status: 'Active' },
  { id: 2, name: 'Billing Officer', email: 'billing@uedcl.local', role: 'Billing Officer', status: 'Active' },
  { id: 3, name: 'Helpdesk Officer', email: 'helpdesk@uedcl.local', role: 'Helpdesk Officer', status: 'Active' },
];

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'status', label: 'Status', type: 'status' },
];

export default function UsersPage() {
  return (
    <section className="table-card">
      <PageHeader
        title="Users"
        subtitle="Administrative user registry placeholder with role assignments and status management."
      />
      <DataTable columns={columns} rows={rows} />
    </section>
  );
}
