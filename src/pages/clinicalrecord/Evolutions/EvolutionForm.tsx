import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import HeaderBar from '../../../componemts/HeaderBar';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../../config';
import { Person } from '../../../interfaces/Person';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Company } from '../../../interfaces/Company';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import { useUser } from '../../../auth/userContext';
import { Professional } from '../../../interfaces/Professional';
import toast from 'react-hot-toast';
import { format } from 'date-fns';
import { Evolution } from '../../../interfaces/Evolution';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  patient: Person;
  evolution?: Evolution;
  afterSubmit?: CallableFunction;
}

const EvolutionForm = ({
  open,
  onClose,
  patient,
  evolution,
  afterSubmit,
}: Props) => {
  const { mode } = useThemeContext();
  const { user } = useUser();

  const [clinicId, setClinicId] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [professional, setProfessional] = useState<string>('');

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { data: formData, isLoading } = useQuery({
    queryKey: ['evolutionForm'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );
      return response.data.body;
    },
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      if (!evolution) {
        const response = await axios.post(
          `${generalConfig.baseUrl}/evoluciones`,
          {
            persona: patient._id,
            profesional: user?.profesionalId,
            empresa: clinicId,
            descripcion: description,
            fecha: format(new Date(), 'yyyy-MM-dd'),
          }
        );

        if (response.data.message === 'success') {
          toast.success('Evolución registrada correctamente');
          setIsSubmitting(false);
          setDescription('');
          setClinicId('');
          afterSubmit && afterSubmit();
        }
      } else {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/evoluciones/${evolution._id}`,
          {
            persona: patient._id,
            empresa: clinicId,
            descripcion: description,
            profesional: user?.profesionalId,
          }
        );

        if (response.data.message === 'success') {
          toast.success('Evolución actualizada correctamente');
          setIsSubmitting(false);
          afterSubmit && afterSubmit();
          onClose();
        }
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.error('Error al registrar evolución');
    }
  };

  useEffect(() => {
    if (evolution) {
      setClinicId((evolution.empresa as Company)._id);
      setDescription(evolution.descripcion);
    }
  }, [evolution]);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="xl">
      <form onSubmit={onSubmit}>
        <DialogTitle>
          <HeaderBar title="Evolucionar paciente" />
        </DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              {formData && (
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    options={formData?.persons}
                    defaultValue={patient}
                    disabled
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
                  />
                </FormControl>
              )}
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              <FormControl fullWidth>
                <InputLabel id="attention-type-label">Atención</InputLabel>
                <Select
                  required
                  label="attention-types"
                  id="attention-type-select"
                  labelId="attention-type-label"
                  onChange={(e: SelectChangeEvent<string>) => {
                    setProfessional(e.target.value);
                  }}
                  value={user?.profesionalId}
                  disabled
                >
                  {professional === '' && (
                    <MenuItem disabled>Seleccione paciente</MenuItem>
                  )}
                  {formData?.professionals?.map((p: Professional) => {
                    return (
                      <MenuItem key={p._id} value={p._id}>
                        {p.nombre1} {p.apellPat}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
              {formData && (
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    defaultValue={evolution?.empresa as Company}
                    options={formData?.clinics}
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
            <Grid item xs={12}>
              <SimpleMDE
                onChange={(value: string) => setDescription(value)}
                value={description}
                placeholder="Describe la evolución del paciente..."
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
            color={evolution ? 'success' : 'primary'}
            type="submit"
            disabled={isSubmitting}
          >
            {!evolution && 'Registrar evolución'}
            {evolution && 'Actualizar evolución'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EvolutionForm;
