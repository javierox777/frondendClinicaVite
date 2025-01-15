import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
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

interface Props {
  open: boolean;
  onClose: CallableFunction;
  patient: Person;
}

const EvolutionForm = ({ open, onClose, patient }: Props) => {
  const { mode } = useThemeContext();

  const [clinicId, setClinicId] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const { data: formData, isLoading } = useQuery({
    queryKey: ['evolutionForm'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budgets/generateform`
      );
      return response.data.body;
    },
  });

  console.log(formData);

  return (
    <Dialog open={open} onClose={() => onClose()} fullWidth maxWidth="xl">
      <form>
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
              {formData && (
                <FormControl fullWidth>
                  <Autocomplete
                    disablePortal
                    //   defaultValue={budget?.empresa}
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
          <Button variant="contained" color="primary">
            Registrar evolución
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EvolutionForm;
