import { useLocation } from 'react-router-dom';
import BudgetDetails from './BudgetDetails';

const BudgetDetailsPage = () => {
  const params = useLocation();

  const budget = params.state.budget;

  return <BudgetDetails budget={budget} />;
};

export default BudgetDetailsPage;
