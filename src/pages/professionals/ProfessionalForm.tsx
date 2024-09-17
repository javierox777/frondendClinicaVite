import {
  AppBar,
  Button,
  Container,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Professional } from '../../interfaces/Professional';
import { TransitionProps } from '@mui/material/transitions';
import { Close, Visibility, VisibilityOff } from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { generalConfig } from '../../config';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  professional?: Professional;
  afterSubmit?: CallableFunction;
  edit?: boolean;
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
  edit,
}: Props) => {
  const { mode } = useThemeContext();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [firstSurname, setFirstSurname] = useState('');
  const [secondSurname, setSecondSurname] = useState('');
  const [rut, setRut] = useState('');
  const [verificationDigit, setVerificationDigit] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

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
      login: username,
      password: password,
    };

    if (professional) {
      try {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/professionals/${professional._id}`,
          {
            nombre1: firstName,
            nombre2: secondName,
            apellPat: firstSurname,
            apellMat: secondSurname,
            rut: rut,
            dv: verificationDigit,
            celular: phone,
            direccion: address,
            email: email,
          }
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
          setUsername('');
          setPassword('');
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
        <Toolbar
          component={Paper}
          elevation={3}
          style={{ backgroundColor: 'teal' }}
        >
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </Toolbar>
        <Container className="p-5">
          <form onSubmit={handleSubmit}>
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
                    label="Apellido materno"
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
                    label="Dirección"
                    fullWidth
                    onChange={(e) => setAddress(e.target.value)}
                    value={address}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
              {!edit && (
                <>
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
                        <Typography variant="h6">Datos de usuario</Typography>
                      </Toolbar>
                    </AppBar>
                    <Typography
                      className="p-3 italic"
                      style={{ color: colors.ligthModeSoftText }}
                    >
                      Rellene los datos para crear el usuario correspondiente al
                      profesional.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Nombre de usuario"
                        fullWidth
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                        required
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    <FormControl fullWidth>
                      <TextField
                        label="Contraseña"
                        fullWidth
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                          // <-- This is where the toggle button is added.
                          endAdornment: (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                              >
                                {showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          ),
                        }}
                      />
                    </FormControl>
                  </Grid>
                </>
              )}
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
          </form>
        </Container>
      </Dialog>
      <Toaster />
    </>
  );
};

export default ProfessionalForm;
