import React, { useState } from 'react';
import EvolutionForm from './EvolutionForm';
import { useLocation, useNavigate } from 'react-router-dom';

const EvolutionFormPage = () => {
  const [openForm, setOpenForm] = useState(true);
  const patient = useLocation().state.patient;

  return (
    <>
      <EvolutionForm
        open={openForm}
        onClose={() => setOpenForm(false)}
        patient={patient}
        fullScreen
      />
    </>
  );
};

export default EvolutionFormPage;
