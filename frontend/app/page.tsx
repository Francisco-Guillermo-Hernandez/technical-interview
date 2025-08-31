'use client';
import { useAuth } from '@/hooks/auth';
import UnAuthorizedPage from '@/app/un-authorized/page';

import Page  from "./dashboard/page";
import LoginPage from './auth/login/page';

export default function Home() {
  const { user, isAuthenticated, isLoading, error, logout } = useAuth('client');

  if (isLoading) return <div>Loading...</div>;

  if(!isAuthenticated) return <LoginPage/>


  return (
    <Page/>
  );
}
