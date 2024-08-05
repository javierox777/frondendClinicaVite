const patientRecord = {
  persona: {
    nombre1: 'Hector',
    nombre2: 'Andres',
    apellPat: 'Miranda',
    apellMat: 'Carrazana',
    rut: '19818237',
    dv: '2',
  },
  profesionalModifica: {
    nombre1: 'Walter',
    nombre2: 'Alejandro',
    apellPat: 'Cortez',
    apellMat: 'Araya',
  },
  numero: 1231344,
};

const patientAppointments = [
  {
    _id: 2,
    profesional: {
      nombre1: 'Walter',
      nombre2: 'Alejandro',
      apellPat: 'Cortez',
      apellMat: 'Araya',
    },
    persona: {
      nombre1: 'Hector',
      nombre2: 'Andres',
      apellPat: 'Miranda',
      apellMat: 'Carrazana',
      rut: '19818237',
      dv: '2',
    },
    fecha: '2024/3/3',
    horaInicio: '8:30',
    horaTermino: '9:00',
    estado: 'COMPLETADO',
    razon: 'Limpieza general',
  },
];

import {
  Card,
  Container,
  Grid,
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
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import Tooth from '../../componemts/Tooth';

const tableHeadings = [
  { id: 1, label: 'Fecha' },
  { id: 3, label: 'Atención' },
  { id: 4, label: 'Razón' },
];

const PatientRecord = () => {
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    <Container>
      <Grid container spacing={4}>
        {/* INFORMACION DE PACIENTE  */}
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Card style={{ padding: 10 }}>
            <Grid container direction="column" spacing={3}>
              <Grid item>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                  }}
                >
                  Paciente
                </Typography>
                <Typography>
                  {patientRecord.persona.nombre1}{' '}
                  {patientRecord.persona.nombre2}{' '}
                  {patientRecord.persona.apellPat}{' '}
                  {patientRecord.persona.apellMat}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                  }}
                >
                  Rut
                </Typography>
                <Typography>
                  {patientRecord.persona.rut}-{patientRecord.persona.dv}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                  }}
                >
                  Previsión
                </Typography>
                <Typography>Isapre Colmena</Typography>
              </Grid>
              <Grid item>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                  }}
                >
                  Última atención
                </Typography>
                <Typography>
                  {patientRecord.profesionalModifica.nombre1}{' '}
                  {patientRecord.profesionalModifica.apellPat}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* INFORMACION DE PACIENTE  */}

        {/* HISTORIAL DE ATENCIÓN */}
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Typography>Historial de citas</Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
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
                {patientAppointments
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((a) => {
                    return (
                      <TableRow key={a._id}>
                        <TableCell>{a.fecha}</TableCell>
                        <TableCell>
                          {a.profesional.nombre1} {a.profesional.apellPat}
                        </TableCell>
                        <TableCell>{a.razon}</TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            page={page}
            onPageChange={handleChangePage}
            count={patientAppointments?.length}
            component="div"
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
        {/* HISTORIAL DE ATENCIÓN */}

        {/* DIENTES */}

        <Grid item xs={12}>
          <Grid container>
            <Grid item>
              <Tooth />
            </Grid>
          </Grid>
        </Grid>
        {/* DIENTES */}
        {/*  */}
      </Grid>
    </Container>
  );
};

export default PatientRecord;
