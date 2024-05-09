import {
  Box,
  Button,
  FormControl,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useState } from 'react';
import { generalConfig } from '../../config';
import { Search } from '@mui/icons-material';
import BudgetVisualizer from './BudgetVisualizer';

const BudgetSearcher = () => {
  const [searchText, setSearchText] = useState('');

  const [selectedOptions, setOptions] = useState([]);

  const { data: budgets } = useQuery({
    queryKey: ['budgets'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/budgets`);

      return response.data.body;
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filteredBudgets = budgets.filter((b: any) => {
      const personRut = b.persona.rut;
      return personRut === searchText.trim();
    });

    setOptions(filteredBudgets);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography>
            Ingresa RUT de paciente para buscar presupuestos
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth>
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
                required
              />
            </FormControl>
            <FormControl>
              <Button variant="contained" type="submit">
                Buscar
              </Button>
            </FormControl>
          </form>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <BudgetVisualizer budgets={selectedOptions} />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default BudgetSearcher;
