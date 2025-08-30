import DashboardLayout from '@/app/dashboard/dashboard-template';

const pageName = "Revise las ordenes del cliente";
const breadcrumbTitle = "Revise las ordenes del cliente";


export default function AssistantOrdersPage() {
  return (
    <DashboardLayout 
    pageName={pageName} 
    subText={<span>Hello assistant</span>}
    breadcrumbTitle={breadcrumbTitle}
    >

      <div>
        <p>Hello assistant</p>
      </div>
    </DashboardLayout>
  )
}
