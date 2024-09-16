import React from 'react';
import { Consentment } from '../../interfaces/Consentment';
import { ConsentmentDetail } from '../../interfaces/ConsentmentDetails';
import { Delete } from '@mui/icons-material';
import {
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
  MenuItem,
  Typography,
  TextField,
  TableContainer,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Grid,
  Table,
  Button,
  Container,
} from '@mui/material';

import { Company } from '../../interfaces/Company';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { ShortModel } from '../../interfaces/ShortModel';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

interface Response {
  consentimiento: Consentment;
  detalles: ConsentmentDetail[];
}

interface Props {
  consentment: Response;
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
            <TableHead>
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
                    <TableCell>{d.tratamiento}</TableCell>
                    <TableCell>{d.tratamiento}</TableCell>
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
