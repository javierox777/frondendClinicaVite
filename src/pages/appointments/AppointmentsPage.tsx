import React from 'react';
import AppointmentsCalendar from './AppointmentsCalendar';
import { Grid } from '@mui/material';

const AppointmentsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AppointmentsCalendar />
      </Grid>
    </Grid>
  );
};

export default AppointmentsPage;
