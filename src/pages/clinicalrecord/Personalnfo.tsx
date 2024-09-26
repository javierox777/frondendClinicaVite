import {
  AppBar,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Address } from '../../interfaces/Address';
import { Contact } from '../../interfaces/Contact';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import { useState } from 'react';
import { IAntecedent } from '../../interfaces/Antecedents';

interface Props {
  patient: Person;
}

const Personalnfo = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const [tab, setTab] = useState(0);

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
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container>
          <Grid item xs={12}>
            <AppBar position="static">
              <Toolbar
                style={{
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeHeaderColor
                      : colors.darkModeHeaderColor,
                }}
              >
                <Typography variant="h6">Contactos y Direcciones</Typography>
              </Toolbar>
            </AppBar>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Contactos
            </Typography>
            <Grid container spacing={1}>
              {!validContacts && (
                <Box sx={{ width: '40%', marginTop: 5 }}>
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
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
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
                <Box sx={{ width: '40%', marginTop: 5 }}>
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
