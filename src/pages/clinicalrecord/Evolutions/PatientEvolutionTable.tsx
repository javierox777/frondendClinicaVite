import React, { useEffect, useState } from 'react';
import { Person } from '../../../interfaces/Person';
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
  Typography,
} from '@mui/material';
import HeaderBar from '../../../componemts/HeaderBar';
import axios from 'axios';
import { generalConfig } from '../../../config';
import { useQuery } from '@tanstack/react-query';
import colors from '../../../styles/colors';
import { useThemeContext } from '../../../componemts/themeContext';
import { Evolution } from '../../../interfaces/Evolution';
import { Company } from '../../../interfaces/Company';
import { format } from 'date-fns';
import { Professional } from '../../../interfaces/Professional';
import { Edit, Visibility } from '@mui/icons-material';
import EvolutionVisualizer from './EvolutionVisualizer';
import EvolutionForm from './EvolutionForm';
import { useNavigate } from 'react-router-dom';

interface Props {
  patient: Person;
}

const tableHeadings = [
  { id: 1, label: 'Fecha' },
  { id: 2, label: 'Atención' },
  { id: 3, label: 'Clínica' },
];

const PatientEvolutionTable = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openForm, setOpenForm] = useState(false);

  const [newEvolutionForm, setNewEvolutionForm] = useState(false);

  const [showEvolution, setShowEvolution] = useState<Evolution | undefined>();

  const [editEvolution, setEditEvolution] = useState<Evolution>();

  const [dataUpdated, setDataUpdated] = useState(false);

  const { data: evolutions, isLoading } = useQuery({
    queryKey: ['evolutions', patient._id, dataUpdated],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/evoluciones/getpatientevolutions/${patient._id}`
      );
      return response.data.body;
    },
  });

  useEffect(() => {
    if (showEvolution && evolutions) {
      const updatedEvolution = evolutions.find(
        (e: Evolution) => e._id === showEvolution._id
      );
      console.log('evolucion actualizada', updatedEvolution);

      setShowEvolution(updatedEvolution);
    }
  }, [dataUpdated, evolutions]);

  return (
    <>
      <Grid container spacing={2} gap={2}>
        <Grid xs={5}>
          <HeaderBar
            title="Evoluciones"
            buttonTitle="Evolucionar"
            button
            buttonFn={() => {
              setNewEvolutionForm(true);
            }}
          />
          {isLoading && <LinearProgress />}
          {evolutions && (
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
                    {tableHeadings.map((h) => (
                      <TableCell key={h.id} style={{ fontWeight: 'bold' }}>
                        {h.label}
                      </TableCell>
                    ))}
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {evolutions?.map((evolution: Evolution) => {
                    return (
                      <TableRow key={evolution._id}>
                        <TableCell>
                          {format(new Date(evolution.fecha), 'yyyy/MM/dd')}
                        </TableCell>
                        <TableCell>
                          {(evolution.profesional as Professional).nombre1}{' '}
                          {(evolution.profesional as Professional).apellPat}
                        </TableCell>
                        <TableCell>
                          {(evolution.empresa as Company).razonSocial}
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => setShowEvolution(evolution)}
                          >
                            <Visibility />
                          </IconButton>
                          <IconButton
                            onClick={() => {
                              setEditEvolution(evolution);
                              setOpenForm(true);
                            }}
                          >
                            <Edit color="success" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              <TablePagination
                page={page}
                onPageChange={(e, newPage) => setPage(newPage)}
                count={evolutions?.length || 0}
                component="div"
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={(e) =>
                  setRowsPerPage(parseInt(e.target.value, 10))
                }
              />
            </TableContainer>
          )}
        </Grid>
        <Grid
          item
          xs={6}
          className="border border-zinc-200 rounded-lg p-3 pl-20 pr-20 ml-5 pt-0 prose"
        >
          <EvolutionVisualizer evolution={showEvolution} />
        </Grid>
      </Grid>
      <EvolutionForm
        open={openForm}
        onClose={() => {
          setOpenForm(false);
        }}
        patient={patient}
        evolution={editEvolution}
        afterSubmit={() => setDataUpdated(!dataUpdated)}
      />
      <EvolutionForm
        open={newEvolutionForm}
        onClose={() => setNewEvolutionForm(false)}
        patient={patient}
        afterSubmit={() => setDataUpdated(!dataUpdated)}
      />
    </>
  );
};

export default PatientEvolutionTable;
