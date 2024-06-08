import {
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
import StatusBadge from '../../componemts/StatusBadge';

const TodaysSchedule = () => {
  const { data: appointments } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/appointments/todayschedule`
      );

      return response.data.body;
    },
  });

  const tableHeadings = [
    { id: 1, label: 'Paciente' },
    { id: 2, label: 'RUT' },
    { id: 3, label: 'Atiende' },
    { id: 4, label: 'Hora' },
    { id: 5, label: 'Estado' },
  ];

  return (
    <Card>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            style={{
              fontSize: 20,
            }}
          >
            Citaciones del dia de hoy
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {tableHeadings.map((h) => {
                    return <TableCell key={h.id}>{h.label}</TableCell>;
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments?.map((a: Appointment) => {
                  return (
                    <TableRow key={a._id}>
                      <TableCell>
                        {a.persona.nombre1} {a.persona.apellPat}{' '}
                        {a.persona.apellMat}
                      </TableCell>
                      <TableCell>
                        {a.persona.rut}-{a.persona.dv}
                      </TableCell>
                      <TableCell>
                        {a.profesional.nombre1} {a.profesional.apellPat}
                      </TableCell>
                      <TableCell>
                        {a.horaInicio} - {a.horaTermino}
                      </TableCell>
                      <TableCell>
                        <StatusBadge
                          status={
                            a.estado === 'COMPLETADO'
                              ? 'finished'
                              : a.estado === 'AGENDADO'
                                ? 'in-progress'
                                : 'in-progress'
                          }
                          title={a.estado}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TodaysSchedule;
