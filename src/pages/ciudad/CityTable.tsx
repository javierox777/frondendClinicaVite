import React, { useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Modal, Box, Typography, styled, SelectChangeEvent } from '@mui/material';

// Estilos personalizados
const StyledFormControl = styled(FormControl)(({ theme }) => ({
  margin: theme.spacing(1),
  minWidth: 120,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ModalContent = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  border: '2px solid #000',
  boxShadow: theme.shadows[5],
  padding: theme.spacing(2, 4, 3),
  borderRadius: '8px',
  width: '300px',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
}));

const Ciudad = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    vigente: '',
  });

  const handleChange = (event:any) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event:any) => {
    event.preventDefault();
   
    console.log(formData);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <ModalContent>
          <Typography id="modal-title" variant="h6" component="h2" align="center">
            Nuevo Ciudad
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledFormControl>
              <TextField
                id="nombre"
                name="nombre"
                label="Nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel id="vigente-label">Vigente</InputLabel>
              <Select
                labelId="vigente-label"
                id="vigente"
                name="vigente"
                value={formData.vigente}
                onChange={handleChange}
              >
                <MenuItem value={'Si'}>Sí</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledButton variant="contained" color="primary" type="submit">
              Guardar
            </StyledButton>
          </form>
        </ModalContent>
      </Modal>

      <StyledButton onClick={handleOpen}>
        Agregar Ciudad
      </StyledButton>
    </div>
  );
};

export default Ciudad;
