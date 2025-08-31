'use client';

import DashboardLayout from '@/app/dashboard/dashboard-template';
import OrderWizard from '@/components/orders/order-wizard';

import { useAuth } from '@/hooks/auth';
import LoaderPage from '@/components/loader';
import UnAuthorizedPage from '@/app/un-authorized/page';

const pageName = 'Crea una orden';
const breadcrumbTitle = 'Crear orden';

export default function OrderPage() {
  const { user, isAuthenticated, isLoading, error, logout, token } = useAuth('client');

  if (isLoading) return <LoaderPage />;

  if (!isAuthenticated) return <UnAuthorizedPage />;

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
      <OrderWizard token={token} />
    </DashboardLayout>
  );
}
