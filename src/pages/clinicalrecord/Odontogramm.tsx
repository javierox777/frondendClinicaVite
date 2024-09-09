import {
  Box,
  Grid,
  IconButton,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Button as MuiButton,
  LinearProgress,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITreatment, OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';

import diente11 from '../../assets/dientes/diente_11.png';
import diente12 from '../../assets/dientes/diente_12.png';
import diente13 from '../../assets/dientes/diente_13.png';
import diente14 from '../../assets/dientes/diente_14.png';
import diente15 from '../../assets/dientes/diente_15.png';
import diente16 from '../../assets/dientes/diente_16.png';
import diente17 from '../../assets/dientes/diente_17.png';
import diente18 from '../../assets/dientes/diente_18.png';
import diente21 from '../../assets/dientes/diente_21.png';
import diente22 from '../../assets/dientes/diente_22.png';
import diente23 from '../../assets/dientes/diente_23.png';
import diente24 from '../../assets/dientes/diente_24.png';
import diente25 from '../../assets/dientes/diente_25.png';
import diente26 from '../../assets/dientes/diente_26.png';
import diente27 from '../../assets/dientes/diente_27.png';
import diente28 from '../../assets/dientes/diente_28.png';
import diente31 from '../../assets/dientes/diente_31.png';
import diente32 from '../../assets/dientes/diente_32.png';
import diente33 from '../../assets/dientes/diente_33.png';
import diente34 from '../../assets/dientes/diente_34.png';
import diente35 from '../../assets/dientes/diente_35.png';
import diente36 from '../../assets/dientes/diente_36.png';
import diente37 from '../../assets/dientes/diente_37.png';
import diente38 from '../../assets/dientes/diente_38.png';
import diente41 from '../../assets/dientes/diente_41.png';
import diente42 from '../../assets/dientes/diente_42.png';
import diente43 from '../../assets/dientes/diente_43.png';
import diente44 from '../../assets/dientes/diente_44.png';
import diente45 from '../../assets/dientes/diente_45.png';
import diente46 from '../../assets/dientes/diente_46.png';
import diente47 from '../../assets/dientes/diente_47.png';
import diente48 from '../../assets/dientes/diente_48.png';
import diente51 from '../../assets/dientes/diente_51.png';
import diente52 from '../../assets/dientes/diente_52.png';
import diente53 from '../../assets/dientes/diente_53.png';
import diente54 from '../../assets/dientes/diente_54.png';
import diente55 from '../../assets/dientes/diente_55.png';
import diente61 from '../../assets/dientes/diente_61.png';
import diente62 from '../../assets/dientes/diente_62.png';
import diente63 from '../../assets/dientes/diente_63.png';
import diente64 from '../../assets/dientes/diente_64.png';
import diente65 from '../../assets/dientes/diente_65.png';
import diente71 from '../../assets/dientes/diente_71.png';
import diente72 from '../../assets/dientes/diente_72.png';
import diente73 from '../../assets/dientes/diente_73.png';
import diente74 from '../../assets/dientes/diente_74.png';
import diente75 from '../../assets/dientes/diente_75.png';
import diente81 from '../../assets/dientes/diente_81.png';
import diente82 from '../../assets/dientes/diente_82.png';
import diente83 from '../../assets/dientes/diente_83.png';
import diente84 from '../../assets/dientes/diente_84.png';
import diente85 from '../../assets/dientes/diente_85.png';

import { Button, ButtonGroup } from 'rsuite';
import Tooth from '../../componemts/Tooth';
import { Professional } from '../../interfaces/Professional';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';
import { Delete } from '@mui/icons-material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { generalConfig } from '../../config';

type DienteKeys =
  `diente${11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 51 | 52 | 53 | 54 | 55 | 61 | 62 | 63 | 64 | 65 | 71 | 72 | 73 | 74 | 75 | 81 | 82 | 83 | 84 | 85}`;

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
  diente51: diente51,
  diente52: diente52,
  diente53: diente53,
  diente54: diente54,
  diente55: diente55,
  diente61: diente61,
  diente62: diente62,
  diente63: diente63,
  diente64: diente64,
  diente65: diente65,
  diente71: diente71,
  diente72: diente72,
  diente73: diente73,
  diente74: diente74,
  diente75: diente75,
  diente81: diente81,
  diente82: diente82,
  diente83: diente83,
  diente84: diente84,
  diente85: diente85,
};

