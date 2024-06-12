import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ScheduleForm from './ScheduleForm';

const SchedulingPage = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <ScheduleForm />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulingPage;
