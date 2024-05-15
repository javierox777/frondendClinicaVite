import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BudgetForm from './BudgetForm';

const EditBudgetPage = () => {
  const navigation = useNavigate();
  const params = useLocation();
  const [open, setOpen] = useState(true);

  const budget = params.state.budget;

  return (
    <BudgetForm
      open={open}
      onClose={() => {
        navigation('/presupuestos');
      }}
      budget={budget}
    />
  );
};

export default EditBudgetPage;
