import React, { useState } from 'react';
import ProfessionalForm from './ProfessionalForm';
import { useNavigate, useLocation } from 'react-router-dom';

const EditProfessionalPage = () => {
  const navigation = useNavigate();
  const params = useLocation();
  const [open, setOpen] = useState(true);

  const professional = params.state.professional;

  return (
    <ProfessionalForm
      open={open}
      onClose={() => {
        navigation('/profesionales');
      }}
      professional={professional}
      edit
    />
  );
};

export default EditProfessionalPage;
