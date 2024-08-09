import React, { useState } from 'react';
import {
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
  LinearProgress,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import Odontogram from './Odontogram';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';
import { Toaster } from 'react-hot-toast';

interface Props {
  odontograms: OdontogramInterface[];
  afterSubmit?: CallableFunction;
}

const OdontogramTab = ({ odontograms, afterSubmit }: Props) => {
  const { mode } = useThemeContext();

  const [selectedOdontogram, setOdontogram] = useState<OdontogramInterface>();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          {!odontograms && <LinearProgress />}
          {odontograms && (
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
    </>
  );
};

export default OdontogramTab;
