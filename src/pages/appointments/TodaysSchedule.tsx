import {
  Card,
  Grid,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
import StatusBadge from '../../componemts/StatusBadge';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';

const tableHeadings = [
  { id: 1, label: 'Paciente' },
  { id: 2, label: 'RUT' },
  { id: 3, label: 'Atiende' },
  { id: 4, label: 'Hora' },
  { id: 5, label: 'Estado' },
];

const TodaysSchedule = () => {
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data: appointments, isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/appointments/todayschedule`
      );

      return response.data.body;
    },
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Card elevation={4} style={{ padding: 10 }}>
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
        {isLoading && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        )}
        {!isLoading && (
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table>
                <TableHead
                  style={{
                    backgroundColor:
                      mode === 'light'
                        ? colors.lightModeTableHead
                        : colors.darkModeTableHead,
                  }}
                >
                  <TableRow>
                    {tableHeadings.map((h) => {
                      return (
                        <TableCell
                          style={{
                            fontWeight: 'bold',
                            color:
                              mode === 'light'
                                ? colors.lightModeTableText
                                : 'white',
                          }}
                          key={h.id}
                        >
                          {h.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {appointments
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((a: Appointment) => {
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
            <TablePagination
              page={page}
              onPageChange={handleChangePage}
              count={appointments?.length}
              component="div"
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        )}
      </Grid>
    </Card>
  );
};

export default TodaysSchedule;
