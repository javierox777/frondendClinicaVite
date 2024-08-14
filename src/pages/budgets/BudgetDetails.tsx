import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  LinearProgress,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import StatusBadge from '../../componemts/StatusBadge';
import { generalConfig } from '../../config';
import { Address } from '../../interfaces/Address';
import { Budget } from '../../interfaces/Budget';
import { BudgetDetail } from '../../interfaces/BudgetDetail';
import { Contact } from '../../interfaces/Contact';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import TableSkeleton from '../../componemts/TableSkeleton';
import { useNavigate } from 'react-router-dom';
import { Check } from '@mui/icons-material';
import { LoggedUser, useUser } from '../../auth/userContext';
import { useState } from 'react';
import jsPDF from 'jspdf';

interface Props {
  budget: Budget;
}

const detailsTableHeadings = [
  {
    id: 1,
    label: 'DIENTE',
  },
  {
    id: 2,
    label: 'PRESTACIÓN/TRATAMIENTO',
  },
  // {
  //   id: 3,
  //   label: 'DESCRIPCIÓN',
  // },
  {
    id: 4,
    label: 'VALOR',
  },
  {
    id: 5,
    label: 'PAGADO',
  },
];

const BudgetDetails = ({ budget }: Props) => {
  const { mode } = useThemeContext();
  const navigate = useNavigate();
  const { user } = useUser();

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
      const response = await axios.get(
        `${generalConfig.baseUrl}/contact-book/getcontacts/${budget.persona._id}`
      );

      return response.data.body;
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-book/getaddresses/${budget.persona._id}`
      );

      return response.data.body;
    },
  });

  const { data: details } = useQuery({
    queryKey: ['details'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budget-details/getdetails/${budget._id}`
      );

      return response.data.body;
    },
  });

  const validContacts = contacts?.filter((c: any) => c.vigente === '1');

  const validAddresses = addresses?.filter((a: any) => a.vigente === '1');

  return (
    <div id="pdf">
      <Container>
        <Grid container direction="column" spacing={4}>
          {/* Datos del presupuesto */}
          <Grid item className="shadow-lg rounded-lg p-5">
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  Estado del presupuesto
                </Typography>
                <StatusBadge
                  status={budget.profesionalValida ? 'finished' : 'in-progress'}
                  title={
                    budget.profesionalValida
                      ? 'VALIDADO'
                      : 'VALIDACIÓN PENDIENTE'
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
                  Fecha de validación
                </Typography>
                <Typography>
                  {budget.fechaRegistroValida
                    ? new Date(fechaRegistroValida).toLocaleDateString()
                    : 'Validación pendiente'}
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
                <Typography sx={{ fontWeight: 'bold' }}>Emitido por</Typography>
                <Typography>
                  {profesional.nombre1} {profesional.apellPat}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                {!budget.profesionalValida && (
                  <Button
                    onClick={async () => {
                      if (user) {
                        const response = await axios.patch(
                          `${generalConfig.baseUrl}/budgets/validatebudget/${budget._id}`,
                          {
                            profesionalValida: (user as LoggedUser)
                              .profesionalId,
                          }
                        );

                        if (response.data.message === 'success') {
                          navigate('/presupuestos');
                        }
                      }
                    }}
                    color="info"
                    variant="outlined"
                  >
                    Validar
                  </Button>
                )}
                {budget.profesionalValida && (
                  <>
                    <Typography sx={{ fontWeight: 'bold' }}>
                      Validado por
                    </Typography>
                    <Typography>
                      {budget.profesionalValida.nombre1}{' '}
                      {budget.profesionalValida.apellPat}
                    </Typography>
                  </>
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                <Button
                  onClick={() =>
                    navigate('/editarpresupuesto', {
                      state: { budget: budget },
                    })
                  }
                  color="success"
                  variant="outlined"
                  style={{ marginRight: 5 }}
                >
                  Editar
                </Button>
                <Button
                  onClick={() =>
                    navigate('/presupuestopdf', {
                      state: {
                        budget: budget,
                        contacts: contacts,
                        addresses: addresses,
                        details: details,
                      },
                    })
                  }
                  color="info"
                  variant="outlined"
                >
                  Ver PDF
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {/* Datos del presupuesto */}

          {/* Datos del paciente */}
          <Grid item className="shadow-lg rounded-lg p-5">
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
                <Typography sx={{ fontWeight: 'bold' }}>Previsión</Typography>
                <Typography>
                  {persona.institucion.prevision.nombre}{' '}
                  {persona.institucion.nombre}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography sx={{ fontWeight: 'bold' }}>Contacto</Typography>
                <Grid container>
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
                  {validAddresses?.map((a: Address) => {
                    return (
                      <Grid
                        item
                        key={a._id}
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
            </Grid>
          </Grid>
          {/* Datos del paciente */}

          {/* Detalles del presupuesto  */}
          <Grid item>
            {!details && <TableSkeleton />}
            {details && (
              <TableContainer>
                <Table>
                  <TableHead
                    style={{
                      backgroundColor:
                        mode === 'light'
                          ? colors.lightModeTableHead
                          : colors.darkModeTableHead,
                    }}
                  >
                    <TableRow>
                      {detailsTableHeadings.map(
                        (h: { id: number; label: string }) => {
                          return <TableCell key={h.id}>{h.label}</TableCell>;
                        }
                      )}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {details?.map((d: BudgetDetail) => {
                      return (
                        <TableRow key={d._id}>
                          <TableCell>{d.objeto.nombre}</TableCell>
                          <TableCell>{d.prestacion.nombre}</TableCell>
                          <TableCell>$ {d.valor}</TableCell>
                          <TableCell>
                            {d.pagado ? (
                              <Check color="success" />
                            ) : (
                              <Typography
                                style={{ color: colors.ligthModeSoftText }}
                              >
                                PENDIENTE
                              </Typography>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                  <TableFooter>
                    <TableRow>
                      <TableCell>TOTAL A PAGAR</TableCell>
                      <TableCell>
                        ${' '}
                        {details?.reduce((acc: number, d: BudgetDetail) => {
                          return d.valor + acc;
                        }, 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PAGADO</TableCell>
                      <TableCell>
                        ${' '}
                        {details
                          .filter((d: any) => d.pagado)
                          .reduce((acc: number, d: BudgetDetail) => {
                            return d.valor + acc;
                          }, 0)}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>PENDIENTE</TableCell>
                      <TableCell>
                        ${' '}
                        {details
                          .filter((d: any) => !d.pagado)
                          .reduce((acc: number, d: BudgetDetail) => {
                            return d.valor + acc;
                          }, 0)}
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                </Table>
              </TableContainer>
            )}{' '}
          </Grid>
          {/* Detalles del presupuesto  */}
        </Grid>
      </Container>
    </div>
  );
};

export default BudgetDetails;
