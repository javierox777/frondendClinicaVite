import {
  Box,
  Button,
  Card,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { BudgetDetail } from '../../interfaces/BudgetDetail';
import { ShortModel } from '../../interfaces/ShortModel';
import { ServiceInterface } from '../../interfaces/ServiceInterface';
import { AddCircle, AttachMoney, Close, Money } from '@mui/icons-material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';

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

      updatedDetails[rowIndex].valor = service[0].valor;
      // updatedDetails[rowIndex].valorTotalNeto = service[0].precioUniNeto;
      // updatedDetails[rowIndex].valorUniIva = service[0].precioUniIva;
      // updatedDetails[rowIndex].valorTotalIva = service[0].precioUniIva;
    }

    console.log(updatedDetails);

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

  return (
    <Card elevation={3} sx={{ padding: 3 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: 20,
              fontWeight: 'lighter',
              paddingTop: 2,
            }}
          >
            DETALLES DE PRESUPUESTO
          </Typography>
          <IconButton color="primary" onClick={handleAddRow}>
            <AddCircle />
          </IconButton>
        </Grid>
        {budgetDetails.length === 0 && (
          <Grid item xs={12}>
            <Typography sx={{ color: colors.ligthModeSoftText }}>
              Haz click en el icono para agregar detalle
            </Typography>
          </Grid>
        )}
        <Grid item xs={12}>
          <Grid
            container
            sx={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeTableHead
                  : colors.darkModeTableHead,
            }}
          >
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Descripción</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Prestación</Typography>
            </Grid>
            {/* <Grid item xs={2}>
              <Typography sx={{ fontWeight: 'bold' }}>
                Valor unitario NETO
              </Typography>
            </Grid> */}
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Valor</Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography sx={{ fontWeight: 'bold' }}>Acciones</Typography>
            </Grid>
          </Grid>
        </Grid>
        {budgetDetails.map((b: BudgetDetail, index: number) => {
          return (
            <Grid item xs={12} key={b._id}>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="budget-type-label">Descripción</InputLabel> */}
                    <Select
                      value={b.objeto?._id}
                      required
                      // label="budget-types"
                      id="budget-type-select"
                      labelId="budget-type-label"
                      onChange={(e: SelectChangeEvent<string>) =>
                        handleStringValuechange(e, index, 'objeto')
                      }
                      // value={}
                    >
                      {objects?.map((o: ShortModel) => {
                        return (
                          <MenuItem key={o._id} value={o._id}>
                            {o.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={3} xl={3}>
                  <FormControl fullWidth>
                    {/* <InputLabel id="service-type-label">Prestación</InputLabel> */}
                    <Select
                      value={b.prestacion._id}
                      required
                      // label="service-types"
                      id="service-type-select"
                      labelId="service-type-label"
                      onChange={(e: SelectChangeEvent<string>) =>
                        handleStringValuechange(e, index, 'prestacion')
                      }
                      // value={}
                    >
                      {services?.map((s: ServiceInterface) => {
                        return (
                          <MenuItem key={s._id} value={s._id}>
                            {s.nombre}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
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
                          // label="valor unitario NETO"
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
                        />
                      );
                    }
                  })}
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12} lg={2} xl={2}>
                  {services?.map((s: ServiceInterface) => {
                    if (
                      (typeof b.prestacion !== 'string' &&
                        s._id === b.prestacion._id) ||
                      (typeof b.prestacion === 'string' &&
                        s._id === b.prestacion)
                    ) {
                      return (
                        <TextField
                          // label="valor unitario IVA"
                          fullWidth
                          onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            handlePriceChange(e, index, 'valorUniIva');
                          }}
                          key={s._id}
                          value={b.valorUniIva}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoney />
                              </InputAdornment>
                            ),
                          }}
                        />
                      );
                    }
                  })}
                </Grid> */}
                <Grid item xs={2} display="flex" justifyContent="end">
                  <Box>
                    <IconButton
                      onClick={() => {
                        const filtered = budgetDetails.filter(
                          (d: BudgetDetail) => d._id !== b._id
                        );
                        setDetails(filtered);
                      }}
                    >
                      <Close />
                    </IconButton>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Grid>
    </Card>
  );
};

export default DetailsForm;
