import {
  Add,
  AddCircleOutline,
  CheckCircle,
  Close,
  Delete,
  PlusOne,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Dialog,
  Fab,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  Switch,
  Tab,
  Tabs,
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
import HeaderMenu from './Menu';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ServiceType } from '../../interfaces/ServiceType';
import { Agreement } from '../../interfaces/Agreement';

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

const badHabits = [
  { descripcion: 'Succión digital', id: 1 },
  { descripcion: 'Respirador bucal', id: 2 },
  { descripcion: 'Onicofagia', id: 3 },
  { descripcion: 'Succión chupete-mamadera', id: 4 },
  { descripcion: 'Deflución atípico', id: 5 },
];

const PatientForm = ({ open, onClose, patient, afterSubmit }: Props) => {

  const { mode } = useThemeContext();
  const [value, setValue] = useState(0);

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
  const [subFormSubmitted, setSubFormSubmitted] = useState(true);

  const [morbid, setMorbid] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      descripcion: '',
    },
  ]);
  const [familiar, setFamiliar] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      descripcion: '',
    },
  ]);
  const [habits, setHabits] = useState([
    {
      id: 0,
      descripcion: '',
    },
  ]);
  const [allergies, setAllergies] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      descripcion: '',
    },
  ]);
  const [general, setGeneral] = useState([
    {
      _id: (Math.random() * 1000).toString(),
      descripcion: '',
    },
  ]);

  const [agreements, setAgreements] = useState<Agreement[]>([
    {
      _id: (Math.random() * 1000).toString(),
      prestacionTipo: '',
      persona: '',
    },
  ]);

  //nuevo

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'prestacionTipo', headerName: 'Convenio', width: 200 },
    {
      field: 'actions',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params) => (
        <IconButton
          onClick={() =>
            setAgreements(agreements.filter((a) => a._id !== params.row._id))
          }
        >
          <Delete />
        </IconButton>
      ),
    },
  ];

  const handleAddAntecedent = (
    type: 'morbid' | 'familiar' | 'allergy' | 'general'
  ) => {
    switch (type) {
      case 'morbid':
        setMorbid([
          ...morbid,
          {
            _id: (Math.random() * 1000).toString(),
            descripcion: '',
          },
        ]);
        break;
      case 'familiar':
        setFamiliar([
          ...familiar,
          {
            _id: (Math.random() * 1000).toString(),
            descripcion: '',
          },
        ]);
        break;
      case 'allergy':
        setAllergies([
          ...allergies,
          {
            _id: (Math.random() * 1000).toString(),
            descripcion: '',
          },
        ]);
        break;
      case 'general':
        setGeneral([
          ...general,
          {
            _id: (Math.random() * 1000).toString(),
            descripcion: '',
          },
        ]);
        break;
    }
  };

  const handleChangeAntecedents = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'morbid' | 'familiar' | 'allergy' | 'general',
    index: number
  ) => {
    switch (type) {
      case 'morbid':
        const updatedMorbid = [...morbid];
        updatedMorbid[index].descripcion = e.target.value;
        setMorbid(updatedMorbid);
        break;
      case 'familiar':
        const updatedFamiliar = [...familiar];
        updatedFamiliar[index].descripcion = e.target.value;
        setFamiliar(updatedFamiliar);
        break;
      case 'allergy':
        const updatedAllergies = [...allergies];
        updatedAllergies[index].descripcion = e.target.value;
        setAllergies(updatedAllergies);
        break;
      case 'general':
        const updatedGeneral = [...general];
        updatedGeneral[index].descripcion = e.target.value;
        setGeneral(updatedGeneral);
        break;
    }
  };

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

  const handleAddAgreement = () => {
    setAgreements([
      ...agreements,
      {
        _id: (Math.random() * 1000).toString(), // Genera un ID único
        prestacionTipo: '', // Inicializa sin convenio seleccionado
        persona: '',
      },
    ]);
  };

  const handleAddContact = () => {
    setContacts([
      ...contacts,
      {
        _id: (Math.random() * 1000).toString(),
        descripcion: '',
        contacto: '',
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

  const handleAgreementChange = (
    e: SelectChangeEvent<string>,
    index: number
  ) => {
    const selectedServiceTypeId = e.target.value;

    // Verifica si el convenio ya está en la lista
    const alreadyExists = agreements.some(
      (agreement) => agreement.prestacionTipo === selectedServiceTypeId
    );

    const alreadyExistSecondCheck = agreements.some(
      (agreement) =>
        (agreement.prestacionTipo as ServiceType)._id === selectedServiceTypeId
    );

    if (!alreadyExists && !alreadyExistSecondCheck) {
      const updatedAgreements = [...agreements];
      updatedAgreements[index].prestacionTipo = selectedServiceTypeId;

      setAgreements(updatedAgreements);
    } else {
      toast.error('El convenio ya está agregado a la lista.');
    }
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
 
  const { data: formData } = useQuery({
    queryKey: ['formData', subFormSubmitted],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/persons/generateform`
      );

      return response.data.body;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // const morbidWithoutId = morbid.map(({ _id, ...rest }) => rest);
    // const familiarWithoutId = familiar.map(({ _id, ...rest }) => rest);
    // const generalWithoutId = general.map(({ _id, ...rest }) => rest);
    // const allergiesWithoutId = allergies.map(({ _id, ...rest }) => rest);
    // const habitsWithoutId = habits.map(({ id, ...rest }) => rest);
    const agreementsWithoutId = agreements.map(
      ({ _id, persona, ...rest }) => rest
    );

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
      convenios: agreementsWithoutId,
    };

    try {
      setSubmitting(true);

      if (patient) {
        console.log("updatedContacts", patient?._id)
        const response = await axios.patch(
          `${generalConfig.baseUrl}/persons/${patient._id}`,
          
          newPerson
        );

        if (response.data.message === 'success') {
          toast.success('Paciente actualizado');
          setSubmitting(false);
        }
      } else {
        const response = await axios.post(
          `${generalConfig.baseUrl}/persons`,
          newPerson
        );

        if (response.data.message === 'success') {
          toast.success('Paciente registrado');
          setSubmitting(false);
        }
      }
    } catch (error) {
      toast.error('Los datos no pudieron ser registrados.');
      setSubmitting(false);
    }
  };

  const getPatientAddresses = async (patientId: string) => {
    const response = await axios.get(
      `${generalConfig.baseUrl}/address-book/getaddresses/${patientId}`
    );

    const addresses = response.data.body;

    setAddresses([...addresses]);
  };

  const getPatientContacts = async (patientId: string) => {
    const response = await axios.get(
      `${generalConfig.baseUrl}/contact-book/getcontacts/${patientId}`
    );

    const contacts = response.data.body;

    setContacts([...contacts]);
  };

  const getPatientAgreements = async (patientId: string) => {
    const response = await axios.get(
      `${generalConfig.baseUrl}/agreements/getagreements/${patientId}`
    );

    const agreements = response.data.body;

    setAgreements([...agreements]);
  };

  useEffect(() => {
    if (patient) {
      getPatientAddresses(patient._id);
      getPatientContacts(patient._id);
      getPatientAgreements(patient._id);
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const rows = agreements.map((a, index) => ({
    id: index + 1,
    _id: a._id,
    prestacionTipo:
      formData?.serviceTypes.find((st: any) => st._id === a.prestacionTipo)
        ?.nombre || '',
  }));

  console.log(agreements);

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
            style={{ backgroundColor: colors.lightModeHeaderColor }}
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
            <HeaderMenu />
            <AppBar position="static" className="mb-5">
              <Toolbar
                style={{
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeHeaderColor
                      : colors.darkModeHeaderColor,
                }}
              >
                <Typography variant="h6">Datos Personales</Typography>
              </Toolbar>
            </AppBar>
            <Grid container spacing={5}>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                  style={{ marginBottom: 2 }}
                >
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
                      <Typography variant="h5">Convenios</Typography>
                    </Toolbar>
                  </AppBar>
                </Box>
                <Box display="flex" alignItems="center" mb={2}>
                  <Typography
                    style={{ fontWeight: 'bold', marginRight: '10px' }}
                  >
                    Agregar convenio
                  </Typography>
                  <IconButton onClick={handleAddAgreement}>
                    <AddCircleOutline />
                  </IconButton>
                </Box>
                <Box style={{ width: '100%' }}>
                  <DataGrid
                    rows={agreements.map((a, index) => ({
                      id: index + 1,
                      _id: a._id,
                      prestacionTipo:
                        formData?.serviceTypes.find(
                          (st: any) => st._id === a.prestacionTipo
                        )?.nombre || 'Selecciona un convenio',
                    }))}
                    columns={[
                      { field: 'id', headerName: 'ID', width: 100 },
                      {
                        field: 'prestacionTipo',
                        headerName: 'Convenio',
                        width: 300,
                        renderCell: (params) => {
                          const currentAgreement = agreements.find(
                            (a) => a._id === params.row._id
                          );
                          return (
                            <FormControl fullWidth>
                              <InputLabel
                                id={`select-label-${params.row.id}`}
                              ></InputLabel>
                              <Select
                                labelId={`select-label-${params.row.id}`}
                                value={
                                  typeof currentAgreement?.prestacionTipo ===
                                  'string'
                                    ? currentAgreement.prestacionTipo
                                    : typeof currentAgreement?.prestacionTipo ===
                                        'object'
                                      ? currentAgreement?.prestacionTipo._id
                                      : ''
                                }
                                onChange={(e: SelectChangeEvent<string>) =>
                                  handleAgreementChange(e, params.row.id - 1)
                                }
                              >
                                {formData?.serviceTypes.map((st: any) => (
                                  <MenuItem key={st._id} value={st._id}>
                                    {st.nombre}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          );
                        },
                      },
                      {
                        field: 'actions',
                        headerName: 'Acciones',
                        width: 150,
                        renderCell: (params) => (
                          <IconButton
                            onClick={() =>
                              setAgreements(
                                agreements.filter(
                                  (a) => a._id !== params.row._id
                                )
                              )
                            }
                          >
                            <Delete />
                          </IconButton>
                        ),
                      },
                    ]}
                    // initialState={{
                    //   pagination: {
                    //     paginationModel: {
                    //       pageSize: 5,
                    //       page: 0,
                    //     },
                    //   },
                    // }}
                    // pageSizeOptions={[5, 10, 20]}
                    // disableRowSelectionOnClick
                  />
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ marginBottom: 10 }}
                >
                  <AppBar position="static" className="mb-5">
                    <Toolbar
                      style={{
                        backgroundColor:
                          mode === 'light'
                            ? colors.lightModeHeaderColor
                            : colors.darkModeHeaderColor,
                      }}
                    >
                      <Typography variant="h6">Direcciones</Typography>
                    </Toolbar>
                  </AppBar>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  style={{ marginBottom: 10 }}
                >
                  <Typography style={{ fontWeight: 'bold' }}>
                    Libreta de contactos
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
                                  return c._id !== contact._id;
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
                <AppBar position="static" className="mb-5">
                  <Toolbar
                    style={{
                      backgroundColor:
                        mode === 'light'
                          ? colors.lightModeHeaderColor
                          : colors.darkModeHeaderColor,
                    }}
                  >
                    <Typography variant="h6">Contactos</Typography>
                  </Toolbar>
                </AppBar>
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

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default PatientForm;
