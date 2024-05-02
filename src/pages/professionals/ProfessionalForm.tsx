import {
  Button,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Professional } from '../../interfaces/Professional';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { generalConfig } from '../../config';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  professional?: Professional;
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

const ProfessionalForm = ({
  open,
  onClose,
  professional,
  afterSubmit,
}: Props) => {
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [rut, setRut] = useState('');
  const [verificationDigit, setVerificationDigit] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (professional) {
      setFirstName(professional.nombre1);
      setSecondName(professional.nombre2);
      setFirstSurname(professional.apellPat);
      setSecondSurname(professional.apellMat);
      setRut(professional.rut);
      setEmail(professional.email);
      setPhone(professional.celular);
      setAddress(professional.direccion);
      setVerificationDigit(professional.dv);
    }
  }, [professional]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const data = {
      nombre1: firstName,
      nombre2: secondName,
      apellPat: firstSurname,
      apellMat: secondSurname,
      rut: rut,
      dv: verificationDigit,
      celular: phone,
      direccion: address,
      email: email,
    };

    if (professional) {
      try {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/professionals/${professional.id}`,
          data
        );
        if (response.data.message === 'success') {
          toast.success('Se han actualizado los datos.');
          setSubmitting(false);
          if (afterSubmit) {
            afterSubmit();
          }
        }
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        toast.error('No se ha podido actualizar los datos.');
      }
    } else {
      try {
        const response = await axios.post(
          `${generalConfig.baseUrl}/professionals`,
          data
        );
        if (response.data.message === 'success') {
          toast.success('Se han registrado los datos.');
          setFirstName('');
          setSecondName('');
          setFirstSurname('');
          setSecondSurname('');
          setRut('');
          setEmail('');
          setPhone('');
          setAddress('');
          setVerificationDigit('');
          setSubmitting(false);
          if (afterSubmit) {
            afterSubmit();
          }
        }
      } catch (error) {
        console.log(error);
        setSubmitting(false);
        toast.error('No se ha podido registrar los datos.');
      }
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
        TransitionComponent={Transition}
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
              Rellene todos los datos para registrar nuevo profesional
            </Typography>
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
                    label="Apellido materno"
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
                    label="Dirección"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Email"
                    fullWidth
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Celular"
                    fullWidth
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                    required
                  />
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
                    {!professional && 'Registrar nuevo profesional'}
                    {professional && 'Actualizar profesional'}
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

export default ProfessionalForm;
