import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import {
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
} from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { Receipt } from '../receta/types';
import { Visibility } from '@mui/icons-material';
import ReceiptVisualizer from './ReceiptVisualizer';

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

  const [showReceipt, setReceipt] = useState<Receipt>();

  const { data: receipts, isLoading } = useQuery({
    queryKey: ['receipts'],
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

  return (
    <Grid container gap={2}>
      {isLoading && (
        <Grid item xs={12}>
          <LinearProgress />
        </Grid>
      )}
      {!isLoading && (
        <Grid item xs={5} className="shadow-lg rounded-lg">
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
                        {r.profesional_id.nombre1} {r.profesional_id.apellPat}
                      </TableCell>
                      <TableCell>{r.empresa_id.razonSocial}</TableCell>
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
          <ReceiptVisualizer receipt={showReceipt} />
        </Grid>
      )}
    </Grid>
  );
};

export default PatientReceipts;
