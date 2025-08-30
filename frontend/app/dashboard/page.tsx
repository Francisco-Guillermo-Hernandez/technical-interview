import DashboardLayout from './dashboard-template'

const pageName = "Bienvenid@";
const breadcrumbTitle = "";

export default function WelcomeDashboardPage() {
  return (
    <DashboardLayout 
    pageName={pageName} 
    subText={<></>}
    breadcrumbTitle={breadcrumbTitle}
    >

      <div>
        Bienvenido 
      </div>
    </DashboardLayout>
  )
}
