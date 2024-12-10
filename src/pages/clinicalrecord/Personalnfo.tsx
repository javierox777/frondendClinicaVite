import {
  AppBar,
  Box,
  Divider,
  Grid,
  LinearProgress,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Toolbar,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { Address } from '../../interfaces/Address';
import { Contact } from '../../interfaces/Contact';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';
import { useState } from 'react';
import { IAntecedent } from '../../interfaces/Antecedents';
import HeaderBar from '../../componemts/HeaderBar';

interface Props {
  patient: Person;
}

const Personalnfo = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const [tab, setTab] = useState(0);

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/contact-book/getcontacts/${patient._id}`
      );

      return response.data.body;
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-book/getaddresses/${patient._id}`
      );

      return response.data.body;
    },
  });

  const validContacts = contacts?.filter((c: any) => c.vigente === '1');

  const validAddresses = addresses?.filter((a: any) => a.vigente === '1');

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
            <HeaderBar title="Libreta de contactos" />
            <Grid container spacing={1}>
              {!validContacts && (
                <Box sx={{ width: '40%', marginTop: 5 }}>
                  <LinearProgress />
                </Box>
              )}
              {validContacts && (
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
                      <TableRow
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
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
                          Tipo de contacto
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: 'bold',
                            color:
                              mode === 'light'
                                ? colors.lightModeTableText
                                : 'white',
                          }}
                        >
                          Descripción
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {validContacts.map((c: Contact) => {
                        return (
                          <TableRow key={c._id}>
                            <TableCell>{c.contacto.nombre}</TableCell>
                            <TableCell>{c.descripcion}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} className="p-2">
            <HeaderBar title="Libreta de direcciones" />
            <Grid container spacing={1}>
              {!validAddresses && (
                <Box sx={{ width: '40%', marginTop: 5 }}>
                  <LinearProgress />
                </Box>
              )}
              {validAddresses && (
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
                      <TableRow
                        style={{
                          fontWeight: 'bold',
                          color:
                            mode === 'light'
                              ? colors.lightModeTableText
                              : 'white',
                        }}
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
                          Tipo de dirección
                        </TableCell>
                        <TableCell
                          style={{
                            fontWeight: 'bold',
                            color:
                              mode === 'light'
                                ? colors.lightModeTableText
                                : 'white',
                          }}
                        >
                          Descripción
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {validAddresses.map((a: Address) => {
                        return (
                          <TableRow key={a._id}>
                            <TableCell>{a.tipoDireccion.nombre}</TableCell>
                            <TableCell>{a.nombre}</TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Personalnfo;
