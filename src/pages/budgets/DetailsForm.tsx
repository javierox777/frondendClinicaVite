import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { Dispatch, SetStateAction } from 'react';
import { BudgetDetail } from '../../interfaces/BudgetDetail';
import { ShortModel } from '../../interfaces/ShortModel';
import { ServiceInterface } from '../../interfaces/ServiceInterface';
import { AddCircle, Close } from '@mui/icons-material';

interface Props {
  budgetDetails: any[];
  setDetails: Dispatch<SetStateAction<any>>;
  objects: ShortModel[];
  services: ServiceInterface[];
}

const DetailsForm = ({
  budgetDetails,
  setDetails,
  objects,
  services,
}: Props) => {
  const handleAddRow = () => {
    setDetails([
      ...budgetDetails,
      {
        id: (Math.random() * 1000).toString(),
        presupuesto_id: '',
        objeto_id: '',
        valorTotalNeto: 0,
        valorUniNeto: 0,
        valorTotalIva: 0,
        valorUniIva: 0,
        prestacion_id: '',
        cantidad: '',
      },
    ]);
  };

  return (
    <Card elevation={3} sx={{ padding: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 'lighter',
              paddingTop: 3,
            }}
          >
            DETALLES DE PRESUPUESTO
          </Typography>
          <IconButton color="primary" onClick={handleAddRow}>
            <AddCircle />
          </IconButton>
        </Grid>
        {budgetDetails.map((b: BudgetDetail) => {
          return (
            <Grid item xs={12} key={b.id}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel id="budget-type-label">Descripción</InputLabel>
                    <Select
                      label="budget-types"
                      id="budget-type-select"
                      labelId="budget-type-label"
                      onChange={(e: SelectChangeEvent<string>) =>
                        console.log('algo')
                      }
                      // value={}
                    >
                      {objects?.map((o: ShortModel) => {
                        return (
                          <MenuItem key={o.id} value={o.id}>
                            {o.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={5}>
                  <FormControl fullWidth>
                    <InputLabel id="service-type-label">Prestación</InputLabel>
                    <Select
                      label="service-types"
                      id="service-type-select"
                      labelId="service-type-label"
                      onChange={(e: SelectChangeEvent<string>) =>
                        console.log('algo')
                      }
                      // value={}
                    >
                      {services?.map((s: ServiceInterface) => {
                        return (
                          <MenuItem key={s.id} value={s.id}>
                            {s.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item>
                  <Box>
                    <IconButton
                      onClick={() => {
                        const filtered = budgetDetails.filter(
                          (d: BudgetDetail) => d.id !== b.id
                        );
                        setDetails(filtered);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default DetailsForm;
