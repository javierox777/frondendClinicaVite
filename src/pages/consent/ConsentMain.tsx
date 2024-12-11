import { Grid } from '@mui/material';
import React, { useState } from 'react';
import HeaderBar from '../../componemts/HeaderBar';
import ConsentForm from './ConsentPage';
import ConsentmentTable from './ConsentmentTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Consentment } from '../../interfaces/Consentment';
import { useNavigate } from 'react-router-dom';

const ConsentMain = () => {
  const navigate = useNavigate();

  const [formOpen, setOpen] = useState(false);
  const [showConsentment, setShowConsentment] = useState<Consentment>();
  const [dataUpdated, setUpdated] = useState(false);

  const { data: consentments, isLoading: consentmentsLoading } = useQuery({
    queryKey: ['consentments', dataUpdated],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/consentments`);

      return response.data.body;
    },
  });

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderBar
            title="Consentimientos"
            buttonFn={() => setOpen(true)}
            button
            buttonTitle="nuevo consentimiento"
          />
        </Grid>

        <Grid item xs={12}>
          <ConsentmentTable consentments={consentments} />
        </Grid>
      </Grid>
      <ConsentForm
        open={formOpen}
        onClose={() => setOpen(false)}
        consentment={showConsentment}
        afterSubmit={() => {
          setUpdated(!dataUpdated);
        }}
      />
    </>
  );
};

export default ConsentMain;
