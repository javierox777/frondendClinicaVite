import React, { useState } from 'react';
import {
  AppBar,
  Autocomplete,
  Button,
  Card,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  LinearProgress,
  MenuItem,
  Modal,
  Select,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import Odontogram from './Odontogram';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';
import { Toaster } from 'react-hot-toast';
import OdontogramForm from './OdontogramForm';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import { Person } from '../../interfaces/Person';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';

interface Props {
  odontograms: OdontogramInterface[];
  afterSubmit: CallableFunction;
  persona: Person;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const OdontogramTab = ({ odontograms, afterSubmit, persona }: Props) => {
  const { user } = useUser();

  const { mode } = useThemeContext();
  const [openForm, setOpenForm] = useState(false);

  const [selectedOdontogram, setOdontogram] = useState<OdontogramInterface>();

  return (
    <>
      <Grid container gap={5}>
        <Grid item>
          <Typography>
            No se ha registrado odontograma para este paciente.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {odontograms && odontograms.length === 0 && (
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpenForm(true)}
              fullWidth
            >
              Registrar odontograma
            </Button>
          )}
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          {!odontograms && <LinearProgress />}
          {odontograms && !(odontograms.length === 0) && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                // defaultValue={budget?.profesional}
                options={odontograms}
                renderInput={(params) => (
                  <TextField {...params} label="Selecciona Odontograma" />
                )}
                renderOption={(props, o: OdontogramInterface) => (
                  <li {...props}>
                    <div className="flex justify-between w-full">
                      <span>Vers. {o.fecha}</span>
                      <span
                        style={{
                          color:
                            mode === 'light'
                              ? colors.ligthModeSoftText
                              : colors.darkModeSoftText,
                        }}
                      >
                        Odontograma
                      </span>
                    </div>
                  </li>
                )}
                getOptionLabel={(o: OdontogramInterface) => {
                  // Value selected with enter, right from the input
                  if (typeof o === 'string') {
                    return o;
                  }
                  // Regular professional
                  return `Fecha seleccionada: ${o.fecha}`;
                }}
                onChange={(event, o: OdontogramInterface | null) => {
                  if (o) setOdontogram(o);
                }}
              />
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          <Odontogram
            odontogram={selectedOdontogram}
            afterSubmit={afterSubmit}
          />
        </Grid>
      </Grid>
      <Toaster />
      <Dialog
        fullScreen
        open={openForm}
        onClose={() => setOpenForm(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setOpenForm(false)}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Toolbar>
        </AppBar>
        <OdontogramForm
          persona={persona}
          profesionalId={(user as User).profesionalId}
          afterSubmit={() => afterSubmit()}
        />
      </Dialog>
    </>
  );
};

export default OdontogramTab;
