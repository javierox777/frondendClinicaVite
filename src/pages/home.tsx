import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Paper, CircularProgress, Card, CardContent, Avatar } from '@mui/material';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs'; // Asegúrate de tener instalada esta librería

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

const Inicio: React.FC = () => {
  interface Profesional {
    _id: string;
    nombre1: string;
    apellPat: string;
  }

  interface Pieza {
    diente: string;
    parte: string;
  }

  interface Tratamiento {
    pieza: Pieza;
    detalle: string;
    fecha: string;
    profesional: Profesional;
  }

  interface Cita {
    _id: string;
    tratamientos: Tratamiento[];
  }

  interface OdontogramaResponse {
    message: string;
    body: Cita[];
  }

  const [tratamientosDataAnual, setTratamientosDataAnual] = useState<any[]>([]);
  const [tratamientosDataMensual, setTratamientosDataMensual] = useState<any[]>([]);
  const [tratamientosPorProfesional, setTratamientosPorProfesional] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalPacientes, setTotalPacientes] = useState<number>(0);
  const [totalCitas, setTotalCitas] = useState<number>(0);
  const [totalTratamientos, setTotalTratamientos] = useState<number>(0);

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/odontogramas');
        const citas: Cita[] = response.data.body;

        // Tratamientos por año
        const tratamientosAnuales = citas.flatMap(cita => cita.tratamientos);
        const tratamientosCountAnual = tratamientosAnuales.reduce((acc: any, tratamiento: any) => {
          acc[tratamiento.detalle] = (acc[tratamiento.detalle] || 0) + 1;
          return acc;
        }, {});
        const dataTratamientosAnual = Object.keys(tratamientosCountAnual).map(key => ({
          name: key,
          value: tratamientosCountAnual[key],
           // Simular datos adicionales de ejemplo
       

        }));
        setTratamientosDataAnual(dataTratamientosAnual);

        // Tratamientos por mes
        const mesActual = dayjs().month();
        const tratamientosMensuales = tratamientosAnuales.filter(tratamiento => dayjs(tratamiento.fecha).month() === mesActual);
        const tratamientosCountMensual = tratamientosMensuales.reduce((acc: any, tratamiento: any) => {
          acc[tratamiento.detalle] = (acc[tratamiento.detalle] || 0) + 1;
          return acc;
        }, {});
        const dataTratamientosMensual = Object.keys(tratamientosCountMensual).map(key => ({
          name: key,
          value: tratamientosCountMensual[key],
        }));
        setTratamientosDataMensual(dataTratamientosMensual);

        // Tratamientos por profesional
        const tratamientosPorProfesionalCount = tratamientosAnuales.reduce((acc: any, tratamiento: Tratamiento) => {
          const profesional = `${tratamiento.profesional.nombre1} ${tratamiento.profesional.apellPat}`;
          acc[profesional] = (acc[profesional] || 0) + 1;
          return acc;
        }, {});
        const dataTratamientosPorProfesional = Object.keys(tratamientosPorProfesionalCount).map(key => ({
          name: key,
          value: tratamientosPorProfesionalCount[key],
        }));
        setTratamientosPorProfesional(dataTratamientosPorProfesional);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      <Typography variant="h5" gutterBottom sx={{ fontWeight: 'light', fontSize: '1.5rem', color: '#333' }}>
        Bienvenido al Dashboard
      </Typography>

      {error && (
        <Typography color="error" variant="body1" gutterBottom>
          {error}
        </Typography>
      )}

      <Grid container spacing={3} mt={2}>
        {/* Gráfico de tratamientos por año */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: '8px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Tratamientos por Año
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <PieChart width={250} height={250}>
                <Pie
                  data={tratamientosDataAnual}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tratamientosDataAnual.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </Paper>
        </Grid>

        {/* Gráfico de tratamientos por mes */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: '8px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Tratamientos por Mes
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <PieChart width={250} height={250}>
                <Pie
                  data={tratamientosDataMensual}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {tratamientosDataMensual.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            )}
          </Paper>
        </Grid>

        {/* Gráfico de barras de tratamientos por profesional */}
        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: '8px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Tratamientos por Profesional
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={tratamientosPorProfesional}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#00C49F" />
                </BarChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      
      <Grid container spacing={3} mt={2}>
        {/* Contadores */}
        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardContent>
              <Avatar sx={{ bgcolor: '#0088FE', margin: 'auto' }}>P</Avatar>
              <Typography variant="h6" gutterBottom>Total Pacientes</Typography>
              <Typography variant="h4">{totalPacientes}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardContent>
              <Avatar sx={{ bgcolor: '#00C49F', margin: 'auto' }}>C</Avatar>
              <Typography variant="h6" gutterBottom>Total Citas</Typography>
              <Typography variant="h4">{totalCitas}</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
            <CardContent>
              <Avatar sx={{ bgcolor: '#FF8042', margin: 'auto' }}>T</Avatar>
              <Typography variant="h6" gutterBottom>Total Tratamientos</Typography>
              <Typography variant="h4">{totalTratamientos}</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Gráficos existentes */}
        <Grid item xs={12} sm={4}>
          {/* Pie chart anual */}
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* Pie chart mensual */}
        </Grid>

        <Grid item xs={12} sm={4}>
          {/* Bar chart por profesional */}
        </Grid>

        {/* Gráfico de línea - Progreso mensual */}
        <Grid item xs={12} sm={12}>
          <Paper
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: '8px',
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 'medium', fontSize: '1rem', color: '#555' }}
            >
              Progreso Mensual de Tratamientos
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={tratamientosDataMensual}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#FF8042" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
    </Box>
  );
};

export default Inicio;
