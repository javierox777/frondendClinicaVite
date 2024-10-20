import { Navigate } from 'react-router-dom';
import { useUser } from '../auth/userContext'; // Ajusta según tu contexto de usuario
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser(); // Obtener el objeto user y el estado loading del contexto

  if (loading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return <div>Loading...</div>;
  }

  const isAuthenticated = user !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
