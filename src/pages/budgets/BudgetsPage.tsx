import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import colors from '../../styles/colors';
import BudgetForm from './BudgetForm';
import BudgetVisualizer from './BudgetVisualizer';

const BudgetsPage = () => {
  const { mode } = useThemeContext();

  const [formOpen, setOpen] = useState(false);
  const [formSubmitted, setSubmitted] = useState(false);

  const { data: budgets, isLoading } = useQuery({
    queryKey: ['budgets', formSubmitted],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/budgets`);

      return response.data.body;
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Presupuestos</Typography>
              <Button variant="contained" onClick={() => setOpen(true)}>
                Generar presupuesto
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>

        <Grid item xs={12}>
          <BudgetVisualizer budgets={budgets} isLoading={isLoading} />
        </Grid>
      </Grid>
      <BudgetForm
        open={formOpen}
        onClose={() => setOpen(false)}
        afterSubmit={() => setSubmitted(!formSubmitted)}
      />
    </>
  );
};

export default BudgetsPage;
