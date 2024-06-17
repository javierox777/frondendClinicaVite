import { Button, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import BudgetSearcher from './BudgetSearcher';
import { Add } from '@mui/icons-material';
import BudgetForm from './BudgetForm';
import BudgetVisualizer from './BudgetVisualizer';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';

const BudgetsPage = () => {
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
        <Grid item>
          <Button variant="contained" onClick={() => setOpen(true)}>
            <Add />
            Generar presupuesto
          </Button>
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
