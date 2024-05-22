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
    label: 'VALOR NETO',
  },
  {
    id: 5,
    label: 'VALOR IVA',
  },
];

const BudgetDetails = ({ budget }: Props) => {
  const { mode } = useThemeContext();
  const navigate = useNavigate();

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

  console.log(budget);

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
                  Fecha de validaciónå
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
                <Typography sx={{ fontWeight: 'bold' }}>Emitido</Typography>
                <Typography>
                  {profesional.nombre1} {profesional.apellPat}
                </Typography>
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
                >
                  Editar
                </Button>
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
              <Grid item xs={12}>
                <Divider />
              </Grid>
            </Grid>
          </Card>
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
                        <TableCell>$ {d.valorUniNeto}</TableCell>
                        <TableCell>$ {d.valorUniIva}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell>TOTAL A PAGAR</TableCell>
                    <TableCell>
                      {details?.reduce((acc: number, d: BudgetDetail) => {
                        return d.valorUniIva + acc;
                      }, 0)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PAGADO</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>PENDIENTE</TableCell>
                    <TableCell>1</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          )}{' '}
        </Grid>
        {/* Detalles del presupuesto  */}
      </Grid>
    </Container>
  );
};

export default BudgetDetails;
