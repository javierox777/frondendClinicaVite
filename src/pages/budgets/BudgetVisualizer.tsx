import {
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  LinearProgress,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { Budget } from '../../interfaces/Budget';
import colors from '../../styles/colors';
import { Check, Edit, Search } from '@mui/icons-material';
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
      label: 'Tipo presupuesto',
    },
    {
      id: 5,
      label: 'Estado',
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
    <Card elevation={3} sx={{ padding: 0 }}>
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
      />
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor:
              mode === 'light'
                ? colors.lightModeTableHead
                : colors.darkModeTableHead,
            padding: 3,
          }}
        >
          <Grid container direction="row" justifyContent="space-between">
            {headings.map((h: any) => {
              return (
                <Grid item key={h.id} xs={2}>
                  <Typography sx={{ fontWeight: 'bold' }}>{h.label}</Typography>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
        {filteredBudgets
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((b: Budget) => {
            return (
              <Grid
                container
                key={b._id}
                justifyContent="space-between"
                sx={{ padding: 3 }}
                className="hover:scale-[1.01] transition-all duration-500 cursor-pointer"
                onClick={() => {
                  navigation('/presupuestodetalle', {
                    state: { budget: b },
                  });
                }}
              >
                <Grid item xs={2}>
                  <Typography>
                    {b.persona.nombre1} {b.persona.apellPat}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{b.persona.rut}</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>
                    {new Date(b.fechaRegistro).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>{b.presupuestoTipo.nombre}</Typography>
                </Grid>
                <Grid item xs={2}>
                  {b.profesionalValida ? (
                    <Check color="success" />
                  ) : (
                    <Typography style={{ color: colors.ligthModeSoftText }}>
                      VALIDACIÓN PENDIENTE
                    </Typography>
                  )}
                </Grid>
              </Grid>
            );
          })}
        <TablePagination
          page={page}
          onPageChange={handleChangePage}
          count={budgets?.length}
          component="div"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Grid>
    </Card>
  );
};

export default BudgetVisualizer;
