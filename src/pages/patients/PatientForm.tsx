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

  //states

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [rut, setRut] = useState('');
  const [nationality, setNationality] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSubmit = () => {
    console.log({
      firstName,
      secondName,
      firstSurname,
      secondSurname,
      rut,
      nationality,
      gender,
      birthday,
    });
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={() => onClose()}
      fullScreen
    >
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
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Segundo nombre"
                fullWidth
                onChange={(e) => setSecondName(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Apellido paterno"
                fullWidth
                onChange={(e) => setFirstSurname(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Apellido Materno"
                fullWidth
                onChange={(e) => setSecondSurname(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="RUT"
                fullWidth
                onChange={(e) => setRut(e.target.value)}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                label="Fecha de nacimiento"
                InputLabelProps={{ shrink: true }}
                fullWidth
                type="date"
                onChange={(e) => setBirthday(e.target.value)}
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
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleSubmit}
            >
              Registrar nuevo paciente
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Dialog>
  );
};

export default PatientForm;
