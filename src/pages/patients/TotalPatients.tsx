import { People } from '@mui/icons-material';
import { Card, Container, Grid, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import colors from '../../styles/colors';

const TotalPatients = () => {
  const { mode } = useThemeContext();

  const { data: patients } = useQuery({
    queryKey: ['patients'],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/persons`);

      return response.data.body;
    },
  });

  return (
    <Card style={{ padding: 20 }} elevation={3}>
      <Grid container spacing={4} alignItems="center">
        <Grid item>
          <Container
            style={{
              backgroundColor: 'teal',
              borderRadius: '30%',
              padding: 10,
            }}
          >
            <People sx={{ color: colors.darkModeSoftText }} />
          </Container>
        </Grid>
        <Grid item display="flex" gap={1} alignItems="center">
          <Typography
            style={{
              fontWeight: 'bold',
              fontSize: 23,
              color:
                mode === 'light'
                  ? colors.lightModeHeadingGrey
                  : colors.darkModeHeadingWhite,
            }}
          >
            {patients?.length}
          </Typography>
          <Typography
            style={{
              color:
                mode === 'light'
                  ? colors.ligthModeSoftText
                  : colors.darkModeSoftText,
            }}
          >
            {' '}
            Pacientes registrados
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
};

export default TotalPatients;
