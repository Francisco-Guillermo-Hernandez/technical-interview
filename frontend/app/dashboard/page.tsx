'use client';

import DashboardLayout from './dashboard-template';
import { useAuth } from '@/hooks/auth';
import LoaderPage from '@/components/loader';
import UnAuthorizedPage from '@/app/un-authorized/page';

const pageName = 'Bienvenid@';
const breadcrumbTitle = '';

export default function WelcomeDashboardPage() {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth('client');

  if (isLoading) return <LoaderPage />;

  if (!isAuthenticated) return <UnAuthorizedPage />;

  return (
    <DashboardLayout
      pageName={pageName}
      subText={<></>}
      breadcrumbTitle={breadcrumbTitle}
    >
      <div>Bienvenido</div>
    </DashboardLayout>
  );
}
