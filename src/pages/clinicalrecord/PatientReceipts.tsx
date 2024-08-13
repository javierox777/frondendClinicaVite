import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import { generalConfig } from '../../config';
import { Person } from '../../interfaces/Person';
import { Grid } from '@mui/material';

interface Props {
  patient: Person;
}
const PatientReceipts = ({ patient }: Props) => {
  const { data: receipts, isFetching } = useQuery({
    queryKey: ['receipts'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/receipt/getpatientreceipts/${patient._id}`
      );

      return response.data.body;
    },
  });

  return (
    <Grid container>
      <div>{receipts?.length}</div>
    </Grid>
  );
};

export default PatientReceipts;
