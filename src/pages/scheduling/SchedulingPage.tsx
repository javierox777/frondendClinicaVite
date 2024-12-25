import {
  Grid,
} from '@mui/material';
import { useState } from 'react';
import ScheduleForm from './ScheduleForm';
import ScheduleTable from './ScheduleTable';
import HeaderBar from '../../componemts/HeaderBar';

const SchedulingPage = () => {
  const [openForm, setNewForm] = useState<boolean>(false);
  const [refetch, setRefetch] = useState<boolean>(false);
  // const navigation = useNavigate();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderBar
            buttonFn={() => setNewForm(true)}
            title="Programacion de agenda"
            button
            buttonTitle="Crear agenda"
          />
        </Grid>
        <Grid item xs={12}>
          <ScheduleTable
            refetch={refetch}
            refetchFn={() => setRefetch(!refetch)}
          />
        </Grid>
      </Grid>
      <ScheduleForm
        open={openForm}
        onClose={() => setNewForm(false)}
        refetch={() => setRefetch(!refetch)}
      />
    </>
  );
};

export default SchedulingPage;
