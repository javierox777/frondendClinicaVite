import React, { useState } from 'react';
import { TimeSlot } from '../../interfaces/TimeSlot';
import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  Paper,
  PaperProps,
  TextField,
  Typography,
} from '@mui/material';
import Draggable from 'react-draggable';
import { Badge } from 'rsuite';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Professional } from '../../interfaces/Professional';
import { Person } from '../../interfaces/Person';
import { Form } from 'react-router-dom';
import Swal from 'sweetalert2';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  timeSlots: TimeSlot[];
  open: boolean;
  date: Date;
  onClose: CallableFunction;
  refetch?: CallableFunction;
}

const weekDays: Record<number, string> = {
  0: 'Domingo',
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
};

const months: Record<number, string> = {
  0: 'Enero',
  1: 'Febrero',
  2: 'Marzo',
  3: 'Abril',
  4: 'Mayo',
  5: 'Junio',
  6: 'Julio',
  7: 'Agosto',
  8: 'Septiembre',
  9: 'Octubre',
  10: 'Noviembre',
  11: 'Diciembre',
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const DateDetails = ({ timeSlots, open, date, onClose, refetch }: Props) => {
  const weekDay = date.getDay();
  const month = date.getMonth();

  const { data: formData } = useQuery({
    queryKey: ['formData'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/appointments/generateform`
      );

      return response.data.body;
    },
  });

  if (!timeSlots || !date) return <div>loading</div>;

  return (
    <>
      <Dialog
        open={open}
        onClose={() => onClose()}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        maxWidth="md"
        fullWidth
      >
        <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
          <Typography style={{ fontWeight: 'bold' }}>
            {weekDays[weekDay]} {date.getDate()} {months[month]}{' '}
            {date.getFullYear()}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {timeSlots.map((slot: TimeSlot) => {
            return (
              <SlotDetail
                slot={slot}
                key={slot.horaInicio}
                professionals={formData.professionals}
                patients={formData.persons}
                refetch={refetch}
              />
            );
          })}
        </DialogContent>
        <DialogActions>
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={() => onClose()}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
    </>
  );
};

const SlotDetail = ({
  slot,
  professionals,
  patients,
  refetch,
}: {
  slot: TimeSlot;
  professionals: Professional[];
  patients: Person[];
  refetch?: CallableFunction;
}) => {
  const [reservationOpen, setReservationOpen] = useState(false);
  const [professionalId, setProfessionalId] = useState('');
  const [patientId, setPatientId] = useState('');
  const [reason, setReason] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const weekDay = slot.fecha.getDay();
  const month = slot.fecha.getMonth();

  const { mode } = useThemeContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = {
        profesional: professionalId,
        persona: patientId,
        fecha: slot.fecha.toISOString(),
        horaInicio: slot.horaInicio,
        horaTermino: slot.horaTermino,
        razon: reason,
      };

      const response = await axios.post(
        `${generalConfig.baseUrl}/appointments`,
        data
      );

      if (response.data.message === 'success') {
        setProfessionalId('');
        setPatientId('');
        setReason('');
        setSubmitting(false);
        toast.success('Hora reservada');
        if (refetch) {
          refetch();
        }
      }
    } catch (error) {
      toast.error('No se pudo reservar la hora deseada, inténtelo nuevamente.');
    }
  };

  if (
    slot.content.type === 'appointment' &&
    slot.content.estado !== 'CANCELADO'
  ) {
    return (
      <Grid container direction="column" spacing={1}>
        <Grid item>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Badge color="yellow" />
            </Grid>
            <Grid item>
              <Typography>
                {slot.horaInicio} - {slot.horaTermino}
              </Typography>
            </Grid>
            <Grid item>
              <Typography style={{ textTransform: 'capitalize' }}>
                {slot.content.razon?.toLowerCase()}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                Paciente
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  textTransform: 'capitalize',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.persona.nombre1.toLowerCase()}{' '}
                {slot.content.persona.apellPat.toLowerCase()}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.persona.rut}-{slot.content.persona.dv}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container spacing={1}>
            <Grid item>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                Atiende
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.profesional.nombre1}{' '}
                {slot.content.profesional.apellPat}
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                style={{
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.persona.rut}-{slot.content.persona.dv}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Divider />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={2} direction="column">
      <Grid item justifyContent="center" alignItems="center" display="flex">
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item xs={12} sm={12} md={12} lg={9} xl={6}>
            <Grid container spacing={1} alignItems="center">
              <Grid item>
                <Badge color="green" />
              </Grid>
              <Grid item>
                <Typography>
                  {slot.horaInicio} - {slot.horaTermino}
                </Typography>
              </Grid>
              <Grid item>
                <span className="text-green-600">Disponible</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={9} xl={3}>
            <Button variant="outlined" onClick={() => setReservationOpen(true)}>
              Reservar hora
            </Button>
            <Dialog
              open={reservationOpen}
              onClose={() => setReservationOpen(false)}
              PaperComponent={PaperComponent}
              PaperProps={{
                component: 'form',
                onSubmit: handleSubmit,
              }}
              aria-labelledby="draggable-dialog-title"
            >
              <DialogTitle
                style={{ cursor: 'move' }}
                id="draggable-dialog-title"
              >
                Reservar hora {slot.horaInicio} - {slot.horaTermino} del{' '}
                {weekDays[weekDay]} {slot.fecha.getDate()} {months[month]}{' '}
                {slot.fecha.getFullYear()}
              </DialogTitle>
              <DialogContent>
                <Grid container display="flex" direction="column" spacing={3}>
                  <Grid item>
                    <DialogContentText>
                      Rellene los datos necesarios para reservar esta hora.
                    </DialogContentText>
                  </Grid>

                  <Grid item xs={12}>
                    {patients && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          options={patients}
                          //   defaultValue={budget?.persona}
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
                            if (patient) setPatientId(patient._id);
                          }}
                        />
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {professionals && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          //   defaultValue={budget?.profesional}
                          options={professionals}
                          renderInput={(params) => (
                            <TextField {...params} label="Dentista" />
                          )}
                          renderOption={(props, professional: Professional) => (
                            <li {...props}>
                              <div className="flex justify-between w-full">
                                <span>
                                  {professional.nombre1} {professional.apellPat}
                                </span>
                                <span
                                  style={{
                                    color:
                                      mode === 'light'
                                        ? colors.ligthModeSoftText
                                        : colors.darkModeSoftText,
                                  }}
                                >
                                  {professional.rut}-{professional.dv}
                                </span>
                              </div>
                            </li>
                          )}
                          getOptionLabel={(professional: Professional) => {
                            // Value selected with enter, right from the input
                            if (typeof professional === 'string') {
                              return professional;
                            }
                            // Regular professional
                            return `${professional.nombre1} ${professional.apellPat} ${professional.rut}-${professional.dv}`;
                          }}
                          onChange={(
                            event,
                            professional: Professional | null
                          ) => {
                            if (professional)
                              setProfessionalId(professional._id);
                          }}
                        />
                      </FormControl>
                    )}
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <TextField
                        label="Motivo de visita"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        required
                      />
                    </FormControl>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button
                  variant="contained"
                  color="inherit"
                  onClick={() => setReservationOpen(false)}
                  disabled={submitting}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="success"
                  variant="contained"
                  disabled={submitting}
                >
                  {!submitting && 'Reservar'}
                  {submitting && 'Reservando hora'}
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
      <Grid item>
        <Divider />
      </Grid>
    </Grid>
  );
};

export default DateDetails;
