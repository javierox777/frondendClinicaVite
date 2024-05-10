import { AttachMoney, Close } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Card,
  Container,
  Dialog,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, {
  DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES,
  useState,
} from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Company } from '../../interfaces/Company';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { ShortModel } from '../../interfaces/ShortModel';
import colors from '../../styles/colors';
import Subform from '../patients/subForms/Subform';
import DetailsForm from './DetailsForm';
import { ServiceInterface } from '../../interfaces/ServiceInterface';
import { Budget } from '../../interfaces/Budget';
import { BudgetDetail } from '../../interfaces/BudgetDetail';

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

interface BudgetDetailType {
  id: string;
  presupuesto_id: string;
  objeto_id: string;
  valorTotalNeto: number;
  valorUniNeto: number;
  valorTotalIva: number;
  valorUniIva: number;
  prestacion_id: string;
  cantidad: DO_NOT_USE_OR_YOU_WILL_BE_FIRED_EXPERIMENTAL_REACT_NODES;
  prestacion?: ServiceInterface;
  presupuesto?: Budget;
  objeto?: ShortModel;
}

const BudgetForm = ({ onClose, open }: Props) => {
  const { mode } = useThemeContext();

  const [subFormSubmitted, setSubFormSubmitted] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [professionalId, setProfessionalId] = useState('');
  const [budgetTypeId, setBudgetTypeId] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [registerDate, setRegisterDate] = useState('');
  const [validDate, setValidDate] = useState('');

  const [budgetDetails, setDetails] = useState<BudgetDetailType[]>([
    {
      id: (Math.random() * 1000).toString(),
      presupuesto_id: '',
      objeto_id: '',
      valorTotalNeto: 0,
      valorUniNeto: 0,
      valorTotalIva: 0,
      valorUniIva: 0,
      prestacion_id: '',
      cantidad: 1,
    },
  ]);

  const { data } = useQuery({
    queryKey: ['data', subFormSubmitted],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );

      return response.data.body;
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = {
      estado_id: statusId,
      profesional_id: professionalId,
      empresa_id: clinicId,
      fechaRegistro: new Date(registerDate).toISOString(),
      fechaRegistroValida: new Date(validDate).toISOString(),
      persona_id: patientId,
      presupuestoTipo_id: budgetTypeId,
      budgetDetails,
    };

    console.log(data);

    await axios.post(`${generalConfig.baseUrl}/budgets`, data);
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
          {/* DATOS DE  PRESUPUESTO */}
          <Container sx={{ paddingTop: 3 }}>
            <Grid container spacing={3}>
              <Grid item>
                <Card sx={{ padding: 3 }} elevation={3}>
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
                              onFinish={() =>
                                setSubFormSubmitted(!subFormSubmitted)
                              }
                            />
                          </Box>
                          <FormControl fullWidth>
                            <InputLabel id="budget-type-label">
                              Tipo de presupuesto
                            </InputLabel>
                            <Select
                              required
                              label="budget-types"
                              id="budget-type-select"
                              labelId="budget-type-label"
                              onChange={(e: SelectChangeEvent<string>) =>
                                setBudgetTypeId(e.target.value)
                              }
                              value={statusId}
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
                              onFinish={() =>
                                setSubFormSubmitted(!subFormSubmitted)
                              }
                            />
                          </Box>
                          <FormControl fullWidth>
                            <InputLabel id="status-label">Estado</InputLabel>
                            <Select
                              label="status"
                              required
                              id="status-select"
                              labelId="status-label"
                              onChange={(e: SelectChangeEvent<string>) =>
                                setStatusId(e.target.value)
                              }
                              value={statusId}
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
                            renderOption={(
                              props,
                              professional: Professional
                            ) => (
                              <li {...props}>
                                <div className="flex justify-between w-full">
                                  <span>
                                    {professional.nombre1}{' '}
                                    {professional.apellPat}
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
                            onChange={(
                              event,
                              professional: Professional | null
                            ) => {
                              if (professional)
                                setProfessionalId(professional.id);
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
                              if (clinic) setClinicId(clinic.id);
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
                </Card>
              </Grid>
              {/* DATOS DE  PRESUPUESTO */}

              {/* DETALLES DE PRESUPUESTO        */}
              <Grid item xs={12}>
                <DetailsForm
                  budgetDetails={budgetDetails}
                  setDetails={setDetails}
                  objects={data?.objects}
                  services={data?.services}
                />
              </Grid>
              {/* DETALLES DE PRESUPUESTO        */}
              {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
              <Grid item xs={12}>
                <Card sx={{ padding: 3 }} elevation={3}>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                          TOTAL A PAGAR IVA INCLUIDO
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{ fontSize: 30, fontWeight: 'lighter' }}
                        >
                          <AttachMoney />
                          {budgetDetails.reduce((acc, d: any) => {
                            return d.valorUniIva + acc;
                          }, 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                        <Typography sx={{ fontSize: 20, fontWeight: 'bold' }}>
                          TOTAL A PAGAR NETO
                        </Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography
                          sx={{ fontSize: 30, fontWeight: 'lighter' }}
                        >
                          <AttachMoney />
                          {budgetDetails.reduce((acc, d: any) => {
                            return d.valorUniNeto + acc;
                          }, 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button fullWidth variant="contained" type="submit">
                    GENERAR PRESUPUESTO
                  </Button>
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
