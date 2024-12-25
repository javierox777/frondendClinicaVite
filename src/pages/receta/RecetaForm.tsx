import { Delete } from '@mui/icons-material';
import {
  AppBar,
  Autocomplete,
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useUser } from '../../auth/userContext';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Company } from '../../interfaces/Company';
import { Institution } from '../../interfaces/Institution';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { ShortModel } from '../../interfaces/ShortModel';
import { User } from '../../interfaces/User';
import colors from '../../styles/colors';
import { Receipt } from '../../interfaces/Receipt';
import { format } from 'date-fns';

interface FormData {
  estado: string;
  profesional: string;
  empresa: string;
  fechaRegistro: string;
  direccion: string;
  persona: string;
}

interface ILibretaDireccion {
  _id: string;
  nombre: string;
  tipoDireccion: string;
  ciudad: string;
  persona: string;
  vigente: string;
}

interface Props {
  onSuccess?: () => void;
  receipt?: Receipt;
}

const fraction = [
  { id: 1, label: 'C/1', value: 'C/1' },
  { id: 2, label: 'C/2', value: 'C/2' },
  { id: 3, label: 'C/3', value: 'C/3' },
  { id: 4, label: 'C/4', value: 'C/4' },
  { id: 5, label: 'C/5', value: 'C/5' },
  { id: 6, label: 'C/6', value: 'C/6' },
  { id: 7, label: 'C/7', value: 'C/7' },
  { id: 8, label: 'C/8', value: 'C/8' },
  { id: 9, label: 'C/9', value: 'C/9' },
  { id: 10, label: 'C/10', value: 'C/10' },
  { id: 11, label: 'C/11', value: 'C/11' },
  { id: 12, label: 'C/12', value: 'C/12' },
  { id: 13, label: 'C/13', value: 'C/13' },
  { id: 14, label: 'C/14', value: 'C/14' },
  { id: 15, label: 'C/15', value: 'C/15' },
  { id: 16, label: 'C/16', value: 'C/16' },
  { id: 17, label: 'C/17', value: 'C/17' },
  { id: 18, label: 'C/18', value: 'C/18' },
  { id: 19, label: 'C/19', value: 'C/19' },
  { id: 20, label: 'C/20', value: 'C/20' },
  { id: 21, label: 'C/21', value: 'C/21' },
  { id: 22, label: 'C/22', value: 'C/22' },
  { id: 23, label: 'C/23', value: 'C/23' },
  { id: 24, label: 'C/24', value: 'C/24' },
];

