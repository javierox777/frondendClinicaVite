import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';
import AppointmentsCalendar from '../appointments/AppointmentsCalendar';
import { CalendarMonth } from '@mui/icons-material';

const SchedulingPage = () => {
  const [showCalendar, setCalendar] = useState<boolean>(false);
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ScheduleTable />
        </Grid>
        <Grid item>
          <Button
            onClick={() => setCalendar(!showCalendar)}
            variant="contained"
          >
            <CalendarMonth />
            {showCalendar ? 'Cerrar Calendario' : 'Abrir Calendario'}
          </Button>
        </Grid>
        {showCalendar && (
          <Grid item>
            <AppointmentsCalendar />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default SchedulingPage;
