import { Visibility } from '@mui/icons-material';
import {
  LinearProgress,
  TableContainer,
  Paper,
  Grid,
  Table,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  AppBar,
  Toolbar,
  Typography,
  Button,
  Dialog,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Receipt } from '../receta/types';
import ReceiptVisualizer from './ReceiptVisualizer';
import colors from '../../styles/colors';
import { Person } from '../../interfaces/Person';
import { Consentment } from '../../interfaces/Consentment';
import { Company } from '../../interfaces/Company';
import ConsentmentVisualizer from './ConsentmentVisualizer';
import ConsentForm from '../consent/ConsentPage';
import { ConsentmentDetail } from '../../interfaces/ConsentmentDetails';

const tableHeadings = [
  { id: 1, label: 'Fecha' },
  { id: 2, label: 'Clínica' },
];

interface Props {
  patient: Person;
}

export interface ConsentmentResponse {
  consentimiento: Consentment;
  detalles: ConsentmentDetail[];
}

const ConsentmentsTab = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [formOpen, setFormOpen] = useState(false);
  const [dataUpdated, setUpdated] = useState(false);

  const [showConsentment, setConsentment] = useState<ConsentmentResponse>();

  const { data: consentments, isLoading } = useQuery({
    queryKey: ['consentments', dataUpdated],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/consentments/getconsentments/${patient._id}`
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
                <Typography variant="h6">Consentimientos</Typography>
                <Button variant="contained" onClick={() => setFormOpen(true)}>
                  Nuevo consentimiento
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {consentments?.map((c: ConsentmentResponse) => {
                    return (
                      <TableRow key={c.consentimiento._id}>
                        <TableCell>
                          {new Date(
                            c.consentimiento.fechaRegistro
                          ).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {(c.consentimiento.empresa as Company).razonSocial}
                        </TableCell>
                        <TableCell>
                          <IconButton onClick={() => setConsentment(c)}>
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
                count={consentments?.length}
                component="div"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        )}
        {!isLoading && (
          <Grid item xs={6} className="border border-zinc-200 rounded-lg p-3">
            <ConsentmentVisualizer consentment={showConsentment} />
          </Grid>
        )}
      </Grid>

      <ConsentForm
        afterSubmit={() => setUpdated(!dataUpdated)}
        open={formOpen}
        onClose={() => setFormOpen(false)}
      />
    </>
  );
};

export default ConsentmentsTab;
