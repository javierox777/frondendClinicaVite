import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import ProfessionalsTable from './ProfessionalsTable';
import ProfessionalForm from './ProfessionalForm';
import { Toaster } from 'react-hot-toast';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

const ProfessionalsPage = () => {
  const { mode } = useThemeContext();

  const [modal, setModal] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Profesionales</Typography>
              <Button
                variant="contained"
                onClick={() => {
                  setModal(true);
                }}
              >
                Registrar nuevo profesional
              </Button>
            </Toolbar>
          </AppBar>
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
