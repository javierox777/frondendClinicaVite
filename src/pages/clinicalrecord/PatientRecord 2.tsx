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
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { Appointment } from '../../interfaces/Appointment';
import ProgressLine from 'rsuite/esm/Progress/ProgressLine';
import OdontogramTab from './OdontogramTab';
import { Badge, ContactEmergency } from '@mui/icons-material';
import Personalnfo from './Personalnfo';
import PatientReceipts from './PatientReceipts';
import { update } from '@react-spring/web';
import ConsentmentsTab from './ConsentmentsTab';
import { formatRut } from '../../helpers/formatRut';
import PatientAntecedents from './PatientAntecedents';
import { Toaster } from 'react-hot-toast';
import { format } from 'date-fns';

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

  const [dataUpdated, setUpdated] = useState(false);

  const patient: Person = useLocation().state.patient;

  const { data: appointments, isFetching: appointmentsFetching } = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const data = await axios.get(
        `${generalConfig.baseUrl}/appointments/patientappointments/${patient._id}`
      );
      return data.data.body;
    },
  });

  const { data: odontograms, isFetching: odontogramsFetching } = useQuery({
    queryKey: ['odontograms', dataUpdated],
    queryFn: async () => {
      const data = await axios.get(
        `${generalConfig.baseUrl}/odontogramas/getpatientodontograms/${patient._id}`
      );
      return data.data.body;
    },
  });

  const { data: agreements, isLoading: agreementsLoading } = useQuery({
    queryKey: ['agreements'],
    queryFn: async () => {
      const data = await axios.get(
        `${generalConfig.baseUrl}/agreements/getagreements/${patient._id}`
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

  function calculateAge(birthDate: Date, age: string, monthsString: string) {
    const now = new Date();
    const birth = new Date(birthDate);

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();

    if (months < 0) {
      years--;
      months += 12;
    }

    let days = now.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      if (months < 0) {
        years--;
        months += 12;
      }
      const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
      days += prevMonth.getDate();
    }

    return `${years} ${age}, ${months} ${monthsString}`;
  }

  return (
    <>
      <Grid container>
        {/* INFORMACION DE PACIENTE  */}
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="shadow-lg rounded-lg pt-5 pl-5 pr-5"
        >
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  fontSize: 23,
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {patient.nombre1} {patient.nombre2} {patient.apellPat}{' '}
                {patient.apellMat}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{
                  fontWeight: 'lighter',
                  fontSize: 20,
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {calculateAge(patient.fechaNac, 'años', 'mes(es)')}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                {!agreementsLoading && agreements.length === 0
                  ? 'SIN CONVENIO(S)'
                  : 'CON CONVENIO(S)'}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                RUT
              </Typography>
              <Typography>
                {formatRut(patient.rut)} - {patient.dv}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                Fecha de nacimiento
              </Typography>
              <Typography>
                {new Date(patient.fechaNac).toLocaleDateString()}
              </Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                SEXO
              </Typography>
              <Typography>{patient.sexo.nombre}</Typography>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color:
                    mode === 'light'
                      ? colors.ligthModeSoftText
                      : colors.darkModeSoftText,
                }}
              >
                Previsión
              </Typography>
              <Typography>
                {patient.institucion.prevision.nombre}{' '}
                {patient.institucion.nombre}
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Contactos y Direcciones" {...a11yProps(0)} />
                <Tab label="Odontograma" {...a11yProps(1)} />
                <Tab label="Historial de citas" {...a11yProps(2)} />
                <Tab label="Medicamentos" {...a11yProps(3)} />
                <Tab label="Consentimientos" {...a11yProps(4)} />
                <Tab label="Antecedentes" {...a11yProps(5)} />
              </Tabs>
            </Box>
          </Grid>
        </Grid>
        {/* INFORMACION DE PACIENTE  */}

        <Grid item xs={12}>
          <CustomTabPanel value={value} index={2}>
            {appointmentsFetching && (
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <LinearProgress />
              </Grid>
            )}
            {appointments && !appointmentsFetching && (
              <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={12}
                xl={12}
                className="shadow-lg"
              >
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
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((a: Appointment) => {
                          return (
                            <TableRow key={a._id}>
                              <TableCell>
                                {format(new Date(a.fecha), 'dd/MM/yyyy')}
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
                  <TablePagination
                    page={page}
                    onPageChange={handleChangePage}
                    count={appointments?.length}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                </TableContainer>
              </Grid>
            )}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <OdontogramTab
              odontograms={odontograms}
              afterSubmit={() => setUpdated(!dataUpdated)}
              persona={patient}
            />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={0}>
            <Personalnfo patient={patient} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <PatientReceipts patient={patient} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <ConsentmentsTab patient={patient} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={5}>
            <PatientAntecedents patient={patient} />
          </CustomTabPanel>
        </Grid>
      </Grid>
      <Toaster />
    </>
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
