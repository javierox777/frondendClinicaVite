import React, { useState } from 'react';
import ConsentForm from './ConsentPage';
import { useLocation, useNavigate } from 'react-router-dom';

const EditConsentPage = () => {
  const [open, setOpen] = useState(true);
  const navigation = useNavigate();
  const params = useLocation();

  const consentment = params.state.consentment;
  return (
    <ConsentForm
      open={open}
      onClose={() => {
        navigation('/consentimiento');
      }}
      consentment={consentment}
    />
  );
};

export default EditConsentPage;
