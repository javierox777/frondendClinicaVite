import {
  Card,
  Container,
  Grid,
  IconButton,
  TablePagination,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { Budget } from '../../interfaces/Budget';
import colors from '../../styles/colors';
import { useNavigate } from 'react-router-dom';
import { Edit } from '@mui/icons-material';

interface Props {
  budgets: Budget[];
}

const BudgetVisualizer = ({ budgets }: Props) => {
  const { mode } = useThemeContext();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

  if (budgets.length === 0) {
    return (
      <Container>
        <Typography>No hay presupuestos que mostrar</Typography>
      </Container>
    );
  }

  return (
    <Card elevation={3} sx={{ padding: 3 }}>
      <Grid container>
        <Grid
          item
          xs={12}
          sx={{
            backgroundColor:
              mode === 'light'
                ? colors.lightModeTableHead
                : colors.darkModeTableHead,
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
        {budgets
          ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((b: Budget) => {
            return (
              <Grid
                container
                key={b.id}
                justifyContent="space-between"
                sx={{ paddingBlock: 3 }}
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
