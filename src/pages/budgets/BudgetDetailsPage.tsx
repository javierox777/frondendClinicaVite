import React from 'react';
import BudgetDetails from './BudgetDetails';
import { useLocation } from 'react-router-dom';

const BudgetDetailsPage = () => {
  const params = useLocation();

  const budget = params.state.budget;

  return <BudgetDetails budget={budget} />;
};

export default BudgetDetailsPage;
