import { Navigate, Outlet, useLocation } from 'react-router-dom';

import PageLoader from '@/components/ui/PageLoader';
import { useAuth } from '@/context/AuthContext';

export default function CompanyProtectedRoute() {
  const { isAuthenticated, initializing, isCompany } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <PageLoader label="Loading Company Portal…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/company" replace state={{ from: location.pathname }} />;
  }

  // Farmer users must NEVER view the Company Dashboard
  if (!isCompany) {
    return <Navigate to="/dashboard" replace />;
  }


  return <Outlet />;
}
