import React from 'react';
import { Person } from '../../interfaces/Person';
import {
  Box,
  Card,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { generalConfig } from '../../config';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Contact } from '../../interfaces/Contact';
import { Address } from '../../interfaces/Address';
import { ContactEmergency } from '@mui/icons-material';

interface Props {
  patient: Person;
}

const Personalnfo = ({ patient }: Props) => {
  const { mode } = useThemeContext();

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/contact-book/getcontacts/${patient._id}`
      );

      return response.data.body;
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-book/getaddresses/${patient._id}`
      );

      return response.data.body;
    },
  });

  const validContacts = contacts?.filter((c: any) => c.vigente === '1');

  const validAddresses = addresses?.filter((a: any) => a.vigente === '1');

  return (
    <Grid container spacing={4}>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={12}
        xl={12}
        className="shadow-lg p-7"
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Nombre completo
            </Typography>
            <Typography>
              {patient.nombre1} {patient.nombre2} {patient.apellPat}{' '}
              {patient.apellMat}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              RUT
            </Typography>
            <Typography>
              {patient.rut} - {patient.dv}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Fecha de nacimiento
            </Typography>
            <Typography>
              {new Date(patient.fechaNac).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Previsión
            </Typography>
            <Typography>
              {patient.institucion.prevision.nombre}{' '}
              {patient.institucion.nombre}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        className="shadow-lg p-7"
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Contacto
            </Typography>
            <Grid container spacing={1}>
              {!validContacts && (
                <Box sx={{ width: '40%' }}>
                  <LinearProgress />
                </Box>
              )}
              {validContacts?.map((c: Contact) => {
                return (
                  <Grid
                    item
                    key={c._id}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Divider />
                    <Typography
                      style={{
                        fontWeight: 'lighter',
                        color:
                          mode === 'light'
                            ? colors.lightModeTableText
                            : 'white',
                        textTransform: 'capitalize',
                      }}
                    >
                      {' '}
                      {c.contacto.nombre}
                    </Typography>
                    <Typography>{c.descripcion}</Typography>
                  </Grid>
                );
              })}
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Direcciones
            </Typography>
            <Grid container spacing={1}>
              {!validAddresses && (
                <Box sx={{ width: '40%' }}>
                  <LinearProgress />
                </Box>
              )}
              {validAddresses?.map((a: Address) => {
                return (
                  <Grid
                    item
                    key={a._id}
                    xs={12}
                    sm={12}
                    md={12}
                    lg={12}
                    xl={12}
                  >
                    <Divider />
                    <Typography
                      style={{
                        fontWeight: 'lighter',
                        color:
                          mode === 'light'
                            ? colors.lightModeTableText
                            : 'white',
                        textTransform: 'capitalize',
                      }}
                    >
                      {' '}
                      {a.tipoDireccion.nombre.toLowerCase()}
                    </Typography>
                    <Typography>{a.nombre}</Typography>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Personalnfo;
