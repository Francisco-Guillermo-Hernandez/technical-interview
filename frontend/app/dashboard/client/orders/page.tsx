'use client';

import DashboardLayout from '@/app/dashboard/dashboard-template';
import OrderWizard from '@/components/orders/order-wizard';

const pageName = 'Crea una orden';
const breadcrumbTitle = 'Crear orden';

export default function OrderPage() {
  return (
    <DashboardLayout
      pageName={pageName}
      breadcrumbTitle={breadcrumbTitle}
      subText={
        <span>
          Dale una ventaja competitiva a tu negocio con entregas{' '}
          <span className="font-bold">el mismo día </span> (Área Metropolitana)
          y <span className="font-bold">el día siguiente</span> a nivel
          nacional.
        </span>
      }
    >
      <OrderWizard/>
    </DashboardLayout>
  );
}
