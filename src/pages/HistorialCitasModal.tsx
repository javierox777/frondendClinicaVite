import React, { useState, useRef } from 'react';
import { Modal, Box, Typography, Card, CardContent, Grid, Button } from '@mui/material';

interface Persona {
  _id: string;
  apellMat: string;
  apellPat: string;
  dv: string;
  fechaNac: string;
  institucion: any;
  nacionalidad: any;
  nombre1: string;
  nombre2: string;
  rut: string;
  sexo: any;
  vigente: string;
}

interface Visita {
  _id: string;
  profesional: any;
  persona: Persona;
  fecha: string;
  horaInicio: string;
  horaTermino: string;
  estado: string;
  razon: string;
}

interface HistorialCitasModalProps {
  open: boolean;
  onClose: () => void;
  visitas: Visita[];
}

const HistorialCitasModal: React.FC<HistorialCitasModalProps> = ({ open, onClose, visitas }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    setOffset({
      x: e.clientX - (modalRef.current?.getBoundingClientRect().left || 0),
      y: e.clientY - (modalRef.current?.getBoundingClientRect().top || 0),
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && modalRef.current) {
      const newX = e.clientX - offset.x;
      const newY = e.clientY - offset.y;

      modalRef.current.style.left = `${newX}px`;
      modalRef.current.style.top = `${newY}px`;
      modalRef.current.style.transform = 'translate(0, 0)'; // Se elimina la transformación
    }
  };

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <Modal
      open={open}
      onClose={() => {}}  
      aria-labelledby="modal-historial-citas-title"
      aria-describedby="modal-historial-citas-description"
      disableEnforceFocus 
      disableAutoFocus 
    >
      <Box
        ref={modalRef}
        sx={{
          position: 'absolute',
          top: '50%', // Ajustamos para centrar inicialmente
          left: '50%', // Ajustamos para centrar inicialmente
          transform: 'translate(-50%, -50%)', // Centramos usando transform
          width: { xs: '90%', md: '60%' },
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2,
          p: 4,
          cursor: 'move', // Cambiamos el cursor al mover
        }}
        onMouseDown={handleMouseDown} // Habilitar el arrastre en el modal
      >
        <Typography id="modal-historial-citas-title" variant="h5" component="h2" sx={{ mb: 3, fontWeight: 'bold' }}>
          Historial de Citas del Año
        </Typography>

        <Grid container spacing={2}>
          {visitas.map((visita) => (
            <Grid item xs={12} sm={6} md={4} key={visita._id}>
              <Card variant="outlined" sx={{ boxShadow: 2, transition: '0.3s', '&:hover': { boxShadow: 5 } }}>
                <CardContent>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {visita.persona?.nombre1} {visita.persona?.apellPat}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    RUT: {visita.persona?.rut}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Fecha: {new Date(visita.fecha).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2">Horario: {visita.horaInicio} - {visita.horaTermino}</Typography>
                  <Typography variant="body2">Estado: {visita.estado}</Typography>
                  <Typography variant="body2">Razón: {visita.razon}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box display="flex" justifyContent="flex-end" mt={3}>
          <Button onClick={onClose} variant="contained" color="primary" sx={{ fontWeight: 'bold', fontSize: '1rem', px: 4 }}>
            Cerrar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default HistorialCitasModal;
