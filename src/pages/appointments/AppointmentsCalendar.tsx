import {
  Autocomplete,
  Box,
  Card,
  FormControl,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import esAr from 'rsuite/locales/es_AR';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
import { ServiceHour } from '../../interfaces/ServiceHour';
import CalendarLoading from './CalendarLoading';
import { TimeSlot } from '../../interfaces/TimeSlot';
import DateDetails from './DateDetails';
import colors from '../../styles/colors';
import { Professional } from '../../interfaces/Professional';
import { useThemeContext } from '../../componemts/themeContext';
import { getScrollingParent } from 'rsuite/esm/List/helper/utils';
import toast from 'react-hot-toast';
import { ProfessionalSchedule } from '../../interfaces/ProfessionalSchedule';

const AppointmentsCalendar = () => {
  const { mode } = useThemeContext();

  const [showSlots, setSlots] = useState<TimeSlot[]>([]);
  const [open, setOpen] = useState(false);
  const [showDate, setShowDate] = useState<Date>(new Date());
  const [refetch, setRefetch] = useState(false);
  const [filteredAppointments, setFilteredAppointments] = useState<
    Appointment[]
  >([]);

  const [schedule, setSchedule] = useState<ProfessionalSchedule>();

  const [professionalId, setProfessionalId] = useState('');

  const { data: scheduleData, isLoading } = useQuery({
    queryKey: ['scheduleData', refetch],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/service-hours/getschedule`
      );

      return response.data.body;
    },
  });

  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
      );

      return response.data.body;
    },
  });

  const { data: professionalSchedule } = useQuery({
    queryKey: ['professionalSchedule', professionalId],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `${generalConfig.baseUrl}/profesional-agenda/getprofessionalschedule/${professionalId}`
        );

        return response.data.body;
      } catch (error) {
        return [];
      }
    },
  });

  useEffect(() => {
    if (scheduleData && professionals) {
      const filteredAppointments = scheduleData?.appointments.filter(
        (a: Appointment) => {
          return a.profesional._id === professionalId;
        }
      );

      setFilteredAppointments(filteredAppointments);
      // setSchedule(professionalSchedule[0]);
    }
  }, [scheduleData, professionalId]);

  useEffect(() => {
    if (professionalSchedule) {
      setSchedule(professionalSchedule[0]);
    }
  }, [professionalSchedule]);

  const renderCell = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la fecha de hoy a media noche

    // obtener las citas para las fechas correspondientes
    const appointmentsList = filteredAppointments.filter((a: Appointment) => {
      const appointmentDate = new Date(a.fecha);
      return (
        date.getFullYear() === new Date(appointmentDate).getFullYear() &&
        date.getMonth() === new Date(appointmentDate).getMonth() &&
        date.getDate() === new Date(appointmentDate).getDate()
      );
    });

    function calculateServiceHours(
      startTime: string,
      intervalMinutes: number,
      serviceCount: number
    ) {
      // Parse the start time into hours and minutes
      const [startHour, startMinute] = startTime.split(':').map(Number);

      // Create a Date object with the start time
      let startDate = new Date();
      startDate.setHours(startHour, startMinute, 0, 0);

      // Array to hold the service hours
      const serviceHours = [];

      // Loop to calculate each service time slot
      for (let i = 0; i < serviceCount; i++) {
        // Calculate the end time for the current service
        let endDate = new Date(startDate);
        endDate.setMinutes(endDate.getMinutes() + intervalMinutes);

        // Format the start and end times as "HH:MM"
        const formattedStartTime = `${startDate.getHours().toString().padStart(2, '0')}:${startDate.getMinutes().toString().padStart(2, '0')}`;
        const formattedEndTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;

        // Add the time slot to the array
        serviceHours.push({
          horaInicio: `${formattedStartTime}`,
          horaTermino: `${formattedEndTime}`,
        });

        // Update the start time for the next service
        startDate = endDate;
      }

      return serviceHours;
    }

    // llamar el horario de atencion
    const serviceHours = schedule
      ? calculateServiceHours(
          schedule.horaInicio,
          schedule.intervalo,
          schedule.cupos
        )
      : [];

    // Crear una lista con los slots y que retorne la cita o si eta disponible en caso de no haber cita q corresponda a cierta hora
    const timeSlots: any[] = serviceHours?.map((hour) => {
      const appointment = appointmentsList?.find((a: Appointment) => {
        return (
          a.horaInicio === hour.horaInicio && a.horaTermino === hour.horaTermino
        );
      });

      //se retorna un objeto con los datos correspondientes, el content es la cita en caso de haber una, y en caso de no haber, se retorna un objeto tipo AVAILABE que corresponde a un horario libre
      return {
        horaInicio: hour.horaInicio,
        horaTermino: hour.horaTermino,
        fecha: date,
        content: appointment
          ? {
              type: 'appointment',
              razon: appointment.razon,
              persona: appointment.persona,
              estado: appointment.estado,
              profesional: appointment.profesional,
            }
          : { type: 'available' },
        //en caso de querer obviar algun dia de la semana por ejemplo domingo, hacer aca agregando otro tipo de contenido en caso de cumplir las condiciones
      };
    });

    // Separar la lista que se muestra y la que va en el tooltip
    const displayList = timeSlots?.slice(0, 2);
    const hiddenList = timeSlots?.slice(2);

    // Mostrar el historial de citas, pero que no retorne si esq hay horas disponibles ya que son dias anteriores a hoy
    if (date < today) {
      return (
        <ul className="calendar-todo-list">
          {appointmentsList
            ?.slice(0, 2)
            .map((item: Appointment, index: number) => {
              return (
                <li key={index}>
                  <Badge color="blue" /> <b>{item.razon}</b>
                </li>
              );
            })}
          {appointmentsList?.length > 2 && (
            <li>
              <Whisper
                placement="top"
                trigger="hover"
                speaker={
                  <Popover>
                    {appointmentsList
                      .slice(2)
                      .map((item: Appointment, index: number) => (
                        <div key={item._id} className="grid grid-cols-3">
                          <div>{item.razon}</div>
                          <div>
                            {item.persona.nombre1} {item.persona.apellPat}
                          </div>
                          <div className="ml-1">
                            <b>RUT</b> {item.persona.rut} - {item.persona.dv}
                          </div>
                        </div>
                      ))}
                  </Popover>
                }
              >
                <a>Ver más</a>
              </Whisper>
            </li>
          )}
        </ul>
      );
    } else if (!timeSlots.length) {
      return (
        <ul className="calendar-todo-list">
          {appointmentsList
            ?.slice(0, 2)
            .map((item: Appointment, index: number) => {
              return (
                <li key={index}>
                  <Badge color="yellow" /> <b>{item.razon}</b>
                </li>
              );
            })}
          {appointmentsList?.length > 2 && (
            <li>
              <Whisper
                placement="top"
                trigger="hover"
                speaker={
                  <Popover>
                    {appointmentsList
                      .slice(2)
                      .map((item: Appointment, index: number) => (
                        <div key={item._id} className="grid grid-cols-3">
                          <div>{item.razon}</div>
                          <div>
                            {item.persona.nombre1} {item.persona.apellPat}
                          </div>
                          <div className="ml-1">
                            <b>RUT</b> {item.persona.rut} - {item.persona.dv}
                          </div>
                        </div>
                      ))}
                  </Popover>
                }
              >
                <a>Ver más</a>
              </Whisper>
            </li>
          )}
        </ul>
      );
    } else {
      // Mostrar las citas o si esta libre la hora desde hoy hacia adelante
      return (
        <ul className="calendar-todo-list">
          {displayList?.map((slot: TimeSlot, index: number) => {
            if (
              slot.content.type === 'appointment' &&
              slot.content.estado !== 'CANCELADO'
            ) {
              return (
                <li key={index}>
                  <Badge color="yellow" />{' '}
                  <b className="capitalize">
                    {slot.content.razon?.toLowerCase()}
                  </b>
                </li>
              );
            } else if (
              schedule?.diasHabilitados.includes(slot.fecha.getDay())
            ) {
              return (
                <li key={index}>
                  <Badge color="green" />{' '}
                  {/* <span className="italic text-green-500">Disponible</span>{' '} */}
                  {slot.horaInicio}-{slot.horaTermino}
                </li>
              );
            }
          })}
          {hiddenList?.length > 0 && (
            <li>
              <Whisper
                placement="top"
                trigger="hover"
                speaker={
                  <Popover>
                    {hiddenList?.map((slot: TimeSlot, index: number) => (
                      <div key={index} className="grid grid-cols-3">
                        {slot.content.type === 'appointment' ? (
                          <div className="col-span-3">
                            <span className="font-bold capitalize">
                              {slot.content.razon?.toLowerCase()}
                            </span>{' '}
                            - {slot.horaInicio} - {slot.horaTermino}
                          </div>
                        ) : (
                          <div className="col-span-3">
                            <span className="text-green-500">Disponible</span> -{' '}
                            {slot.horaInicio} - {slot.horaTermino}
                          </div>
                        )}
                      </div>
                    ))}
                  </Popover>
                }
              >
                <a
                  onClick={() => {
                    setSlots(timeSlots);
                    setShowDate(date);
                    setOpen(!open);
                  }}
                >
                  {schedule?.diasHabilitados.includes(date.getDay()) &&
                    'Ver más'}
                </a>
              </Whisper>
            </li>
          )}
        </ul>
      );
    }
  };

  return (
    <>
      {professionals && (
        <FormControl fullWidth>
          <Typography
            style={{
              fontStyle: 'italic',
              color:
                mode === 'light'
                  ? colors.ligthModeSoftText
                  : colors.darkModeSoftText,
              marginBottom: 20,
            }}
          >
            Selecciona dentista para ver su agenda.
          </Typography>
          <Autocomplete
            disablePortal
            //   defaultValue={budget?.profesional}
            options={professionals}
            renderInput={(params) => <TextField {...params} label="Dentista" />}
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
          />
        </FormControl>
      )}
      <Card>
        <Calendar
          locale={esAr.Calendar}
          bordered
          renderCell={professionalId ? renderCell : undefined}
        />
      </Card>
      <DateDetails
        professionalId={professionalId}
        open={open}
        timeSlots={showSlots}
        date={showDate}
        onClose={() => setOpen(false)}
        refetch={() => {
          setRefetch(!refetch);
          setOpen(false);
        }}
      />
    </>
  );
};

export default AppointmentsCalendar;
