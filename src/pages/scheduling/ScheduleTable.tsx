import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { generalConfig } from '../../config';
import {
  Autocomplete,
  Box,
  Button,
  ButtonGroup,
  FormControl,
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
  TextField,
} from '@mui/material';
import { Professional } from '../../interfaces/Professional';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import { ProfessionalSchedule } from '../../interfaces/ProfessionalSchedule';
import toast, { Toaster } from 'react-hot-toast';
import ScheduleForm from './ScheduleForm';
import EditIcon from '@mui/icons-material/Edit';

const tableHeadings = [
  { id: 1, label: 'Fecha Inicio' },
  { id: 2, label: 'Fecha Término' },
  { id: 3, label: 'Cupos' },
  { id: 4, label: 'Duración por Atención' },
  { id: 5, label: 'Acciones' },
];

const ScheduleTable = () => {
  const { mode } = useThemeContext();
  const [professionalId, setProfessionalId] = useState<string>('');
  const [scheduletoShow, setSchedule] = useState<ProfessionalSchedule[]>();
  const [isSearching, setSearching] = useState<boolean>(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);

  const [scheduleToEdit, setEditSchedule] = useState<
    ProfessionalSchedule | undefined
  >();

  const { data: professionals } = useQuery({
    queryKey: ['professionals', refetch],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
      );

      return response.data.body;
    },
  });

  const handleSearch = async (e?: React.FormEvent) => {
    setSearching(true);
    if (e) {
      e.preventDefault();
    }
    if (!professionalId) {
      return toast.error('Selecciona profesional para ver su agenda');
    }
    try {
      const response = await axios.get(
        `${generalConfig.baseUrl}/profesional-agenda/getprofessionalschedule/${professionalId}`
      );
      if (response.data.message === 'success') {
        setSchedule(response.data.body);
      }
      setSearching(false);
    } catch (error) {
      setSearching(false);
      toast.error('Error, inténtelo nuevamente.');
    }
  };

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
      <form onSubmit={handleSearch}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            {professionals && (
              <FormControl fullWidth>
                <Autocomplete
                  disablePortal
                  defaultValue={scheduleToEdit?.profesional as Professional}
                  options={professionals}
                  renderInput={(params) => (
                    <TextField {...params} label="Dentista" />
                  )}
                  renderOption={(props, professional: Professional) => (
                    <li {...props}>
                      <div className="flex justify-between w-full">
                        <span>
                          {professional.nombre1} {professional.apellPat}
                        </span>
                        <span
                          style={{
                            color:
                              mode === 'light'
                                ? colors.ligthModeSoftText
                                : colors.darkModeSoftText,
                          }}
                        >
                          {professional.rut}-{professional.dv}
                        </span>
                      </div>
                    </li>
                  )}
                  getOptionLabel={(professional: Professional) => {
                    // Value selected with enter, right from the input
                    if (typeof professional === 'string') {
                      return professional;
                    }
                    // Regular professional
                    return `${professional.nombre1} ${professional.apellPat} ${professional.rut}-${professional.dv}`;
                  }}
                  onChange={(event, professional: Professional | null) => {
                    if (professional) setProfessionalId(professional._id);
                  }}
                  style={{
                    marginBottom: 20,
                  }}
                />
              </FormControl>
            )}
          </Grid>
          <Grid item xs={12}>
            <ButtonGroup>
              <FormControl>
                <Button variant="contained" type="submit">
                  Buscar Agenda
                </Button>
              </FormControl>
              <Button variant="contained" onClick={() => setFormOpen(true)}>
                Crear Agenda
              </Button>
            </ButtonGroup>
          </Grid>

          <Grid item xs={12}>
            {isSearching && professionalId && <LinearProgress />}
            {scheduletoShow && (
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {scheduletoShow
                        ?.slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((s: ProfessionalSchedule) => {
                          return (
                            <TableRow key={s._id}>
                              <TableCell>{s.fechaInicio}</TableCell>
                              <TableCell>{s.fechaTermino}</TableCell>
                              <TableCell>{s.cupos}</TableCell>
                              <TableCell>{s.intervalo}</TableCell>
                              <TableCell>
                                <IconButton
                                  color="primary"
                                  onClick={() => {
                                    setEditSchedule(s);
                                    setFormOpen(true);
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  page={page}
                  onPageChange={handleChangePage}
                  count={scheduletoShow?.length}
                  component="div"
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            )}
          </Grid>
        </Grid>
      </form>
      <Toaster />
      <ScheduleForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        schedule={scheduleToEdit && scheduleToEdit}
        refetch={() => {
          setRefetch(!refetch);
          handleSearch();
        }}
      />
    </>
  );
};

export default ScheduleTable;