const RecetaForm = ({ onSuccess, receipt }: Props) => {
  const { user } = useUser();
  const { mode } = useThemeContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    estado: '',
    profesional: '',
    empresa: '',
    fechaRegistro: '',
    direccion: '',
    persona: '',
  });

  const [details, setDetails] = useState([
    {
      objeto: '',
      dias: 0,
      intervalo: '',
      _id: (Math.random() * 1000).toString(),
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
      if (formData.persona) {
        const response = await axios.get(
          `${generalConfig.baseUrl}/address-book/getaddresses/${formData.persona}`
        );

        return response.data.body;
      } else {
        return null;
      }
    },
  });

  const { data: statuses, isLoading} = useQuery({
    queryKey: ['statuses'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/statuses`);

      return response.data.body;
    },
  });

  const { data: receiptDetails, isLoading: receiptDetailsLoading } = useQuery({
    queryKey: ['details', receipt],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/receipt-details/getreceiptdetails/${receipt!._id}`
      );
      setDetails(response.data.body);
      return response.data.body;
    },
  }); //NO BORRAR, SI BIEN NO ESTAN SIENDO USADOS Y LEIDOS, ESTA FUNCION TIENE UNA TAREA DE FETCHEAR LOS DETALLES A LA BASE DE DATOS DE LA RECETA

  const handleDetailChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    field: 'objeto' | 'dias' | 'intervalo',
    index: number
  ) => {
    const updatedDetails = [...details];
    const inputValue = e.target.value;

    if (field === 'dias') {
      // Convert the input value to a number
      const newValue =
        inputValue === '0' || (!isNaN(Number(inputValue)) && inputValue !== '')
          ? Number(inputValue)
          : 0;

      updatedDetails[index][field] = newValue;
      setDetails(updatedDetails);
    } else {
      updatedDetails[index][field] = e.target.value;
      setDetails(updatedDetails);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);

      if (receipt) {
        const newData = {
          estado: formData.estado,
          profesional: (user as User).profesionalId,
          empresa: formData.empresa,
          fechaRegistro: new Date(formData.fechaRegistro),
          direccion: formData.direccion,
          persona: formData.persona,
          detalles: details,
        };
        const response = await axios.patch(
          `${generalConfig.baseUrl}/receipt/${receipt._id}`,
          newData
        );
        if (response.data.message === 'success') {
          toast.success('Receta actualizada');
          setSubmitting(false);
        }
      } else {
        const newData = {
          estado: formData.estado,
          profesional: (user as User).profesionalId,
          empresa: formData.empresa,
          fechaRegistro: new Date(formData.fechaRegistro),
          direccion: formData.direccion,
          persona: formData.persona,
          detalles: details,
        };

        const response = await axios.post(
          `${generalConfig.baseUrl}/receipt`,
          newData
        );

        if (response.data.message === 'success') {
          toast.success('Nueva receta registrada');
          setSubmitting(false);
          setFormData({
            estado: '',
            profesional: '',
            empresa: '',
            fechaRegistro: '',
            direccion: '',
            persona: '',
          });
          setDetails([
            {
              objeto: '',
              dias: 0,
              intervalo: '',
              _id: (Math.random() * 1000).toString(),
            },
          ]);
        }
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.log(error);
      setSubmitting(false);
      toast.error('No se pudo registrar receta, inténtelo nuevamente');
    }
  };

  useEffect(() => {
    if (receipt) {
      setFormData({
        estado: receipt.estado as string,
        profesional: (receipt.profesional as Professional)._id,
        empresa: (receipt.empresa as Company)._id,
        fechaRegistro: format(new Date(receipt.fechaRegistro), 'yyyy-MM-dd'),
        direccion: receipt.direccion,
        persona: (receipt.persona as Person)._id,
      });
    }
  }, [receipt]);

  return (
    <>
      <form onSubmit={handleSubmit}>
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
                  defaultValue={receipt?.persona as Person}
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
                required
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
                  defaultValue={receipt?.empresa as Company}
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
                    fechaRegistro: e.target.value,
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
                    estado: e.target.value,
                  }))
                }
                required
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
                        _id: (Math.random() * 1000).toString(),
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
          {receiptDetailsLoading && (
            <Grid item xs={12}>
              <LinearProgress />
            </Grid>
          )}
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
                  {details.map((d, index) => {
                    return (
                      <TableRow key={d._id}>
                        <TableCell>
                          <FormControl fullWidth>
                            <TextField
                              value={d.objeto}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleDetailChange(e, 'objeto', index);
                              }}
                              required
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <InputLabel id="fraction-select-label">
                              Fracción
                            </InputLabel>
                            <Select
                              required
                              label="fraction"
                              id="fraction-select"
                              labelId="fraction-select-label"
                              onChange={(e: SelectChangeEvent<string>) => {
                                handleDetailChange(e, 'intervalo', index);
                              }}
                              value={d.intervalo}
                            >
                              {fraction.map((f) => {
                                return (
                                  <MenuItem key={f.id} value={f.value}>
                                    {f.label}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <FormControl fullWidth>
                            <TextField
                              required
                              value={d.dias}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleDetailChange(e, 'dias', index);
                              }}
                            />
                          </FormControl>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              const updatedDetails = details.filter(
                                (dt) => dt._id !== d._id
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              type="submit"
              disabled={isSubmitting}
            >
              {!receipt && 'Crear receta'}
              {receipt && 'Editar receta'}
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default RecetaForm;
