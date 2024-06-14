import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress } from '@mui/material';
import { LoggedUser, useUser } from '../auth/userContext';
import axios from 'axios';

const Inicio: React.FC = () => {
  const { user } = useUser();
  const [numPacientes, setNumPacientes] = useState<number | null>(null);
  const [citasPendientes, setCitasPendientes] = useState<number | null>(null);
  const [loadingPacientes, setLoadingPacientes] = useState<boolean>(true);
  const [loadingCitas, setLoadingCitas] = useState<boolean>(true);
  const [errorPacientes, setErrorPacientes] = useState<string | null>(null);
  const [errorCitas, setErrorCitas] = useState<string | null>(null);

  useEffect(() => {
    const fetchPacientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/persons');
        setNumPacientes(response.data.body.length);
        setLoadingPacientes(false);
      } catch (error) {
        console.error('Error fetching patients data:', error);
        setErrorPacientes('Error fetching patients data');
        setLoadingPacientes(false);
      }
    };

    const fetchCitasPendientes = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/appointments/idprofesional/6653f762d8baf95d6fad7fef');
        const citas = response.data.body;
        
        
        setCitasPendientes(citas.length);
        setLoadingCitas(false);
      } catch (error) {
        console.error('Error fetching pending appointments data:', error);
        setErrorCitas('Error fetching pending appointments data');
        setLoadingCitas(false);
      }
    };

    fetchPacientes();
    fetchCitasPendientes();
  }, []);

  const tratamientosCompletados = 320; // Datos ficticios

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      <Typography 
        variant="h5" 
        gutterBottom 
        sx={{ fontWeight: 'light', fontSize: '1.5rem', color: '#333' }}
      >
        Bienvenido al Dashboard {(user as LoggedUser)?.nombre}
      </Typography>

      {errorPacientes && (
        <Typography color="error" variant="body1" gutterBottom>
          {errorPacientes}
        </Typography>
      )}

      {errorCitas && (
        <Typography color="error" variant="body1" gutterBottom>
          {errorCitas}
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              boxShadow: 3, 
              borderRadius: '8px', 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Número de Pacientes
            </Typography>
            {loadingPacientes ? (
              <CircularProgress />
            ) : (
              <Typography 
                variant="h3" 
                sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#000' }}
              >
                {numPacientes}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              boxShadow: 3, 
              borderRadius: '8px', 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Citas Pendientes
            </Typography>
            {loadingCitas ? (
              <CircularProgress />
            ) : (
              <Typography 
                variant="h3" 
                sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#000' }}
              >
                {citasPendientes}
              </Typography>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Paper 
            sx={{ 
              p: 2, 
              boxShadow: 3, 
              borderRadius: '8px', 
              transition: 'transform 0.3s ease-in-out',
              '&:hover': {
                transform: 'scale(1.05)'
              }
            }}
          >
            <Typography 
              variant="h6" 
              gutterBottom 
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Tratamientos Completados
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ fontWeight: 'bold', fontSize: '2rem', color: '#000' }}
            >
              {tratamientosCompletados}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Inicio;
