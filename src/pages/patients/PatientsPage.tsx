import { Button, Card, Grid } from '@mui/material';
import { useState } from 'react';
import PatientForm from './PatientForm';
import PatientsTable from './PatientsTable';

const PatientsPage = () => {
  const [modalOpen, setModal] = useState(false);
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
        <Grid item xs={12}>
          <Card>
            <PatientsTable />
          </Card>
        </Grid>
        <Grid item>
          <div>otra cosa</div>
        </Grid>
        <Grid item>
          <div>otra cosa</div>
        </Grid>
        <Grid item>
          <div>otra cosa</div>
        </Grid>
      </Grid>
      <PatientForm
        open={modalOpen}
        onClose={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default PatientsPage;
