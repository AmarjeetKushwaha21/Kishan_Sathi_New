import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

export default function WeatherPage() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard/weather" replace />;
  }

  return <Navigate to="/login?redirect=/dashboard/weather" replace state={{ from: '/dashboard/weather' }} />;
}
