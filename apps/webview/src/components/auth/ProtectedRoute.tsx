import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { authUtils } from '../../utils';
import { ROUTES } from '../../router/constants';

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  if (!authUtils.isAuthenticated()) {
    return <Navigate to={ROUTES.AUTH} replace />;
  }
  
  return <>{children}</>;
}

export default ProtectedRoute;