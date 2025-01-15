import React from 'react';
import { Evolution } from '../../../interfaces/Evolution';
import { Container, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Visibility } from '@mui/icons-material';

interface Props {
  evolution: Evolution | undefined;
}

const EvolutionVisualizer = ({ evolution }: Props) => {
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

  return <div>EvolutionVisualizer</div>;
};

export default EvolutionVisualizer;