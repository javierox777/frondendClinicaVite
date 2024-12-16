import { Navigate } from 'react-router-dom';
import { useUser } from '../auth/userContext'; // Ajusta según tu contexto de usuario
import React from 'react';
import logo from '../../public/logo.png';
import { Grid, LinearProgress, Typography } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useUser(); // Obtener el objeto user y el estado loading del contexto

  if (loading) {
    // Mostrar un indicador de carga mientras se verifica la autenticación
    return (
      <Grid container justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <div className="flex  justify-center">
            <img src={logo} alt="logo" height={300} width={400} />
          </div>
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ textAlign: 'center', color: '#53B0F3', fontSize: 25 }}
          >
            Clínica Dental
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography
            style={{ textAlign: 'center', color: '#e895da', fontSize: 25 }}
          >
            Amania
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <div className="mx-32">
            <LinearProgress />
          </div>
        </Grid>
      </Grid>
    );
  }

  const isAuthenticated = user !== null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
