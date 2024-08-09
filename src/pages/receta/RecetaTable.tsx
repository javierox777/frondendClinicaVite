import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Switch,
} from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import RecetaForm from './RecetaForm';
import EditRecetaForm from './EditRecetaForm';
import RecetaTemplate from './RecetaPdf';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './styles.css';

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
  direccion: string;
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

const AnimatedDialog = animated(Dialog);
const AnimatedDialogContent = animated(DialogContent);
const AnimatedDialogTitle = animated(DialogTitle);

const Receta: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [rowOpen, setRowOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<TableData | null>(null);
  const [formData, setFormData] = useState<TableData[]>([]);
  const [selectedRow, setSelectedRow] = useState<TableData | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/receipt');
      setFormData(response.data.body);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = formData.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      row.profesional_id.nombre1.toLowerCase().includes(query) ||
      row.profesional_id.nombre2.toLowerCase().includes(query) ||
      row.profesional_id.apellPat.toLowerCase().includes(query) ||
      row.profesional_id.apellMat.toLowerCase().includes(query) ||
      row.persona_id.rut.toLowerCase().includes(query) ||
      row.empresa_id.razonSocial.toLowerCase().includes(query) ||
      row.direccion.toLowerCase().includes(query) || // Filtra por dirección
      new Date(row.fechaRegistro).toLocaleDateString().includes(query)
    );
  });

  const [createAnimation, createAnimationApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { tension: 280, friction: 60 },
  }));

  const [editAnimation, editAnimationApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { tension: 280, friction: 60 },
  }));

  const [pdfAnimation, pdfAnimationApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { tension: 280, friction: 60 },
  }));

  const [rowAnimation, rowAnimationApi] = useSpring(() => ({
    from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
    to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    config: { tension: 280, friction: 60 },
  }));

  const textAnimationProps = useSpring({
    from: { transform: 'scale(1)', opacity: 1 },
    to: {
      transform:
        rowOpen || editOpen || pdfOpen || open ? 'scale(1.1)' : 'scale(1)',
      opacity: rowOpen || editOpen || pdfOpen || open ? 1 : 0,
    },
    config: { tension: 300, friction: 25 },
  });

  const handleClickOpen = () => {
    createAnimationApi.start({
      from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
      to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditClickOpen = (receta: TableData) => {
    editAnimationApi.start({
      from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
      to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    });
    setSelectedReceta(receta);
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
    setSelectedReceta(null);
  };

  const handlePdfClickOpen = (receta: TableData) => {
    pdfAnimationApi.start({
      from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
      to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    });
    setSelectedReceta(receta);
    setPdfOpen(true);
  };

  const handlePdfClose = () => {
    setPdfOpen(false);
    setSelectedReceta(null);
  };

  const handleRowClickOpen = (row: TableData) => {
    rowAnimationApi.start({
      from: { opacity: 0, transform: 'scale(0.5) translateY(-100%)' },
      to: { opacity: 1, transform: 'scale(1) translateY(0)' },
    });
    setSelectedRow(row);
    setRowOpen(true);
  };

  const handleRowClose = () => {
    setRowOpen(false);
    setSelectedRow(null);
  };

  const handleSuccess = () => {
    fetchData();
    handleClose();
    handleEditClose();
    handlePdfClose();
    handleRowClose();
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:3000/api/receipt/${id}`);
      fetchData(); // Refresca los datos después de eliminar la receta
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const handleEstadoChange = async (id: string, estado: boolean) => {
    try {
      await axios.put(`http://localhost:3000/api/receipt/${id}`, {
        estado_id: estado,
      });
      setFormData((prevData) =>
        prevData.map((item) =>
          item._id === id ? { ...item, estado_id: estado } : item
        )
      ); // Actualiza el estado localmente
    } catch (error) {
      console.error('Error updating estado:', error);
    }
  };

  const transformReceta = (receta: TableData) => {
    return {
      _id: receta._id,
      estado_id: receta.estado_id,
      profesional_id: receta.profesional_id._id,
      empresa_id: receta.empresa_id._id,
      fechaRegistro: new Date(receta.fechaRegistro),
      direccion: receta.direccion, // Asegúrate de incluir la dirección aquí
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
      pdf.save('receta.pdf');
    }
  };

  return (
    <div>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <TextField
          label="Buscar"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
        <Button variant="contained" color="primary" onClick={handleClickOpen}>
          Crear Receta
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>N°</TableCell>
              <TableCell>Rut</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Profesional</TableCell>
              <TableCell>Empresa</TableCell>
              <TableCell>Fecha Registro</TableCell>
              <TableCell>Dirección</TableCell> {/* Nuevo campo */}
              <TableCell>Receta Detalle</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow
                key={index}
                className={`table-row ${selectedRow && selectedRow._id === row._id ? 'table-row-selected' : ''} ${!row.estado_id ? 'inactive-row' : ''}`}
                onClick={() => handleRowClickOpen(row)}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{row.persona_id.rut}</TableCell>
                <TableCell>{`${row.persona_id.nombre1} ${row.persona_id.nombre2} ${row.persona_id.apellPat} ${row.persona_id.apellMat}`}</TableCell>
                <TableCell>{row.estado_id ? 'Activo' : 'Inactivo'}</TableCell>
                <TableCell>{`${row.profesional_id.nombre1} ${row.profesional_id.nombre2} ${row.profesional_id.apellPat} ${row.profesional_id.apellMat}`}</TableCell>
                <TableCell>{row.empresa_id.razonSocial}</TableCell>
                <TableCell>
                  {new Date(row.fechaRegistro).toLocaleDateString()}
                </TableCell>
                <TableCell>{row.direccion}</TableCell> {/* Nuevo campo */}
                <TableCell>{row.recetaDetalle.join(', ')}</TableCell>
                <TableCell>
                  <Box display="flex" flexDirection="row">
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePdfClickOpen(row);
                      }}
                    >
                      <PictureAsPdfIcon />
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClickOpen(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  {/* <Switch
                    checked={row.estado_id}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleEstadoChange(row._id, e.target.checked);
                    }}
                    color="primary"
                    inputProps={{ 'aria-label': 'controlled' }}
                  /> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <AnimatedDialog
        open={open}
        onClose={handleClose}
        maxWidth="sm"
        fullWidth
        style={createAnimation}
      >
        <AnimatedDialogTitle className="modal-title" style={textAnimationProps}>
          Crear Receta
        </AnimatedDialogTitle>
        <AnimatedDialogContent
          className="modal-content"
          style={createAnimation}
        >
          <RecetaForm onSuccess={handleSuccess} />
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </AnimatedDialog>

      <AnimatedDialog
        open={editOpen}
        onClose={handleEditClose}
        maxWidth="sm"
        fullWidth
        style={editAnimation}
      >
        <AnimatedDialogTitle className="modal-title" style={textAnimationProps}>
          Editar Receta
        </AnimatedDialogTitle>
        <AnimatedDialogContent className="modal-content" style={editAnimation}>
          {selectedReceta && (
            <EditRecetaForm
              receta={transformReceta(selectedReceta)}
              onSuccess={handleSuccess}
            />
          )}
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleEditClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </AnimatedDialog>

      <AnimatedDialog
        open={pdfOpen}
        onClose={handlePdfClose}
        maxWidth="md"
        fullWidth
        style={pdfAnimation}
      >
        <AnimatedDialogTitle
          className="modal-title"
          style={{
            ...textAnimationProps,
            textAlign: 'left',
            paddingLeft: '50px',
          }}
        >
          Vista previa de la Receta
        </AnimatedDialogTitle>
        <AnimatedDialogContent className="modal-content" style={pdfAnimation}>
          {selectedReceta && (
            <div id="pdf-content">
              <RecetaTemplate receta={selectedReceta} />
            </div>
          )}
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={exportPDF} color="primary">
            Descargar Receta
          </Button>
          <Button onClick={handlePdfClose} color="primary">
            Cancelar
          </Button>
        </DialogActions>
      </AnimatedDialog>

      <AnimatedDialog
        open={rowOpen}
        onClose={handleRowClose}
        maxWidth="md"
        fullWidth
        style={rowAnimation}
      >
        <AnimatedDialogTitle
          className="modal-title"
          ml="10mm"
          style={textAnimationProps}
        >
          Detalles de la Receta
        </AnimatedDialogTitle>
        <AnimatedDialogContent className="modal-content" style={rowAnimation}>
          {selectedRow && (
            <div>
              <p>
                <strong>Estado:</strong>{' '}
                {selectedRow.estado_id ? 'Activo' : 'Inactivo'}
              </p>
              <p>
                <strong>Profesional:</strong>{' '}
                {`${selectedRow.profesional_id.nombre1} ${selectedRow.profesional_id.nombre2} ${selectedRow.profesional_id.apellPat} ${selectedRow.profesional_id.apellMat}`}
              </p>
              <p>
                <strong>Empresa:</strong> {selectedRow.empresa_id.razonSocial}
              </p>
              <p>
                <strong>Fecha Registro:</strong>{' '}
                {new Date(selectedRow.fechaRegistro).toLocaleDateString()}
              </p>
              <p>
                <strong>Rut:</strong> {selectedRow.persona_id.rut}
              </p>
              <p>
                <strong>Nombre:</strong>{' '}
                {`${selectedRow.persona_id.nombre1} ${selectedRow.persona_id.nombre2} ${selectedRow.persona_id.apellPat} ${selectedRow.persona_id.apellMat}`}
              </p>
              <p>
                <strong>Dirección:</strong> {selectedRow.direccion}
              </p>{' '}
              {/* Nuevo campo */}
              <p>
                <strong>Receta Detalle:</strong>{' '}
                {selectedRow.recetaDetalle.join(', ')}
              </p>
            </div>
          )}
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleRowClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </AnimatedDialog>
    </div>
  );
};

export default Receta;
