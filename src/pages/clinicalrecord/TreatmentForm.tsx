import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITreatment } from '../../interfaces/Odontogram';
import HeaderBar from '../../componemts/HeaderBar';
import { format } from 'date-fns';
import { Input } from 'rsuite';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  treatment?: ITreatment;
  onSave: CallableFunction;
}

const TreatmentForm = ({ open, onClose, treatment, onSave }: Props) => {
  const [observation, setObservation] = useState('');

  useEffect(() => {
    if (treatment && treatment.observacion) {
      setObservation(treatment.observacion);
    }
  }, [treatment]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth>
      <DialogTitle>
        <HeaderBar title="observación" />
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Detalle de tratamiento
            </Typography>
            <Typography>{treatment?.detalle}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold' }}>
              Fecha de tratamiento
            </Typography>
            <Typography>
              {treatment && format(new Date(treatment?.fecha), 'MM/dd/yyyy')}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ fontWeight: 'bold' }}>Pieza</Typography>
            <Typography>
              {treatment?.pieza.diente} {treatment?.pieza.parte}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontWeight: 'bold' }}>Observación</Typography>
            <Input
              as="textarea"
              rows={3}
              placeholder="Sin novedad"
              value={observation}
              onChange={(e) => setObservation(e)}
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" color="inherit" onClick={() => onClose()}>
          Cerrar
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            onSave(observation, treatment?._id);
            onClose();
          }}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TreatmentForm;
