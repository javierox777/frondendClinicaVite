import React from 'react';
import { Evolution } from '../../../interfaces/Evolution';
import { Container, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Visibility } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';

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

  return <ReactMarkdown>{evolution.descripcion}</ReactMarkdown>;
};

export default EvolutionVisualizer;
