import DashboardLayout from '@/app/dashboard/dashboard-template';
import { DeliveryOrderForm } from '../../order'

const pageName = "Historial"
const breadcrumbTitle = "Mis envios"

export default function HistoryPage({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <>
    <DashboardLayout 
        pageName={pageName} 
        breadcrumbTitle={breadcrumbTitle}
        subText={
        <span>
          Comprueba el historial de envios
        </span>
    }>
        <div></div>
    </DashboardLayout>
    </>
  );
}