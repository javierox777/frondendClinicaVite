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
  AppBar,
  Toolbar,
  Typography,
} from '@mui/material';
import { useSpring, animated } from '@react-spring/web';
import RecetaForm from './RecetaForm';
import RecetaTemplate from './RecetaPdf';
import EditIcon from '@mui/icons-material/Edit';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './styles.css';
import { Receipt } from '../../interfaces/Receipt';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { Company } from '../../interfaces/Company';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { useQuery } from '@tanstack/react-query';
import { generalConfig } from '../../config';
import { Toaster } from 'react-hot-toast';



const AnimatedDialog = animated(Dialog);
const AnimatedDialogContent = animated(DialogContent);
const AnimatedDialogTitle = animated(DialogTitle);

const Receta: React.FC = () => {
  const { mode } = useThemeContext();

  const [open, setOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [rowOpen, setRowOpen] = useState(false);
  const [selectedReceta, setSelectedReceta] = useState<Receipt | null>(null);
  const [formData, setFormData] = useState<Receipt[]>([]);
  const [selectedRow, setSelectedRow] = useState<Receipt | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [dataUpdated, setUpdated] = useState(false);

  // const { data: fetchData } = useQuery({
  //   queryKey: ['fetchData', dataUpdated],
  //   queryFn: async () => {
  //     const response = await axios.get(`${generalConfig.baseUrl}/receipt`);
  //     setFormData(response.data.body);
  //     return response.data.body;
  //   },
  // });

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const filteredData = formData.filter((row) => {
    const query = searchQuery.toLowerCase();
    return (
      (row.profesional as Professional).nombre1.toLowerCase().includes(query) ||
      (row.profesional as Professional).nombre2.toLowerCase().includes(query) ||
      (row.profesional as Professional).apellPat
        .toLowerCase()
        .includes(query) ||
      (row.profesional as Professional).apellMat
        .toLowerCase()
        .includes(query) ||
      (row.persona as Person).rut.toLowerCase().includes(query) ||
      (row.empresa as Company).razonSocial.toLowerCase().includes(query) ||
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

  const handleEditClickOpen = (receta: Receipt) => {
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

  const handlePdfClickOpen = (receta: Receipt) => {
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

  const handleRowClickOpen = (row: Receipt) => {
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
    handleClose();
    handleEditClose();
    handlePdfClose();
    handleRowClose();
    setUpdated(!dataUpdated);
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
    <>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeHeaderColor
                  : colors.darkModeHeaderColor,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">Recetas</Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleClickOpen}
            >
              Crear Receta
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <TextField
        label="Buscar"
        variant="outlined"
        value={searchQuery}
        onChange={handleSearch}
      />
      <TableContainer component={Paper}>
        <Table>
          <TableHead
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeTableHead
                  : colors.darkModeTableHead,
            }}
          >
            <TableRow>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                N°
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Rut
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Nombre
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Fecha Registro
              </TableCell>
              <TableCell
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                }}
              >
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredData.map((row, index) => (
              <TableRow key={row._id} onClick={() => handleRowClickOpen(row)}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{(row.persona as Person).rut}</TableCell>
                <TableCell
                  style={{ textTransform: 'capitalize' }}
                >{`${(row.persona as Person).nombre1} ${(row.persona as Person).nombre2} ${(row.persona as Person).apellPat} ${(row.persona as Person).apellMat}`}</TableCell>
                <TableCell>
                  {new Date(row.fechaRegistro).toLocaleDateString()}
                </TableCell>
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
                      color="success"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEditClickOpen(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {/* <IconButton
                      color="secondary"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(row._id);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton> */}
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
        maxWidth="md"
        fullWidth
        style={createAnimation}
      >
        <AnimatedDialogContent
          className="modal-content"
          style={createAnimation}
        >
          <RecetaForm onSuccess={handleSuccess} />
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleClose} color="inherit" variant="contained">
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
        <AnimatedDialogContent className="modal-content" style={editAnimation}>
          {selectedReceta && (
            <RecetaForm receipt={selectedReceta} onSuccess={handleSuccess} />
          )}
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={handleEditClose} color="inherit" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </AnimatedDialog>

      <AnimatedDialog
        open={pdfOpen}
        onClose={handlePdfClose}
        maxWidth="md"
        style={pdfAnimation}
      >
        <AnimatedDialogTitle
          className="modal-title"
          style={{
            ...textAnimationProps,
            textAlign: 'left',
            paddingBlock: 4,
          }}
        >
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
                justifyContent: 'space-between',
              }}
            >
              <Typography variant="h6">Vista previa de receta</Typography>
            </Toolbar>
          </AppBar>
        </AnimatedDialogTitle>
        <AnimatedDialogContent className="modal-content" style={pdfAnimation}>
          {selectedReceta && (
            <div id="pdf-content">
              <RecetaTemplate receta={selectedReceta} />
            </div>
          )}
        </AnimatedDialogContent>
        <DialogActions className="modal-actions">
          <Button onClick={exportPDF} color="primary" variant="contained">
            Descargar Receta
          </Button>
          <Button onClick={handlePdfClose} color="inherit" variant="contained">
            Cancelar
          </Button>
        </DialogActions>
      </AnimatedDialog>
      <Toaster />
    </>
  );
};

export default Receta;
