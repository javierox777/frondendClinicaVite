import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
  Grid,
  Snackbar,
  Alert,
  AppBar,
  Toolbar,
  Typography,
  Autocomplete,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { useQuery } from '@tanstack/react-query';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { Company } from '../../interfaces/Company';
import { Institution } from '../../interfaces/Institution';
import { ShortModel } from '../../interfaces/ShortModel';
import { Professional } from '../../interfaces/Professional';
import { Delete } from '@mui/icons-material';

interface FormData {
  estado: string;
  profesional: string;
  empresa: string;
  fechaRegistro: Date | null;
  direccion: string;
  persona: string;
}

interface IProfesional {
  _id: string;
  apellMat: string;
  apellPat: string;
  celular: string;
  direccion: string;
  dv: string;
  email: string;
  nombre1: string;
  nombre2: string;
  rut: string;
}

interface IEmpresa {
  _id: string;
  vigencia: string;
  dv: string;
  razonSocial: string;
  direccion: string;
  rol: string;
  email: string;
  giro: string;
}

interface ILibretaDireccion {
  _id: string;
  nombre: string;
  tipoDireccion: string;
  ciudad: string;
  persona: string;
  vigente: string;
}

interface IPersona {
  _id: string;
  apellMat: string;
  apellPat: string;
  dv: string;
  fechaNac: Date;
  institucion: string;
  nacionalidad: string;
  nombre1: string;
  nombre2: string;
  rut: string;
  sexo: string;
  vigente: string;
  libretadireccions: ILibretaDireccion[];
}

interface RecetaFormProps {
  onSuccess: () => void;
}

