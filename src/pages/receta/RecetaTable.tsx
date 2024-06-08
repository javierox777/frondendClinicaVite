import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Box, Dialog, DialogTitle, DialogContent, DialogActions, IconButton
} from '@mui/material';
import RecetaForm from './RecetaForm';
import EditRecetaForm from './EditRecetaForm';
import RecetaTemplate from './RecetaPdf'; // Asegúrate de importar el componente correcto
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import jsPDF from 'jspdf';
import Algo from './RecetaSprint'
import html2canvas from 'html2canvas';
import './styles.css';

// Define the type for the table data
interface TableData {
  _id: string;
  estado_id: boolean;
  profesional_id: {
    _id: string;
    apellMat: string;
    apellPat: string;
    nombre1: string;
    nombre2: string;
  };
  empresa_id: {
    _id: string;
    razonSocial: string;
  };
  fechaRegistro: string;
  persona_id: IPersona;
  recetaDetalle: string[];
}

interface IPersona {
  _id: string;
  apellMat: string;
  apellPat: string;
  dv: string;
  fechaNac: Date;
  institucion: string;
  nacionalidad: string;
  nombre1: string;
  nombre2: string;
  rut: string;
  sexo: string;
  vigente: string;
  direccion: string;
  Solicitario: string;
  atencion: string;
  consentimiento: string;
  fichaClinica: string;
  libretaContacto: string;
  libretaDireccion: string;
  presupuesto: string;
  receta: string;
}

const Receta: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<TableData | null>(null);
  const [formData, setFormData] = useState<TableData[]>([]);
  const [selectedRow, setSelectedRow] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/receipt");
      setFormData(response.data.body);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = (receta: TableData) => {
    setSelectedReceta(receta);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedReceta(null);
  };

  const handlePdfClickOpen = (receta: TableData) => {
    setSelectedReceta(receta);
    setPdfOpen(true);
  };

  const handlePdfClose = () => {
    setPdfOpen(false);
    setSelectedReceta(null);
  };

  const handleSuccess = () => {
    fetchData();
    handleClose();
    handleEditClose();
    handlePdfClose();
  };

  const handleDelete = () => {
    // Aquí puedes manejar la lógica de eliminación si es necesario
  };

  const transformReceta = (receta: TableData) => {
    return {
      _id: receta._id,
      estado_id: receta.estado_id,
      profesional_id: receta.profesional_id._id,
      empresa_id: receta.empresa_id._id,
      fechaRegistro: new Date(receta.fechaRegistro),
      persona_id: receta.persona_id._id,
      recetaDetalle: receta.recetaDetalle,
    };
  };

  const exportPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (input) {
      const canvas = await html2canvas(input);
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save("receta.pdf");
    }
  };

  const handleRowClick = (id: string) => {
    setSelectedRow(id === selectedRow ? null : id);
  };

  return (
    <div>
      <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Crear Receta
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Estado</TableCell>
              <TableCell>Profesional</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Persona</TableCell>
              <TableCell>Receta Detalle</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {formData.map((row, index) => (
              <TableRow
                key={index}
                className={`table-row ${selectedRow === row._id ? 'table-row-selected' : ''}`}
                onClick={() => handleRowClick(row._id)}
              >
                <TableCell>{row.estado_id ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>{`${row.profesional_id.nombre1} ${row.profesional_id.nombre2} ${row.profesional_id.apellPat} ${row.profesional_id.apellMat}`}</TableCell>
                <TableCell>{row.empresa_id.razonSocial}</TableCell>
                <TableCell>{new Date(row.fechaRegistro).toLocaleDateString()}</TableCell>
                <TableCell>{row.persona_id.rut}</TableCell>
                <TableCell>{row.recetaDetalle.join(', ')}</TableCell>
                <TableCell>
                  <IconButton color="primary" onClick={() => handlePdfClickOpen(row)}>
                    <PictureAsPdfIcon />
                  </IconButton>
                  <IconButton color="primary" onClick={() => handleEditClickOpen(row)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDelete()}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Crear Receta</DialogTitle>
        <DialogContent>
          <RecetaForm onSuccess={handleSuccess} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={editOpen} onClose={handleEditClose} maxWidth="sm" fullWidth>
        <DialogTitle>Editar Receta</DialogTitle>
        <DialogContent>
          {selectedReceta && <EditRecetaForm receta={transformReceta(selectedReceta)} onSuccess={handleSuccess} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={pdfOpen} onClose={handlePdfClose} maxWidth="md" fullWidth>
        <DialogTitle>Vista previa de la Receta</DialogTitle>
        <DialogContent>
          {selectedReceta && <div id="pdf-content"><RecetaTemplate receta={selectedReceta} /></div>}
        </DialogContent>
        <DialogActions>
          <Button onClick={exportPDF} color="primary">
            Descargar Receta
          </Button>
          <Button onClick={handlePdfClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    <Algo />
    </div>
  );
};

export default Receta;
