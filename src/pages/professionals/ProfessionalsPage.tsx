import { Grid } from '@mui/material';
import React from 'react';
import ProfessionalsTable from './ProfessionalsTable';

const ProfessionalsPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <ProfessionalsTable />
      </Grid>
    </Grid>
  );
};

export default ProfessionalsPage;
