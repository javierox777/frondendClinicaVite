import {
  Box,
  Divider,
  Grid,
  LinearProgress,
  Tab,
  Tabs,
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

  const { data: antecedents, isLoading } = useQuery<IAntecedent[]>({
    queryKey: ['antecedents'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/antecedents/getantecedents/${patient._id}`
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

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  console.log(antecedents);

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
      <Grid
        item
        xs={12}
        sm={12}
        md={12}
        lg={6}
        xl={6}
        className="shadow-lg p-7"
      >
        <Box
        // sx={{
        //   backgroundColor:
        //     mode === 'light'
        //       ? colors.lightModeTableHead
        //       : colors.darkModeTableHead,
        // }}
        >
          <Typography
            style={{
              fontWeight: 'bold',
              color: mode === 'light' ? colors.lightModeTableText : 'white',
            }}
          >
            Antecedentes
          </Typography>
          <Tabs
            value={tab}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="Mórbidos" {...a11yProps(0)} />
            <Tab label="Familiares" {...a11yProps(1)} />
            <Tab label="Malos hábitos" {...a11yProps(2)} />
            <Tab label="Alergias" {...a11yProps(3)} />
            <Tab label="Generales" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={tab} index={0}>
          {isLoading && <LinearProgress />}
          {antecedents && !antecedents[0] && (
            <Box>
              <Typography
                style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
              >
                No se han registrado antecedentes
              </Typography>
            </Box>
          )}
          {antecedents &&
            antecedents[0]?.morbidos?.map((item) => {
              if (item.descripcion === '') {
                return null;
              }
              return (
                <Box key={item._id}>
                  <ul style={{ listStyle: 'circle' }}>
                    <li style={{ display: 'list-item' }}>{item.descripcion}</li>
                  </ul>
                </Box>
              );
            })}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={1}>
          {isLoading && <LinearProgress />}
          {antecedents && !antecedents[0] && (
            <Box>
              <Typography
                style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
              >
                No se han registrado antecedentes
              </Typography>
            </Box>
          )}
          {antecedents &&
            antecedents[0]?.familiares?.map((item) => {
              if (item.descripcion === '') {
                return null;
              }
              return (
                <Box key={item._id}>
                  <ul style={{ listStyle: 'circle' }}>
                    <li style={{ display: 'list-item' }}>{item.descripcion}</li>
                  </ul>
                </Box>
              );
            })}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={2}>
          {isLoading && <LinearProgress />}
          {antecedents && !antecedents[0] && (
            <Box>
              <Typography
                style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
              >
                No se han registrado antecedentes
              </Typography>
            </Box>
          )}
          {antecedents &&
            antecedents[0]?.habitos?.map((item) => {
              if (item.descripcion === '') {
                return null;
              }
              return (
                <Box key={item._id}>
                  <ul style={{ listStyle: 'circle' }}>
                    <li style={{ display: 'list-item' }}>{item.descripcion}</li>
                  </ul>
                </Box>
              );
            })}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={3}>
          {isLoading && <LinearProgress />}
          {antecedents && !antecedents[0] && (
            <Box>
              <Typography
                style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
              >
                No se han registrado antecedentes
              </Typography>
            </Box>
          )}

          {antecedents &&
            antecedents[0]?.alergias?.map((item) => {
              if (item.descripcion === '') {
                return null;
              }
              return (
                <Box key={item._id}>
                  <ul style={{ listStyle: 'circle' }}>
                    <li style={{ display: 'list-item' }}>{item.descripcion}</li>
                  </ul>
                </Box>
              );
            })}
        </CustomTabPanel>
        <CustomTabPanel value={tab} index={4}>
          {isLoading && <LinearProgress />}
          {antecedents && !antecedents[0] && (
            <Box>
              <Typography
                style={{ fontWeight: 'lighter', fontStyle: 'italic' }}
              >
                No se han registrado antecedentes
              </Typography>
            </Box>
          )}
          {antecedents &&
            antecedents[0]?.generales?.map((item) => {
              if (item.descripcion === '') {
                return null;
              }
              return (
                <Box key={item._id}>
                  <ul style={{ listStyle: 'circle' }}>
                    <li style={{ display: 'list-item' }}>{item.descripcion}</li>
                  </ul>
                </Box>
              );
            })}
        </CustomTabPanel>
      </Grid>
    </Grid>
  );
};

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default Personalnfo;
