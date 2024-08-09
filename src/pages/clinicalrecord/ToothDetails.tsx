import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Grid,
  Typography,
  Divider,
  Switch,
  FormControl,
  FormControlLabel,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Diente } from '../../interfaces/Diente';
import Tooth from '../../componemts/Tooth';
import { ToothPart } from '../../interfaces/ToothPart';

type TeethPartKeys =
  | 'bucal'
  | 'mesial'
  | 'distal'
  | 'oclusal'
  | 'lingualpalatino'
  | 'raiz';

interface Props {
  open: boolean;
  setOpen: CallableFunction;
  tooth: Diente | undefined;
}

type PartName =
  | 'distal'
  | 'bucal'
  | 'mesial'
  | 'oclusal'
  | 'lingualpalatino'
  | 'raiz';

type PropName = 'detalle' | 'diagnostico' | 'estado';

type PartProperties = {
  detalle?: string;
  diagnostico?: string;
  estado?: string;
};

const ToothDetails = ({ open, setOpen, tooth }: Props) => {
  const [selectedPart, setPart] = useState('');

  const [toothPart, setToothPart] = useState<ToothPart>();

  const [editTooth, setEditTooth] = useState<Diente>({
    detalle: '',
    diagnostico: '',
    estado: '',
    pieza: '',
    distal: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    bucal: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    mesial: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    oclusal: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    lingualpalatino: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    raiz: {
      detalle: '',
      diagnostico: '',
      estado: '',
    },
    activo: true,
  });

  const setToothProp = (prop: string, value: string | boolean) => {
    setEditTooth((prevState) => ({
      ...prevState,
      [prop]: value,
    }));
  };

  const setPartProp = (part: PartName, prop: PropName, value: string) => {
    setEditTooth((prevState) => ({
      ...prevState,
      [part]: {
        ...prevState[part],
        [prop]: value,
      },
    }));
  };

  useEffect(() => {
    if (tooth) {
      setToothProp('pieza', tooth.pieza);
      setToothProp('detalle', tooth.detalle);
      setToothProp('diagnostico', tooth.diagnostico);
      setToothProp('estado', tooth.estado);
      setToothProp('activo', tooth.activo);

      setPartProp('bucal', 'detalle', tooth.bucal.detalle);
      setPartProp('bucal', 'diagnostico', tooth.bucal.diagnostico);
      setPartProp('bucal', 'estado', tooth.bucal.estado);

      setPartProp('distal', 'detalle', tooth.distal.detalle);
      setPartProp('distal', 'diagnostico', tooth.distal.diagnostico);
      setPartProp('distal', 'estado', tooth.distal.estado);

      setPartProp('oclusal', 'detalle', tooth.oclusal.detalle);
      setPartProp('oclusal', 'diagnostico', tooth.oclusal.diagnostico);
      setPartProp('oclusal', 'estado', tooth.oclusal.estado);

      setPartProp('lingualpalatino', 'detalle', tooth.lingualpalatino.detalle);
      setPartProp(
        'lingualpalatino',
        'diagnostico',
        tooth.lingualpalatino.diagnostico
      );
      setPartProp('lingualpalatino', 'estado', tooth.lingualpalatino.estado);

      setPartProp('mesial', 'detalle', tooth.mesial.detalle);
      setPartProp('mesial', 'diagnostico', tooth.mesial.diagnostico);
      setPartProp('mesial', 'estado', tooth.mesial.estado);

      setPartProp('raiz', 'detalle', tooth.raiz.detalle);
      setPartProp('raiz', 'diagnostico', tooth.raiz.diagnostico);
      setPartProp('raiz', 'estado', tooth.raiz.estado);
    }
  }, [tooth]);

  return (
    <Dialog
      open={open}
      onClose={() => {
        setPart('');
        setOpen(false);
      }}
      fullWidth
      PaperProps={{
        component: 'form',
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          console.log(editTooth);
        },
      }}
    >
      <DialogTitle>
        Pieza {tooth?.pieza} {!tooth?.activo && '(Diente ausente)'}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Tooth
              setPartParent={(part: string) => {
                setPart(part);
                if (tooth) {
                  setToothPart(tooth[part as TeethPartKeys]);
                }
              }}
            />
          </Grid>
          <Grid item>
            <Typography style={{ fontWeight: 'lighter' }}>
              Habilitar/Deshabilitar pieza
            </Typography>
          </Grid>
          <Grid item>
            <FormControlLabel
              label={editTooth?.activo ? 'Diente habilitado' : 'Diente ausente'}
              control={
                <Switch
                  checked={editTooth?.activo}
                  onChange={() => {
                    const value = editTooth.activo ? false : true;

                    setToothProp('activo', value);
                  }}
                />
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 'bold' }}>
              Información general del diente
            </Typography>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                value={editTooth.detalle}
                label="Nota"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                value={editTooth?.diagnostico}
                label="Diagnostico"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl>
              <TextField
                value={editTooth?.estado}
                label="Estado"
                InputLabelProps={{ shrink: true }}
              />
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <Typography style={{ fontWeight: 'bold' }}>
              Información de posición{' '}
              {selectedPart !== 'lingualpalatino' && selectedPart}
              {selectedPart === 'lingualpalatino' && 'lingual/palatino'}
            </Typography>
          </Grid>
          {selectedPart && (
            <>
              <Grid item>
                <TextField
                  value={editTooth[selectedPart as TeethPartKeys].detalle}
                  label="Nota"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setPartProp(
                      selectedPart as TeethPartKeys,
                      'detalle',
                      e.target.value
                    );
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={editTooth[selectedPart as TeethPartKeys]?.diagnostico}
                  label="Diagnostico"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setPartProp(
                      selectedPart as TeethPartKeys,
                      'diagnostico',
                      e.target.value
                    );
                  }}
                />
              </Grid>
              <Grid item>
                <TextField
                  value={editTooth[selectedPart as TeethPartKeys]?.estado}
                  label="Estado"
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    setPartProp(
                      selectedPart as TeethPartKeys,
                      'estado',
                      e.target.value
                    );
                  }}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setPart('');
            setOpen();
          }}
          variant="contained"
          color="inherit"
        >
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="success">
          Guardar Cambios
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ToothDetails;
