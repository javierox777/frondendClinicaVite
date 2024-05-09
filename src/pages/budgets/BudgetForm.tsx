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
import { Form } from 'react-router-dom';
import { Company } from '../../interfaces/Company';

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

  const [subFormSubmitted, setSubFormSubmitted] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [budgetTypeId, setBudgetTypeId] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [registerDate, setRegisterDate] = useState('');
  const [validDate, setValidDate] = useState('');

  const { data } = useQuery({
    queryKey: ['data', subFormSubmitted],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );

      return response.data.body;
    },
  });

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
            <Grid container spacing={3} alignItems="end">
              <Grid item xs={12}>
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 'lighter',
                    paddingTop: 3,
                  }}
                >
                  DATOS DE PRESUPUESTO
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <>
                    <Box sx={{ marginBottom: 2 }}>
                      <Subform
                        title="Agregar tipo de presupuesto"
                        description="Agrega nuevo tipo de presupuesto"
                        postRoute={`${generalConfig.baseUrl}/budget-types`}
                        onFinish={() => setSubFormSubmitted(!subFormSubmitted)}
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
                  <>
                    <Box sx={{ marginBottom: 2 }}>
                      <Subform
                        title="Agregar estado"
                        description="Agrega nuevo estado"
                        postRoute={`${generalConfig.baseUrl}/statuses`}
                        onFinish={() => setSubFormSubmitted(!subFormSubmitted)}
                      />
                    </Box>
                    <FormControl fullWidth>
                      <InputLabel id="budget-type-label">Estado</InputLabel>
                      <Select
                        label="status"
                        id="status-select"
                        labelId="status-label"
                        onChange={(e: SelectChangeEvent<string>) =>
                          setBudgetTypeId(e.target.value)
                        }
                        // value={}
                      >
                        {data.statuses.map((s: ShortModel) => {
                          return (
                            <MenuItem key={s.id} value={s.id}>
                              {s.nombre}
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
                  <FormControl fullWidth>
                    <Autocomplete
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
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      options={data?.professionals}
                      renderInput={(params) => (
                        <TextField {...params} label="Emitido por" />
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
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                {data && (
                  <FormControl fullWidth>
                    <Autocomplete
                      disablePortal
                      options={data?.clinics}
                      renderInput={(params) => (
                        <TextField {...params} label="Clínica" />
                      )}
                      renderOption={(props, clinic: Company) => (
                        <li {...props}>
                          <div className="flex justify-between w-full">
                            <span>{clinic.razonSocial}</span>
                          </div>
                        </li>
                      )}
                      getOptionLabel={(clinic: Company) => {
                        // Value selected with enter, right from the input
                        if (typeof clinic === 'string') {
                          return clinic;
                        }
                        // Regular clinic
                        return `${clinic.razonSocial}`;
                      }}
                      onChange={(event, clinic: Company | null) => {
                        if (clinic) setPatientId(clinic.id);
                      }}
                    />
                  </FormControl>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Fecha de registro"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="date"
                    onChange={(e) => setRegisterDate(e.target.value)}
                    value={registerDate}
                    required
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <FormControl fullWidth>
                  <TextField
                    label="Válido hasta"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    type="date"
                    onChange={(e) => setValidDate(e.target.value)}
                    value={validDate}
                    required
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
    </>
  );
};

export default BudgetForm;
