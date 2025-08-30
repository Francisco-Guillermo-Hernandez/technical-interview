import DashboardLayout from '@/app/dashboard/dashboard-template';

const pageName = "Direcciones"
const breadcrumbTitle = "Mis direcciones"

export default function AddressesPage() {
  return (
    <DashboardLayout 
        pageName={pageName} 
        breadcrumbTitle={breadcrumbTitle}
        subText={<span>Direcciones</span>}
        >
        <div>

            <p>Addresses</p>
        </div>
    </DashboardLayout>
  );
}