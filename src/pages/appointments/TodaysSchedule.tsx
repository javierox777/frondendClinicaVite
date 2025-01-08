import {
  AppBar,
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
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../componemts/StatusBadge';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Appointment } from '../../interfaces/Appointment';
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

  const navigation = useNavigate();

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
    <Grid container>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeHeaderColor
                  : colors.darkModeHeaderColor,
            }}
          >
            <Typography variant="h6">Citaciones del día de hoy</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      {isLoading && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      {!isLoading && (
        <Grid item xs={12} className="shadow-lg rounded-lg">
          <TableContainer component={Paper} elevation={0}>
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
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a: Appointment) => {
                    return (
                      <TableRow
                        key={a._id}
                        className="hover:bg-slate-400 transition-all cursor-pointer "
                        onClick={() =>
                          navigation('/atencionpaciente', {
                            state: { appointment: a },
                          })
                        }
                      >
                        <TableCell
                          style={{
                            fontWeight: 'bold',
                            color:
                              mode === 'light'
                                ? colors.lightModeTableText
                                : 'white',
                            textTransform: 'capitalize',
                          }}
                        >
                          {a.persona.nombre1.toLowerCase()}{' '}
                          {a.persona.apellPat.toLowerCase()}{' '}
                          {a.persona.apellMat.toLowerCase()}
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
  );
};

export default TodaysSchedule;
