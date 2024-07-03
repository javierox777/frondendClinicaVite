import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Appointment } from '../../interfaces/Appointment';
import {
  Button,
  ButtonGroup,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import RecetaForm from '../receta/RecetaForm';
import axios from 'axios';
import { generalConfig } from '../../config';
import toast, { Toaster } from 'react-hot-toast';
import StatusBadge from '../../componemts/StatusBadge';

const CurrentPatient = () => {
  const [completed, setCompleted] = useState(false);

  const appointment: Appointment = useLocation().state.appointment;

  const handleComplete = async () => {
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
      }
    } catch (error) {
      toast.success('Cita no pudo ser completada.');
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
            <ButtonGroup>
              <Button variant="contained">CREAR RECETA</Button>
              <Button variant="contained">FICHA CLÍNICA</Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleComplete}
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
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>
              Datos de paciente
            </Typography>
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
                  {appointment.persona.rut}-{appointment.persona.dv}
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
              <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
                <Typography style={{ fontWeight: 'bold' }}>Sexo</Typography>
                <Typography>{appointment.persona.sexo.nombre}</Typography>
              </Grid>
            </Grid>
          </Grid>
          {/* DATOS DEL PACIENTE */}
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 'bold', fontSize: 20 }}>
              Datos de citación
            </Typography>
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
    </>
  );
};

export default CurrentPatient;
