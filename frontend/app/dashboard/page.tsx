import DashboardLayout from './dashboard-template'

const pageName = "Bienvenid@";
const breadcrumbTitle = "";

export default function WelcomeDashboardPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
    <DashboardLayout 
    pageName={pageName} 
    subText={<></>}
    breadcrumbTitle={breadcrumbTitle}
    >

      <div>
        Bienvenido 
      </div>
    </DashboardLayout>
    </>  
  )
}
