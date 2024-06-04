import { Card } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import esAr from 'rsuite/locales/es_AR';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
import { ServiceHour } from '../../interfaces/ServiceHour';
import CalendarLoading from './CalendarLoading';
import { TimeSlot } from '../../interfaces/TimeSlot';
import DateDetails from './DateDetails';

const AppointmentsCalendar = () => {
  const [showSlots, setSlots] = useState<TimeSlot[]>([]);
  const [open, setOpen] = useState(false);
  const [showDate, setShowDate] = useState<Date>(new Date());
  const [refetch, setRefetch] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['data', refetch],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/service-hours/getschedule`
      );

      return response.data.body;
    },
  });

  const renderCell = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalizar la fecha de hoy a media noche

    // obtener las citas para las fechas correspondientes
    const appointmentsList = data?.appointments.filter((a: Appointment) => {
      const appointmentDate = new Date(a.fecha);
      return (
        date.getFullYear() === appointmentDate.getFullYear() &&
        date.getMonth() === appointmentDate.getMonth() &&
        date.getDate() === appointmentDate.getDate()
      );
    });

    // llamar el horario de atencion
    const serviceHours = data?.serviceHours;

    // Crear una lista con los slots y que retorne la cita o si eta disponible en caso de no haber cita q corresponda a cierta hora
    const timeSlots: TimeSlot[] = serviceHours?.map((hour: ServiceHour) => {
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
            .map((item: Appointment, index: number) => (
              <li key={index}>
                <Badge color="blue" /> <b>{item.razon}</b>
              </li>
            ))}
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
            } else {
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
                  Ver más
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
      <Card>
        <Calendar locale={esAr.Calendar} bordered renderCell={renderCell} />
      </Card>
      <DateDetails
        open={open}
        timeSlots={showSlots}
        date={showDate}
        onClose={() => setOpen(false)}
        refetch={() => setRefetch(!refetch)}
      />
    </>
  );
};

export default AppointmentsCalendar;
