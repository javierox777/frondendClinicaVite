import {
  Button,
  ButtonGroup,
  Card,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import HeaderBar from '../../componemts/HeaderBar';
import StatusBadge from '../../componemts/StatusBadge';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
import RecetaForm from '../receta/RecetaForm';
import { formatRut } from '../../helpers/formatRut';

const CurrentPatient = () => {
  const [completed, setCompleted] = useState(false);
  const [recepitOpen, setReceipt] = useState(false);
  const [alertOpen, setAlert] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);
  const navigation = useNavigate();

  const appointment: Appointment = useLocation().state.appointment;

  const handleComplete = async () => {
    setSubmitting(true);
    try {
      const response = await axios.patch(
        `${generalConfig.baseUrl}/appointments/${appointment._id}`,
        {
          estado: 'COMPLETADO',
        }
      );
      if (response.data.message === 'success') {
        toast.success('Cita completada');
        setCompleted(true);
        setSubmitting(false);
        setAlert(false);
      }
    } catch (error) {
      toast.success('Cita no pudo ser completada.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (appointment.estado === 'COMPLETADO') {
      setCompleted(true);
    }
  }, []);

  return (
    <>
      <Container>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12}>
            <ButtonGroup fullWidth>
              <Button
                variant="contained"
                onClick={() =>
                  navigation('/fichaclinica', {
                    state: { patient: appointment.persona },
                  })
                }
              >
                FICHA CLÍNICA
              </Button>
              <Button variant="contained" onClick={() => setReceipt(true)}>
                CREAR RECETA
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => setAlert(true)}
                disabled={completed}
              >
                FINALIZAR CITA
              </Button>
            </ButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <StatusBadge
              status={completed ? 'finished' : 'in-progress'}
              title={completed ? 'Finalizada' : 'En progreso'}
            />
          </Grid>
          <Grid item xs={12}>
            <HeaderBar title="datos de paciente" />
          </Grid>
          {/* DATOS DEL PACIENTE */}
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>Nombre</Typography>
                <Typography>
                  {appointment.persona.nombre1} {appointment.persona.nombre2}{' '}
                  {appointment.persona.apellPat} {appointment.persona.apellMat}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>RUT</Typography>
                <Typography>
                  {formatRut(appointment.persona.rut)}-{appointment.persona.dv}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Fecha de nacimiento
                </Typography>
                <Typography>
                  {new Date(appointment.persona.fechaNac).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>Sexo</Typography>
                <Typography>{appointment.persona.sexo.nombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Nacionalidad
                </Typography>
                <Typography>
                  {appointment.persona.nacionalidad.nombre}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Previsión
                </Typography>
                <Typography>
                  {appointment.persona.institucion.nombre}{' '}
                  {appointment.persona.institucion.prevision.nombre}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* DATOS DEL PACIENTE */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <HeaderBar title="datos de citación" />
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Fecha de cita
                </Typography>
                <Typography>
                  {new Date(appointment.fecha).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Razon de citación
                </Typography>
                <Typography style={{ textTransform: 'capitalize' }}>
                  {appointment.razon.toLowerCase()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Hora de inicio
                </Typography>
                <Typography>{appointment.horaInicio}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>
                  Hora de término
                </Typography>
                <Typography>{appointment.horaTermino}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Toaster />
      <Dialog open={recepitOpen} onClose={() => setReceipt(false)}>
        <Card className="p-5">
          <RecetaForm onSuccess={() => console.log('hola')} />
        </Card>
      </Dialog>
      <Dialog
        open={alertOpen}
        onClose={() => setAlert(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'¿Finalizar cita?'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            La cita se registrará como finalizada, ¿Desea continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => setAlert(false)}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleComplete}
            autoFocus
            variant="contained"
            disabled={isSubmitting || completed}
          >
            {isSubmitting && 'Finalizando cita'}
            {!isSubmitting && 'Finalizar Cita'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CurrentPatient;
