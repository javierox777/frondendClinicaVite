import { Close, AttachMoney } from '@mui/icons-material';
import {
  Dialog,
  Toolbar,
  Paper,
  IconButton,
  Container,
  Grid,
  Card,
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Autocomplete,
  TextField,
  colors,
  Divider,
  Button,
  Skeleton,
} from '@mui/material';
import React from 'react';
import { generalConfig } from '../../config';
import { Company } from '../../interfaces/Company';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { ShortModel } from '../../interfaces/ShortModel';
import Subform from '../patients/subForms/Subform';
import DetailsForm from './DetailsForm';

const BudgetFormSkeleton = () => {
  return (
    <Container sx={{ paddingTop: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ padding: 3 }} elevation={3}>
            <Grid container spacing={3} alignItems="end">
              <Grid item xs={12}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Skeleton />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* DATOS DE  PRESUPUESTO */}

        {/* DETALLES DE PRESUPUESTO        */}
        <Grid item xs={12}>
          <Skeleton height={150} />
          <Skeleton height={150} />
        </Grid>
        {/* DETALLES DE PRESUPUESTO        */}
        {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
        <Grid item xs={12}>
          <Card sx={{ padding: 3 }} elevation={3}>
            <Grid container alignItems="center" spacing={3}>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Skeleton />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton />
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Grid item xs={12}>
                  <Skeleton />
                </Grid>
                <Grid item xs={12}>
                  <Skeleton />
                </Grid>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* FOOTER DE PRESUPUESTO CON LOS PRECIOS A PAGAR */}
        <Grid item xs={12}>
          <Skeleton height={70} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default BudgetFormSkeleton;
