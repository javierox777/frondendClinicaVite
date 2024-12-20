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
import {
  Dashboard,
  AdminPanelSettings,
  Group,
  Engineering,
  AttachMoney,
  Event,
  Schedule,
  MedicalServices,
  HealthAndSafety,
  AssignmentTurnedIn,
  FactCheck,
} from '@mui/icons-material';


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
import PaletteIcon from '@mui/icons-material/Palette';

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
import CurrentPatient from '../../pages/attention/CurrentPatient';
import ClinicalRecordPage from '../../pages/clinicalrecord/ClinicalRecordPage';
import PatientRecord from '../../pages/clinicalrecord/PatientRecord';
import ConsentForm from '../../pages/consent/ConsentPage';
import Administracion from '../../pages/admin/Admin';
import colors from '../../styles/colors';

import { Button } from '@mui/material';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import ParticlesIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import logo from '/logo.png';
import { Grid } from 'rsuite';
import { JwtPayload } from 'jwt-decode';
import { decodeJwt } from '../../auth/decodeJwt';
import ConsentMain from '../../pages/consent/ConsentMain';
import EditConsentPage from '../../pages/consent/EditConsentPage';

const drawerWidth = 240;

const DashboardLayout: React.FC = () => {
  const { toggleColorMode, mode } = useThemeContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [particlesEnabled, setParticlesEnabled] = useState(true); // Estado para controlar las partículas
  // Estados iniciales con gradientes
// Cambia los estados iniciales:
// const [topbarColor, setTopbarColor] = useState('linear-gradient(to right, #9C27B0, #E91E63)');
// const [drawerColor, setDrawerColor] = useState('linear-gradient(to bottom, #E91E63, #9C27B0)');

const [topbarColor, setTopbarColor] = useState(
  'linear-gradient(to right, rgba(225,190,231,0.7), rgba(244,143,177,0.7))'
);
const [drawerColor, setDrawerColor] = useState(
  'linear-gradient(to bottom, rgba(244,143,177,0.7), rgba(225,190,231,0.7))'
);




  const colorPalette = ['#1976D2', '#FF5722', '#4CAF50', '#9C27B0', '#FFC107', '#607D8B']; // Paleta de colores

  const open = Boolean(anchorEl);
  const { user, setUser, loading } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };
  const handleColorChange = (type: 'topbar' | 'drawer', color: string) => {
    if (type === 'topbar') setTopbarColor(color);
    else setDrawerColor(color);
  };
  const restoreUser = async () => {
    const token = localStorage.getItem('token'); // Obtén el token de `localStorage`
    if (token) {
      const decodedToken = decodeJwt(token); // Decodifica el token

      // Mapea los valores decodificados a la estructura `LoggedUser`
      const user: LoggedUser = {
        _id: decodedToken._id!,
        login: decodedToken.login!,
        vigencia: decodedToken.vigencia!,
        fechaRegistro: decodedToken.fechaRegistro!,
        nombre: decodedToken.nombre!,
        profesionalId: decodedToken.profesionalId!,
        role: decodedToken.role!,
      };

      // Asignar el usuario al estado solo si tiene todas las propiedades necesarias
      setUser(user);
    }
  };
  const handleLogout = async () => {
    await authStorage.removeToken(); // Eliminar el token
    setUser(null); // Restablecer el usuario a null en el contexto
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  useEffect(() => {
    restoreUser();
  }, []);

  const menuItems = [
    { id: 1, label: 'Inicio', icon: <Dashboard />, path: '/inicio', roles: ['admin', 'user'] },
    { id: 2, label: 'Administración', icon: <AdminPanelSettings />, path: '/administracion', roles: ['admin'] },
    { id: 3, label: 'Pacientes', icon: <Group />, path: '/pacientes', roles: ['admin', 'user'] },
    { id: 4, label: 'Profesionales', icon: <Engineering />, path: '/profesionales', roles: ['admin'] },
    { id: 5, label: 'Presupuestos', icon: <AttachMoney />, path: '/presupuestos', roles: ['admin', 'user'] },
    { id: 6, label: 'Agenda', icon: <Event />, path: '/agenda', roles: ['admin', 'user'] },
    { id: 7, label: 'Programación', icon: <Schedule />, path: '/programacion', roles: ['admin'] },
    { id: 8, label: 'Receta', icon: <MedicalServices />, path: '/receta', roles: ['admin', 'user'] },
    { id: 9, label: 'Módulo dental', icon: <HealthAndSafety />, path: '/modulodental', roles: ['admin', 'user'] },
    { id: 10, label: 'Consentimiento', icon: <AssignmentTurnedIn />, path: '/consentimiento', roles: ['admin', 'user'] },
    { id: 11, label: 'Atención', icon: <FactCheck />, path: '/atencionhoy', roles: ['admin', 'user'] },
  ];

  // Mantén el estado para el anclaje del menú
  const [anchorElTopbar, setAnchorElTopbar] = useState<null | HTMLElement>(null);
  const [anchorElDrawer, setAnchorElDrawer] = useState<null | HTMLElement>(null);

  // Manejar apertura y cierre del menú
  const openTopbarMenu = Boolean(anchorElTopbar);
  const openDrawerMenu = Boolean(anchorElDrawer);

  const handleOpenTopbarMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElTopbar(event.currentTarget);
  };

  const handleCloseTopbarMenu = () => {
    setAnchorElTopbar(null);
  };

  const handleOpenDrawerMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElDrawer(event.currentTarget);
  };

  const handleCloseDrawerMenu = () => {
    setAnchorElDrawer(null);
  };
  function isLoggedUser(
    user: LoggedUser | JwtPayload | null
  ): user is LoggedUser {
    return (user as LoggedUser)?.role !== undefined;
  }

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!user) {
    return <p>No hay información de usuario disponible.</p>;
  }

  // Mapeo de roles a etiquetas legibles
  const roleLabels: Record<string, string> = {
    admin: 'Administrador Clínica',
    user: 'Dentista',
  };

  return (
    <Box>
      {particlesEnabled && <ParticlesContainer />}{' '}
      {/* Renderiza las partículas solo si están habilitadas */}
      <CssBaseline />
      <AppBar
  position="fixed"
  sx={{
    background: topbarColor,
    zIndex: (theme) => theme.zIndex.drawer + 1,
  }}
>
        <Toolbar>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, mr: 1 }}>
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                position: 'relative',
                zIndex: 1301, // Asegura que quede sobre el AppBar
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            >
              {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </Box>

          <img src={logo} style={{ width: '4%' }} alt="logo" />

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Clinica Dental
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{
              flexGrow: 1,
              textAlign: 'right', // Alinea el texto a la derecha
              marginLeft: 'auto', // Empuja el contenido hacia la derecha
            }}
          >
            {`${user.nombre}  ${roleLabels[user.role] || 'Sin rol definido'}`}
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
            PaperProps={{
              sx: {
                bgcolor: 'background.paper', // Color de fondo según el tema
                boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Sombra
                borderRadius: '8px', // Bordes redondeados
              },
            }}
          >
            <MenuItem disabled>
              <Typography variant="subtitle1" color="text.secondary">
                Configuración
              </Typography>
            </MenuItem>
            <MenuItem>
              <ListItemIcon>
                <Brightness4Icon fontSize="small" />
              </ListItemIcon>
              <FormControlLabel
                control={<Switch onChange={toggleColorMode} />}
                label={`Modo ${mode === 'light' ? 'oscuro' : 'claro'}`}
                labelPlacement="start"
              />
            </MenuItem>

            <MenuItem>
              <ListItemIcon>
                <ParticlesIcon fontSize="small" />
              </ListItemIcon>
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
            <Divider />
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Cerrar sesión
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Drawer
  variant="persistent"
  open={drawerOpen}
  sx={{
    '& .MuiDrawer-paper': {
      width: drawerWidth,
      background: drawerColor,
    },
  }}
