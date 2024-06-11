import React, { useState } from 'react';
import { generalConfig } from '../../config';
// import Subform from '../patients/subForms/Subform';
import { ShortModel } from '../../interfaces/ShortModel';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import { LoggedUser, useUser } from '../../auth/userContext';
import { Budget } from '../../interfaces/Budget';

//Se agregó interfaz estado en el código
import { Status } from '../../interfaces/Status';
import { Company } from '../../interfaces/Company';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { useEstado, useCompanies, usePaciente, useProfesional } from './ConsentPage.api';
import toast, { Toaster } from 'react-hot-toast';

import {
  Autocomplete,
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
} from '@mui/material';



interface Props {
  open: boolean;
  onClose: CallableFunction;
  budget?: Budget;
  afterSubmit?: CallableFunction;
  status?: Status;
}

const ConsentForm = ({ onClose, open, budget, afterSubmit, status }: Props) => {
  const { mode } = useThemeContext();
  const { user } = useUser();
  
  const [registerDate, setRegisterDate] = useState('');
  const [subFormSubmitted, setSubFormSubmitted] = useState(false);
  
  const [pacienteId, setPacienteId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [companiesId, setCompaniesId] = useState('');
  const [profesionalId, setProfesionalId] = useState('');

  const { data: estados, isLoading: loadingEstados, isError: errorEstados } = useEstado();
  const { data: paciente, isLoading: loadingPaciente, isError: errorPaciente } = usePaciente();
  const { data: profesional, isLoading: loadingProfesional, isError: errorProfesional } = useProfesional();
  const { data: companies, isLoading: loadingCompanies, isError: errorCompanies } = useCompanies();

  const [detalles, setDetalles] = useState([
    {
      diagnostico: '',
      tratamiento: '',
      complicaciones: '',
    },
  ]);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['data', subFormSubmitted],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );
      return response.data.body;
    },
  });

  // Función para manejar el envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {

    event.preventDefault();
   
    const consentData = {
      registerDate,
      pacienteId,
      statusId,
      companiesId,
      profesionalId,
      //detalles,
    };

    console.log(consentData)
    try {
      const response = await axios.post(`${generalConfig.baseUrl}/consentments`, consentData, {
        /*headers: {
          'Authorization': `Bearer ${user?.token}`,  // Asumiendo que el token se almacena en el usuario autenticado
        },*/
      });
      if (response.status === 201) {
        console.log('Consentimiento registrado exitosamente:', response.data);
        if (afterSubmit) {
          afterSubmit(); // Llamar función después del envío, si está definida
        }
      }
    } catch (error) {
      console.error('Error al registrar el consentimiento:', error);
    }
  };

  const handleAgregarDetalles = () => {
    setDetalles([
      ...detalles,
      {
        diagnostico: '',
        tratamiento: '',
        complicaciones: '',
      },
    ]);
  };

  const handleChangeDetalle = (index: number, field: string, value: string) => {
    const nuevosDetalles = [...detalles];
    nuevosDetalles[index][field] = value;
    setDetalles(nuevosDetalles);
  };

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <div>
      <Container>
        <Container maxWidth="sm" style={{ marginTop: '20px' }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6">Consentimiento Informado</Typography>
            </Toolbar>
          </AppBar>
          <Box mt={3} /> {/* Espacio hacia abajo */}
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="status-label">Estado</InputLabel>
                  <Select
                    label="status"
                    required
                    id="status-select"
                    labelId="status-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setStatusId(e.target.value)
                    }
                    value={statusId}
                  >
                    {estados?.map((s: ShortModel) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="companies-label">Clinica</InputLabel>
                  <Select
                    label="companies"
                    required
                    id="companies-select"
                    labelId="companies-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setCompaniesId(e.target.value)
                    }
                    value={companiesId}
                  >
                    {companies?.map((s: Company) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.razonSocial}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  Por medio del presente consentimiento, Yo
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="paciente-label">Paciente</InputLabel>
                  <Select
                    label="paciente"
                    required
                    id="paciente-select"
                    labelId="paciente-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setPacienteId(e.target.value)
                    }
                    value={pacienteId}
                  >
                    {paciente?.map((s: Person) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.nombre1} {s.nombre2} {s.apellPat} {s.apellMat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">
                  En atención comenzada el día
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body1">con el/ la profesional</Typography>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    name="fechaAtencion"
                    label=""
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
                    onChange={(e: SelectChangeEvent<string>) =>
                      setProfesionalId(e.target.value)
                    }
                    value={profesionalId}
                  >
                    {profesional?.map((s: Professional) => (
                      <MenuItem key={s._id} value={s._id}>
                        {s.nombre1} {s.nombre2} {s.apellPat} {s.apellMat}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">
                  He sido informado a cerca de mi diagnóstico, pronóstico y plan
                  de tratamiento así como sus posibles complicaciones mencionadas
                  en este documento. Por lo tanto, de forma consciente y
                  voluntaria doy mi consentimiento y aprobación para que se
                  realice el tratamiento teniendo pleno conocimiento de los
                  posibles riesgos, complicaciones y beneficios que podría
                  desprenderse de dicho acto.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAgregarDetalles}
                >
                  Agregar Diagnóstico
                </Button>
              </Grid>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Diagnóstico</TableCell>
                        <TableCell>Tratamiento</TableCell>
                        <TableCell>Complicaciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {detalles.map((detalle, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <TextField
                              fullWidth
                              margin="normal"
                              value={detalle.diagnostico}
                              onChange={(e) =>
                                handleChangeDetalle(
                                  index,
                                  'diagnostico',
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              margin="normal"
                              value={detalle.tratamiento}
                              onChange={(e) =>
                                handleChangeDetalle(
                                  index,
                                  'tratamiento',
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                          <TableCell>
                            <TextField
                              fullWidth
                              margin="normal"
                              value={detalle.complicaciones}
                              onChange={(e) =>
                                handleChangeDetalle(
                                  index,
                                  'complicaciones',
                                  e.target.value
                                )
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Registrar Consentimiento
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Container>
    </div>
  );
};

export default ConsentForm;
