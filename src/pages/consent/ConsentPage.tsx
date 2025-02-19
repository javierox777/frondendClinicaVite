import React, { useEffect, useState } from 'react';
import { generalConfig } from '../../config';
import { ShortModel } from '../../interfaces/ShortModel';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import toast, { Toaster } from 'react-hot-toast';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Box,
  IconButton,
  Dialog,
  Slide,
} from '@mui/material';
import { Close, Delete } from '@mui/icons-material';
import { TransitionProps } from '@mui/material/transitions';
import { Consentment } from '../../interfaces/Consentment';
import { format } from 'date-fns';
import BudgetFormSkeleton from '../budgets/BudgetFormSkeleton';

interface Props {
  afterSubmit?: CallableFunction;
  open: boolean;
  onClose: CallableFunction;
  consentment?: Consentment;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ConsentForm = ({ afterSubmit, open, onClose, consentment }: Props) => {
  const { mode } = useThemeContext();

  // Estado para la fecha (en formato yyyy-MM-dd)
  const [registerDate, setRegisterDate] = useState('');

  const [pacienteId, setPacienteId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [companiesId, setCompaniesId] = useState('');
  const [profesionalId, setProfesionalId] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);
  // Estado para los detalles dinámicos
  const [detalles, setDetalles] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      diagnostico: '',
      tratamiento: '',
      posiblesComplicaciones: '',
    },
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );
      return response.data.body;
    },
  });

  const { data: consentmentDetails } = useQuery({
    queryKey: ['details', consentment],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/consentment-details/getdetails/${consentment?._id}`
      );
      return response.data.body;
    },
    enabled: !!consentment, // Solo ejecuta si existe consentment
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    // Concatenamos 'T00:00' para interpretar la fecha en hora local
    const fechaConHoraLocal = new Date(registerDate + 'T00:00');

    const consentData = {
      fechaRegistro: fechaConHoraLocal,
      persona: pacienteId,
      estado: statusId,
      empresa: companiesId,
      profesional: profesionalId,
      detalles,
    };

    setSubmitting(true);
    console.log('Enviando datos:', consentData);
    try {
      if (consentment) {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/consentments/${consentment._id}`,
          consentData
        );

        if (response.data.message === 'success') {
          toast.success('Consentimiento actualizado exitosamente');
          console.log('Consentimiento actualizado:', response.data);
          setSubmitting(false);
          if (afterSubmit) afterSubmit();
          onClose(); // Cierra el formulario al finalizar
        }
      } else {
        const response = await axios.post(
          `${generalConfig.baseUrl}/consentments`,
          consentData
        );
        if (response.status === 201) {
          toast.success('Consentimiento registrado exitosamente');
          console.log('Consentimiento registrado:', response.data);
          setSubmitting(false);
          if (afterSubmit) afterSubmit();
          onClose(); // Cierra el formulario al finalizar
        }
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('Error al registrar el consentimiento, inténtelo nuevamente');
      console.error('Error al registrar el consentimiento:', error);
    }
  };

  // Función para agregar una nueva fila de detalle
  const handleAgregarDetalles = () => {
    setDetalles([
      ...detalles,
      {
        _id: (Math.random() * 1000).toString(),
        diagnostico: '',
        tratamiento: '',
        posiblesComplicaciones: '',
      },
    ]);
  };

  // Función para actualizar un campo de un detalle
  const handleChangeDetalle = (
    index: number,
    field: 'diagnostico' | 'tratamiento' | 'posiblesComplicaciones',
    value: string
  ) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][field] = value;
    setDetalles(nuevosDetalles);
  };

  // Al cargar el componente, si hay consentimiento, se asignan los valores correspondientes
  useEffect(() => {
    if (consentment) {
      // Asumimos que las propiedades existen y tienen el formato correcto
      setProfesionalId((consentment.profesional as any)._id);
      setCompaniesId((consentment.empresa as any)._id);
      setPacienteId((consentment.persona as any)._id);
      // Corrige el formato de la fecha
      setRegisterDate(format(new Date(consentment.fechaRegistro), 'yyyy-MM-dd'));
      setStatusId(consentment.estado as string);
    }
    if (consentmentDetails) {
      setDetalles(consentmentDetails);
    }
  }, [consentment, consentmentDetails]);

  if (isLoading) {
    return (
      <Dialog open={open} TransitionComponent={Transition} onClose={() => onClose()} fullScreen>
        <Toolbar component={Paper} elevation={3} style={{ backgroundColor: 'teal' }}>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </Toolbar>
        <BudgetFormSkeleton />
      </Dialog>
    );
  }

  return (
    <>
      <Dialog open={open} TransitionComponent={Transition} onClose={() => onClose()} fullScreen>
        <Toolbar component={Paper} elevation={3} style={{ backgroundColor: 'teal' }}>
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </Toolbar>

        <Container>
          <Container style={{ marginTop: '20px' }}>
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Consentimiento Informado</Typography>
              </Toolbar>
            </AppBar>
            <Box mt={3} /> {/* Espacio hacia abajo */}
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                {/* Selección de Estado */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="status-label">Estado</InputLabel>
                    <Select
                      label="status"
                      required
                      id="status-select"
                      labelId="status-label"
                      onChange={(e: SelectChangeEvent<string>) => setStatusId(e.target.value)}
                      value={statusId}
                    >
                      {data?.statuses.map((s: ShortModel) => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.nombre}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Selección de Clínica */}
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="companies-label">Clínica</InputLabel>
                    <Select
                      label="companies"
                      required
                      id="companies-select"
                      labelId="companies-label"
                      onChange={(e: SelectChangeEvent<string>) => setCompaniesId(e.target.value)}
                      value={companiesId}
                    >
                      {data?.clinics?.map((s: any) => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.razonSocial}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Selección de Paciente */}
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="paciente-label">Paciente</InputLabel>
                    <Select
                      label="paciente"
                      required
                      id="paciente-select"
                      labelId="paciente-label"
                      onChange={(e: SelectChangeEvent<string>) => setPacienteId(e.target.value)}
                      value={pacienteId}
                    >
                      {data?.persons?.map((s: any) => (
                        <MenuItem key={s._id} value={s._id}>
                          {s.nombre1} {s.nombre2} {s.apellPat} {s.apellMat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Fecha de atención y Profesional */}
                <Grid item xs={6}>
                  <Typography variant="body1">En atención comenzada el día</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">con el/ la profesional</Typography>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <TextField
                      name="fechaAtencion"
                      type="date"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={registerDate}
                      onChange={(e) => setRegisterDate(e.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth>
                    <InputLabel id="profesional-label">Profesional</InputLabel>
                    <Select
                      label="profesional"
                      required
                      id="profesional-select"
                      labelId="profesional-label"
                      onChange={(e: SelectChangeEvent<string>) => setProfesionalId(e.target.value)}
                      value={profesionalId}
                    >
                      {data?.professionals?.map((s: any) => (
                        <MenuItem key={s._id} value={s._id}>
                        {s.nombre1} {s.nombre2} {s.apellPat} {s.apellMat}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                {/* Texto del consentimiento */}
                <Grid item xs={12}>
                  <Typography variant="body1">
                    He sido informado acerca de mi diagnóstico, pronóstico y plan de tratamiento, así como de sus posibles complicaciones
                    mencionadas en este documento. Por lo tanto, de forma consciente y voluntaria doy mi consentimiento y aprobación para que se
                    realice el tratamiento, teniendo pleno conocimiento de los posibles riesgos, complicaciones y beneficios.
                  </Typography>
                </Grid>
                {/* Botón para agregar filas dinámicas */}
                <Grid item xs={12}>
                  <Button variant="contained" color="primary" onClick={handleAgregarDetalles}>
                    Agregar Diagnóstico
                  </Button>
                </Grid>
                {/* Tabla de filas dinámicas */}
                <Grid item xs={12}>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Diagnóstico</TableCell>
                          <TableCell>Tratamiento</TableCell>
                          <TableCell>Complicaciones</TableCell>
                          <TableCell></TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {detalles.map((detalle, index) => (
                          <TableRow key={detalle._id}>
                            <TableCell>
                              <TextField
                                fullWidth
                                margin="normal"
                                value={detalle.diagnostico}
                                onChange={(e) =>
                                  handleChangeDetalle(index, 'diagnostico', e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                margin="normal"
                                value={detalle.tratamiento}
                                onChange={(e) =>
                                  handleChangeDetalle(index, 'tratamiento', e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                fullWidth
                                margin="normal"
                                value={detalle.posiblesComplicaciones}
                                onChange={(e) =>
                                  handleChangeDetalle(index, 'posiblesComplicaciones', e.target.value)
                                }
                              />
                            </TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => {
                                  const updatedDetails = detalles.filter(
                                    (d) => d._id !== detalle._id
                                  );
                                  setDetalles(updatedDetails);
                                }}
                              >
                                <Delete />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
                {/* Botón para enviar el formulario */}
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color={consentment ? 'success' : 'primary'}
                    fullWidth
                    style={{ marginBottom: 20 }}
                    disabled={isSubmitting}
                  >
                    {consentment ? 'Actualizar consentimiento' : 'Registrar consentimiento'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Container>
        </Container>
      </Dialog>
      <Toaster />
    </>
  );
};

export default ConsentForm;
