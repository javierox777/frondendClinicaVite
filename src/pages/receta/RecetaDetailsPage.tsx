import React, { useState, ChangeEvent, FormEvent } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Container,
  Paper,
  Typography,
} from '@mui/material';

interface FormData {
  vigencia: string;
  objeto_id: string;
  receta_id: string;
}

interface ModalFormProps {
  open: boolean;
  handleClose: () => void;
}

const RecetaDetailsPage: React.FC<ModalFormProps> = ({ open, handleClose }) => {
  const [formData, setFormData] = useState<FormData>({
    vigencia: '1',
    objeto_id: '',
    receta_id: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    handleClose();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Container maxWidth="sm" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
        <Paper elevation={3} sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h6" gutterBottom>
              Formulario de Receta
            </Typography>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Vigencia"
                name="vigencia"
                value={formData.vigencia}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Objeto ID"
                name="objeto_id"
                value={formData.objeto_id}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Receta ID"
                name="receta_id"
                value={formData.receta_id}
                onChange={handleChange}
                variant="outlined"
              />
            </Box>
            <Box mt={2}>
              <Button variant="contained" color="primary" type="submit" fullWidth>
                Enviar
              </Button>
            </Box>
          </form>
        </Paper>
      </Container>
    </Modal>
  );
};

export default RecetaDetailsPage;
