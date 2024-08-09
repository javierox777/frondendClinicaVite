import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';

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
import diente42 from '../../assets/dientes/diente42.png';
import diente41 from '../../assets/dientes/diente41.png';
import diente43 from '../../assets/dientes/diente43.png';
import diente44 from '../../assets/dientes/diente44.png';
import diente45 from '../../assets/dientes/diente45.png';
import diente46 from '../../assets/dientes/diente46.png';
import diente47 from '../../assets/dientes/diente47.png';
import diente48 from '../../assets/dientes/diente48.png';
import ToothDetails from './ToothDetails';
import { Close } from '@mui/icons-material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import { Toaster } from 'react-hot-toast';

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
}

const Odontogram = ({ odontogram }: Props) => {
  const { mode } = useThemeContext();
  const [open, setOpen] = useState(false);
  const [selectedTooth, setTooth] = useState<Diente>();

  const [newOdontogram, setNewOdontogram] = useState<OdontogramInterface>({
    persona: '',
    fecha: '',
    dientes: [],
    version: 0,
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
    }));
  };

  return (
    <>
      <Container>
        <Grid container spacing={6}>
          <Grid item>
            <Grid container spacing={1}>
              {newOdontogram.dientes
                .filter((d) => parseInt(d.pieza) < 31)
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
                .filter((d) => parseInt(d.pieza) >= 31)
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
          <Grid item xs={12}>
            <Grid container>
              <Grid item xs={6}>
                <TableContainer component={Paper} elevation={3}>
                  <Table>
                    <TableHead
                      style={{
                        backgroundColor:
                          mode === 'light'
                            ? colors.lightModeTableHead
                            : colors.darkModeTableHead,
                      }}
                    >
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
                            <TableRow key={d._id}>
                              <TableCell
                                className="cursor-pointer"
                                style={{
                                  fontWeight: 'bold',
                                  color:
                                    mode === 'light'
                                      ? colors.lightModeTableText
                                      : 'white',
                                }}
                                onClick={() => {
                                  setTooth(d);
                                  setOpen(true);
                                }}
                              >
                                {d.pieza}
                              </TableCell>
                              <TableCell
                                style={{
                                  color:
                                    mode === 'light'
                                      ? colors.lightModeTableText
                                      : 'white',
                                }}
                              >
                                {d.activo && d.estado}{' '}
                                {!d.activo && 'Diente ausente'}
                              </TableCell>
                              <TableCell
                                style={{
                                  color:
                                    mode === 'light'
                                      ? colors.lightModeTableText
                                      : 'white',
                                }}
                              >
                                {d.activo && d.diagnostico}{' '}
                                {!d.activo && 'Diente ausente'}
                              </TableCell>
                            </TableRow>
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
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

export default Odontogram;
