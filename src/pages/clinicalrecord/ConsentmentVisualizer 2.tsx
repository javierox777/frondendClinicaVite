import {
  AppBar,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { ConsentmentDetail } from '../../interfaces/ConsentmentDetails';

import { useThemeContext } from '../../componemts/themeContext';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import colors from '../../styles/colors';
import { ConsentmentResponse } from './ConsentmentsTab';

interface Props {
  consentment: ConsentmentResponse | undefined;
}

const ConsentmentVisualizer = ({ consentment }: Props) => {
  const { mode } = useThemeContext();

  if (!consentment)
    return (
      <Container>
        <Grid container className="rounded-lg p-5">
          <Grid item>
            <Typography
              style={{
                fontWeight: 'lighter',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Selecciona consentimiento para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}></Grid>
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
            <Typography variant="h6">Consentimiento</Typography>
          </Toolbar>
        </AppBar>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">
          Por medio del presente consentimiento, Yo{' '}
          {(consentment.consentimiento.persona as Person).nombre1}{' '}
          {(consentment.consentimiento.persona as Person).nombre2}{' '}
          {(consentment.consentimiento.persona as Person).apellPat}{' '}
          {(consentment.consentimiento.persona as Person).apellMat}
        </Typography>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          En atención comenzada el día{' '}
          {new Date(
            consentment.consentimiento.fechaRegistro
          ).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          con el/ la profesional{' '}
          {(consentment.consentimiento.profesional as Professional).nombre1}{' '}
          {(consentment.consentimiento.profesional as Professional).nombre2}{' '}
          {(consentment.consentimiento.profesional as Professional).apellPat}{' '}
          {(consentment.consentimiento.profesional as Professional).apellMat}
        </Typography>
      </Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={6}></Grid>
      <Grid item xs={12}>
        <Typography variant="body1">
          He sido informado a cerca de mi diagnóstico, pronóstico y plan de
          tratamiento así como sus posibles complicaciones mencionadas en este
          documento. Por lo tanto, de forma consciente y voluntaria doy mi
          consentimiento y aprobación para que se realice el tratamiento
          teniendo pleno conocimiento de los posibles riesgos, complicaciones y
          beneficios que podría desprenderse de dicho acto.
        </Typography>
      </Grid>
      <Grid item xs={12}></Grid>
      <Grid item xs={12}>
        <TableContainer component={Paper}>
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
                <TableCell>Diagnóstico</TableCell>
                <TableCell>Tratamiento</TableCell>
                <TableCell>Complicaciones</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consentment.detalles.map((d: ConsentmentDetail) => {
                return (
                  <TableRow key={d._id}>
                    <TableCell>{d.diagnostico}</TableCell>
                    <TableCell>{d.tratamiento}</TableCell>
                    <TableCell>{d.posiblesComplicaciones}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default ConsentmentVisualizer;
