import React from 'react';
import { Toolbar, Typography, Button } from '@mui/material';

const HeaderMenu = () => {
  return (
    <Toolbar
      style={{
        display: 'flex',
        justifyContent: 'space-between',
       
      }}
    >
      <Typography variant="h6" style={{ flexGrow: 1 }}>
      <Button color="inherit">Datos Personales</Button>
      </Typography>
      <div>
        <Button color="inherit">Convenios</Button>
        <Button color="inherit">Direcciones</Button>
        <Button color="inherit">Contactos</Button>
      </div>
    </Toolbar>
  );
};

export default HeaderMenu;
