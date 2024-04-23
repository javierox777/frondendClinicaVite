import { Card, Grid } from '@mui/material';
import PatientsTable from './PatientsTable';

const PatientsPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card>
          <PatientsTable />
        </Card>
      </Grid>
      <Grid item>
        <div>otra cosa</div>
      </Grid>
      <Grid item>
        <div>otra cosa</div>
      </Grid>
      <Grid item>
        <div>otra cosa</div>
      </Grid>
      <Grid item>
        <div>otra cosa</div>
      </Grid>
    </Grid>
  );
};

export default PatientsPage;
