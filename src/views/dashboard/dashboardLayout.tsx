import React, { useState, useEffect } from 'react';
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
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // Icono de expansión
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Inicio from '../../pages/home';
import { useThemeContext } from '../../componemts/themeContext';
import { ParticlesContainer } from './ParticlesFire'; // Asegúrate de importar correctamente
import {
  AssignmentInd,
  AssignmentLate,
  AssignmentReturn,
  CalendarMonth,
  ContactEmergency,
  EditCalendar,
  Receipt,
  RequestQuote,
} from '@mui/icons-material';

import DescriptionIcon from '@mui/icons-material/Description';

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
import BudgetsPage from '../../pages/budgets/BudgetsPage';
import BudgetDetailsPage from '../../pages/budgets/BudgetDetailsPage';
import EditBudgetPage from '../../pages/budgets/EditBudgetPage';
import authStorage from '../../auth/storage';
import { LoggedUser, UserContext, useUser } from '../../auth/userContext';
import Receta from '../../pages/receta/RecetaTable';
import BudgetPDF from '../../pages/budgets/BudgetPDF';
import AppointmentsPage from '../../pages/appointments/AppointmentsPage';
import AppointmentsCalendar from '../../pages/appointments/AppointmentsCalendar';
import SchedulingPage from '../../pages/scheduling/SchedulingPage';
import AppointmentDetail from '../../pages/appointments/AppointmentDetail';
import AttentionPage from '../../pages/attention/AttentionPage';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true); // Estado para controlar las partículas
  const open = Boolean(anchorEl);
  const { user, setUser } = useUser();
  const location = useLocation();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  const restoreUser = async () => {
    const user = await authStorage.getUser();
    if (user) setUser(user);
    return;
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const menuItems = [
    { id: 1, label: 'Inicio', icon: <HomeIcon />, path: '/inicio' },
    { id: 2, label: 'Pacientes', icon: <AssignmentInd />, path: '/pacientes' },
    {
      id: 3,
      label: 'Profesionales',
      icon: <ContactEmergency />,
      path: '/profesionales',
    },
    {
      id: 4,
      label: 'Presupuestos',
      icon: <RequestQuote />,
      path: '/presupuestos',
    },
    { id: 5, label: 'Agenda', icon: <CalendarMonth />, path: '/agenda' },
    {
      id: 7,
      label: 'Programación',
      icon: <EditCalendar />,
      path: '/programacion',
    },
    { id: 6, label: 'Receta', icon: <RequestQuote />, path: '/receta' },
    {
      id: 8,
      label: 'Consentimiento',
      icon: <DescriptionIcon />,
      path: '/consentimiento',
    },
    {
      id: 9,
      label: 'Atención',
      icon: <AssignmentLate />,
      path: '/atencionhoy',
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      {particlesEnabled && <ParticlesContainer />}{' '}
      {/* Renderiza las partículas solo si están habilitadas */}
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
            <MenuItem>
              <FormControlLabel
                control={
                  <Switch
                    checked={particlesEnabled}
                    onChange={() => setParticlesEnabled(!particlesEnabled)}
                  />
                }
                label="Partículas"
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
            background: 'rgba(0, 0, 0, 0.2)', // Establecer el fondo del Drawer como transparente
          },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {/* Menu items */}
            {menuItems.map((item) => (
              <ListItemButton
                key={item.id}
                component={Link}
                to={item.path}
                style={{
                  textDecoration: 'none',
                  color: 'inherit',
                  background:
                    location.pathname === item.path
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent', // Resaltar la pestaña seleccionada
                }}
              >
                <ListItemIcon
                  sx={{
                    color:
                      location.pathname === item.path
                        ? 'primary.main'
                        : 'inherit',
                  }} // Cambiar el color del icono si está seleccionado
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label} sx={{ color: 'white' }} />
              </ListItemButton>
            ))}
            {/* Submenu */}
            <Accordion sx={{ background: 'transparent', color: 'white' }}>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Configuraciones"
                  sx={{ color: 'white' }}
                />
              </AccordionSummary>
              <AccordionDetails sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
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
                  ].map((text) => (
                    <ListItem
                      button
                      key={text}
                      component={Link}
                      to={`/${text.toLowerCase()}`}
                      sx={{ pl: 4, color: 'white' }}
                      style={{
                        background:
                          location.pathname === `/${text.toLowerCase()}`
                            ? 'rgba(255, 255, 255, 0.2)'
                            : 'transparent', // Resaltar la pestaña seleccionada
                      }}
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
            <Route path="/receta" element={<Receta />} />
            <Route path="/profesionales" element={<ProfessionalsPage />} />
            <Route path="/presupuestos" element={<BudgetsPage />} />
            <Route path="/presupuestopdf" element={<BudgetPDF />} />
            <Route path="/editarpresupuesto" element={<EditBudgetPage />} />
            <Route path="/presupuestodetalle" element={<BudgetDetailsPage />} />
            <Route path="/profesionales" element={<ProfessionalsPage />} />
            <Route path="/agenda" element={<AppointmentsPage />} />
            <Route path="/calendario" element={<AppointmentsCalendar />} />
            <Route path="/programacion" element={<SchedulingPage />} />
            <Route path="/citadetalle" element={<AppointmentDetail />} />
            <Route path="/atencionhoy" element={<AttentionPage />} />
            <Route
              path="/editarprofesional"
              element={<EditProfessionalPage />}
            />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default DashboardLayout;
