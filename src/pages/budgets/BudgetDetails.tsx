import React from 'react';
import { Budget } from '../../interfaces/Budget';
import {
  Badge,
  Box,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';
import StatusBadge from '../../componemts/StatusBadge';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';

interface Props {
  budget: Budget;
}

const BudgetDetails = ({ budget }: Props) => {
  const {
    empresa,
    estado,
    fechaRegistro,
    fechaRegistroValida,
    persona,
    presupuestoTipo,
    profesional,
  } = budget;

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const filteredContacts = (
        await axios.get(`${generalConfig.baseUrl}/contact-book`)
      ).data.body.filter((c: any) => c.persona.id === persona.id);
      return filteredContacts;
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const filteredAddresses = (
        await axios.get(`${generalConfig.baseUrl}/address-book`)
      ).data.body.filter((c: any) => c.persona.id === persona.id);
      return filteredAddresses;
    },
  });

  const validContacts = contacts?.filter((c: any) => c.vigente === '1');

  const validAddresses = addresses?.filter((a: any) => a.vigente === '1');

  return (
    <Container>
      <Grid container direction="column" spacing={3}>
        {/* Datos del presupuesto */}
        <Grid item>
          <Card elevation={3} sx={{ padding: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Estado del presupuesto
                </Typography>
                <StatusBadge
                  status={
                    estado.nombre === 'EN_PROCESO'
                      ? 'in-progress'
                      : estado.nombre === 'FINALIZADO'
                        ? 'finished'
                        : 'cancelled'
                  }
                  title={
                    estado.nombre === 'EN_PROCESO'
                      ? 'EN PROCESO'
                      : estado.nombre === 'FINALIZADO'
                        ? 'FINALIZADO'
                        : 'VALIDACION PENDIENTE'
                  }
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Fecha de registro
                </Typography>
                <Typography>
                  {new Date(fechaRegistro).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Fecha válida
                </Typography>
                <Typography>
                  {new Date(fechaRegistroValida).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Tipo de presupuesto
                </Typography>
                <Typography>{presupuestoTipo.nombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>Clínica</Typography>
                <Typography>{empresa.razonSocial}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>Dentista</Typography>
                <Typography>
                  {profesional.nombre1} {profesional.apellPat}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* Datos del presupuesto */}

        {/* Datos del paciente */}
        <Grid item>
          <Card sx={{ padding: 2 }} elevation={3}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography sx={{ fontWeight: 'lighter', fontSize: 22 }}>
                  Datos de paciente
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography sx={{ fontWeight: 'bold' }}>Nombre</Typography>
                <Typography>
                  {persona.nombre1} {persona.nombre2} {persona.apellPat}{' '}
                  {persona.apellMat}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography sx={{ fontWeight: 'bold' }}>RUT</Typography>
                <Typography>
                  {persona.rut} - {persona.dv}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Fecha de nacimiento
                </Typography>
                <Typography>
                  {new Date(persona.fechaNac).toLocaleDateString()}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography sx={{ fontWeight: 'bold' }}>Institución</Typography>
                <Typography>{persona.institucion.nombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Contacto</Typography>
                <Grid container>
                  {!validContacts && (
                    <Box sx={{ width: '40%' }}>
                      <LinearProgress />
                    </Box>
                  )}
                  {validContacts?.map((c: any) => {
                    return (
                      <Grid
                        item
                        key={c.id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                      >
                        <Divider />
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {' '}
                          {c.contacto.nombre}
                        </Typography>
                        <Typography>{c.descripcion}</Typography>
                        <Divider />
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Direcciones</Typography>
                <Grid container>
                  {!validAddresses && (
                    <Box sx={{ width: '40%' }}>
                      <LinearProgress />
                    </Box>
                  )}
                  {validAddresses?.map((a: any) => {
                    return (
                      <Grid
                        item
                        key={a.id}
                        xs={12}
                        sm={12}
                        md={12}
                        lg={6}
                        xl={6}
                      >
                        <Divider />
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {' '}
                          {a.tipoDireccion.nombre}
                        </Typography>
                        <Typography>{a.nombre}</Typography>
                        <Divider />
                      </Grid>
                    );
                  })}
                  <Grid item xs={12}></Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* Datos del paciente */}
      </Grid>
    </Container>
  );
};

export default BudgetDetails;
