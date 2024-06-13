import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';

const SchedulingPage = () => {
  return (
    <Container>
      <Grid container>
        <Grid item xs={12}>
          <ScheduleTable />
        </Grid>
      </Grid>
    </Container>
  );
};

export default SchedulingPage;
