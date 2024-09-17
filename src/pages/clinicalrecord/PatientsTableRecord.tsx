import { Edit, Search } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputAdornment,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TableSkeleton from '../../componemts/TableSkeleton';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import { Link } from 'react-router-dom';
import AppLink from '../../componemts/AppLink';

interface Props {
  refetch?: boolean;
}

const PatientsTableRecord = ({ refetch }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  const [validUpdated, setValidUpdated] = useState(false);

  const { mode } = useThemeContext();

  const navigation = useNavigate();

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

  const {
    data: patients,
    error, // en caso que haya error, es true
    isLoading, //variable que se puede usar para mostrar loaders, es true mientras se hace la peticion
  } = useQuery({
    queryKey: ['patients', refetch, validUpdated],
    queryFn: async () => {
      //funcion que hace fetching
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);

      return response.data.body; // lo que se retorna aca, va a la variable data, que en este caso se le dio el alias de patients
    },
  });

  const tableHeadings = [
    {
      id: 1,
      label: 'Nombre',
    },
    {
      id: 2,
      label: 'Rut',
    },
    {
      id: 3,
      label: 'Institución',
    },
  ];

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

  if (isLoading) return <TableSkeleton />;

  return (
    <>
      {' '}
      <AppBar position="static">
        <Toolbar
          style={{
            backgroundColor:
              mode === 'light'
                ? colors.lightModeHeaderColor
                : colors.darkModeHeaderColor,
          }}
        >
          <Typography variant="h6">Módulo dental</Typography>
        </Toolbar>
      </AppBar>
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
              {filteredPatients
                ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((p: Person, index: number) => {
                  return (
                    <TableRow
                      key={p._id}
                      // className={`${index % 2 === 0 && mode === 'light' ? 'bg-slate-100' : 'white'}`}
                    >
                      <TableCell
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
                        className="cursor-pointer hover:scale-[1.003] transition-all"
                        onClick={() => {
                          navigation('/fichaclinica', {
                            state: { patient: p },
                          });
                        }}
                      >
                        {p.nombre1} {p.apellPat}
                      </TableCell>
                      <TableCell>{p.rut}</TableCell>
                      <TableCell>{p.institucion.nombre}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          page={page}
          onPageChange={handleChangePage}
          count={patients?.length}
          component="div"
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </>
  );
};

export default PatientsTableRecord;