>

        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end', // Alinea el contenido al final (derecha)
              padding: 1, // Espacio alrededor del botón
            }}
          >

          </Box>
          <Box sx={{ overflow: 'auto', marginTop: '50px' }}>
            <List>
              {/* Menu items */}
              {menuItems
                .filter((item) => isLoggedUser(user) && item.roles.includes(user.role))
                .map((item) => (
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
                          : 'transparent',
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color:
                          location.pathname === item.path ? 'primary.main' : 'inherit',
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.label} sx={{ color: 'white' }} />
                  </ListItemButton>
                ))}
              {/* Submenu */}
              <AccordionDetails sx={{ background: 'rgba(0, 0, 0, 0.2)' }}>
  {/* Icono para seleccionar colores del Topbar */}
  <Typography variant="subtitle1" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
    Colores del Topbar
    <IconButton
      onClick={handleOpenTopbarMenu}
      sx={{ color: 'white' }}
      aria-label="Seleccionar color del Topbar"
    >
      <PaletteIcon />
    </IconButton>
  </Typography>
  <Menu
    anchorEl={anchorElTopbar}
    open={openTopbarMenu}
    onClose={handleCloseTopbarMenu}
  >
    {colorPalette.map((color) => (
      <MenuItem
        key={color}
        onClick={() => {
          handleColorChange('topbar', color);
          handleCloseTopbarMenu();
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: color,
            borderRadius: '50%',
            marginRight: 1,
          }}
        />
        {color}
      </MenuItem>
    ))}
  </Menu>

  {/* Icono para seleccionar colores del Drawer */}
  <Typography variant="subtitle1" sx={{ color: 'white', display: 'flex', alignItems: 'center', gap: 1, mt: 2 }}>
    Colores del Drawer
    <IconButton
      onClick={handleOpenDrawerMenu}
      sx={{ color: 'white' }}
      aria-label="Seleccionar color del Drawer"
    >
      <PaletteIcon />
    </IconButton>
  </Typography>
  <Menu
    anchorEl={anchorElDrawer}
    open={openDrawerMenu}
    onClose={handleCloseDrawerMenu}
  >
    {colorPalette.map((color) => (
      <MenuItem
        key={color}
        onClick={() => {
          handleColorChange('drawer', color);
          handleCloseDrawerMenu();
        }}
      >
        <Box
          sx={{
            width: 24,
            height: 24,
            backgroundColor: color,
            borderRadius: '50%',
            marginRight: 1,
          }}
        />
        {color}
      </MenuItem>
    ))}
  </Menu>
</AccordionDetails>

            </List>
          </Box>
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
            <Route path="/administracion" element={<Administracion />} />
            <Route path="/pacientes" element={<PatientsPage />} />
            <Route path="/ingreso" element={<InstitutionForm />} />
            <Route path="/sexo" element={<Sexo />} />
            <Route path="/atencion" element={<AtencionTipo />} />
            <Route path="/ciudad" element={<Ciudad />} />
            <Route path="/consentimiento" element={<ConsentMain />} />
            <Route path="/editarconsentimiento" element={<EditConsentPage />} />
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
            <Route path="/modulodental" element={<ClinicalRecordPage />} />
            <Route path="/fichaclinica" element={<PatientRecord />} />
            <Route path="/atencionpaciente" element={<CurrentPatient />} />
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
