import React from 'react';
import AppointmentsCalendar from './AppointmentsCalendar';
import { Container, Grid } from '@mui/material';
import TodaysSchedule from './TodaysSchedule';

const AppointmentsPage = () => {
  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <TodaysSchedule />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <AppointmentsCalendar />
        </Grid>
      </Grid>
    </Container>
  );
};

export default AppointmentsPage;
