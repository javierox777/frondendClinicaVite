import {
  Box,
  Card,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
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
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { Budget } from '../../interfaces/Budget';
import colors from '../../styles/colors';
import {
  Cancel,
  Check,
  CheckCircle,
  CloseRounded,
  Edit,
  Pending,
  PictureAsPdf,
  Search,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Props {
  budgets: Budget[];
  isLoading?: boolean;
}

const BudgetVisualizer = ({ budgets, isLoading }: Props) => {
  const { mode } = useThemeContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');

  const navigation = useNavigate();

  const headings = [
    {
      id: 1,
      label: 'Paciente',
    },
    {
      id: 2,
      label: 'Rut',
    },
    {
      id: 3,
      label: 'Fecha registro',
    },
    {
      id: 4,
      label: 'Validado',
      hide: true,
    },
    {
      id: 5,
      label: 'Acciones',
    },
  ];

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

  const filteredBudgets = budgets?.filter((b: Budget) => {
    const rut = b.persona.rut.toLowerCase();
    const institution = b.presupuestoTipo.nombre.toLowerCase();
    const name = `${b.persona.nombre1} ${b.persona.apellPat}`.toLowerCase();
    return (
      rut.includes(searchText.toLowerCase()) ||
      institution.includes(searchText.toLowerCase()) ||
      name.includes(searchText.toLowerCase())
    );
  });
  if (isLoading) {
    return (
      <Container>
        <LinearProgress />
        <Typography
          sx={{
            color: colors.ligthModeSoftText,
          }}
        >
          Cargando datos...
        </Typography>
      </Container>
    );
  }

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TextField
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            style={{ marginBlock: '16px', width: '30%' }}
            placeholder="Buscar..."
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction={'row'}>
            <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
              <CheckCircle color="success" />
              <Typography>Validado</Typography>
            </Grid>
            <Grid item xs={6} sm={6} md={6} lg={2} xl={2}>
              <Pending color="warning" />
              <Typography>Validación pendiente</Typography>
            </Grid>
          </Grid>
        </Grid>
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
                  {headings.map((h) => {
                    return (
                      <TableCell
                        key={h.id}
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        {h.label}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredBudgets
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((b: Budget) => {
                    return (
                      <TableRow key={b._id}>
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
                            navigation('/presupuestodetalle', {
                              state: { budget: b },
                            });
                          }}
                        >
                          {b.persona.nombre1} {b.persona.apellPat}
                        </TableCell>
                        <TableCell>{b.persona.rut}</TableCell>
                        <TableCell>
                          {new Date(b.fechaRegistro).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {b.profesionalValida ? (
                            <CheckCircle color="success" />
                          ) : (
                            <Pending color="warning" />
                          )}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            color="primary"
                            onClick={() =>
                              navigation('/presupuestopdf', {
                                state: { budget: b },
                              })
                            }
                          >
                            <PictureAsPdf />
                          </IconButton>
                          <IconButton
                            color="success"
                            onClick={() =>
                              navigation('/editarpresupuesto', {
                                state: { budget: b },
                              })
                            }
                          >
                            <Edit />
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
              count={budgets?.length}
              component="div"
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default BudgetVisualizer;
