import React from 'react';
import { Evolution } from '../../../interfaces/Evolution';
import { Container, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Visibility } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Professional } from '../../../interfaces/Professional';

interface Props {
  evolution: Evolution | undefined;
}

const EvolutionVisualizer = ({ evolution }: Props) => {
  console.log(evolution);
  const { mode } = useThemeContext();
  if (!evolution)
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
              Haz click en {<Visibility />} en evolución para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <>
      <Grid container>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Typography>Fecha</Typography>
          <Typography variant="h5">
            {format(new Date(evolution.fecha), 'yyyy/MM/dd')}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Typography>Atención</Typography>
          <Typography variant="h5">
            {(evolution.profesional as Professional).nombre1}{' '}
            {(evolution.profesional as Professional).apellPat}
          </Typography>
        </Grid>
      </Grid>
      <ReactMarkdown>{evolution.descripcion}</ReactMarkdown>;
    </>
  );
};

export default EvolutionVisualizer;
