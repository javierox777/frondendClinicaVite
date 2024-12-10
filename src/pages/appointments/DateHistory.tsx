import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  PaperProps,
  Typography,
} from '@mui/material';
import React from 'react';
import Draggable from 'react-draggable';
import HeaderBar from '../../componemts/HeaderBar';
import { TimeSlot } from '../../interfaces/TimeSlot';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

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

interface Props {
  open: boolean;
  onClose: CallableFunction;
  date: Date;
  timeSlots: TimeSlot[];
}

const DateHistory = ({ open, onClose, date, timeSlots }: Props) => {
  const weekDay = date.getDay();
  const month = date.getMonth();
  return (
    <Dialog
      open={open}
      onClose={() => onClose()}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <HeaderBar
          title={`Historial ${weekDays[weekDay]} ${date.getDate()} ${months[month]} ${date.getFullYear()}`}
        />
      </DialogTitle>
      <DialogContent>
        {timeSlots.map((slot: TimeSlot, index: number) => {
          return <SlotDetail slot={slot} key={slot.horaInicio} index={index} />;
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
  );
};

const SlotDetail = ({ slot, index }: { slot: TimeSlot; index: number }) => {
  const { mode } = useThemeContext();

  if (slot.content.type !== 'available')
    return (
      <Grid
        container
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
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  color: mode === 'light' ? 'white' : colors.darkModeSoftText,
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeHeaderColor
                      : colors.darkModeHeaderColor,
                }}
              >
                Hora
              </Typography>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.horaInicio} - {slot.horaTermino}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  color: mode === 'light' ? 'white' : colors.darkModeSoftText,
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeHeaderColor
                      : colors.darkModeHeaderColor,
                }}
              >
                Motivo
              </Typography>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.razon}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                Paciente
              </Typography>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.persona.nombre1} {slot.content.persona.apellPat}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                Atención
              </Typography>
              <Typography
                style={{
                  textAlign: 'center',
                  textTransform: 'capitalize',
                  color:
                    mode === 'light'
                      ? colors.lightModeTableText
                      : colors.darkModeSoftText,
                }}
              >
                {slot.content.profesional.nombre1}{' '}
                {slot.content.profesional.apellPat}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  return (
    <Grid
      container
      direction="column"
      style={{
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor:
          index % 2 !== 0 && mode === 'light'
            ? colors.lightModeTableHead
            : index % 2 !== 0 && mode === 'dark'
              ? colors.darkModeTableHead
              : '',
      }}
    >
      <Grid item xs={12}>
        <Typography
          style={{
            textAlign: 'center',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color:
              mode === 'light'
                ? colors.lightModeTableText
                : colors.darkModeSoftText,
          }}
        >
          {slot.horaInicio} - {slot.horaTermino}
        </Typography>
        <Typography
          style={{
            textAlign: 'center',
            textTransform: 'capitalize',
            fontWeight: 'bold',
            color:
              mode === 'light'
                ? colors.lightModeTableText
                : colors.darkModeSoftText,
          }}
        >
          Sin Cita
        </Typography>
      </Grid>
    </Grid>
  );
};

export default DateHistory;
