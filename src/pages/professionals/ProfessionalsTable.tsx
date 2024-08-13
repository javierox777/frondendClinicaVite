import {
  Button,
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
import React, { useState } from 'react';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import TableSkeleton from '../../componemts/TableSkeleton';
import { Professional } from '../../interfaces/Professional';
import { Edit, Search } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Props {
  refetch?: boolean;
}

const ProfessionalsTable = ({ refetch }: Props) => {
  const { mode } = useThemeContext();
  const navigation = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');

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
      label: 'Email',
      hide: true,
    },
    {
      id: 4,
      label: 'Celular',
      hide: true,
    },
    {
      id: 5,
      label: 'Acciones',
    },
  ];

  const { data: professionals, isLoading } = useQuery({
    queryKey: ['professionals', refetch],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/professionals`
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

  const filteredPatients = professionals?.filter((p: Professional) => {
    const rut = p.rut.toLowerCase();
    const email = p.email.toLowerCase();
    const phone = p.celular.toLowerCase();
    const name = `${p.nombre1} ${p.apellPat}`.toLowerCase();
    return (
      rut.includes(searchText.toLowerCase()) ||
      email.includes(searchText.toLowerCase()) ||
      phone.includes(searchText.toLowerCase()) ||
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
              .map((p: Professional) => {
                return (
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
                    <TableCell>{p.rut}</TableCell>
                    <TableCell>{p.email}</TableCell>
                    <TableCell>{p.celular}</TableCell>
                    <TableCell>
                      <IconButton
                        color="success"
                        onClick={() =>
                          navigation('/editarprofesional', {
                            state: { professional: p },
                          })
                        }
                      >
                        <Edit />
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
        count={professionals?.length}
        component="div"
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default ProfessionalsTable;
