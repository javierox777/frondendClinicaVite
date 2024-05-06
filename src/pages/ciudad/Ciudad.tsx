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

const CenteredContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const Ciudad = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    prevision_id: '',
    vigente: '',
    nombre: '',
  });

  const handleChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name as string]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar el formulario
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
            Formulario
          </Typography>
          <form onSubmit={handleSubmit}>
            <StyledFormControl>
              <InputLabel id="prevision-id-label">Previsión ID</InputLabel>
              <Select
                labelId="prevision-id-label"
                id="prevision-id"
                name="prevision_id"
                value={formData.prevision_id}
                onChange={handleSelectChange}
              >
                <MenuItem value={'1'}>Opción 1</MenuItem>
                <MenuItem value={'2'}>Opción 2</MenuItem>
                <MenuItem value={'3'}>Opción 3</MenuItem>
              </Select>
            </StyledFormControl>

            <StyledFormControl>
              <InputLabel id="vigente-label">Vigente</InputLabel>
              <Select
                labelId="vigente-label"
                id="vigente"
                name="vigente"
                value={formData.vigente}
                onChange={handleSelectChange}
              >
                <MenuItem value={'Si'}>Sí</MenuItem>
                <MenuItem value={'No'}>No</MenuItem>
              </Select>
            </StyledFormControl>

            <TextField
              id="nombre"
              name="nombre"
              label="Nombre"
              value={formData.nombre}
              onChange={handleChange}
              sx={{ margin: 1, minWidth: 120 }}
            />

            <StyledButton variant="contained" color="primary" type="submit">
              Guardar
            </StyledButton>
          </form>
        </ModalContent>
      </Modal>

      <CenteredContainer>
        <StyledButton  style={{position: 'absolute',top: 0, left: 0, bottom: 250 }} onClick={handleOpen}>
          Abrir Formulario
        </StyledButton>
      </CenteredContainer>
    </div>
  );
};

export default Ciudad;
