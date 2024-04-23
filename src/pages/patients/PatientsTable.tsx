import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';

const PatientsTable = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { mode } = useThemeContext();

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
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
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
            {patients
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((p: Person, index: number) => {
                return (
                  <TableRow
                    key={p.id}
                    className={`${index % 2 === 0 && mode === 'light' ? 'bg-slate-100' : 'white'}`}
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
