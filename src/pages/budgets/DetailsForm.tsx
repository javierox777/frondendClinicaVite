import { AttachMoney, Close, Delete, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { useThemeContext } from '../../componemts/themeContext';
import { BudgetDetail } from '../../interfaces/BudgetDetail';
import { ServiceInterface } from '../../interfaces/ServiceInterface';
import { ShortModel } from '../../interfaces/ShortModel';
import colors from '../../styles/colors';
import { LoggedUser, useUser } from '../../auth/userContext';
import toast, { Toaster } from 'react-hot-toast';
import { generalConfig } from '../../config';
import axios from 'axios';

interface Props {
  budgetDetails: any[];
  setDetails: Dispatch<SetStateAction<any>>;
  objects: ShortModel[];
  services: ServiceInterface[];
}

const DetailsForm = ({
  budgetDetails,
  setDetails,
  objects,
  services,
}: Props) => {
  const { mode } = useThemeContext();
  const { user } = useUser();
  const [editPrice, setEdit] = useState(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [detailToDelete, setDetailToDelete] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const handleAddRow = () => {
    setDetails([
      ...budgetDetails,
      {
        _id: (Math.random() * 1000).toString(),
        presupuesto: '',
        objeto: '',
        // valorTotalNeto: 0,
        // valorUniNeto: 0,
        // valorTotalIva: 0,
        // valorUniIva: 0,
        valor: 0,
        prestacion: '',
        cantidad: 1,
        pagado: false,
        new: true,
      },
    ]);
  };

  const handleStringValuechange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'objeto' | 'prestacion'
  ) => {
    const updatedDetails = [...budgetDetails];
    updatedDetails[rowIndex][field] = e.target.value;

    if (field === 'prestacion') {
      const service = services.filter(
        (s: ServiceInterface) => s._id === e.target.value
      );

      updatedDetails[rowIndex].prestacion = service[0];
      updatedDetails[rowIndex].valor = service[0].valor;
      // updatedDetails[rowIndex].valorTotalNeto = service[0].precioUniNeto;
      // updatedDetails[rowIndex].valorUniIva = service[0].precioUniIva;
      // updatedDetails[rowIndex].valorTotalIva = service[0].precioUniIva;
    }
    if (field === 'objeto') {
      const object = objects.filter(
        (o: ShortModel) => o._id === e.target.value
      );

      updatedDetails[rowIndex].objeto = object[0];

      // updatedDetails[rowIndex].valorTotalNeto = service[0].precioUniNeto;
      // updatedDetails[rowIndex].valorUniIva = service[0].precioUniIva;
      // updatedDetails[rowIndex].valorTotalIva = service[0].precioUniIva;
    }

    setDetails(updatedDetails);
  };

  const handlePriceChange = (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>,
    rowIndex: number,
    field: 'valor'
  ) => {
    const inputValue = e.target.value;

    const newValue =
      inputValue === '0' || (!isNaN(Number(inputValue)) && inputValue !== '')
        ? String(Number(inputValue))
        : '0';

    const updatedDetails = [...budgetDetails];
    updatedDetails[rowIndex][field] = parseInt(newValue);

    setDetails(updatedDetails);
  };

  useEffect(() => {
    if ((user as LoggedUser).role === 'admin') {
      setEdit(true);
    }
  }, []);

  const handleDeleteDetail = async (id: string) => {
    setSubmitting(true);
    try {
      const response = await axios.delete(
        `${generalConfig.baseUrl}/budget-details/${id}`
      );

      if (response.data.message === 'success') {
        setSubmitting(false);
        toast.success('Detalle eliminado');
        setOpenDeleteDialog(false);
        const filtered = budgetDetails.filter(
          (d: BudgetDetail) => d._id !== id
        );
        setDetails(filtered);
      }
    } catch (error) {
      setSubmitting(false);
      toast.error('Error al eliminar detalle');
    }
  };
  return (
    <>
      <Card elevation={3} sx={{ padding: 3 }}>
        <Grid container spacing={1}>
          {budgetDetails.length === 0 && (
            <Grid item xs={12}>
              <Typography sx={{ color: colors.ligthModeSoftText }}>
                Haz click en el icono para agregar detalle
              </Typography>
            </Grid>
          )}
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
                  <TableCell align="center"></TableCell>
                  <TableCell align="center">Descripción</TableCell>
                  <TableCell align="center">Prestación</TableCell>
                  <TableCell align="center">Valor</TableCell>
                  <TableCell align="center">Pagado</TableCell>
                  <TableCell align="center">Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {budgetDetails?.map((b: BudgetDetail, index: number) => (
                  <TableRow key={b._id}>
                    <TableCell align="center">
                      <IconButton
                        style={{
                          backgroundColor:
                            mode === 'light'
                              ? colors.lightModeTableHead
                              : colors.darkModeTableHead,
                        }}
                        onClick={() => {
                          const filtered = budgetDetails.filter(
                            (d: BudgetDetail) => d._id !== b._id
                          );
                          setDetails(filtered);
                        }}
                      >
                        <Remove />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl fullWidth>
                        <Select
                          value={b.objeto?._id}
                          required
                          onChange={(e: SelectChangeEvent<string>) =>
                            handleStringValuechange(e, index, 'objeto')
                          }
                        >
                          {objects?.map((o: ShortModel) => (
                            <MenuItem key={o._id} value={o._id}>
                              {o.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      <FormControl fullWidth>
                        <Select
                          value={b.prestacion._id}
                          required
                          onChange={(e: SelectChangeEvent<string>) =>
                            handleStringValuechange(e, index, 'prestacion')
                          }
                        >
                          {services?.map((s: ServiceInterface) => (
                            <MenuItem key={s._id} value={s._id}>
                              {s.nombre}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                    </TableCell>
                    <TableCell align="center">
                      {services?.map((s: ServiceInterface) => {
                        if (
                          (typeof b.prestacion !== 'string' &&
                            s._id === b.prestacion._id) ||
                          (typeof b.prestacion === 'string' &&
                            s._id === b.prestacion)
                        ) {
                          return (
                            <TextField
                              fullWidth
                              key={s._id}
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                                handlePriceChange(e, index, 'valor');
                              }}
                              value={b.valor}
                              InputLabelProps={{ shrink: true }}
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    <AttachMoney />
                                  </InputAdornment>
                                ),
                              }}
                              disabled={!editPrice}
                            />
                          );
                        }
                      })}
                    </TableCell>
                    <TableCell align="center">
                      <Checkbox
                        color="success"
                        checked={b.pagado}
                        onClick={() => {
                          const updatedDetails = [...budgetDetails];
                          budgetDetails[index].pagado =
                            !budgetDetails[index].pagado;
                          setDetails(updatedDetails);
                        }}
                        disabled={!editPrice}
                      />
                    </TableCell>
                    <TableCell align="center">
                      {!b.new && (
                        <IconButton
                          onClick={() => {
                            setOpenDeleteDialog(true);
                            setDetailToDelete(b._id);
                          }}
                        >
                          <Delete />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddRow}>
              Agregar detalle
            </Button>
          </Grid>
        </Grid>
      </Card>
      <Dialog open={openDeleteDialog}>
        <DialogTitle>¿Eliminar Detalle?</DialogTitle>
        <DialogContent>
          Detalle de presupuesto será eliminado y no se podrá recuperar ¿Desea
          continuar?
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="error"
            disabled={submitting}
            onClick={() => {
              handleDeleteDetail(detailToDelete);
            }}
          >
            Eliminar
          </Button>
          <Button
            variant="contained"
            color="inherit"
            onClick={() => {
              setOpenDeleteDialog(false);
            }}
          >
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
      <Toaster />
    </>
  );
};

export default DetailsForm;
