import { Delete, Edit } from '@mui/icons-material'; // Importa los iconos de Material-UI
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import City from './Ciudad';

const CiudadTable = () => {
  // Mock de ciudades
  const [showForm, setShowForm] = useState(true);

  const ciudadesMock = [
    {
      id: '1',
      nombre: 'Ciudad A',
      vigente: '1',
      libretaDireccion: [
        { nombre: 'Dirección 1', direccion: 'Calle 123', ciudad: 'Ciudad A' },
        { nombre: 'Dirección 2', direccion: 'Avenida 456', ciudad: 'Ciudad A' },
      ],
    },
    {
      id: '2',
      nombre: 'Ciudad B',
      vigente: '1',
      libretaDireccion: [
        { nombre: 'Dirección 3', direccion: 'Calle 789', ciudad: 'Ciudad B' },
        { nombre: 'Dirección 4', direccion: 'Avenida 012', ciudad: 'Ciudad B' },
      ],
    },
  ];

  const handleOpenForm = () => {
    setShowForm(true);
  };

  return (
    <>
      {showForm && <City />}
      <div style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 600, marginTop: '5%' }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Vigente</TableCell>
              <TableCell>Opciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ciudadesMock.map((ciudad) => (
              <TableRow key={ciudad.id}>
                <TableCell>{ciudad.id}</TableCell>
                <TableCell>{ciudad.nombre}</TableCell>
                <TableCell>{ciudad.vigente}</TableCell>
                <TableCell>
                  <IconButton onClick={handleOpenForm}>
                    {' '}
                    {/* Agrega un botón de edición */}
                    <Edit />
                  </IconButton>
                  <IconButton>
                    {' '}
                    {/* Agrega un botón de eliminación */}
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default CiudadTable;
