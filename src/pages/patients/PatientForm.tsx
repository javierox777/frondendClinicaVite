import { Close } from '@mui/icons-material';
import {
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
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  open: boolean;
  onClose: CallableFunction;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PatientForm = ({ open, onClose }: Props) => {
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

    const response = await axios.post(`${generalConfig.baseUrl}/persons`, data);

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
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
        fullScreen
      >
        <form onSubmit={handleSubmit}>
          <Toolbar component={Paper} elevation={3}>
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
                <FormControl fullWidth>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Registrar nuevo paciente
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
