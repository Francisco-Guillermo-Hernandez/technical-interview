'use client';
import { useState, useEffect } from 'react';

import DashboardLayout from '@/app/dashboard/dashboard-template';
import { DeliveryOrderForm } from '../../order';

import { useAuth } from '@/hooks/auth';
import LoaderPage from '@/components/loader';
import UnAuthorizedPage from '@/app/un-authorized/page';

import TableComponent from './table';

const pageName = 'Historial';
const breadcrumbTitle = 'Mis envios';



export default function HistoryPage({
  className,
  ...props
}: React.ComponentProps<'div'>) {


  const { user, isAuthenticated, isLoading, error, logout, token } =
    useAuth('client');

  
  if (isLoading) return <LoaderPage />;

  if (!isAuthenticated) return <UnAuthorizedPage />;

  return (
    <DashboardLayout
      pageName={pageName}
      breadcrumbTitle={breadcrumbTitle}
      subText={<span>Comprueba el historial de envios</span>}
    >
      <TableComponent token={token} />
    </DashboardLayout>
  );
}
