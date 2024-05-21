import {
  Add,
  AddCircleOutline,
  CheckCircle,
  Close,
  PlusOne,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Fab,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  Switch,
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
import { Address } from '../../interfaces/Address';
import { Contact } from '../../interfaces/Contact';

import { format, compareAsc } from 'date-fns';
import Subform from './subForms/Subform';
import { ShortModel } from '../../interfaces/ShortModel';
import { Institution } from '../../interfaces/Institution';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  patient?: Person;
  afterSubmit?: CallableFunction;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientForm = ({ open, onClose, patient, afterSubmit }: Props) => {
  const { mode } = useThemeContext();

  // estados para enviar a la api
  // ***********
  // ***********
  // ***********
  // ***********

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

  const [correspondingInstitutions, setCorrespondingInst] = useState([]);
  //estado que avisa si se ha agregado algun dato ya sea nacionalidad o sexo
  const [subFormSubmitted, setSubFormSubmitted] = useState(true);

  const [contacts, setContacts] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      descripcion: '',
      contacto: '',
      persona: '',
      vigente: '1',
    },
  ]);
  const [addresses, setAddresses] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      tipoDireccion: '',
      ciudad: '',
      persona: '',
      nombre: '',
      vigente: '1',
    },
  ]);
  // ***********
  // ***********
  // ***********
  // ***********
  // estados para enviar a la api

  //funciones que manejan los cambios de los inputs dinamicos de direcciones y contactos
  // ***********
  // ***********
  // ***********
  // ***********
  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        _id: (Math.random() * 1000).toString(),
        descripcion: '',
        contacto: '',
        // fechaReg: Date.now(),
        persona: '',
        vigente: '1',
      },
    ]);
  };

  const handleAddAddress = () => {
    setAddresses([
      ...addresses,
      {
        _id: (Math.random() * 1000).toString(),
        tipoDireccion: '',
        ciudad: '',
        persona: '',
        nombre: '',
        vigente: '1',
      },
    ]);
  };

  const handleAddressChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'tipoDireccion' | 'ciudad' | 'nombre'
  ) => {
    const updatedAddresses = [...addresses];
    updatedAddresses[rowIndex][field] = (e.target as HTMLInputElement).value;
    setAddresses(updatedAddresses);
  };

  const handleContactChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'descripcion' | 'contacto'
  ) => {
    const updatedContacts = [...contacts];
    updatedContacts[rowIndex][field] = (e.target as HTMLInputElement).value;
    setContacts(updatedContacts);
  };
  // ***********
  // ***********
  // ***********
  // ***********
  //funciones que manejan los cambios de los inputs dinamicos de direcciones y contactos

  const { data: formData } = useQuery({
    queryKey: ['formData', subFormSubmitted],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/persons/generateform`
      );

      return response.data.body;
    },
  });

  //funcion que se ejecuta al hacer submit al formulario
  // ***********
  // ***********
  // ***********
  // ***********
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newPerson = {
      nombre1: firstName,
      nombre2: secondName,
      apellPat: firstSurname,
      apellMat: secondSurname,
      rut: rut,
      dv: verificationDigit,
      fechaNac: new Date(birthday).toISOString(),
      institucion: institution,
      nacionalidad: nationality,
      sexo: gender,
      contactos: contacts,
      direcciones: addresses,
    };
    const response = await axios.post(
      `${generalConfig.baseUrl}/persons`,
      newPerson
    );
  };

  // ***********
  // ***********
  // ***********
  // ***********
  //funcion que se ejecuta al hacer submit al formulario

  //efecto del componente en caso de que se este entrando al componente para editar algun usuario ya existente
  // ***********
  // ***********
  // ***********
  // ***********

  //funciones que trate la libreta de contacto y de direccion del paciente a editar

  const getPatientAddresses = async (patientId: string) => {
    const response = await axios.get(`${generalConfig.baseUrl}/address-book`);

    const addresses = response.data.body.filter((a: Address) => {
      return a.persona._id === patientId;
    });

    setAddresses([...addresses]);
  };

  const getPatientContacts = async (patientId: string) => {
    const response = await axios.get(`${generalConfig.baseUrl}/contact-book`);

    const contacts = response.data.body.filter((c: Contact) => {
      return c.persona._id === patientId;
    });

    setContacts([...contacts]);
  };

  //funciones que trate la libreta de contacto y de direccion del paciente a editar

  // console.log('contactos', contacts);

  useEffect(() => {
    if (patient) {
      getPatientAddresses(patient._id);
      getPatientContacts(patient._id);
      setFirstName(patient.nombre1);
      setSecondName(patient.nombre2);
      setFirstSurname(patient.apellPat);
      setSecondSurname(patient.apellMat);
      setRut(patient.rut);
      setNationality(patient.nacionalidad._id);
      setGender(patient.sexo._id);
      setBirthday(format(new Date(patient.fechaNac), 'yyyy-MM-dd'));
      setPrevision(patient.institucion.prevision._id);
      setInstitution(patient.institucion._id);
      setVerificationDigit(patient.dv);
    }
  }, [patient]);

  useEffect(() => {
    const institutions = formData?.institutions.filter((i: any) => {
      return i.prevision === selectedPrevision;
    });
    setCorrespondingInst(institutions);
  }, [selectedPrevision]);

  // ***********
  // ***********
  // ***********
  // ***********
  //efecto del componente en caso de que se este entrando al componente para editar algun usuario ya existente

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
                <Box sx={{ marginBottom: 2 }}>
                  <Subform
                    title="Agregar nacionalidad"
                    description="Agrega nueva nacionalidad"
                    postRoute={`${generalConfig.baseUrl}/nationalities`}
                    onFinish={() => setSubFormSubmitted(!subFormSubmitted)}
                  />
                </Box>
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
                    {formData?.nationalities.map((n: ShortModel) => {
                      return (
                        <MenuItem key={n._id} value={n._id}>
                          {n.nombre}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ marginBottom: 2 }}>
                  <Subform
                    title="Agregar sexo"
                    description="Agrega nuevo sexo"
                    postRoute={`${generalConfig.baseUrl}/gender`}
                    onFinish={() => setSubFormSubmitted(!subFormSubmitted)}
                  />
                </Box>
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
                    {formData?.genders.map((g: ShortModel) => {
                      return (
                        <MenuItem key={g._id} value={g._id}>
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
                    {formData?.previsions.map((p: ShortModel) => {
                      return (
                        <MenuItem key={p._id} value={p._id}>
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
                    {correspondingInstitutions?.map((i: Institution) => {
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
                    <Card
                      key={c._id}
                      style={{ marginBottom: 10, padding: 5 }}
                      elevation={3}
                    >
                      <Grid
                        container
                        spacing={2}
                        style={{ marginBottom: 5 }}
                        alignItems="center"
                      >
                        <Grid
                          item
                          xs={12}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <IconButton
                            onClick={() => {
                              const updatedContacts = contacts.filter(
                                (contact) => {
                                  return c.id !== contact._id;
                                }
                              );
                              setContacts(updatedContacts);
                            }}
                          >
                            <Close />
                          </IconButton>
                          <Box display="flex" alignItems="center">
                            <InputLabel id="valid-switch">Vigente</InputLabel>
                            <Switch
                              id="valid-switch"
                              color={c.vigente === '1' ? 'success' : 'warning'}
                              checked={c.vigente === '1'}
                              onChange={() => {
                                const updatedContacts = [...contacts];
                                if (c.vigente === '1') {
                                  updatedContacts[index].vigente = '2';
                                } else if (c.vigente === '2') {
                                  updatedContacts[index].vigente = '1';
                                }
                                setContacts(updatedContacts);
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ marginBottom: 2 }}>
                            <Subform
                              title="Agregar tipo de contacto"
                              description="Agrega nuevo tipo de contacto"
                              postRoute={`${generalConfig.baseUrl}/contacts`}
                              onFinish={() =>
                                setSubFormSubmitted(!subFormSubmitted)
                              }
                            />
                          </Box>
                          <FormControl fullWidth>
                            <InputLabel id="contacts-select-label">
                              Tipo de contacto
                            </InputLabel>
                            <Select
                              label="contacts"
                              id="contacts-select"
                              labelId="contacts-select-label"
                              onChange={(e: SelectChangeEvent<string>) =>
                                handleContactChange(e, index, 'contacto')
                              }
                              value={c.contacto?._id}
                            >
                              {formData?.contactTypes.map((c: ShortModel) => {
                                return (
                                  <MenuItem key={c._id} value={c._id}>
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
                              label="Contacto"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handleContactChange(e, index, 'descripcion');
                                console.log(contacts);
                              }}
                              value={c.descripcion}
                              required
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Card>
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
                    <Card
                      elevation={3}
                      style={{ padding: 10, marginBottom: 10 }}
                      key={a._id}
                    >
                      <Grid container spacing={2} alignItems="center">
                        <Grid
                          item
                          xs={12}
                          display="flex"
                          justifyContent="space-between"
                        >
                          <IconButton
                            onClick={() => {
                              const updatedAddresses = addresses.filter(
                                (address) => {
                                  return a._id !== address._id;
                                }
                              );
                              setAddresses(updatedAddresses);
                            }}
                          >
                            <Close />
                          </IconButton>
                          <Box display="flex" alignItems="center">
                            <InputLabel id="valid-switch">Vigente</InputLabel>
                            <Switch
                              id="valid-switch"
                              color={a.vigente === '1' ? 'success' : 'warning'}
                              checked={a.vigente === '1'}
                              onChange={() => {
                                const updatedAddreses = [...addresses];
                                if (a.vigente === '1') {
                                  updatedAddreses[index].vigente = '2';
                                } else if (a.vigente === '2') {
                                  updatedAddreses[index].vigente = '1';
                                }
                                setAddresses(updatedAddreses);
                              }}
                            />
                          </Box>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ marginBottom: 2 }}>
                            <Subform
                              title="Agregar tipo de dirección"
                              description="Agrega nuevo tipo de dirección"
                              postRoute={`${generalConfig.baseUrl}/address-types`}
                              onFinish={() =>
                                setSubFormSubmitted(!subFormSubmitted)
                              }
                            />
                          </Box>
                          <FormControl fullWidth>
                            <InputLabel id="addresstype-select-label">
                              Tipo de dirección
                            </InputLabel>
                            <Select
                              label="addresstype"
                              id="addresstype-select"
                              labelId="addresstype-select-label"
                              onChange={(e: SelectChangeEvent<string>) => {
                                handleAddressChange(e, index, 'tipoDireccion');
                              }}
                              value={a.tipoDireccion?._id}
                              required
                            >
                              {formData?.addressTypes.map((at: ShortModel) => {
                                return (
                                  <MenuItem key={at._id} value={at._id}>
                                    {at.nombre}
                                  </MenuItem>
                                );
                              })}
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                          <Box sx={{ marginBottom: 2 }}>
                            <Subform
                              title="Agregar ciudad"
                              description="Agrega nueva ciudad"
                              postRoute={`${generalConfig.baseUrl}/cities`}
                              onFinish={() =>
                                setSubFormSubmitted(!subFormSubmitted)
                              }
                            />
                          </Box>
                          <FormControl fullWidth>
                            <InputLabel id="contacts-select-label">
                              Cuidad
                            </InputLabel>
                            <Select
                              label="city"
                              id="city-select"
                              labelId="city-select-label"
                              onChange={(e: SelectChangeEvent<string>) => {
                                handleAddressChange(e, index, 'ciudad');
                              }}
                              value={a.ciudad?._id}
                              required
                            >
                              {/* {selectedPrevision === '' && (
                              <MenuItem>Seleccione Tipo de contacto</MenuItem>
                            )} */}
                              {formData?.cities.map((c: ShortModel) => {
                                return (
                                  <MenuItem key={c._id} value={c._id}>
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
                              value={a.nombre}
                              required
                            />
                          </FormControl>
                        </Grid>
                      </Grid>
                    </Card>
                  );
                })}
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color={patient ? 'success' : 'primary'}
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
