import PageHeader from '../../components/common/PageHeader';

const profile = {
  accountNumber: 'UEDCL-100245',
  name: 'Grace Nansubuga',
  phone: '+256700111222',
  email: 'customer@uedcl.local',
  nationalId: 'CM92011401A',
  address: 'Kiwatule, Kampala',
  status: 'Active',
};

export default function ProfilePage() {
  return (
    <section className="form-card">
      <PageHeader
        title="Profile"
        subtitle="Customer profile information placeholder for the authenticated customer account."
      />
      <div className="form-grid">
        {Object.entries(profile).map(([key, value]) => (
          <div className="field" key={key}>
            <label>{key}</label>
            <input value={value} readOnly />
          </div>
        ))}
      </div>
    </section>
  );
}
