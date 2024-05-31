import { Card } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { Badge, Calendar, Popover, Whisper } from 'rsuite';
import esAr from 'rsuite/locales/es_AR';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';

const AppointmentsCalendar = () => {
  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/appointments`);

      return response.data.body;
    },
  });

  console.log(appointments);

  const renderCell = (date: Date) => {
    const list = appointments?.filter((a: Appointment) => {
      const appointmentDate = new Date(a.fecha);
      return (
        date.getFullYear() === appointmentDate.getFullYear() &&
        date.getMonth() === appointmentDate.getMonth() &&
        date.getDate() === appointmentDate.getDate()
      );
    });

    const displayList = list?.filter(
      (item: Appointment, index: number) => index < 2
    );

    if (list?.length) {
      const moreCount = list?.length - displayList.length;
      const moreItem = (
        <li>
          <Whisper
            placement="top"
            trigger="hover"
            speaker={
              <Popover>
                {list.map((item: Appointment, index: number) => {
                  return (
                    <p key={item._id}>
                      <b>{item.razon}</b> - {item.persona.nombre1}{' '}
                      {item.persona.apellPat} <b>RUT</b> {item.persona.rut}-
                      {item.persona.dv}
                    </p>
                  );
                })}
              </Popover>
            }
          >
            <a>Ver mas</a>
          </Whisper>
        </li>
      );
      return (
        <ul className="calendar-todo-list">
          {displayList.map((item: Appointment, index: number) => {
            return (
              <li key={index}>
                <Badge color="cyan" /> <b>{item.razon}</b> -{' '}
                {item.persona.nombre1}
              </li>
            );
          })}
          {moreItem}
        </ul>
      );
    }
    return null;
  };

  return (
    <Card>
      <Calendar locale={esAr.Calendar} bordered renderCell={renderCell} />
    </Card>
  );
};

export default AppointmentsCalendar;
