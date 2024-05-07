import { Container, Grid } from '@mui/material';
import React from 'react';
import BudgetSearcher from './BudgetSearcher';

const BudgetsPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <BudgetSearcher />
      </Grid>
    </Grid>
  );
};

export default BudgetsPage;
