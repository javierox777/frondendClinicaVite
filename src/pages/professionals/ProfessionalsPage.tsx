import { Button, Grid } from '@mui/material';
import React, { useState } from 'react';
import ProfessionalsTable from './ProfessionalsTable';
import ProfessionalForm from './ProfessionalForm';
import { Toaster } from 'react-hot-toast';

const ProfessionalsPage = () => {
  const [modal, setModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Button
            variant="outlined"
            onClick={() => {
              setModal(true);
            }}
          >
            Registrar nuevo profesional
          </Button>
        </Grid>
        <Grid item xs={12}>
          <ProfessionalsTable refetch={formSubmitted} />
        </Grid>
      </Grid>
      <ProfessionalForm
        open={modal}
        onClose={() => setModal(false)}
        afterSubmit={() => setFormSubmitted(!formSubmitted)}
      />
      <Toaster />
    </>
  );
};

export default ProfessionalsPage;
