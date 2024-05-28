import { Box, Typography } from '@mui/material';
import React from 'react';
import { LoggedUser, useUser } from '../auth/userContext';
import { User } from '../interfaces/User';

const Inicio: React.FC = () => {
  const { user } = useUser();

  console.log(user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        Bienvenido al Dashboard {(user as LoggedUser).nombre}
      </Typography>
    </Box>
  );
};

export default Inicio;
