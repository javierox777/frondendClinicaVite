import React from 'react';
import { Budget } from '../../interfaces/Budget';
import {
  Badge,
  Card,
  Container,
  Divider,
  Grid,
  Typography,
} from '@mui/material';
import StatusBadge from '../../componemts/StatusBadge';

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

  console.log(persona);

  return (
    <Container>
      <Grid container direction="column" spacing={3}>
        {/* Datos del presupuesto */}
        <Grid item>
          <Card elevation={3}>
            <Grid container>
              <Grid item>
                <Typography>Estado</Typography>
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
                      ? 'en proceso'
                      : estado.nombre === 'FINALIZADO'
                        ? 'finalizado'
                        : 'validación pendiente'
                  }
                />
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
                <Typography sx={{ fontWeight: 'bold' }}>Sexo</Typography>
                <Typography>{persona.sexo.nombre}</Typography>
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
                <Typography sx={{ fontWeight: 'bold' }}>
                  Nacionalidad
                </Typography>
                <Typography>{persona.nacionalidad.nombre}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography sx={{ fontWeight: 'bold' }}>Institución</Typography>
                <Typography>{persona.institucion.nombre}</Typography>
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
