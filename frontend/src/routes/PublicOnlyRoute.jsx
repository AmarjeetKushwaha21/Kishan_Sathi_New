import { Navigate, Outlet } from 'react-router-dom';

import PageLoader from '@/components/ui/PageLoader';
import { useAuth } from '@/context/AuthContext';

export default function PublicOnlyRoute() {
  const { isAuthenticated, isCompany, initializing } = useAuth();

  if (initializing) {
    return <PageLoader label="Loading…" />;
  }

  if (isAuthenticated) {
    return <Navigate to={isCompany ? '/company/dashboard' : '/dashboard'} replace />;
  }

  return <Outlet />;
}