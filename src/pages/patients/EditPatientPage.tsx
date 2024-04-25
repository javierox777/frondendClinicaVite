import React, { useState } from 'react';
import PatientForm from './PatientForm';
import { useLocation, useNavigate } from 'react-router-dom';

const EditPatientPage = () => {
  const navigation = useNavigate();
  const params = useLocation();
  const [open, setOpen] = useState(true);

  const patient = params.state.patient;

  return (
    <PatientForm
      open={open}
      onClose={() => {
        navigation('/pacientes');
      }}
      patient={patient}
    />
  );
};

export default EditPatientPage;
