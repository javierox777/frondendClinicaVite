import React from 'react';
import { Typography, Box } from '@mui/material';

const Inicio: React.FC = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard
      </Typography>
    </Box>
  );
};

export default Inicio;
