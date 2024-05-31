import { Button, Grid } from '@mui/material';
import { useState } from 'react';
import PatientForm from './PatientForm';
import PatientsTable from './PatientsTable';
import TotalPatients from './TotalPatients';
import { Badge, Calendar } from 'rsuite';

const PatientsPage = () => {
  const [modalOpen, setModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(true);
            }}
          >
            Registrar nuevo paciente
          </Button>
        </Grid>
        <Grid item>
          <TotalPatients />
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
