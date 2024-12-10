import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import {
  AppBar,
  Button,
  Card,
  Dialog,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';

import { Download, Visibility } from '@mui/icons-material';
import ReceiptVisualizer from './ReceiptVisualizer';
import { Receipt } from '../../interfaces/Receipt';
import { Professional } from '../../interfaces/Professional';
import { Company } from '../../interfaces/Company';
import RecetaForm from '../receta/RecetaForm';
import { Toaster } from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

interface Props {
  patient: Person;
}

const tableHeadings = [
  { id: 1, label: 'Fecha' },
  { id: 1, label: 'Recetado por' },
  { id: 1, label: 'Clínica' },
];

const PatientReceipts = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formOpen, setFormOpen] = useState(false);

  const [dataUpdated, setUpdated] = useState(false);

  const [showReceipt, setReceipt] = useState<Receipt>();

  const { data: receipts, isLoading } = useQuery({
    queryKey: ['receipts', dataUpdated],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/receipt/getpatientreceipts/${patient._id}`
      );

      return response.data.body;
    },
  });

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const exportPDF = async () => {
    const input = document.getElementById('pdf-content');
    if (!input) return;

    const pdf = new jsPDF('portrait', 'px', 'a2'); // Portrait, mm units, A4 size

    // Use jsPDF's `html` method to render HTML directly
    pdf.html(input, {
      callback: (pdf) => {
        pdf.save('receta.pdf'); // Save the generated PDF
      },
      width: 190, // Maximum width in mm (A4 width minus margins)
    });
  };

  return (
    <>
      <Grid container gap={2}>
        {isLoading && (
          <Grid item xs={12}>
            <LinearProgress />
          </Grid>
        )}

        {!isLoading && (
          <Grid item xs={5} className="shadow-lg rounded-lg">
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
                <Typography variant="h6">Recetas y medicamentos</Typography>
                <Button variant="contained" onClick={() => setFormOpen(true)}>
                  Nueva receta
                </Button>
              </Toolbar>
            </AppBar>
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
                    {tableHeadings.map((h) => {
                      return (
                        <TableCell
                          style={{
                            fontWeight: 'bold',
                            color:
                              mode === 'light'
                                ? colors.lightModeTableText
                                : 'white',
                          }}
                          key={h.id}
                        >
                          {h.label}
                        </TableCell>
                      );
                    })}
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {receipts?.map((r: Receipt) => {
                    return (
                      <TableRow key={r._id}>
                        <TableCell>
                          {new Date(r.fechaRegistro).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {(r.profesional as Professional).nombre1}{' '}
                          {(r.profesional as Professional).apellPat}
                        </TableCell>
                        <TableCell>
                          {(r.empresa as Company).razonSocial}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => setReceipt(r)}>
                            <Visibility />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                page={page}
                onPageChange={handleChangePage}
                count={receipts?.length}
                component="div"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        )}
        {!isLoading && (
          <Grid item xs={6} className="border border-zinc-200 rounded-lg p-3">
            {showReceipt && (
              <IconButton onClick={exportPDF} color="primary">
                <Download />
                Descargar
              </IconButton>
            )}
            <div id="pdf-content">
              <ReceiptVisualizer receipt={showReceipt} />
            </div>
          </Grid>
        )}
      </Grid>
      <Dialog open={formOpen} onClose={() => setFormOpen(false)}>
        <Card className="p-5">
          <RecetaForm onSuccess={() => setUpdated(!dataUpdated)} />
        </Card>
      </Dialog>
      <Toaster />
    </>
  );
};

export default PatientReceipts;
