import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Paper,
  CircularProgress,
  Card,
  CardContent,
  Avatar,
  Button,
} from '@mui/material';
import axios from 'axios';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  LabelList,
  ResponsiveContainer,
} from 'recharts';
import dayjs from 'dayjs';
import authStorage from '../auth/storage';
import { useNavigate } from 'react-router-dom';
import HistorialCitasModal from './HistorialCitasModal';
import { generalConfig } from '../config';

import { RadialBarChart, RadialBar } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF69B4'];

interface HorizontalBarChartProps {
  data: { name: string; value: number }[];
}
const baseUrl = generalConfig.baseUrl;

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
  const [tratamientosDataMensual, setTratamientosDataMensual] = useState<any[]>(
    []
  );
  const [tratamientosPorProfesional, setTratamientosPorProfesional] = useState<
    any[]
  >([]);

  const [tratamientosTodosProfesionales, setTratamientosTodosProfesionales] =
    useState<any[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalCitas, setTotalCitas] = useState<number>(0);
  const [totalPassCitas, setPassTotalCitas] = useState<number>(0);
  const [totadasPassCitas, setPassTotasCitas] = useState<[]>([]);

  const [totalTratamientos, setTotalTratamientos] = useState<number>(0);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate(); // Instanciar el hook
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const fetchCitas = async () => {
      try {
        const loggedUser = await authStorage.getUser();
        await setUser(loggedUser);
        const response = await axios.get(`${baseUrl}/odontogramas`);
        const citas: Cita[] = response.data.body;

        //citas para hoy filtrada por medico
        const data = await axios.get(
          `${baseUrl}/appointments/idprofesional/${loggedUser?.profesionalId}`
        );
        setTotalCitas(data.data.body.length);

        //historial de citas del año apartir de ayer
        const citasResponse = await axios.get(
          `${baseUrl}/appointments/idpassprofesional/${loggedUser?.profesionalId}`
        );
        setPassTotalCitas(citasResponse.data.body.length);
        setPassTotasCitas(citasResponse.data.body);
        // Tratamientos por año
        const tratamientosAnuales = citas.flatMap((cita) => cita.tratamientos);
        const tratamientosCountAnual = tratamientosAnuales.reduce(
          (acc: any, tratamiento: any) => {
            acc[tratamiento.detalle] = (acc[tratamiento.detalle] || 0) + 1;
            return acc;
          },
          {}
        );
        const dataTratamientosAnual = Object.keys(tratamientosCountAnual).map(
          (key) => ({
            name: key,
            value: tratamientosCountAnual[key],
            // Simular datos adicionales de ejemplo
          })
        );
        setTratamientosDataAnual(dataTratamientosAnual);

        const tratamientosDataAnualFiltrados = tratamientosDataAnual.filter(
          (tratamiento) => tratamiento.profesionalId === user?.profesionalId
        );

        // Tratamientos por mes
        const mesActual = dayjs().month();
        const tratamientosMensuales = tratamientosAnuales.filter(
          (tratamiento) => {
            dayjs(tratamiento.fecha).month() === mesActual;
          }
        );
        const tratamientosCountMensual = tratamientosMensuales.reduce(
          (acc: any, tratamiento: any) => {
            acc[tratamiento.detalle] = (acc[tratamiento.detalle] || 0) + 1;
            return acc;
          },
          {}
        );
        const dataTratamientosMensual = Object.keys(
          tratamientosCountMensual
        ).map((key) => ({
          name: key,
          value: tratamientosCountMensual[key],
        }));
        setTratamientosDataMensual(dataTratamientosMensual);

        // Tratamientos por profesional
        // Filtrar tratamientos por el profesional logueado
        const tratamientosFiltrados = tratamientosAnuales.filter(
          (tratamiento) =>
            tratamiento.profesional._id === loggedUser?.profesionalId
        );

        const tratamientosPorTodosProfesionalesCount =
          tratamientosAnuales.reduce((acc: any, tratamiento: Tratamiento) => {
            const profesional = `${tratamiento.profesional.nombre1} ${tratamiento.profesional.apellPat}`;
            acc[profesional] = (acc[profesional] || 0) + 1;
            return acc;
          }, {});

        const dataTratamientosTodosProfesionales = Object.keys(
          tratamientosPorTodosProfesionalesCount
        ).map((key) => ({
          name: key,
          value: tratamientosPorTodosProfesionalesCount[key],
          description: `Tratamientos realizados por ${key}: ${tratamientosPorTodosProfesionalesCount[key]}`,
        }));

        setTratamientosTodosProfesionales(dataTratamientosTodosProfesionales);

        // Contar los tratamientos solo del profesional logueado
        const tratamientosPorProfesionalCount = tratamientosFiltrados.reduce(
          (acc: any, tratamiento: Tratamiento) => {
            const profesional = `${tratamiento.profesional.nombre1} ${tratamiento.profesional.apellPat}`;
            acc[profesional] = (acc[profesional] || 0) + 1;
            return acc;
          },
          {}
        );

        // Mapear los datos al formato requerido por recharts
        const dataTratamientosPorProfesional = Object.keys(
          tratamientosPorProfesionalCount
        ).map((key) => ({
          name: key,
          value: tratamientosPorProfesionalCount[key],
          description: `Tratamientos realizados por ${key}: ${tratamientosPorProfesionalCount[key]}`,
        }));

        // Actualizar el estado con los datos filtrados
        setTratamientosPorProfesional(dataTratamientosPorProfesional);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        // setError('Error fetching data');
        setLoading(false);
      }
    };

    fetchCitas();
  }, []);
  const handleRedirect = () => {
    navigate('/agenda');
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, textAlign: 'center' }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 'light', fontSize: '1.5rem', color: '#333' }}
      >
        Bienvenido al Dashboard
      </Typography>

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
              Tratamientos por Año (Usuario)
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={tratamientosDataAnual}
                  layout="vertical"
                  margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    tick={{ fontSize: 12 }}
                    width={100}
                  />
                  <XAxis type="number" />
                  <Tooltip formatter={(value) => `${value} tratamientos`} />
                  <Bar dataKey="value" fill="#8884d8" barSize={20}>
                    <LabelList dataKey="value" position="insideRight" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
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
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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
              Tratamientos por Dentista
            </Typography>
            {loading ? (
              <CircularProgress />
            ) : !loading && user.role === 'user' ? (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={tratamientosPorProfesional}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  {/* Grid para líneas de referencia */}
                  <CartesianGrid strokeDasharray="3 3" />

                  {/* Eje Y: Muestra los nombres */}
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12 }}
                  />

                  {/* Eje X: Muestra valores */}
                  <XAxis type="number" />

                  {/* Tooltip: Info dinámica al pasar el mouse */}
                  <Tooltip formatter={(value) => `${value} tratamientos`} />

                  {/* Leyenda debajo del gráfico */}
                  <Legend verticalAlign="top" />

                  {/* Barras con colores personalizados */}
                  <Bar dataKey="value" fill="#00C49F" barSize={20}>
                    {/* Etiquetas dentro de las barras */}
                    <LabelList dataKey="value" position="insideRight" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height={250}>
                <BarChart
                  data={tratamientosTodosProfesionales}
                  layout="vertical"
                  margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 10,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={150}
                    tick={{ fontSize: 12 }}
                  />
                  <XAxis type="number" />
                  <Tooltip formatter={(value) => `${value} tratamientos`} />
                  <Legend verticalAlign="top" />
                  <Bar dataKey="value" fill="#FFBB28" barSize={20}>
                    <LabelList dataKey="value" position="insideRight" />
                  </Bar>
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
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
                height: '100%',
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: '#0088FE', margin: 'auto' }}>P</Avatar>
                <Typography variant="h6" gutterBottom onClick={handleOpenModal}>
                  Total Historial citas Del Año
                </Typography>

                <HistorialCitasModal
                  open={modalOpen}
                  onClose={handleCloseModal}
                  visitas={totadasPassCitas}
                />

                <Typography variant="h4">{totalPassCitas}</Typography>
                <Button
                  onClick={handleOpenModal}
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#4caf50', // Color de fondo
                    color: '#fff', // Color del texto
                    padding: '10px 20px', // Relleno alrededor del texto
                    borderRadius: '20px', // Bordes redondeados
                    fontWeight: 'bold', // Negrita
                    textTransform: 'none', // Evitar que el texto sea todo mayúsculas
                    fontSize: '1rem', // Tamaño de fuente
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra ligera
                    transition: 'background-color 0.3s ease', // Transición suave para el hover
                    '&:hover': {
                      backgroundColor: '#388e3c', // Color de fondo al pasar el mouse
                    },
                  }}
                >
                  Ver Historial de Citas
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
                height: '100%',
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: '#00C49F', margin: 'auto' }}>C</Avatar>
                <Typography variant="h6" gutterBottom>
                  Citas Para Hoy
                </Typography>

                <Typography variant="h4">{totalCitas}</Typography>
                <Button
                  onClick={handleRedirect}
                  variant="contained"
                  color="primary"
                  sx={{
                    backgroundColor: '#4caf50', // Color de fondo
                    color: '#fff', // Color del texto
                    padding: '10px 20px', // Relleno alrededor del texto
                    borderRadius: '20px', // Bordes redondeados
                    fontWeight: 'bold', // Negrita
                    textTransform: 'none', // Evitar que el texto sea todo mayúsculas
                    fontSize: '1rem', // Tamaño de fuente
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Sombra ligera
                    transition: 'background-color 0.3s ease', // Transición suave para el hover
                    '&:hover': {
                      backgroundColor: '#388e3c', // Color de fondo al pasar el mouse
                    },
                  }}
                >
                  Ver Citas Para Hoy
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                boxShadow: 3,
                transition: 'transform 0.3s',
                '&:hover': { transform: 'scale(1.05)' },
                height: '100%',
              }}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: '#FF8042', margin: 'auto' }}>T</Avatar>
                <Typography variant="h6" gutterBottom>
                  Total Tratamientos
                </Typography>
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
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="10%"
                    outerRadius="80%"
                    barSize={10}
                    data={tratamientosDataAnual}
                  >
                    <RadialBar background dataKey="value" fill="#FF8042" />
                    <Tooltip
                      formatter={(value, name, props) => [
                        value,
                        props.payload.name,
                      ]}
                    />
                    <Legend />
                  </RadialBarChart>
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
