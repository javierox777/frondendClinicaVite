import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { generalConfig } from '../../config';

export const useEstado = () => {
  return useQuery({
    queryKey: ['estado'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/statuses`);
      return response.data.body;
    },
  });
};

export const useCompanies= () => {
  return useQuery({
    queryKey: ['companies'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/companies`);
      return response.data.body;
    },
  });
};

export const usePaciente = () => {
  return useQuery({
    queryKey: ['paciente'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);
      return response.data.body;
    },
  });
};

export const useProfesional = () => {
  return useQuery({
    queryKey: ['profesional'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/professionals`);
      return response.data.body;
    },
  });
};

