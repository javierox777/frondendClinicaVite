import { Close } from '@mui/icons-material';
import {
  Dialog,
  Toolbar,
  Paper,
  IconButton,
  Container,
  Typography,
  Slide,
  Grid,
  FormControl,
  TextField,
  Select,
  Autocomplete,
  Box,
  MenuItem,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { SyntheticEvent, useState } from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { Professional } from '../../interfaces/Professional';
import Subform from '../patients/subForms/Subform';
import { ShortModel } from '../../interfaces/ShortModel';

interface Props {
  open: boolean;
  onClose: CallableFunction;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BudgetForm = ({ onClose, open }: Props) => {
  const { mode } = useThemeContext();

  const { data } = useQuery({
    queryKey: ['data'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );

      return response.data.body;
    },
  });

  const [patientId, setPatientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [budgetTypeId, setBudgetTypeId] = useState('');

  const handleSubmit = () => {
    console.log('submitted');
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
        fullScreen
      >
        <form onSubmit={handleSubmit}>
          <Toolbar
            component={Paper}
            elevation={3}
            style={{ backgroundColor: 'teal' }}
          >
            <IconButton onClick={() => onClose()}>
              <Close />
            </IconButton>
          </Toolbar>
          <Container>
            <Typography className="p-3">
              Rellene los datos para generar un nuevo presupuesto.
            </Typography>
          </Container>
          <Container>
            <Grid container spacing={3} alignItems="end">
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <>
                    <Box sx={{ marginBottom: 2 }}>
                      <Subform
                        title="Agregar tipo de presupuesto"
                        description="Agrega nuevo tipo de presupuesto"
                        postRoute={`${generalConfig.baseUrl}/budget-types`}
                      />
                    </Box>
                    <FormControl fullWidth>
                      <InputLabel id="budget-type-label">
                        Tipo de presupuesto
                      </InputLabel>
                      <Select
                        label="budget-types"
                        id="budget-type-select"
                        labelId="budget-type-label"
                        onChange={(e: SelectChangeEvent<string>) =>
                          setBudgetTypeId(e.target.value)
                        }
                        // value={}
                      >
                        {data.budgetTypes.map((t: ShortModel) => {
                          return (
                            <MenuItem key={t.id} value={t.id}>
                              {t.nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={data?.persons}
                    renderInput={(params) => (
                      <TextField {...params} label="Paciente" />
                    )}
                    renderOption={(props, patient: Person) => (
                      <li {...props}>
                        <div className="flex justify-between w-full">
                          <span>
                            {patient.nombre1} {patient.apellPat}
                          </span>
                          <span
                            style={{
                              color:
                                mode === 'light'
                                  ? colors.ligthModeSoftText
                                  : colors.darkModeSoftText,
                            }}
                          >
                            {patient.rut}-{patient.dv}
                          </span>
                        </div>
                      </li>
                    )}
                    getOptionLabel={(patient: Person) => {
                      // Value selected with enter, right from the input
                      if (typeof patient === 'string') {
                        return patient;
                      }
                      // Regular patient
                      return `${patient.nombre1} ${patient.apellPat} ${patient.rut}-${patient.dv}`;
                    }}
                    onChange={(event, patient: Person | null) => {
                      if (patient) setPatientId(patient.id);
                    }}
                  />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <Autocomplete
                    fullWidth
                    disablePortal
                    options={data?.professionals}
                    renderInput={(params) => (
                      <TextField {...params} label="Dentista" />
                    )}
                    renderOption={(props, professional: Professional) => (
                      <li {...props}>
                        <div className="flex justify-between w-full">
                          <span>
                            {professional.nombre1} {professional.apellPat}
                          </span>
                          <span
                            style={{
                              color:
                                mode === 'light'
                                  ? colors.ligthModeSoftText
                                  : colors.darkModeSoftText,
                            }}
                          >
                            {professional.rut}-{professional.dv}
                          </span>
                        </div>
                      </li>
                    )}
                    getOptionLabel={(professional: Professional) => {
                      // Value selected with enter, right from the input
                      if (typeof professional === 'string') {
                        return professional;
                      }
                      // Regular professional
                      return `${professional.nombre1} ${professional.apellPat} ${professional.rut}-${professional.dv}`;
                    }}
                    onChange={(event, professional: Professional | null) => {
                      if (professional) setProfessionalId(professional.id);
                    }}
                  />
                )}
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default BudgetForm;
