import { Button, Container, Grid } from '@mui/material';
import React, { useState } from 'react';
import BudgetSearcher from './BudgetSearcher';
import { Add } from '@mui/icons-material';
import BudgetForm from './BudgetForm';

const BudgetsPage = () => {
  const [formOpen, setOpen] = useState(false);

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={() => setOpen(true)}>
            <Add />
            Generar presupuesto
          </Button>
        </Grid>
        <Grid item xs={12}>
          <BudgetSearcher />
        </Grid>
      </Grid>
      <BudgetForm open={formOpen} onClose={() => setOpen(false)} />
    </>
  );
};

export default BudgetsPage;
