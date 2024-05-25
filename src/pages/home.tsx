import { Box, Typography } from '@mui/material';
import React from 'react';
import { useUser } from '../auth/userContext';

const Inicio: React.FC = () => {
  const { user } = useUser();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard {user?.login}
      </Typography>
    </Box>
  );
};

export default Inicio;
