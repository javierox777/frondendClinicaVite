import { AddCircleOutline, Close, PlusOne } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { generalConfig } from '../../config';
import toast, { Toaster } from 'react-hot-toast';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  patient?: Person;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientForm = ({ open, onClose, patient }: Props) => {
  const { mode } = useThemeContext();

  //states

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [rut, setRut] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');
  const [selectedPrevision, setPrevision] = useState('');
  const [institution, setInstitution] = useState('');
  const [verificationDigit, setVerificationDigit] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);

  const [contacts, setContacts] = useState([
    {
      id: (Math.random() * 1000).toString(),
      descripcion: '',
      contacto_id: '',
      fechaReg: '',
      persona_id: '',
    },
  ]);
  const [addresses, setAddresses] = useState([
    {
      id: (Math.random() * 1000).toString(),
      tipoDireccion_id: '',
      ciudad_id: '',
      persona_id: '',
      nombre: '',
    },
  ]);

  //dynamic inputs functions
  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        id: (Math.random() * 1000).toString(),
        descripcion: '',
        contacto_id: '',
        fechaReg: '',
        persona_id: '',
      },
    ]);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        id: (Math.random() * 1000).toString(),
        tipoDireccion_id: '',
        ciudad_id: '',
        persona_id: '',
        nombre: '',
      },
    ]);
  };

  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'tipoDireccion_id' | 'ciudad_id' | 'nombre'
  ) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[rowIndex][field] = (e.target as HTMLInputElement).value;
    setAddresses(updatedAddresses);
  };

  const handleContactChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'descripcion' | 'contacto_id'
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[rowIndex][field] = (e.target as HTMLInputElement).value;
    setContacts(updatedContacts);
  };
  //dynamic inputs functions

  //select queries
  const { data: nationalities } = useQuery({
    queryKey: ['nationalities'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/nationalities`
      );

      return response.data.body;
    },
  });

  const { data: genders } = useQuery({
    queryKey: ['genders'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/gender`);

      return response.data.body;
    },
  });

  const { data: previsions } = useQuery({
    queryKey: ['previsions'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/previsions`);

      return response.data.body;
    },
  });

  const { data: institutions } = useQuery({
    queryKey: ['institutions', selectedPrevision],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/institutions`);

      return response.data.body.filter((i: any) => {
        return i.prevision_id === selectedPrevision;
      });
    },
  });

  const { data: cities } = useQuery({
    queryKey: ['cities'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/cities`);

      return response.data.body;
    },
  });

  const { data: contactTypes } = useQuery({
    queryKey: ['contactTypes'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/contacts`);

      return response.data.body;
    },
  });

  const { data: addressTypes } = useQuery({
    queryKey: ['addressType'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-types`
      );

      return response.data.body;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    setSubmitting(true);
    e.preventDefault();
    const data = {
      nombre1: firstName,
      nombre2: secondName,
      apellPat: firstSurname,
      apellMat: secondSurname,
      fechaNac: new Date(birthday).toISOString(),
      institucion_id: institution,
      sexo_id: gender,
      nacionalidad_id: nationality,
      rut: rut,
      dv: verificationDigit,
    };

    if (patient) {
      const response = await axios.patch(
        `${generalConfig.baseUrl}/persons/${patient.id}`,
        data
      );

      if (response.data.message === 'success') {
        toast.success('Se ha actualizado paciente.');
        setFirstName('');
        setSecondName('');
        setFirstSurname('');
        setSecondSurname('');
        setRut('');
        setNationality('');
        setGender('');
        setBirthday('');
        setPrevision('');
        setInstitution('');
        setVerificationDigit('');
        setSubmitting(false);
      } else {
        setSubmitting(false);
        toast.error('No se ha actualizado paciente, inténtelo nuevamente.');
      }
    } else {
      const response = await axios.post(
        `${generalConfig.baseUrl}/persons`,
        data
      );

      if (response.data.message === 'success') {
        toast.success('Se ha registrado un paciente.');
        setFirstName('');
        setSecondName('');
        setFirstSurname('');
        setSecondSurname('');
        setRut('');
        setNationality('');
        setGender('');
        setBirthday('');
        setPrevision('');
        setInstitution('');
        setVerificationDigit('');
        setSubmitting(false);
      } else {
        setSubmitting(false);
        toast.error('No se ha registrado paciente, inténtelo nuevamente.');
      }
    }
  };

  useEffect(() => {
    if (patient) {
      setFirstName(patient.nombre1);
      setSecondName(patient.nombre2);
      setFirstSurname(patient.apellPat);
      setSecondSurname(patient.apellMat);
      setRut(patient.rut);
      setNationality(patient.nacionalidad_id);
      setGender(patient.sexo_id);
      setBirthday(patient.fechaNac.toLocaleString());
      setPrevision(patient.institucion.prevision_id);
      setInstitution(patient.institucion_id);
      setVerificationDigit(patient.dv);
    }
  }, [patient]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
        fullScreen
      >
        <form onSubmit={handleSubmit}>
          <Toolbar
            component={Paper}
            elevation={3}
            style={{ backgroundColor: 'teal' }}
          >
            <IconButton onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Toolbar>
          <Container>
            <Typography className="p-3">
              Rellene todos los datos para registrar nuevo paciente
            </Typography>
          </Container>
          <Container className="p-5">
            <Grid container spacing={5}>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Nombre"
                    fullWidth
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Segundo nombre"
                    fullWidth
                    onChange={(e) => setSecondName(e.target.value)}
                    value={secondName}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Apellido paterno"
                    fullWidth
                    onChange={(e) => setFirstSurname(e.target.value)}
                    value={firstSurname}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Apellido Materno"
                    fullWidth
                    onChange={(e) => setSecondSurname(e.target.value)}
                    value={secondSurname}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Grid container direction="row" alignItems="center">
                  <FormControl style={{ width: '60%' }}>
                    <TextField
                      label="RUT"
                      onChange={(e) => setRut(e.target.value)}
                      value={rut}
                      required
                    />
                  </FormControl>
                  <Typography style={{ marginInline: 4 }}> - </Typography>
                  <FormControl style={{ width: '30%' }}>
                    <TextField
                      label="Dígito verificador"
                      onChange={(e) => setVerificationDigit(e.target.value)}
                      inputProps={{ maxLength: 1 }}
                      value={verificationDigit}
                      required
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Fecha de nacimiento"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="date"
                    onChange={(e) => setBirthday(e.target.value)}
                    value={birthday}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="nationality-select-label">
                    Nacionalidad
                  </InputLabel>
                  <Select
                    label="nationalities"
                    id="nationality-select"
                    labelId="nationality-select-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setNationality(e.target.value)
                    }
                    value={nationality}
                  >
                    {nationalities?.map((n: any) => {
                      return (
                        <MenuItem key={n.id} value={n.id}>
                          {n.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="gender-select-label">Sexo</InputLabel>
                  <Select
                    label="Sexo"
                    id="gender-select"
                    labelId="gender-select-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setGender(e.target.value)
                    }
                    value={gender}
                  >
                    {genders?.map((g: any) => {
                      return (
                        <MenuItem key={g.id} value={g.id}>
                          {g.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="prevision-select-label">Previsión</InputLabel>
                  <Select
                    label="prevision"
                    id="prevision-select"
                    labelId="prevision-select-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setPrevision(e.target.value)
                    }
                    value={selectedPrevision}
                  >
                    {previsions?.map((p: any) => {
                      return (
                        <MenuItem key={p.id} value={p.id}>
                          {p.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <InputLabel id="institution-select-label">
                    Institución
                  </InputLabel>
                  <Select
                    label="institution"
                    id="institution-select"
                    labelId="institution-select-label"
                    onChange={(e: SelectChangeEvent<string>) =>
                      setInstitution(e.target.value)
                    }
                    value={institution}
                  >
                    {selectedPrevision === '' && (
                      <MenuItem>Seleccione previsión</MenuItem>
                    )}
                    {institutions?.map((i: any) => {
                      return (
                        <MenuItem key={i.id} value={i.id}>
                          {i.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ marginBottom: 10 }}
                >
                  <Typography style={{ fontWeight: 'bold' }}>
                    Contactos
                  </Typography>
                  <IconButton onClick={handleAddContact}>
                    <AddCircleOutline />
                  </IconButton>
                </Box>
                {contacts.length === 0 && (
                  <Box>
                    <Typography>
                      Haz click en el icono para agregar contactos
                    </Typography>
                  </Box>
                )}
                {contacts.map((c: any, index: number) => {
                  return (
                    <Grid
                      container
                      key={c.id}
                      spacing={2}
                      style={{ marginBottom: 5 }}
                      alignItems="center"
                    >
                      <Grid item xs={5}>
                        <FormControl fullWidth>
                          <InputLabel id="contacts-select-label">
                            Tipo de contacto
                          </InputLabel>
                          <Select
                            label="contacts"
                            id="contacts-select"
                            labelId="contacts-select-label"
                            onChange={(e: SelectChangeEvent<string>) =>
                              handleContactChange(e, index, 'contacto_id')
                            }
                            value={c.contacto_id}
                          >
                            {contactTypes?.map((c: any) => {
                              return (
                                <MenuItem key={c.id} value={c.id}>
                                  {c.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <TextField
                            label="Contacto"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              handleContactChange(e, index, 'descripcion');
                              console.log(contacts);
                            }}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={1}>
                        <IconButton
                          onClick={() => {
                            const updatedContacts = contacts.filter(
                              (contact) => {
                                return c.id !== contact.id;
                              }
                            );
                            setContacts(updatedContacts);
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ marginBottom: 10 }}
                >
                  <Typography style={{ fontWeight: 'bold' }}>
                    Libreta de dirección
                  </Typography>
                  <IconButton onClick={handleAddAddress}>
                    <AddCircleOutline />
                  </IconButton>
                </Box>
                {addresses.length === 0 && (
                  <Box>
                    <Typography>
                      Haz click en el icono para agregar direcciones
                    </Typography>
                  </Box>
                )}
                {addresses.map((a: any, index) => {
                  return (
                    <Grid
                      container
                      key={a.id}
                      spacing={2}
                      className="rounded-md pb-2 pr-4 mb-10"
                      style={{
                        border: '1px solid',
                        borderColor:
                          mode === 'light'
                            ? colors.lightModeBorder
                            : colors.darkModeBorder,
                      }}
                      alignItems="center"
                    >
                      <Grid item xs={12}>
                        <IconButton
                          onClick={() => {
                            const updatedAddresses = addresses.filter(
                              (address) => {
                                return a.id !== address.id;
                              }
                            );
                            setAddresses(updatedAddresses);
                          }}
                        >
                          <Close />
                        </IconButton>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="addresstype-select-label">
                            Tipo de dirección
                          </InputLabel>
                          <Select
                            label="addresstype"
                            id="addresstype-select"
                            labelId="addresstype-select-label"
                            onChange={(e: SelectChangeEvent<string>) => {
                              handleAddressChange(e, index, 'tipoDireccion_id');
                            }}
                            value={a.tipoDireccion_id}
                          >
                            {addressTypes?.map((at: any) => {
                              return (
                                <MenuItem key={at.id} value={at.id}>
                                  {at.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl fullWidth>
                          <InputLabel id="contacts-select-label">
                            Cuidad
                          </InputLabel>
                          <Select
                            label="city"
                            id="city-select"
                            labelId="city-select-label"
                            onChange={(e: SelectChangeEvent<string>) => {
                              handleAddressChange(e, index, 'ciudad_id');
                            }}
                            // value={institution}
                          >
                            {/* {selectedPrevision === '' && (
                              <MenuItem>Seleccione Tipo de contacto</MenuItem>
                            )} */}
                            {cities?.map((c: any) => {
                              return (
                                <MenuItem key={c.id} value={c.id}>
                                  {c.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <TextField
                            label="Dirección"
                            onChange={(e: ChangeEvent<HTMLInputElement>) => {
                              handleAddressChange(e, index, 'nombre');
                            }}
                          />
                        </FormControl>
                      </Grid>
                    </Grid>
                  );
                })}
              </Grid>
              <Grid item xs={12}></Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {!patient && 'Registrar nuevo paciente'}
                    {patient && 'Actualizar paciente'}
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
      <Toaster />
    </>
  );
};

export default PatientForm;
