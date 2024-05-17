import {
  Card,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { Budget } from '../../interfaces/Budget';
import colors from '../../styles/colors';
import { Edit, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Props {
  budgets: Budget[];
}

const BudgetVisualizer = ({ budgets }: Props) => {
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

  if (budgets?.length === 0) {
    return (
      <Container>
        <Typography>No hay presupuestos que mostrar</Typography>
      </Container>
    );
  }

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
                <Grid item key={h.id} xs={3}>
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
                key={b.id}
                justifyContent="space-between"
                sx={{ padding: 3 }}
                className="hover:scale-[1.01] transition-all duration-500 cursor-pointer"
                onClick={() => {
                  navigation('/presupuestodetalle', {
                    state: { budget: b },
                  });
                }}
              >
                <Grid item xs={3}>
                  <Typography>
                    {b.persona.nombre1} {b.persona.apellPat}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{b.persona.rut}</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>
                    {new Date(b.fechaRegistro).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <Typography>{b.presupuestoTipo.nombre}</Typography>
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
