import {
  Button,
  Input,
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
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import TableSkeleton from '../../componemts/TableSkeleton';
import { useNavigate } from 'react-router-dom';
import { AccountCircle, Search } from '@mui/icons-material';

const PatientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchText, setSearchText] = useState('');

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
    queryKey: ['patients'],
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
    {
      id: 4,
      label: 'Acciones',
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
              {tableHeadings.map((h) => {
                return (
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
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
                    key={p.id}
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
                    >
                      {p.nombre1} {p.apellPat}
                    </TableCell>
                    <TableCell>{p.rut}</TableCell>
                    <TableCell>{p.institucion.nombre}</TableCell>
                    <TableCell>
                      <Button
                        color="success"
                        variant="outlined"
                        onClick={() =>
                          navigation('/editarpaciente', {
                            state: { patient: p },
                          })
                        }
                      >
                        Editar
                      </Button>
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
        count={patients?.length}
        component="div"
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default PatientsTable;
