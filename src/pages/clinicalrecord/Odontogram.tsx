import {
  Box,
  Button,
  Collapse,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
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
import React, { useEffect, useState } from 'react';
import { Diente } from '../../interfaces/Diente';
import { OdontogramInterface } from '../../interfaces/Odontogram';

import {
  Close,
  KeyboardArrowDown,
  KeyboardArrowUp,
  Save,
} from '@mui/icons-material';
import toast, { Toaster } from 'react-hot-toast';
import diente11 from '../../assets/dientes/diente11.png';
import diente12 from '../../assets/dientes/diente12.png';
import diente13 from '../../assets/dientes/diente13.png';
import diente14 from '../../assets/dientes/diente14.png';
import diente15 from '../../assets/dientes/diente15.png';
import diente16 from '../../assets/dientes/diente16.png';
import diente17 from '../../assets/dientes/diente17.png';
import diente18 from '../../assets/dientes/diente18.png';
import diente21 from '../../assets/dientes/diente21.png';
import diente22 from '../../assets/dientes/diente22.png';
import diente23 from '../../assets/dientes/diente23.png';
import diente24 from '../../assets/dientes/diente24.png';
import diente25 from '../../assets/dientes/diente25.png';
import diente26 from '../../assets/dientes/diente26.png';
import diente27 from '../../assets/dientes/diente27.png';
import diente28 from '../../assets/dientes/diente28.png';
import diente31 from '../../assets/dientes/diente31.png';
import diente32 from '../../assets/dientes/diente32.png';
import diente33 from '../../assets/dientes/diente33.png';
import diente34 from '../../assets/dientes/diente34.png';
import diente35 from '../../assets/dientes/diente35.png';
import diente36 from '../../assets/dientes/diente36.png';
import diente37 from '../../assets/dientes/diente37.png';
import diente38 from '../../assets/dientes/diente38.png';
import diente41 from '../../assets/dientes/diente41.png';
import diente42 from '../../assets/dientes/diente42.png';
import diente43 from '../../assets/dientes/diente43.png';
import diente44 from '../../assets/dientes/diente44.png';
import diente45 from '../../assets/dientes/diente45.png';
import diente46 from '../../assets/dientes/diente46.png';
import diente47 from '../../assets/dientes/diente47.png';
import diente48 from '../../assets/dientes/diente48.png';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import ToothDetails from './ToothDetails';
import { Professional } from '../../interfaces/Professional';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Loader } from 'rsuite';
import { Person } from '../../interfaces/Person';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';
import { format } from 'date-fns';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

type DienteKeys =
  `diente${11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48}`;

const dientesImages: Record<DienteKeys, string> = {
  diente11: diente11,
  diente12: diente12,
  diente13: diente13,
  diente14: diente14,
  diente15: diente15,
  diente16: diente16,
  diente17: diente17,
  diente18: diente18,
  diente21: diente21,
  diente22: diente22,
  diente23: diente23,
  diente24: diente24,
  diente25: diente25,
  diente26: diente26,
  diente27: diente27,
  diente28: diente28,
  diente31: diente31,
  diente32: diente32,
  diente33: diente33,
  diente34: diente34,
  diente35: diente35,
  diente36: diente36,
  diente37: diente37,
  diente38: diente38,
  diente41: diente41,
  diente42: diente42,
  diente43: diente43,
  diente44: diente44,
  diente45: diente45,
  diente46: diente46,
  diente47: diente47,
  diente48: diente48,
};

const tableHeadings = [
  {
    id: 1,
    label: 'Pieza',
  },
  {
    id: 2,
    label: 'Estado',
  },
  {
    id: 3,
    label: 'Diagnóstico',
  },
];

