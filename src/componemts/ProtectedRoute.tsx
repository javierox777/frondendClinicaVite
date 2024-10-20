import { Navigate } from 'react-router-dom';
import { useUser } from '../auth/userContext'; // Ajusta según tu contexto de usuario
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode; // Define el tipo de children
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useUser(); // Obtener el objeto user del contexto

  // Considerar autenticado si `user` no es null
  const isAuthenticated = user !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
