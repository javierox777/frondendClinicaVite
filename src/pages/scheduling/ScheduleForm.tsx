import { Close } from '@mui/icons-material';
import {
  AppBar,
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Professional } from '../../interfaces/Professional';
import colors from '../../styles/colors';
import { TransitionProps } from '@mui/material/transitions';
import { ProfessionalSchedule } from '../../interfaces/ProfessionalSchedule';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  schedule?: ProfessionalSchedule;
  refetch?: CallableFunction;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const weekDaysOptions = [
  { label: 'Domingo', value: 0 },
  { label: 'Lunes', value: 1 },
  { label: 'Martes', value: 2 },
  { label: 'Miércoles', value: 3 },
  { label: 'Jueves', value: 4 },
  { label: 'Viernes', value: 5 },
  { label: 'Sábado', value: 6 },
];

const ScheduleForm = ({ onClose, open, schedule, refetch }: Props) => {
  const { mode } = useThemeContext();

  const [professionalId, setProfessionalId] = useState<string>('');
  const [quota, setQuota] = useState<number>(0);
  const [startHour, setStartHour] = useState<string>('01');
  const [startMinutes, setStartMinutes] = useState<string>('00');
  const [interval, setInterval] = useState<number>(0);
  const [weekDays, setWeekdays] = useState<number[]>([]);
  const [daysOff, setDaysOff] = useState<string[]>([]);
  const [dayOffToAdd, setDayOffToAdd] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [valid, setValid] = useState<string>('');

  const [isSubmitting, setSubmitting] = useState<boolean>(false);

  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
      );

      return response.data.body;
    },
  });

  const handleAddDayOff = () => {
    const dateToAdd = format(new Date(dayOffToAdd), 'MM/dd/yyy');
    setDaysOff([...daysOff, dateToAdd]);
    setDayOffToAdd('');
    toast.success('Día libre se ha agregado');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const data = {
      diasHabilitados: weekDays,
      cupos: quota,
      intervalo: interval,
      profesional: professionalId,
      horaInicio: `${startHour}:${startMinutes}`,
      fechaInicio: format(new Date(startDate), 'MM/dd/yyyy'),
      fechaTermino: format(new Date(endDate), 'MM/dd/yyyy'),
      diasLibres: daysOff,
    };

    e.preventDefault();
    try {
      setSubmitting(true);
      if (!schedule) {
        const response = await axios.post(
          `${generalConfig.baseUrl}/profesional-agenda`,
          data
        );

        if (response.data.message === 'success') {
          toast.success('Agenda Registrada');
          setProfessionalId('');
          setQuota(0);
          setStartHour('01');
          setStartMinutes('00');
          setInterval(0);
          setWeekdays([]);
          setDaysOff([]);
          setDayOffToAdd('');
          setStartDate('');
          setEndDate('');
          setSubmitting(false);
          if (refetch) {
            refetch();
          }
        }
      } else {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/profesional-agenda/${schedule._id}`,
          {
            diasHabilitados: weekDays,
            cupos: quota,
            intervalo: interval,
            profesional: professionalId,
            horaInicio: `${startHour}:${startMinutes}`,
            fechaInicio: format(new Date(startDate), 'MM/dd/yyyy'),
            fechaTermino: format(new Date(endDate), 'MM/dd/yyyy'),
            diasLibres: daysOff,
            vigente: valid,
          }
        );

        if (response.data.message === 'success') {
          toast.success('Agenda actualizada');
          setSubmitting(false);
          if (refetch) {
            refetch();
          }
        }
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('No se ha podido registrar agenda.');
    }
  };

  useEffect(() => {
    if (schedule) {
      const hour = schedule.horaInicio.split(':')[0];
      const minutes = schedule.horaInicio.split(':')[1];

      setProfessionalId((schedule.profesional as Professional)._id);
      setQuota(schedule.cupos);
      setStartHour(hour);
      setStartMinutes(minutes);
      setWeekdays(schedule.diasHabilitados);
      setInterval(schedule.intervalo);
      setDaysOff(schedule.diasLibres);
      setStartDate(format(new Date(schedule.fechaInicio), 'yyyy-MM-dd'));
      setEndDate(format(new Date(schedule.fechaTermino), 'yyyy-MM-dd'));
      setValid(schedule.vigente);
    }
  }, [schedule]);

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
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
        <Container sx={{ paddingBlock: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
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
                    <Typography variant="h6">Datos de agenda</Typography>
                  </Toolbar>
                </AppBar>
              </Grid>
              {schedule && (
                <Grid item>
                  <Typography>Vigente</Typography>
                  <Switch
                    checked={valid === '1'}
                    onChange={() => {
                      if (valid === '1') {
                        setValid('2');
                      } else if (valid === '2') {
                        setValid('1');
                      }
                    }}
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    defaultValue={schedule?.profesional as Professional}
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
                    onChange={(event, professional: Professional | null) => {
                      if (professional) setProfessionalId(professional._id);
                    }}
                    style={{
                      marginBottom: 20,
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    type="date"
                    label="Fecha Inicio"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      setStartDate(e.target.value);
                    }}
                    value={startDate}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    type="date"
                    label="Fecha Término"
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => {
                      setEndDate(e.target.value);
                    }}
                    value={endDate}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    required
                    value={quota}
                    label="Cupos"
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      const newValue =
                        inputValue === '0' ||
                        (!isNaN(Number(inputValue)) && inputValue !== '')
                          ? String(Number(inputValue))
                          : '0';

                      setQuota(Number(newValue));
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    value={interval}
                    label="Intervalo(minutos)"
                    onChange={(e) => {
                      const inputValue = e.target.value;

                      const newValue =
                        inputValue === '0' ||
                        (!isNaN(Number(inputValue)) && inputValue !== '')
                          ? String(Number(inputValue))
                          : '0';

                      setInterval(Number(newValue));
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid container spacing={2} alignItems="center">
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
                        <Typography variant="h6">Hora de inicio</Typography>
                      </Toolbar>
                    </AppBar>
                  </Grid>
                  <Grid item xs={5} sm={5} md={5} lg={2} xl={2}>
                    <FormControl fullWidth>
                      <Select
                        fullWidth
                        value={startHour}
                        onChange={(e) => setStartHour(e.target.value)}
                      >
                        <MenuItem value="01">01</MenuItem>
                        <MenuItem value="02">02</MenuItem>
                        <MenuItem value="03">03</MenuItem>
                        <MenuItem value="04">04</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="06">06</MenuItem>
                        <MenuItem value="07">07</MenuItem>
                        <MenuItem value="08">08</MenuItem>
                        <MenuItem value="09">09</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="11">11</MenuItem>
                        <MenuItem value="12">12</MenuItem>
                        <MenuItem value="13">13</MenuItem>
                        <MenuItem value="14">14</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="16">16</MenuItem>
                        <MenuItem value="17">17</MenuItem>
                        <MenuItem value="18">18</MenuItem>
                        <MenuItem value="19">19</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="21">21</MenuItem>
                        <MenuItem value="22">22</MenuItem>
                        <MenuItem value="23">23</MenuItem>
                        <MenuItem value="24">24</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <Typography style={{ fontWeight: 'bold' }}>:</Typography>
                  </Grid>
                  <Grid item xs={5} sm={5} md={5} lg={2} xl={2}>
                    <FormControl fullWidth>
                      <Select
                        fullWidth
                        value={startMinutes}
                        onChange={(e) => setStartMinutes(e.target.value)}
                      >
                        <MenuItem value="00">00</MenuItem>
                        <MenuItem value="05">05</MenuItem>
                        <MenuItem value="10">10</MenuItem>
                        <MenuItem value="15">15</MenuItem>
                        <MenuItem value="20">20</MenuItem>
                        <MenuItem value="25">25</MenuItem>
                        <MenuItem value="30">30</MenuItem>
                        <MenuItem value="35">35</MenuItem>
                        <MenuItem value="40">40</MenuItem>
                        <MenuItem value="45">45</MenuItem>
                        <MenuItem value="50">50</MenuItem>
                        <MenuItem value="55">55</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  {/* CHECKBOX DE DIAS DE SEMANA */}
                  <Grid item xs={12}>
                    <Divider />
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
                        <Typography variant="h6">Días de atención</Typography>
                      </Toolbar>
                    </AppBar>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
                        {weekDaysOptions.map((o) => {
                          return (
                            <FormControlLabel
                              key={o.value}
                              control={
                                <Checkbox
                                  value={o.value}
                                  onChange={(e) => {
                                    if (e.target.checked) {
                                      setWeekdays([
                                        ...weekDays,
                                        Number(e.target.value),
                                      ]);
                                    } else {
                                      const filtered = weekDays.filter(
                                        (number) =>
                                          number !== Number(e.target.value)
                                      );
                                      setWeekdays(filtered);
                                    }
                                  }}
                                  checked={weekDays?.some((d) => d === o.value)}
                                />
                              }
                              label={o.label}
                            />
                          );
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                  {/* CHECKBOX DE DIAS DE SEMANA */}
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/* DIAS LIBRES */}
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
                        <Typography variant="h6">Días libres</Typography>
                      </Toolbar>
                    </AppBar>
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                    <FormControl fullWidth>
                      <TextField
                        label="Día libre"
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setDayOffToAdd(e.target.value)}
                        value={dayOffToAdd}
                      />
                      <Button
                        variant="contained"
                        type="button"
                        onClick={handleAddDayOff}
                      >
                        Agregar día libre
                      </Button>
                    </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Box>
                      <Typography style={{ fontWeight: 'bold' }}>
                        Días libres agregados
                      </Typography>
                    </Box>
                    {!daysOff.length && (
                      <Box>
                        <Typography>
                          No se han seleccionado dias libres
                        </Typography>
                      </Box>
                    )}
                    {daysOff.map((d, index) => {
                      return (
                        <Box
                          key={index}
                          style={{ display: 'flex', alignItems: 'center' }}
                        >
                          <Typography>{d}</Typography>
                          <IconButton
                            onClick={() => {
                              const updatedDaysOff = daysOff.filter(
                                (a) => a !== d
                              );
                              setDaysOff(updatedDaysOff);
                            }}
                          >
                            <Close />
                          </IconButton>
                        </Box>
                      );
                    })}
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  {/* DIAS LIBRES */}
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <Button
                        variant="contained"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        {!isSubmitting && !schedule && 'Registrar Agenda'}
                        {isSubmitting && !schedule && 'Registrando Agenda'}
                        {schedule && !isSubmitting && 'Actualizar Agenda'}
                        {schedule && isSubmitting && 'Actualizando Agenda'}
                      </Button>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </Container>
      </Dialog>
      <Toaster />
    </>
  );
};

export default ScheduleForm;