interface Props {
  odontogram: OdontogramInterface | undefined;
  afterSubmit?: CallableFunction;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const Odontogram = ({ odontogram, afterSubmit }: Props) => {
  const { mode } = useThemeContext();
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [selectedTooth, setTooth] = useState<Diente>();
  const [alertOpen, setAlertOpen] = useState(false);

  const [isSubmitting, setSubmitting] = useState(false);
  const [value, setValue] = React.useState(0);

  const [newOdontogram, setNewOdontogram] = useState<OdontogramInterface>({
    persona: '',
    fecha: '',
    dientes: [],
    profesionalModifica: '',
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    if (odontogram) {
      setNewOdontogram(odontogram);
    }
  }, [odontogram]);

  if (!odontogram) return null;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleToothChange = (tooth: Diente, id: string) => {
    const teeth = [...newOdontogram.dientes];

    const indexOfOldTooth = newOdontogram?.dientes.findIndex(
      (d: Diente) => d._id === id
    );

    teeth[indexOfOldTooth] = tooth;

    setNewOdontogram((prevState) => ({
      ...prevState,
      dientes: [...teeth],
      persona: (odontogram.persona as Person)._id,
      profesionalModifica: (user as User).profesionalId,
      fecha: format(new Date(), 'yyyy-MM-dd'),
    }));
  };

  const handleCreateNewVersion = async () => {
    try {
      setSubmitting(true);
      const response = await axios.post(
        `${generalConfig.baseUrl}/odontogramas`,
        newOdontogram
      );

      if (response.data.message === 'success') {
        toast.success('Se ha creado una nueva versión del odontograma.');
        if (afterSubmit) afterSubmit();
        setAlertOpen(false);
        setSubmitting(false);
      }
    } catch (error) {
      console.log(error);
      toast.error('No se pudo crear una nueva versión, inténtelo nuevamente.');
      setAlertOpen(false);
      setSubmitting(false);
    }
  };

  return (
    <>
      <Grid container spacing={5}>
        {/* INFORMACION DEL ODONTOGRAMA */}
        <Grid item xs={12}>
          <Grid container justifyContent={'center'} alignItems={'center'}>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Fecha de registro (Versión)
              </Typography>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                {odontogram.fecha}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
              <Typography
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Atención
              </Typography>
              <Typography
                style={{
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                {(odontogram.profesionalModifica as Professional).nombre1}{' '}
                {(odontogram.profesionalModifica as Professional).nombre2}{' '}
                {(odontogram.profesionalModifica as Professional).apellPat}{' '}
                {(odontogram.profesionalModifica as Professional).apellMat}{' '}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={3} xl={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={() => setAlertOpen(true)}
                disabled={isSubmitting}
                color="success"
              >
                {isSubmitting && <Loader />}
                {!isSubmitting && <Save />}{' '}
                {isSubmitting && 'Creando nueva versión'}
                {!isSubmitting && 'Guardar Registro'}
              </Button>
              <Dialog
                open={alertOpen}
                onClose={() => setAlertOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {'¿Guardar registro de odontograma?'}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Al aceptar, se creará una nueva versión del odontograma en
                    la base de datos, ¿Está seguro(a) que esta es la versión que
                    quiere guardar?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button
                    variant="contained"
                    color="inherit"
                    onClick={() => setAlertOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    onClick={handleCreateNewVersion}
                    autoFocus
                    variant="contained"
                    disabled={isSubmitting}
                  >
                    {isSubmitting && 'Creando nueva versión'}
                    {!isSubmitting && 'Guardar Registro'}
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </Grid>
        {/* INFORMACION DEL ODONTOGRAMA */}
        <Grid item xs={12}>
          <Divider />
        </Grid>
      </Grid>

      <Grid container spacing={6}>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Grid container spacing={1}>
            {newOdontogram.dientes
              .filter((d) => parseInt(d.pieza!) < 31)
              .map((d: Diente) => {
                const dienteKey = `diente${d.pieza}` as DienteKeys;
                return (
                  <Grid item xs key={d._id}>
                    <Grid container justifyContent={'center'}>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }}>
                          {d.pieza}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        className="hover:scale-[1.05] cursor-pointer transition-all relative"
                        onClick={() => {
                          setTooth(d);
                          setOpen(true);
                        }}
                      >
                        {!d.activo && (
                          <div className="absolute">
                            <Close color="error" />
                          </div>
                        )}
                        <img
                          src={dientesImages[dienteKey]}
                          height={200}
                          width={50}
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <Grid container spacing={1} alignItems={'baseline'}>
            {newOdontogram.dientes
              .filter((d) => parseInt(d.pieza!) >= 31)
              .map((d: Diente) => {
                const dienteKey = `diente${d.pieza}` as DienteKeys;
                return (
                  <Grid item xs key={d._id}>
                    <Grid container justifyContent={'center'}>
                      <Grid
                        item
                        className="hover:scale-[1.05] cursor-pointer transition-all relative"
                        onClick={() => {
                          setTooth(d);
                          setOpen(true);
                        }}
                      >
                        {!d.activo && (
                          <div className="absolute">
                            <Close color="error" />
                          </div>
                        )}
                        <img
                          src={dientesImages[dienteKey]}
                          height={200}
                          width={50}
                        />
                      </Grid>
                      <Grid item>
                        <Typography style={{ textAlign: 'center' }}>
                          {d.pieza}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Grid container>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              className="rounded-lg shadow-lg"
            >
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="basic tabs example"
                  variant="fullWidth"
                >
                  <Tab label="Tratamientos" {...a11yProps(0)} />
                  <Tab label="Resumen" {...a11yProps(1)} />
                  <Tab label="Historial de citas" {...a11yProps(2)} />
                  <Tab label="Medicamentos" {...a11yProps(3)} />
                </Tabs>
              </Box>
              <CustomTabPanel value={value} index={1}>
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
                      <TableCell />
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
                    </TableHead>
                    <TableBody>
                      {newOdontogram.dientes
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((d: Diente) => {
                          return (
                            <ToothTableRow
                              tooth={d}
                              setTooth={() => setTooth(d)}
                              setOpen={() => setOpen(true)}
                            />
                          );
                        })}
                    </TableBody>
                  </Table>
                  <TablePagination
                    page={page}
                    onPageChange={handleChangePage}
                    count={odontogram.dientes?.length}
                    component="div"
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[8, 16, 32]}
                  />
                </TableContainer>
              </CustomTabPanel>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <ToothDetails
        open={open}
        setOpen={() => setOpen(false)}
        tooth={selectedTooth}
        onSave={handleToothChange}
      />
      <Toaster />
    </>
  );
};

const ToothTableRow = ({
  tooth,
  setTooth,
  setOpen,
}: {
  tooth: Diente;
  setTooth: CallableFunction;
  setOpen: CallableFunction;
}) => {
  const { mode } = useThemeContext();
  const [rowOpen, setRowOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            onClick={() => setRowOpen(!rowOpen)}
          >
            {rowOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell
          className="cursor-pointer"
          style={{
            fontWeight: 'bold',
            color: mode === 'light' ? colors.lightModeTableText : 'white',
          }}
          onClick={() => {
            setTooth();
            setOpen();
          }}
        >
          {tooth.pieza}
        </TableCell>
        <TableCell
          style={{
            color: mode === 'light' ? colors.lightModeTableText : 'white',
          }}
        >
          {tooth.activo && tooth.estado} {!tooth.activo && 'Diente ausente'}
        </TableCell>
        <TableCell
          style={{
            color: mode === 'light' ? colors.lightModeTableText : 'white',
          }}
        >
          {tooth.activo && tooth.diagnostico}{' '}
          {!tooth.activo && 'Diente ausente'}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={rowOpen} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              {tooth.activo && (
                <Typography variant="h6" gutterBottom component="div">
                  {`Pieza ${tooth.pieza}`}
                </Typography>
              )}
              {!tooth.activo && (
                <Typography
                  style={{
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    fontWeight: 'lighter',
                    textAlign: 'center',
                  }}
                  variant="h6"
                  gutterBottom
                  component="div"
                >
                  Diente Ausente
                </Typography>
              )}
              {tooth.activo && (
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        Cara
                      </TableCell>
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        Estado
                      </TableCell>
                      <TableCell
                        align="right"
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        Diagnóstico
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Oclusal</TableCell>
                      <TableCell>{tooth.oclusal.estado}</TableCell>
                      <TableCell align="right">{tooth.diagnostico}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Distal</TableCell>
                      <TableCell>{tooth.distal.estado}</TableCell>
                      <TableCell align="right">
                        {tooth.distal.diagnostico}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>bucal</TableCell>
                      <TableCell>{tooth.bucal.estado}</TableCell>
                      <TableCell align="right">
                        {tooth.bucal.diagnostico}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>mesial</TableCell>
                      <TableCell>{tooth.mesial.estado}</TableCell>
                      <TableCell align="right">
                        {' '}
                        {tooth.mesial.diagnostico}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>lingual/palatino</TableCell>
                      <TableCell>{tooth.lingualpalatino.estado}</TableCell>
                      <TableCell align="right">
                        {tooth.lingualpalatino.diagnostico}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>raíz</TableCell>
                      <TableCell>{tooth.raiz.estado}</TableCell>
                      <TableCell align="right">
                        {tooth.raiz.diagnostico}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              )}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
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

export default Odontogram;
