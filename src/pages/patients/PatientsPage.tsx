import { AppBar, Button, Grid, Toolbar, Typography } from '@mui/material';
import { useState } from 'react';
import PatientForm from './PatientForm';
import PatientsTable from './PatientsTable';
import TotalPatients from './TotalPatients';
import { Badge, Calendar } from 'rsuite';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

const PatientsPage = () => {
  const { mode } = useThemeContext();

  const [modalOpen, setModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <Grid container spacing={3}>
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
              <Typography variant="h6">Pacientes</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={() => {
              setModal(true);
            }}
          >
            Registrar nuevo paciente
          </Button>
        </Grid>
        <Grid item xs={12}>
          <PatientsTable refetch={formSubmitted} />
        </Grid>
      </Grid>
      <PatientForm
        open={modalOpen}
        onClose={() => {
          setModal(false);
        }}
        afterSubmit={() => setFormSubmitted(!formSubmitted)}
      />
    </>
  );
};

export default PatientsPage;
