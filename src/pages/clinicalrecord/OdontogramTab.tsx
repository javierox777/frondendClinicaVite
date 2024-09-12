import React, { useEffect, useState } from 'react';
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
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';
import toast, { Toaster } from 'react-hot-toast';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import { Person } from '../../interfaces/Person';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';
import Odontogramm from './Odontogramm';
import axios from 'axios';
import { generalConfig } from '../../config';
import { format } from 'date-fns';

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
  const [isCreating, setCreating] = useState(false);

  const [selectedOdontogram, setOdontogram] = useState<OdontogramInterface>();

  const createOdontogram = async () => {
    try {
      setCreating(true);
      const response = await axios.post(
        `${generalConfig.baseUrl}/odontogramas`,
        {
          profesionalModifica: (user as User).profesionalId,
          persona: persona._id,
          fecha: format(new Date(), 'yyyy/mm/dd'),
        }
      );

      if (response.data.message === 'success') {
        toast.success('Odontograma se ha registrado.');
        setOdontogram(response.data.body[0]);
        afterSubmit();
      }
      setCreating(false);
    } catch (error) {
      console.log(error);
      toast.error('No se pudo crear odontograma, inténtelo nuevamente.');
      setCreating(false);
    }
  };

  useEffect(() => {
    if (odontograms) setOdontogram(odontograms[0]);
  }, []);

  if (odontograms && odontograms.length === 0)
    return (
      <>
        <Grid container gap={5}>
          {odontograms && odontograms.length === 0 && (
            <Grid item>
              <Typography>
                No se ha registrado odontograma para este paciente.
              </Typography>
            </Grid>
          )}
          <Grid item xs={12}>
            {odontograms && odontograms.length === 0 && (
              <Button
                variant="contained"
                color="primary"
                onClick={createOdontogram}
                fullWidth
                disabled={isCreating}
              >
                Registrar odontograma
              </Button>
            )}
          </Grid>
        </Grid>
        <Toaster />
      </>
    );

  return (
    <>
      <Odontogramm odontogram={selectedOdontogram} />
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
        {/* <OdontogramForm
          persona={persona}
          profesionalId={(user as User).profesionalId}
          afterSubmit={() => afterSubmit()}
        /> */}
      </Dialog>
    </>
  );
};

export default OdontogramTab;
