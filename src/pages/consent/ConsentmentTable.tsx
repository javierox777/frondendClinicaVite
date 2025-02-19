import React, { useState } from 'react';
import { Consentment } from '../../interfaces/Consentment';
import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
} from '@mui/material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import { Person } from '../../interfaces/Person';
import { format } from 'date-fns';
import { Edit, PictureAsPdf, Search } from '@mui/icons-material';
import { formatRut } from '../../helpers/formatRut';
import ConsentForm from './ConsentPage';
import { useNavigate } from 'react-router-dom';
import TableSkeleton from '../../componemts/TableSkeleton';

interface Props {
  consentments: Consentment[];
  onDownloadPDF?: (consentment: Consentment) => void; // Prop para manejar la descarga del PDF
}

const ConsentmentTable = ({ consentments, onDownloadPDF }: Props) => {
  const { mode } = useThemeContext();
  const navigation = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState('');

  const filteredConsentments = consentments?.filter((c: Consentment) => {
    if (!c.persona) return false;
    const rut = (c.persona as Person)?.rut.toLowerCase();
    const name = `${(c.persona as Person)?.nombre1} ${(c.persona as Person)?.apellPat}`.toLowerCase();
    const date = format(new Date(c.fechaRegistro), 'yyyy/MM/dd');
    return (
      rut.includes(searchText.toLowerCase()) ||
      name.includes(searchText.toLowerCase()) ||
      date.includes(searchText.toLowerCase())
    );
  });

  if (!consentments) return <TableSkeleton />;

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
      <TableContainer>
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
              {['Paciente', 'Rut', 'Fecha Registro', 'Acciones'].map((label, index) => (
                <TableCell
                  key={index}
                  style={{
                    fontWeight: 'bold',
                    color: mode === 'light' ? colors.lightModeTableText : 'white',
                  }}
                >
                  {label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredConsentments &&
              filteredConsentments
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((c: Consentment) => (
                  <TableRow key={c._id}>
                    <TableCell>
                      {(c.persona as Person).nombre1} {(c.persona as Person).apellPat}
                    </TableCell>
                    <TableCell>
                      {formatRut((c.persona as Person).rut)}-{(c.persona as Person).dv}
                    </TableCell>
                    <TableCell>
                      {format(new Date(c.fechaRegistro), 'yyyy/MM/dd')}
                    </TableCell>
                    <TableCell>
                      <IconButton onClick={() => onDownloadPDF?.(c)}>
                        <PictureAsPdf color="primary" />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          navigation('/editarconsentimiento', {
                            state: {
                              consentment: c,
                            },
                          });
                        }}
                      >
                        <Edit color="success" />
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
        count={consentments?.length}
        component="div"
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </>
  );
};

export default ConsentmentTable;
