import React from 'react';
import AppointmentsCalendar from './AppointmentsCalendar';
import { AppBar, Container, Grid, Toolbar, Typography } from '@mui/material';
import TodaysSchedule from './TodaysSchedule';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';

const AppointmentsPage = () => {
  const { mode } = useThemeContext();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <TodaysSchedule />
      </Grid>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeHeaderColor
                  : colors.darkModeHeaderColor,
            }}
          >
            <Typography variant="h6">Agenda</Typography>
          </Toolbar>
        </AppBar>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <AppointmentsCalendar />
      </Grid>
    </Grid>
  );
};

export default AppointmentsPage;