const items = [
  { title: 'Resetear parte', id: 0, color: '#FFFFFF' },
  { title: 'Aparato Ortodontico Fijo', id: 1, color: '#FF4500' },
  { title: 'Aparato Ortodontico Removible', id: 2, color: '#FF6347' },
  { title: 'Caries', id: 3, color: '#FF0000' },
  { title: 'Corona Definitiva', id: 4, color: '#FFD700' },
  { title: 'Corona Temporal', id: 5, color: '#FFA500' },
  { title: 'Desgaste Oclusal/Incisal', id: 6, color: '#808080' },
  { title: 'Diastema', id: 7, color: '#00CED1' },
  { title: 'Diente Ausente', id: 8, color: '#000000' },
  { title: 'Diente Discromico', id: 9, color: '#8B4513' },
  { title: 'Diente Ectopico', id: 10, color: '#4682B4' },
  { title: 'Diente en Clavija', id: 11, color: '#9370DB' },
  { title: 'Diente Extruido', id: 12, color: '#FF69B4' },
  { title: 'Diente Intruido', id: 13, color: '#DB7093' },
  { title: 'Endentulo Total', id: 14, color: '#D3D3D3' },
  { title: 'Fractura', id: 15, color: '#A52A2A' },
  { title: 'Geminación/Fusión', id: 16, color: '#BA55D3' },
  { title: 'Impactación', id: 17, color: '#8B0000' },
  { title: 'Implante', id: 18, color: '#2E8B57' },
  { title: 'Macrodoncia', id: 19, color: '#8FBC8F' },
  { title: 'Microdoncia', id: 20, color: '#87CEEB' },
  { title: 'Migración', id: 21, color: '#6A5ACD' },
  { title: 'Movilidad', id: 22, color: '#FFB6C1' },
  { title: 'Protesis Fija', id: 23, color: '#B8860B' },
  { title: 'Protesis Removible', id: 24, color: '#F4A460' },
  { title: 'Protesis Total', id: 25, color: '#FFDEAD' },
  { title: 'Remanente Radicular', id: 26, color: '#2F4F4F' },
  { title: 'Restauración', id: 27, color: '#32CD32' },
  { title: 'Restauración Temporal', id: 28, color: '#9ACD32' },
  { title: 'Semi Impactación', id: 29, color: '#B22222' },
  { title: 'Supernumerario', id: 30, color: '#FF8C00' },
  { title: 'Tratamiento Pulpar', id: 31, color: '#FF6347' },
  { title: 'Giroversión', id: 32, color: '#B0E0E6' },
  { title: 'Transposición', id: 33, color: '#20B2AA' },
];

interface Props {
  odontogram: OdontogramInterface | undefined;
}

