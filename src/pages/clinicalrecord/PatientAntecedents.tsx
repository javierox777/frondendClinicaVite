import React, { ChangeEvent, useState } from 'react';
import { Person } from '../../interfaces/Person';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import { List, Panel } from 'rsuite';
import { Delete } from '@mui/icons-material';
import AntecedentsForm from './AntecedentsForm';

interface Props {
  patient: Person;
}

interface Antecedent {
  _id: string;
  descripcion: string;
  detail?: string;
}

const badHabits = [
  { descripcion: 'Succión digital', id: 1 },
  { descripcion: 'Respirador bucal', id: 2 },
  { descripcion: 'Onicofagia', id: 3 },
  { descripcion: 'Succión chupete-mamadera', id: 4 },
  { descripcion: 'Deflución atípico', id: 5 },
];

const moribidAntecedents = [
  { descripcion: 'Diabetes', _id: 1 },
  { descripcion: 'Hipertensión', _id: 2 },
  { descripcion: 'Trastorno Coagulación', _id: 3 },
  { descripcion: 'Enfermedad inmunitaria', _id: 4 },
  { descripcion: 'Enfermedad Cardiorespiratoria', _id: 5 },
  { descripcion: 'Enfermedad Reumatologicas', _id: 6 },
  { descripcion: 'Paciente Oncológico', _id: 7 },
  { descripcion: 'Trastorno Psiquiátricos', _id: 8 },
  { descripcion: 'Trastorno Neurodegenerativos', _id: 9 },
  { descripcion: 'Trastorno Neurodivergentes', _id: 10 },
  { descripcion: 'Trastorno Neurológicos', _id: 11 },
  { descripcion: 'Trastornos Neurocognitivos', _id: 12 },
  { descripcion: 'Discapacidad física', _id: 13 },
  { descripcion: 'Discapacidad Auditiva', _id: 14 },
  { descripcion: 'Discapacidad visual', _id: 15 },
  { descripcion: 'Enfermedades Endocrinas', _id: 16 },
  { descripcion: 'Enfermedades Infecciosas', _id: 17 },
  { descripcion: 'Embarazo', _id: 18 },
  { descripcion: 'Cirugía', _id: 19 },
  { descripcion: 'Otro', _id: 20 },
];

const PatientAntecedents = ({ patient }: Props) => {
  const { mode } = useThemeContext();
  const [value, setValue] = useState(0);
  const [dataUpdated, setUpdated] = useState(false);

  const [antecedentType, setType] = useState<
    'morbid' | 'familiar' | 'allergy' | 'general' | 'habits'
  >('general');

  const [formOpen, setFormOpen] = useState(false);

  const { data: antecedents, isLoading } = useQuery({
    queryKey: ['antecedents', dataUpdated],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/antecedents/getantecedents/${patient._id}`
      );

      return response.data.body[0];
    },
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
              }}
            >
              <Typography variant="h6">Antecedentes</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              variant="fullWidth"
            >
              <Tab label="Generales" {...a11yProps(0)} />
              <Tab label="Familiares" {...a11yProps(1)} />
              <Tab label="Mórbidos" {...a11yProps(2)} />
              <Tab label="Alérgias" {...a11yProps(3)} />
              <Tab label="Hábitos" {...a11yProps(4)} />
            </Tabs>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <CustomTabPanel value={value} index={0}>
            <Button
              variant="contained"
              style={{ marginBlock: 15 }}
              onClick={() => {
                setType('general');
                setFormOpen(true);
              }}
            >
              Registrar antecedente
            </Button>
            {!antecedents && (
              <Typography>No se han registrado antecedentes</Typography>
            )}
            <List bordered>
              {antecedents &&
                antecedents.generales?.map((a: Antecedent) => {
                  if (a.descripcion === '') {
                    return null;
                  }
                  return (
                    <List.Item key={a._id} className="capitalize">
                      {a.descripcion.toLowerCase()}
                    </List.Item>
                  );
                })}
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <Button
              variant="contained"
              style={{ marginBlock: 15 }}
              onClick={() => {
                setType('familiar');
                setFormOpen(true);
              }}
            >
              Registrar antecedente
            </Button>
            {!antecedents && (
              <Typography>No se han registrado antecedentes</Typography>
            )}
            <List bordered>
              {antecedents &&
                antecedents.familiares?.map((a: Antecedent) => {
                  if (a.descripcion === '') {
                    return null;
                  }
                  return (
                    <List.Item key={a._id} className="capitalize">
                      {a.descripcion.toLowerCase()}
                    </List.Item>
                  );
                })}
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <Button
              variant="contained"
              style={{ marginBlock: 15 }}
              onClick={() => {
                setType('morbid');
                setFormOpen(true);
              }}
            >
              Registrar antecedente
            </Button>
            {!antecedents && (
              <Typography>No se han registrado antecedentes</Typography>
            )}
            <List bordered>
              {antecedents &&
                antecedents.morbidos?.map((a: Antecedent) => {
                  if (a.descripcion === '') {
                    return null;
                  }
                  return (
                    <List.Item key={a._id} className="capitalize">
                      <Typography>{a.descripcion.toLowerCase()}</Typography>
                      <Typography>{a.detail?.toLowerCase()}</Typography>
                    </List.Item>
                  );
                })}
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <Button
              variant="contained"
              style={{ marginBlock: 15 }}
              onClick={() => {
                setType('allergy');
                setFormOpen(true);
              }}
            >
              Registrar antecedente
            </Button>
            {!antecedents && (
              <Typography>No se han registrado antecedentes</Typography>
            )}
            <List bordered>
              {antecedents &&
                antecedents.alergias?.map((a: Antecedent) => {
                  if (a.descripcion === '') {
                    return null;
                  }
                  return (
                    <List.Item key={a._id} className="capitalize">
                      {a.descripcion.toLowerCase()}
                    </List.Item>
                  );
                })}
            </List>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={4}>
            <Button
              variant="contained"
              style={{ marginBlock: 15 }}
              onClick={() => {
                setType('habits');
                setFormOpen(true);
              }}
            >
              Registrar antecedente
            </Button>
            {!antecedents && (
              <Typography>No se han registrado antecedentes</Typography>
            )}
            <List bordered size="lg">
              {antecedents &&
                antecedents.habitos?.map((a: Antecedent) => {
                  if (a.descripcion === '') {
                    return null;
                  }
                  return (
                    <List.Item key={a._id} className="capitalize">
                      {a.descripcion.toLowerCase()}
                    </List.Item>
                  );
                })}
            </List>
          </CustomTabPanel>
        </Grid>
      </Grid>
      <AntecedentsForm
        open={formOpen}
        type={antecedentType}
        antecedents={antecedents}
        onClose={() => setFormOpen(false)}
        patient={patient}
        afterSubmit={() => setUpdated(!dataUpdated)}
      />
    </>
  );
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

export default PatientAntecedents;
