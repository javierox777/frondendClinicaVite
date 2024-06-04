import { Autocomplete, FormControl, Grid, TextField } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { Professional } from '../../interfaces/Professional';

const AppointmentForm = () => {
  const { mode } = useThemeContext();
  const [patient, setPatientId] = useState('');
  const [professional, setProfessionalId] = useState('');

  const { data: persons } = useQuery({
    queryKey: ['persons'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);

      return response.data.body;
    },
  });

  const { data: professionals } = useQuery({
    queryKey: ['professionals'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
      );

      return response.data.body;
    },
  });

  return (
    <form>
      <Grid container display="flex" direction="column" spacing={3}>
        <Grid item xs={12}>
          {persons && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                options={persons}
                //   defaultValue={budget?.persona}
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
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          {professionals && (
            <FormControl fullWidth>
              <Autocomplete
                disablePortal
                //   defaultValue={budget?.profesional}
                options={professionals}
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
                  if (professional) setProfessionalId(professional._id);
                }}
              />
            </FormControl>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default AppointmentForm;
