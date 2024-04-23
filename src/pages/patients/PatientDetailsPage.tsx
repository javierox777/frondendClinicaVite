import React from 'react';
import { useLocation } from 'react-router-dom';

const PatientDetailsPage = () => {
  const location = useLocation();

  const patient = location.state.patient;

  return <div>{patient.nombre1}</div>;
};

export default PatientDetailsPage;
