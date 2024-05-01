import { Add } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Fab,
  Fade,
  FormControl,
  Grid,
  Modal,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface Props {
  title: string;
  postRoute: string;
  description: string;
  onFinish?: CallableFunction;
}

const Subform = ({ title, postRoute, description, onFinish }: Props) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [isSubmitting, setSubmitting] = useState(false);

  const [name, setName] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      setSubmitting(true);
      const response = await axios.post(postRoute, { nombre: name });

      if (response.data.message === 'success') {
        toast.success('Datos registrados');
        setSubmitting(false);
        setName('');
        if (onFinish) {
          onFinish();
        }
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('No se pudo registrar datos.');
    }
  };
  return (
    <div>
      <Fab size="small" variant="extended" onClick={() => setOpen(true)}>
        <Add />
        {title}
      </Fab>
      <Modal open={open}>
        <Fade in={open}>
          <Box sx={style}>
            <Typography>{description}</Typography>
            <form onSubmit={handleSubmit}>
              <Grid
                container
                display="flex"
                justifyContent="center"
                alignItems="center"
                spacing={3}
              >
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      placeholder="Nombre"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ marginBottom: 1 }}>
                    <Button
                      variant="outlined"
                      type="submit"
                      fullWidth
                      disabled={isSubmitting}
                    >
                      Registrar
                    </Button>
                  </Box>
                  <Box>
                    <Button
                      variant="contained"
                      type="button"
                      fullWidth
                      color="inherit"
                      onClick={() => setOpen(false)}
                    >
                      Cerrar
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default Subform;
