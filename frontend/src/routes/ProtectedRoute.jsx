import { Navigate, Outlet, useLocation } from 'react-router-dom';

import PageLoader from '@/components/ui/PageLoader';
import { useAuth } from '@/context/AuthContext';

export default function ProtectedRoute() {
  const { isAuthenticated, initializing, isCompany } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <PageLoader label="Preparing your farm…" />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login/farmer" replace state={{ from: location.pathname }} />;
  }

  // Company users must NEVER view the Farmer Dashboard
  if (isCompany) {
    return <Navigate to="/company/dashboard" replace />;
  }

  return <Outlet />;
}

export const FarmerProtectedRoute = ProtectedRoute;