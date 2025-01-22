import { Edit, Search, PictureAsPdf } from '@mui/icons-material';
import {
  Box,
  IconButton,
  InputAdornment,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import TableSkeleton from '../../componemts/TableSkeleton';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import { formatRut } from '../../helpers/formatRut';
import { useUser } from '../../auth/userContext';

const PatientsTable = ({ refetch }: { refetch?: boolean }) => {
  const { user } = useUser();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const { mode } = useThemeContext();
  const navigation = useNavigate();

  const {
    data: patients,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['patients', refetch],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);
      return response.data.body;
    },
  });

  const filteredPatients = patients?.filter((p: Person) => {
    const rut = p.rut.toLowerCase();
    const institution = p.institucion.nombre.toLowerCase();
    const name = `${p.nombre1} ${p.apellPat}`.toLowerCase();
    return (
      rut.includes(searchText.toLowerCase()) ||
      institution.includes(searchText.toLowerCase()) ||
      name.includes(searchText.toLowerCase())
    );
  });

  const handleDownloadPdf = async (patient: Person) => {
    try {
      const response = await axios.get(
        `${generalConfig.baseUrl}/persons/${patient._id}`
      );
      const detailedPatient = response.data.body;

      // Crear el PDF
      const doc = new jsPDF();

      // Configurar colores como tuplas
      const primaryColor: [number, number, number] = [0, 102, 204];
      const secondaryColor: [number, number, number] = [220, 220, 220];
      const textColor: [number, number, number] = [40, 40, 40];

      const logoBase64 = '/public/logo.png';
      doc.addImage(logoBase64, 'PNG', 10, 10, 20, 20);

      // Encabezado con título y fecha
      doc.setFontSize(16);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Formulario del Paciente', 70, 25);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'italic');
      doc.setTextColor(...textColor);
      const today = new Date().toLocaleDateString();
      doc.text(`Fecha de generación: ${today}`, 70, 35);

      // Línea decorativa
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(1);
      doc.line(10, 45, 200, 45);

      // Información Personal
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Información Personal', 10, 55);

      // Sección: Datos personales
      doc.setDrawColor(...secondaryColor);
      doc.setFillColor(...secondaryColor);
      doc.rect(10, 60, 190, 40, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(
        `Nombre Completo: ${detailedPatient.nombre1} ${detailedPatient.nombre2 || ''} ${detailedPatient.apellPat} ${detailedPatient.apellMat}`,
        12,
        70
      );
      doc.text(`RUT: ${detailedPatient.rut}-${detailedPatient.dv}`, 12, 78);
      doc.text(
        `Fecha de Nacimiento: ${new Date(detailedPatient.fechaNac).toLocaleDateString()}`,
        12,
        86
      );
      doc.text(`Nacionalidad: ${detailedPatient.nacionalidad.nombre}`, 12, 94);

      // Información Médica
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(...primaryColor);
      doc.text('Información Médica', 10, 110);

      // Sección: Datos médicos
      doc.setDrawColor(...secondaryColor);
      doc.setFillColor(...secondaryColor);
      doc.rect(10, 115, 190, 30, 'F');

      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(...textColor);
      doc.text(`Institución: ${detailedPatient.institucion.nombre}`, 12, 125);
      doc.text(
        `Previsión: ${detailedPatient.institucion.prevision.nombre}`,
        12,
        133
      );
      doc.text(`Sexo: ${detailedPatient.sexo.nombre}`, 12, 141);

      // Pie de página
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      doc.setTextColor(150);
      doc.text('Generado por el Sistema de Gestión Dental © 2024', 10, 290);

      // Guardar el PDF
      doc.save(
        `Formulario_${detailedPatient.nombre1}_${detailedPatient.apellPat}.pdf`
      );
    } catch (error) {
      console.error('Error al generar el PDF:', error);
      alert('No se pudo generar el PDF. Intente nuevamente.');
    }
  };

  if (isLoading) return <TableSkeleton />;

  return (
    <Box display="flex" alignItems="flex-start" justifyContent="space-between">
      <Box flexGrow={1} width="70%">
        <TextField
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ marginBlock: '16px', width: '30%' }}
          placeholder="Buscar..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />
        <Box className="shadow-lg rounded-lg">
          <TableContainer component={Paper} elevation={0}>
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
                  {['Nombre', 'Rut', 'Institución', 'Acciones'].map(
                    (label, index) => (
                      <TableCell
                        key={index}
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        {label}
                      </TableCell>
                    )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((p: Person) => (
                    <TableRow key={p._id}>
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                      >
                        {p.nombre1} {p.apellPat}
                      </TableCell>
                      <TableCell>
                        {formatRut(p.rut)}
                        {'-'}
                        {p.dv}
                      </TableCell>
                      <TableCell>{p.institucion.nombre}</TableCell>
                      <TableCell>
                        {user?.role === 'admin' && (
                          <IconButton
                            color="success"
                            onClick={() =>
                              navigation('/editarpaciente', {
                                state: { patient: p },
                              })
                            }
                          >
                            <Edit />
                          </IconButton>
                        )}
                        <IconButton
                          color="primary"
                          onClick={() => handleDownloadPdf(p)}
                        >
                          <PictureAsPdf />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            page={page}
            onPageChange={(_, newPage) => setPage(newPage)}
            count={patients?.length}
            component="div"
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsTable;
