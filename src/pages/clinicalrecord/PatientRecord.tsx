import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import Tooth from '../../componemts/Tooth';
import Odontogram from './Odontogram';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { Appointment } from '../../interfaces/Appointment';
import ProgressLine from 'rsuite/esm/Progress/ProgressLine';

const tableHeadings = [
  { id: 1, label: 'Fecha' },
  { id: 3, label: 'Atención' },
  { id: 4, label: 'Razón' },
];

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const PatientRecord = () => {
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [value, setValue] = React.useState(0);

  const patient: Person = useLocation().state.patient;

  const { data: appointments, isFetching } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const data = await axios.get(
        `${generalConfig.baseUrl}/appointments/patientappointments/${patient._id}`
      );
      return data.data.body;
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

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
    <Grid container spacing={4}>
      {/* INFORMACION DE PACIENTE  */}
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        style={{
          backgroundColor:
            mode === 'light'
              ? colors.ligthModeSoftText
              : colors.darkModeTableHead,
        }}
      >
        <Grid container>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 'bold', fontSize: 23 }}>
              {patient.nombre1} {patient.nombre2} {patient.apellPat}{' '}
              {patient.apellMat}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography>
              RUT:{patient.rut}-{patient.dv}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      {/* INFORMACION DE PACIENTE  */}
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Historial de citas" {...a11yProps(0)} />
            <Tab label="Odontograma" {...a11yProps(1)} />
            <Tab label="Datos Personales" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {isFetching && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
              <LinearProgress />
            </Grid>
          )}
          {appointments && !isFetching && (
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
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
                    {appointments
                      ?.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                      .map((a: Appointment) => {
                        return (
                          <TableRow key={a._id}>
                            <TableCell>
                              {new Date(a.fecha).toLocaleDateString()}
                            </TableCell>
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
                count={appointments?.length}
                component="div"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Grid>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Odontogram />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
    </Grid>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
export default PatientRecord;
