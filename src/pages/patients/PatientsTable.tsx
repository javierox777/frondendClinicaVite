import { Edit, Search } from '@mui/icons-material';
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
import TableSkeleton from '../../componemts/TableSkeleton';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  LabelList,
  Legend,
} from 'recharts';

interface Props {
  refetch?: boolean;
}

const PatientsTable = ({ refetch }: Props) => {
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

  if (isLoading) return <TableSkeleton />;

  // Preparar datos para el gráfico
  const chartData = patients?.map((p: Person) => ({
    name: `${p.nombre1} ${p.apellPat}`,
    edad: new Date().getFullYear() - new Date(p.fechaNac).getFullYear(),
  }));

  // Contar número de pacientes por rango de edad
  const ageGroups = [
    { name: '0-20', value: 0 },
    { name: '21-40', value: 0 },
    { name: '41-60', value: 0 },
    { name: '61+', value: 0 },
  ];

  chartData?.forEach(({ edad }:{edad:any}) => {
    if (edad <= 20) ageGroups[0].value++;
    else if (edad <= 40) ageGroups[1].value++;
    else if (edad <= 60) ageGroups[2].value++;
    else ageGroups[3].value++;
  });

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
                  {['Nombre', 'Rut', 'Institución', 'Acciones'].map((label, index) => (
                    <TableCell key={index} style={{ fontWeight: 'bold', color: mode === 'light' ? colors.lightModeTableText : 'white' }}>
                      {label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredPatients
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((p: Person) => (
                    <TableRow key={p._id}>
                      <TableCell style={{ fontWeight: 'bold', color: mode === 'light' ? colors.lightModeTableText : 'white' }}>
                        {p.nombre1} {p.apellPat}
                      </TableCell>
                      <TableCell>{p.rut}</TableCell>
                      <TableCell>{p.institucion.nombre}</TableCell>
                      <TableCell>
                        <IconButton
                          color="success"
                          onClick={() => navigation('/editarpaciente', { state: { patient: p } })}
                        >
                          <Edit />
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
