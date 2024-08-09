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
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import Odontogram from './Odontogram';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';

interface Props {
  odontograms: OdontogramInterface[];
}

const OdontogramTab = ({ odontograms }: Props) => {
  const { mode } = useThemeContext();

  const [selectedOdontogram, setOdontogram] = useState<OdontogramInterface>();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
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
                  <span>Ver {o.fecha}</span>
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
      </Grid>
      {selectedOdontogram && (
        <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
          <Button fullWidth variant="contained">
            Guardar Odontograma
          </Button>
        </Grid>
      )}
      <Grid item xs={12}>
        <Odontogram odontogram={selectedOdontogram} />
      </Grid>
    </Grid>
  );
};

export default OdontogramTab;