const Odontogramm = ({ odontogram }: Props) => {
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const { user } = useUser();
  const { mode } = useThemeContext();

  const [odontogramLoading, setLoading] = useState(true);

  const [isSubmitting, setSubmitting] = useState(false);

  const [treatment, setTreatment] = useState({
    selected: 0,
    color: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [type, setType] = useState('permanent');

  const [teeth, setTeeth] = useState<Diente[]>();

  useEffect(() => {
    if (odontogram) {
      setLoading(false);
      setTeeth(odontogram.dientes);
      setTreatments(odontogram.tratamientos);
    }
  }, [odontogram]);

  const handleUpdate = (tooth: Diente, part: string) => {
    const updatedTeeth = [...teeth!];

    const indexOfOldTooth = teeth!.findIndex(
      (d: Diente) => d._id === tooth._id
    );

    updatedTeeth[indexOfOldTooth] = tooth;

    setTeeth(updatedTeeth);

    const getTreatment = items.filter((i: any) => {
      return i.id === treatment.selected;
    })[0];

    // Check if the treatment for this part of the tooth already exists on the same date
    const today = new Date().toDateString();
    const treatmentExists = treatments.some(
      (t) =>
        t.pieza.diente === tooth.pieza &&
        t.pieza.parte === part &&
        t.detalle === getTreatment.title &&
        new Date(t.fecha).toDateString() === today // Comparing only the date, not the time
    );

    if (!treatmentExists && getTreatment.title !== 'Resetear parte') {
      setTreatments([
        ...treatments,
        {
          detalle: getTreatment.title,
          fecha: new Date(),
          profesional: (user as User).profesionalId,
          pieza: {
            diente: tooth.pieza!,
            parte: part,
          },
          _id: (Math.random() * 1000).toString(),
        },
      ]);
    }
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

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const treatmentsWithoutId = treatments.map(({ _id, ...rest }) => rest);

      const response = await axios.patch(
        `${generalConfig.baseUrl}/odontogramas/${odontogram?._id}`,
        {
          profesionalModifica: (user as User).profesionalId,
          tratamientos: treatmentsWithoutId,
          dientes: teeth,
        }
      );

      if (response.data.message === 'success') {
        toast.success('Cambios guardados.');
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error('No se pudo guardar el odontograma, inténtelo nuevamente.');
      console.log(error);
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <Box>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  Fecha de registro
                </Typography>
                <Typography
                  style={{
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  {odontogram?.fecha}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <Box>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  Última modificación
                </Typography>
                <Typography
                  style={{
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  {(odontogram?.profesionalModifica as Professional).nombre1}{' '}
                  {(odontogram?.profesionalModifica as Professional).apellPat}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 15 }}>
          <MuiButton
            variant="contained"
            color="success"
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Guardar Cambios
          </MuiButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={3}
          xl={3}
          style={{ height: 'calc(500px + 0.75rem)' }}
          className="border-2 border-b-0 rounded-tl-md overflow-y-auto no-scrollbar"
        >
          <Box>
            <Box
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeTableHead
                    : colors.darkModeTableHead,
                padding: 10,
              }}
            >
              <Typography
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                  textAlign: 'center',
                }}
              >
                Condiciones/ Tratamientos dentales
              </Typography>
            </Box>
            {items.map((item) => {
              return (
                <Box
                  key={item.id}
                  className={`flex items-center ${treatment.selected === item.id ? 'scale-[1.03] transition-all bg-green-500' : ''} pl-3`}
                >
                  <div
                    style={{ backgroundColor: item.color }}
                    className="rounded-full w-2 h-2"
                  ></div>
                  <Typography
                    style={{ borderBottom: '1px solid #e1e3e3' }}
                    className={` cursor-pointer p-3 w-full ${treatment.selected === item.id ? 'text-white' : ''}`}
                    onClick={() => {
                      setTreatment((prevState) => ({
                        color: item.color,
                        selected: item.id,
                      }));
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          xl={9}
          className="border-2 border-b-0 pt-3 rounded-tr-md"
        >
          {odontogramLoading && (
            <Grid
              className="no-scrollbar "
              container
              direction={'column'}
              justifyContent={'center'}
              alignItems="center"
              gap={3}
              style={{ height: '500px', overflow: 'scroll' }}
            >
              <Grid item>
                <LinearProgress />
              </Grid>
            </Grid>
          )}
          {!odontogramLoading && (
            <Grid
              className="no-scrollbar "
              container
              direction={'column'}
              justifyContent={'center'}
              alignItems="center"
              gap={3}
              style={{ height: '500px', overflow: 'scroll' }}
            >
              <Grid item>
                <ButtonGroup>
                  <Button onClick={() => setType('permanent')}>
                    Permanente
                  </Button>
                  <Button onClick={() => setType('temporary')}>Temporal</Button>
                </ButtonGroup>
              </Grid>
              {type === 'permanent' && (
                <>
                  <Grid item>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter((t: Diente) => parseInt(t.pieza!) < 31)
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center "
                                style={{ height: '100%' }}
                              >
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter(
                            (t: Diente) =>
                              parseInt(t.pieza!) >= 31 &&
                              parseInt(t.pieza!) < 51
                          )
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center ju"
                                style={{ height: '100%' }}
                              >
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>{' '}
                </>
              )}
              {type === 'temporary' && (
                <>
                  <Grid item>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter(
                            (t: Diente) =>
                              parseInt(t.pieza!) > 48 &&
                              parseInt(t.pieza!) <= 65
                          )
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center "
                                style={{ height: '100%' }}
                              >
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter((t: Diente) => parseInt(t.pieza!) >= 71)
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center ju"
                                style={{ height: '100%' }}
                              >
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>{' '}
                </>
              )}
            </Grid>
          )}
        </Grid>
        <Grid item xs={12} className="border-t-2">
          <TableContainer>
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
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Condiciones/ Tratamientos dentales
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Pieza
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell>Atención</TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatments &&
                  treatments
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((t: ITreatment) => {
                      return (
                        <TableRow key={t._id}>
                          <TableCell>{t.detalle}</TableCell>
                          <TableCell>
                            {t.pieza.diente} {t.pieza.parte}
                          </TableCell>
                          <TableCell>
                            {new Date(t.fecha).toLocaleDateString()}
                          </TableCell>
                          <TableCell>
                            {(t.profesional as Professional).nombre1}{' '}
                            {(t.profesional as Professional).apellPat}
                          </TableCell>
                          <TableCell>
                            <IconButton
                              onClick={() => {
                                const newTreatments = treatments.filter(
                                  (tr: ITreatment) => t._id !== tr._id
                                );
                                setTreatments(newTreatments);

                                const updatedTeeth = [...teeth!];

                                const toothIndex = teeth!.findIndex(
                                  (d: Diente) => d.pieza === t.pieza.diente
                                );

                                updatedTeeth[toothIndex][
                                  t.pieza.parte as
                                    | 'bucal'
                                    | 'distal'
                                    | 'oclusal'
                                    | 'mesial'
                                    | 'lingualpalatino'
                                ].color = '#FFFFFF';
                                updatedTeeth[toothIndex][
                                  t.pieza.parte as
                                    | 'bucal'
                                    | 'distal'
                                    | 'oclusal'
                                    | 'mesial'
                                    | 'lingualpalatino'
                                ].detalle = '';
                                updatedTeeth[toothIndex][
                                  t.pieza.parte as
                                    | 'bucal'
                                    | 'distal'
                                    | 'oclusal'
                                    | 'mesial'
                                    | 'lingualpalatino'
                                ].diagnostico = '';
                                updatedTeeth[toothIndex][
                                  t.pieza.parte as
                                    | 'bucal'
                                    | 'distal'
                                    | 'oclusal'
                                    | 'mesial'
                                    | 'lingualpalatino'
                                ].estado = '';

                                setTeeth(updatedTeeth);
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
            <TablePagination
              page={page}
              onPageChange={handleChangePage}
              count={treatments.length}
              component="div"
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
      <Toaster />
    </>
  );
};

export default Odontogramm;