const RecetaForm: React.FC<RecetaFormProps> = ({ onSuccess }) => {
  const { user } = useUser();
  const { mode } = useThemeContext();

  const [formData, setFormData] = useState<FormData>({
    estado: '',
    profesional: '',
    empresa: '',
    fechaRegistro: new Date(),
    direccion: '',
    persona: '',
  });

  const [details, setDetails] = useState([
    {
      objeto: '',
      dias: 0,
      intervalo: '',
      id: (Math.random() * 1000).toString(),
    },
  ]);

  const { data: persons, isLoading: personsLoading } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);

      return response.data.body;
    },
  });
  const { data: professionals, isLoading: professionalsLoading } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
      );

      return response.data.body;
    },
  });

  const { data: companies, isLoading: companiesLoading } = useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/companies`);

      return response.data.body;
    },
  });

  const { data: addresses, isLoading: addressesLoading } = useQuery({
    queryKey: ['addresses', formData.persona],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-book/getaddresses/${formData.persona}`
      );

      return response.data.body;
    },
  });

  const { data: statuses, isLoading: statusesLoading } = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/statuses`);

      return response.data.body;
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Datos de paciente</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          {persons && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                options={persons}
                // defaultValue={budget?.persona}
                renderInput={(params) => (
                  <TextField {...params} label="Paciente" />
                )}
                renderOption={(props, patient: Person) => (
                  <li {...props}>
                    <div className="flex justify-between w-full">
                      <span>
                        {patient.nombre1} {patient.apellPat}
                      </span>
                      <span
                        style={{
                          color:
                            mode === 'light'
                              ? colors.ligthModeSoftText
                              : colors.darkModeSoftText,
                        }}
                      >
                        {patient.rut}-{patient.dv}
                      </span>
                    </div>
                  </li>
                )}
                getOptionLabel={(patient: Person) => {
                  // Value selected with enter, right from the input
                  if (typeof patient === 'string') {
                    return patient;
                  }
                  // Regular patient
                  return `${patient.nombre1} ${patient.apellPat} ${patient.rut}-${patient.dv}`;
                }}
                onChange={(event, patient: Person | null) => {
                  if (patient)
                    setFormData((prevState) => ({
                      ...prevState,
                      persona: patient._id,
                    }));
                }}
              />
            </FormControl>
          )}
        </Grid>

        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <FormControl fullWidth>
            <InputLabel id="address-select-label">Dirección</InputLabel>
            <Select
              label="address"
              id="address-select"
              labelId="address-select-label"
              onChange={(e: SelectChangeEvent<string>) =>
                setFormData((prevState) => ({
                  ...prevState,
                  direccion: e.target.value,
                }))
              }
              value={formData.direccion}
            >
              {formData.direccion === '' && (
                <MenuItem disabled>Seleccione paciente</MenuItem>
              )}
              {addresses?.map((i: Institution) => {
                return (
                  <MenuItem key={i._id} value={i._id}>
                    {i.nombre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Datos de receta</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          {professionals && (
            <FormControl fullWidth>
              <InputLabel id="professional-select-label">
                Profesional
              </InputLabel>
              <Select
                label="professional"
                id="professional-select"
                labelId="professional-select-label"
                onChange={(e: SelectChangeEvent<string>) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    direccion: e.target.value,
                  }))
                }
                value={(user as User).profesionalId}
                disabled
              >
                {formData.direccion === '' && (
                  <MenuItem disabled>Seleccione paciente</MenuItem>
                )}
                {professionals?.map((p: Professional) => {
                  return (
                    <MenuItem key={p._id} value={p._id}>
                      {p.nombre1} {p.apellPat}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          {companies && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                // defaultValue={budget?.empresa}
                options={companies}
                renderInput={(params) => (
                  <TextField {...params} label="Clínica" />
                )}
                renderOption={(props, clinic: Company) => (
                  <li {...props}>
                    <div className="flex justify-between w-full">
                      <span>{clinic.razonSocial}</span>
                    </div>
                  </li>
                )}
                getOptionLabel={(clinic: Company) => {
                  // Value selected with enter, right from the input
                  if (typeof clinic === 'string') {
                    return clinic;
                  }
                  // Regular clinic
                  return `${clinic.razonSocial}`;
                }}
                onChange={(event, clinic: Company | null) => {
                  if (clinic)
                    setFormData((prevState) => ({
                      ...prevState,
                      empresa: clinic._id,
                    }));
                }}
              />
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <FormControl fullWidth>
            <TextField
              label="Fecha de registro"
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="date"
              onChange={(e) =>
                setFormData((prevState) => ({
                  ...prevState,
                  fechaRegistro: new Date(e.target.value),
                }))
              }
              value={formData.fechaRegistro}
              required
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <FormControl fullWidth>
            <InputLabel id="status-select-label">Estado</InputLabel>
            <Select
              label="status"
              id="status-select"
              labelId="status-select-label"
              onChange={(e: SelectChangeEvent<string>) =>
                setFormData((prevState) => ({
                  ...prevState,
                  direccion: e.target.value,
                }))
              }
              value={formData.estado}
            >
              {statuses?.map((i: ShortModel) => {
                return (
                  <MenuItem key={i._id} value={i._id}>
                    {i.nombre}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Medicamentos</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setDetails([
                    ...details,
                    {
                      objeto: '',
                      dias: 0,
                      intervalo: '',
                      id: (Math.random() * 1000).toString(),
                    },
                  ]);
                }}
              >
                {' '}
                Agregar detalle
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <TableContainer>
            <Table>
              <TableHead
                style={{
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeTableHead
                      : colors.darkModeTableHead,
                }}
              >
                <TableRow>
                  <TableCell>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        color:
                          mode === 'light'
                            ? colors.lightModeTableText
                            : 'white',
                      }}
                    >
                      Medicamento
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        color:
                          mode === 'light'
                            ? colors.lightModeTableText
                            : 'white',
                      }}
                    >
                      Fracción
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      style={{
                        fontWeight: 'bold',
                        color:
                          mode === 'light'
                            ? colors.lightModeTableText
                            : 'white',
                      }}
                    >
                      {' '}
                      Días
                    </Typography>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {details.map((d) => {
                  return (
                    <TableRow key={d.id}>
                      <TableCell>
                        <TextField value={d.objeto} />
                      </TableCell>
                      <TableCell>
                        <TextField value={d.intervalo} />
                      </TableCell>
                      <TableCell>
                        <TextField value={d.dias} />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          onClick={() => {
                            const updatedDetails = details.filter(
                              (dt) => dt.id !== d.id
                            );
                            setDetails(updatedDetails);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default RecetaForm;
