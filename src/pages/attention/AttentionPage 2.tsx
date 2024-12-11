import { Grid } from '@mui/material';
import React from 'react';
import TodaysSchedule from '../appointments/TodaysSchedule';

const AttentionPage = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <TodaysSchedule />
      </Grid>
    </Grid>
  );
};

export default AttentionPage;