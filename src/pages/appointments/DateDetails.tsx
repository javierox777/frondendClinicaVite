import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  PaperProps,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useState } from 'react';
import Draggable from 'react-draggable';
import toast, { Toaster } from 'react-hot-toast';
import { Badge } from 'rsuite';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { TimeSlot } from '../../interfaces/TimeSlot';
import colors from '../../styles/colors';
import HeaderBar from '../../componemts/HeaderBar';

interface Props {
  timeSlots: TimeSlot[];
  open: boolean;
  date: Date;
  onClose: CallableFunction;
  refetch?: CallableFunction;
  professionalId: string;
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

const DateDetails = ({
  timeSlots,
  open,
  date,
  onClose,
  refetch,
  professionalId,
}: Props) => {
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
          <HeaderBar
            title={`${weekDays[weekDay]} ${date.getDate()} ${months[month]} ${date.getFullYear()}`}
          />
        </DialogTitle>
        <DialogContent>
          {timeSlots.map((slot: TimeSlot, index: number) => {
            return (
              <SlotDetail
                slot={slot}
                key={slot.horaInicio}
                professionals={formData.professionals}
                patients={formData.persons}
                refetch={refetch}
                professional={professionalId}
                index={index}
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
  professional,
  index,
}: {
  slot: TimeSlot;
  professionals: Professional[];
  patients: Person[];
  refetch?: CallableFunction;
  professional: string;
  index: number;
}) => {
  const [reservationOpen, setReservationOpen] = useState<boolean>(false);
  const [patientId, setPatientId] = useState<string>('');
  const [reason, setReason] = useState<string>('');
  const [cancelOpen, setCancel] = useState<boolean>(false);

  const [submitting, setSubmitting] = useState(false);

  const weekDay = slot.fecha.getDay();
  const month = slot.fecha.getMonth();

  const { mode } = useThemeContext();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = {
        profesional: professional,
        persona: patientId,
        fecha: format(new Date(slot.fecha), 'MM/dd/yyyy'),
        horaInicio: slot.horaInicio,
        horaTermino: slot.horaTermino,
        razon: reason,
      };

      const response = await axios.post(
        `${generalConfig.baseUrl}/appointments`,
        data
      );

      if (response.data.message === 'success') {
        // setProfessionalId('');
        setPatientId('');
        setReason('');
        setSubmitting(false);
        toast.success('Hora reservada');
        if (refetch) {
          refetch();
        }
        setReservationOpen(false);
      }
    } catch (error) {
      toast.error('No se pudo reservar la hora deseada, inténtelo nuevamente.');
      setSubmitting(false);
    }
  };

  if (
    slot.content.type === 'appointment' &&
    slot.content.estado !== 'CANCELADO'
  ) {
    return (
      <Grid
        container
        spacing={3}
        direction="column"
        style={{
          backgroundColor:
            index % 2 !== 0 && mode === 'light'
              ? colors.lightModeTableHead
              : index % 2 !== 0 && mode === 'dark'
                ? colors.darkModeTableHead
                : '',
        }}
      >
        <Grid item justifyContent="center" alignItems="center" display="flex">
          <Grid container justifyContent="space-between" alignItems="center">
            <Grid item xs={12} sm={12} md={12} lg={9} xl={6}>
              <Grid
                container
                spacing={2}
                justifyContent="center"
                direction="column"
              >
                <Grid item>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? 'white' : colors.darkModeSoftText,
                      backgroundColor:
                        mode === 'light'
                          ? colors.lightModeHeaderColor
                          : colors.darkModeTableHead,
                    }}
                  >
                    Motivo
                  </Typography>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      color:
                        mode === 'light'
                          ? colors.lightModeTableText
                          : colors.darkModeSoftText,
                    }}
                  >
                    {slot.content.razon?.toLocaleLowerCase()}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? 'white' : colors.darkModeSoftText,
                      backgroundColor:
                        mode === 'light'
                          ? colors.lightModeHeadingGrey
                          : colors.darkModeTableHead,
                    }}
                  >
                    Paciente
                  </Typography>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      color:
                        mode === 'light'
                          ? colors.ligthModeSoftText
                          : colors.darkModeSoftText,
                    }}
                  >
                    {slot.content.persona.nombre1}{' '}
                    {slot.content.persona.nombre2}{' '}
                    {slot.content.persona.apellPat}{' '}
                    {slot.content.persona.apellMat}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? 'white' : colors.darkModeSoftText,
                      backgroundColor:
                        mode === 'light'
                          ? colors.lightModeHeadingGrey
                          : colors.darkModeTableHead,
                    }}
                  >
                    Atiende
                  </Typography>
                  <Typography
                    style={{
                      textTransform: 'capitalize',
                      color:
                        mode === 'light'
                          ? colors.ligthModeSoftText
                          : colors.darkModeSoftText,
                    }}
                  >
                    {slot.content.profesional.nombre1}{' '}
                    {slot.content.profesional.nombre2}{' '}
                    {slot.content.profesional.apellPat}{' '}
                    {slot.content.profesional.apellMat}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={9} xl={3}>
              <Button
                variant="outlined"
                onClick={() => setCancel(true)}
                fullWidth
                color="warning"
              >
                Liberar hora
              </Button>
              <Dialog
                open={cancelOpen}
                onClose={() => setCancel(false)}
                PaperComponent={PaperComponent}
                PaperProps={{
                  component: 'form',
                  onSubmit: async (e: React.FormEvent) => {
                    e.preventDefault();
                    const response = await axios.delete(
                      `${generalConfig.baseUrl}/appointments/${slot.content.id}`
                    );
                    if (response.data.message === 'success') {
                      toast.success('Se ha liberado la hora.');
                      setCancel(false);
                    }
                    if (refetch) {
                      refetch();
                    }
                  },
                }}
                aria-labelledby="draggable-dialog-title"
              >
                <DialogTitle
                  style={{ cursor: 'move' }}
                  id="draggable-dialog-title"
                >
                  Liberar hora {slot.horaInicio} - {slot.horaTermino} del{' '}
                  {weekDays[weekDay]} {slot.fecha.getDate()} {months[month]}{' '}
                  {slot.fecha.getFullYear()}
                </DialogTitle>
                <DialogContent>
                  <Typography>
                    ¿Está seguro que quiere liberar esta hora?
                  </Typography>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => setCancel(false)}
                    disabled={submitting}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    color="warning"
                    variant="contained"
                    disabled={submitting}
                  >
                    {!submitting && 'Liberar Hora'}
                    {submitting && 'liberando hora'}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
        <Grid item></Grid>
        <Grid item></Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      spacing={1}
      direction="column"
      style={{
        backgroundColor:
          index % 2 !== 0 && mode === 'light'
            ? colors.lightModeTableHead
            : index % 2 !== 0 && mode === 'dark'
              ? colors.darkModeTableHead
              : '',
      }}
    >
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
            <Button
              fullWidth
              variant="outlined"
              onClick={() => setReservationOpen(true)}
            >
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
                    {professional && (
                      <FormControl fullWidth>
                        <InputLabel id="professional-select">
                          Atiende
                        </InputLabel>
                        <Select
                          labelId="professional-select"
                          defaultValue={professional}
                          disabled
                          label="Atiende"
                        >
                          {professionals.map((p: Professional) => {
                            return (
                              <MenuItem key={p._id} value={p._id}>
                                {p.nombre1} {p.apellPat}
                              </MenuItem>
                            );
                          })}
                        </Select>
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
    </Grid>
  );
};

export default DateDetails;
