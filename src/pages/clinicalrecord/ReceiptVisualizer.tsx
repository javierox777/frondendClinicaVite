import React from 'react';

import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import RecetaTemplate from '../receta/RecetaPdf';
import { Receipt } from '../../interfaces/Receipt';

interface Props {
  receipt?: Receipt;
}

const ReceiptVisualizer = ({ receipt }: Props) => {
  const { mode } = useThemeContext();

  if (!receipt)
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
              Selecciona receta para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  return <RecetaTemplate receta={receipt} />;
};

export default ReceiptVisualizer;
