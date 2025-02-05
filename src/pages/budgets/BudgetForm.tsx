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
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Slide,
  Switch,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { LoggedUser, useUser } from '../../auth/userContext';
import HeaderBar from '../../componemts/HeaderBar';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Agreement } from '../../interfaces/Agreement';
import { Budget } from '../../interfaces/Budget';
import { Company } from '../../interfaces/Company';
import { Person } from '../../interfaces/Person';
import { ServiceInterface } from '../../interfaces/ServiceInterface';
import { ServiceType } from '../../interfaces/ServiceType';
import { ShortModel } from '../../interfaces/ShortModel';
import colors from '../../styles/colors';
import Subform from '../patients/subForms/Subform';
import BudgetFormSkeleton from './BudgetFormSkeleton';
import DetailsForm from './DetailsForm';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  budget?: Budget;
  afterSubmit?: CallableFunction;
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
  _id: string;
  presupuesto: string;
  objeto: string;
  // valorTotalNeto: number;
  // valorUniNeto: number;
  // valorTotalIva: number;
  // valorUniIva: number;
  valor: number;
  prestacion: string;
  cantidad: number;
  pagado: boolean;
}

const BudgetForm = ({ onClose, open, budget, afterSubmit }: Props) => {
  const { mode } = useThemeContext();
  const { user } = useUser();

  const [subFormSubmitted, setSubFormSubmitted] = useState(false);
  const [patientId, setPatientId] = useState('');
  // const [professionalId, setProfessionalId] = useState('');
  const [budgetTypeId, setBudgetTypeId] = useState('');
  const [clinicId, setClinicId] = useState('');
  const [statusId, setStatusId] = useState('');
  const [registerDate, setRegisterDate] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const [agreement, setAgreement] = useState('');

  const [formDataLoaded, setFormData] = useState(false);

  const [services, setServices] = useState<ServiceInterface[]>([]);

  const [agreementSelected, setAgreementSelected] = useState(false);

  const [budgetDetails, setDetails] = useState<BudgetDetailType[]>([
    {
      _id: (Math.random() * 1000).toString(),
      presupuesto: '',
      objeto: '',
      valor: 0,
      prestacion: '',
      cantidad: 1,
      pagado: false,
    },
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ['data', subFormSubmitted, budget],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );

      const standardServices = response.data.body.services.filter(
        (s: ServiceInterface) => s.standard
      );

      setServices(standardServices);
      setFormData(!formDataLoaded);

      return response.data.body;
    },
  });

  const { data: patientAgreements, isLoading: agreementsLoading } = useQuery({
    queryKey: ['patientAgreements', patientId],
    queryFn: async () => {
      if (patientId) {
        const response = await axios.get(
          `${generalConfig.baseUrl}/agreements/getagreements/${patientId}`
        );

        return response.data.body;
      } else {
        return [];
      }
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('No se ha iniciado sesión.');
    } // solo para desarrollo, al protejer las rutas, quitar esto

    const data: {
      estado: string;
      profesional: string;
      empresa: string;
      fechaRegistro: string;
      persona: string;
      presupuestoTipo: string;
      budgetDetails: BudgetDetailType[];
      convenio?: string;
    } = {
      estado: statusId,
      profesional: (user as LoggedUser).profesionalId,
      empresa: clinicId,
      fechaRegistro: new Date(registerDate).toISOString(),
      persona: patientId,
      presupuestoTipo: budgetTypeId,
      budgetDetails,
    };

    if (agreement !== '') {
      data.convenio = agreement;
    }

    if (budget) {
      try {
        setSubmitting(true);
        const response = await axios.patch(
          `${generalConfig.baseUrl}/budgets/${budget._id}`,
          data
        );
        if (response.data.message === 'success') {
          toast.success('Presupuesto actualizado');
          setSubmitting(false);
          if (afterSubmit) {
            afterSubmit();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('No se pudo actualizar presupuesto.');
        setSubmitting(false);
      }
    } else {
      try {
        setSubmitting(true);
        const response = await axios.post(
          `${generalConfig.baseUrl}/budgets`,
          data
        );
        if (response.data.message === 'success') {
          setPatientId('');
          // setProfessionalId('');
          setBudgetTypeId('');
          setStatusId('');
          setClinicId('');
          setRegisterDate('');
          setDetails([]);

          toast.success('Presupuesto registrado');
          setSubmitting(false);
          if (afterSubmit) {
            afterSubmit();
          }
        }
      } catch (error) {
        console.log(error);
        toast.error('Presupuesto no pudo ser registrado.');
        setSubmitting(false);
      }
    }
  };

  const getBudgetDetails = async () => {
    const response = await axios.get(
      `${generalConfig.baseUrl}/budget-details/getdetails/${budget?._id}`
    );

    setDetails(response.data.body);
  };
  const filterServices = () => {
    if (agreementSelected && agreement) {
      const selectedAgreement = patientAgreements?.find(
        (a: any) => a._id === agreement
      );

      const nonStandardServices = data?.services.filter(
        (s: ServiceInterface) => !s.standard
      );

      const filteredServices = nonStandardServices?.filter(
        (s: ServiceInterface) => {
          return (
            (s.prestacionesTipo as ServiceType)._id ===
            selectedAgreement?.prestacionTipo._id
          );
        }
      );

      setServices(filteredServices);
    } else if (!agreementSelected) {
      const standardServices = data?.services.filter(
        (s: ServiceInterface) => s.standard
      );
      setServices(standardServices);
    }
  };

  useEffect(() => {
    filterServices();
  }, [agreement, agreementSelected, formDataLoaded]);

  useEffect(() => {
    if (budget) {
      setPatientId(budget.persona._id);
      // setProfessionalId(budget.profesional._id);
      setBudgetTypeId(budget.presupuestoTipo._id);
      setStatusId(budget.estado._id);
      setClinicId(budget.empresa._id);
      setRegisterDate(format(new Date(budget.fechaRegistro), 'yyyy-MM-dd'));
      getBudgetDetails();
      if (budget.convenio) {
        setAgreementSelected(true);
        setAgreement((budget.convenio as Agreement)._id!);
      }
    }
  }, [budget]);

  if (isLoading) {
    return (
      <Dialog
        open={open}
        TransitionComponent={Transition}
        onClose={() => onClose()}
        fullScreen
      >
        <Toolbar
          component={Paper}
          elevation={3}
          style={{ backgroundColor: 'teal' }}
        >
          <IconButton onClick={() => onClose()}>
            <Close />
          </IconButton>
        </Toolbar>
        <BudgetFormSkeleton />
      </Dialog>
    );
  }

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
                {/* <Card sx={{ padding: 3 }} elevation={3}> */}
                <Grid container spacing={3} alignItems="end">
                  <Grid item xs={12}>
                    <HeaderBar title="Datos de presupuesto" />
                  </Grid>
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {data && (
                      <>
                        <Box sx={{ marginBottom: 2 }}>
                          <Subform
                            title="Agregar tipo de presupuesto"
                            description="Agrega nuevo tipo de presupuesto"
                            postRoute={`${generalConfig.baseUrl}/budget-type`}
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
                            value={budgetTypeId}
                          >
                            {data?.budgetTypes.map((t: ShortModel) => {
                              return (
                                <MenuItem key={t._id} value={t._id}>
                                  {t.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
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
                            {data?.statuses.map((s: ShortModel) => {
                              return (
                                <MenuItem key={s._id} value={s._id}>
                                  {s.nombre}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </>
                    )}
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {data && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          options={data?.persons}
                          defaultValue={budget?.persona}
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
                            if (patient) setPatientId(patient._id);
                          }}
                        />
                      </FormControl>
                    )}
                  </Grid>
                  {/* <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {data && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          defaultValue={budget?.profesional}
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
                          onChange={(
                            event,
                            professional: Professional | null
                          ) => {
                            if (professional)
                              setProfessionalId(professional._id);
                          }}
                        />
                      </FormControl>
                    )}
                  </Grid> */}
                  <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                    {data && (
                      <FormControl fullWidth>
                        <Autocomplete
                          disablePortal
                          defaultValue={budget?.empresa}
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
                            if (clinic) setClinicId(clinic._id);
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
                    <FormControlLabel
                      control={
                        <Switch
                          checked={agreementSelected}
                          onChange={() => {
                            setAgreementSelected(!agreementSelected);
                            setAgreement('');
                          }}
                        />
                      }
                      label={`Convenio/ ${agreementSelected ? 'Sí' : 'No'}`}
                    />
                    <FormControl fullWidth>
                      <InputLabel id="budget-type-label">Convenio</InputLabel>
                      <Select
                        required
                        label="budget-types"
                        id="budget-type-select"
                        labelId="budget-type-label"
                        onChange={(e: SelectChangeEvent<string>) => {
                          setAgreement(e.target.value);
                        }}
                        value={agreement}
                        disabled={!agreementSelected}
                      >
                        {patientId === '' && (
                          <MenuItem disabled>Seleccione paciente</MenuItem>
                        )}
                        {patientAgreements?.map((a: any) => {
                          return (
                            <MenuItem key={a._id} value={a._id}>
                              {a.prestacionTipo.nombre}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                {/* </Card> */}
              </Grid>
              {/* DATOS DE  PRESUPUESTO */}

              {/* DETALLES DE PRESUPUESTO        */}
              <Grid item xs={12}>
                <HeaderBar title="detalles de presupuesto" />
                {services && (
                  <DetailsForm
                    budgetDetails={budgetDetails}
                    setDetails={setDetails}
                    objects={data?.objects}
                    services={services}
                  />
                )}
              </Grid>
              {/* DETALLES DE PRESUPUESTO        */}
              {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
              <Grid item xs={12}>
                <HeaderBar title="total a pagar" />
                <Card sx={{ padding: 3 }} elevation={3}>
                  <Grid container alignItems="center" spacing={3}>
                    <Grid item xs={12}>
                      <Grid item xs={6}>
                        <Typography
                          sx={{ fontSize: 30, fontWeight: 'lighter' }}
                        >
                          <AttachMoney />
                          {budgetDetails.reduce((acc, d: BudgetDetailType) => {
                            return d.valor + acc;
                          }, 0)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Divider />
                    </Grid>
                    {/* <Grid item xs={12}>
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
                          {budgetDetails.reduce((acc, d: BudgetDetailType) => {
                            return d.valorUniNeto + acc;
                          }, 0)}
                        </Typography>
                      </Grid>
                    </Grid> */}
                  </Grid>
                </Card>
              </Grid>
              {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <Button
                    style={{ marginBottom: 20 }}
                    fullWidth
                    variant="contained"
                    type="submit"
                    color={budget ? 'success' : 'primary'}
                    disabled={isSubmitting}
                  >
                    {!budget && 'GENERAR PRESUPUESTO'}
                    {budget && 'ACTUALIZAR PRESUPUESTO'}
                  </Button>
                </FormControl>
              </Grid>
            </Grid>
          </Container>
        </form>
      </Dialog>
      <Toaster />
    </>
  );
};

export default BudgetForm;
