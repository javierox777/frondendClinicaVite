import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  Switch,
  IconButton,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  FormControlLabel,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icono de expansión
import { Routes, Route, Link } from 'react-router-dom';
import Inicio from '../../pages/home';
import { useThemeContext } from '../../componemts/themeContext';
import { ParticlesContainer } from './ParticlesFire';
import { AssignmentInd, ContactEmergency } from '@mui/icons-material';
import PatientsPage from '../../pages/patients/PatientsPage';
import InstitutionForm from '../../pages/institucion/InstitutionForm';
import PatientDetailsPage from '../../pages/patients/PatientDetailsPage';
import EditPatientPage from '../../pages/patients/EditPatientPage';
import Sexo from '../../pages/sexo/SexoForm';
import AtencionTipo from '../../pages/atencionTipo/AtencionTipo';
import Ciudad from '../../pages/ciudad/CityTable';
import Contacto from '../../pages/contacto/Contacto';
import Estado from '../../pages/estado/Estado';
import Mensaje from '../../pages/mensaje/Mensaje';
import PresupuestoTipo from '../../pages/presupuestoTipo/PresupuestoTipo';
import Solicitario from '../../pages/solicitarioTipo/SolicitarioTipo';
import TipoDireccion from '../../pages/tipoDireccion/TipoDireccion';
import ProfessionalsPage from '../../pages/professionals/ProfessionalsPage';
import EditProfessionalPage from '../../pages/professionals/EditProfessionalPage';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <ParticlesContainer />
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
          backgroundColor: mode === 'light' ? 'dark' : 'AppWorkspace',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ marginRight: 2, ...(drawerOpen && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="configuración"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
          >
            <SettingsIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={open}
            onClose={handleClose}
          >
            <MenuItem>
              <FormControlLabel
                control={<Switch onChange={toggleColorMode} />}
                label={`Modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
                labelPlacement="start"
              />
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            background: 'transparent 20%', // Establecer el fondo del Drawer como transparente
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Menu items */}
            {['Inicio', 'Pacientes', 'Profesionales', 'Ingreso'].map(
              (text, index) => (
                <ListItem
                  button
                  key={text}
                  component={Link}
                  to={`/${text.toLowerCase()}`}
                >
                  <ListItemIcon>
                    {index === 0 ? (
                      <HomeIcon />
                    ) : index === 1 ? (
                      <AssignmentInd />
                    ) : index === 2 ? (
                      <ContactEmergency />
                    ) : (
                      <PeopleIcon />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItem>
              )
            )}
            {/* Submenu */}
            <Accordion>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary="Configuraciones" />
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {[
                    'Sexo',
                    'Atencion',
                    'Ciudad',
                    'Contacto',
                    'Estado',
                    'Mensaje',
                    'Presupuesto',
                    'Solicitario',
                    'Direccion',
                  ].map((text, index) => (
                    <ListItem
                      button
                      key={text}
                      component={Link}
                      to={`/${text.toLowerCase()}`}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={text} />
                    </ListItem>
                  ))}
                </List>
              </AccordionDetails>
            </Accordion>
          </List>
          <Divider />
        </Box>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: 'background.default',
          p: 3,
        }}
      >
       <Box
  component="main"
  sx={{
    flexGrow: 1,
    bgcolor: 'background.default',
    p: 3,
    transition: 'margin-left 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
    marginLeft: drawerOpen ? '240px' : '0px', // Ajusta el margen izquierdo según si el Drawer está abierto o cerrado
  }}
>
  <Toolbar />
  <Routes>
    <Route path="/inicio" element={<Inicio />} />
    <Route path="/pacientes" element={<PatientsPage />} />
    <Route path="/ingreso" element={<InstitutionForm />} />
    <Route path="/sexo" element={<Sexo />} />
    <Route path="/atencion" element={<AtencionTipo />} />
    <Route path="/ciudad" element={<Ciudad />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/estado" element={<Estado />} />
    <Route path="/mensaje" element={<Mensaje />} />
    <Route path="/presupuesto" element={<PresupuestoTipo />} />
    <Route path="/solicitario" element={<Solicitario />} />
    <Route path="/direccion" element={<TipoDireccion />} />
    <Route path="/detallespaciente" element={<PatientDetailsPage />} />
    <Route path="/editarpaciente" element={<EditPatientPage />} />
    <Route path="/profesionales" element={<ProfessionalsPage />} />
    <Route path="/editarprofesional" element={<EditProfessionalPage />} />
  </Routes>
</Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
