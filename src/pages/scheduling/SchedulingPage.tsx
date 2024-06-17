import { Button, Container, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';
import AppointmentsCalendar from '../appointments/AppointmentsCalendar';
import { Add, CalendarMonth } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const SchedulingPage = () => {
  const [showCalendar, setCalendar] = useState<boolean>(false);
  // const [openForm, setNewForm] = useState<boolean>(false);
  // const navigation = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <ScheduleTable />
        </Grid>
        <Grid item>
          <Button
            onClick={() => setCalendar(!showCalendar)}
            variant="contained"
            color="secondary"
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
    </>
  );
};

export default SchedulingPage;
