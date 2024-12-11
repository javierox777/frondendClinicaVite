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
import CurrentPatient from '../../pages/attention/CurrentPatient';
import ClinicalRecordPage from '../../pages/clinicalrecord/ClinicalRecordPage';
import PatientRecord from '../../pages/clinicalrecord/PatientRecord';
import ConsentForm from '../../pages/consent/ConsentPage';
import Administracion from '../../pages/admin/Admin';
import colors from '../../styles/colors';

import Brightness4Icon from '@mui/icons-material/Brightness4';
import ParticlesIcon from '@mui/icons-material/Cloud';
import LogoutIcon from '@mui/icons-material/Logout';

import { useNavigate } from 'react-router-dom';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
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
    {
      id: 1,
      label: 'Inicio',
      icon: <HomeIcon />,
      path: '/inicio',
      roles: ['admin', 'user'],
    },
    {
      id: 2,
      label: 'Administración',
      icon: <HomeIcon />,
      path: '/administracion',
      roles: ['admin'],
    },
    {
      id: 3,
      label: 'Pacientes',
      icon: <AssignmentInd />,
      path: '/pacientes',
      roles: ['admin', 'user'],
    },
    {
      id: 4,
      label: 'Profesionales',
      icon: <ContactEmergency />,
      path: '/profesionales',
      roles: ['admin'],
    },
    {
      id: 5,
      label: 'Presupuestos',
      icon: <RequestQuote />,
      path: '/presupuestos',
      roles: ['admin', 'user'],
    },
    {
      id: 6,
      label: 'Agenda',
      icon: <CalendarMonth />,
      path: '/agenda',
      roles: ['admin', 'user'],
    },
    {
      id: 7,
      label: 'Programación',
      icon: <EditCalendar />,
      path: '/programacion',
      roles: ['admin'],
    },
    {
      id: 8,
      label: 'Receta',
      icon: <RequestQuote />,
      path: '/receta',
      roles: ['admin', 'user'],
    },
    {
      id: 9,
      label: 'Módulo dental',
      icon: <RequestQuote />,
      path: '/modulodental',
      roles: ['admin', 'user'],
    },
    {
      id: 10,
      label: 'Consentimiento',
      icon: <DescriptionIcon />,
      path: '/consentimiento',
      roles: ['admin', 'user'],
    },
    {
      id: 11,
      label: 'Atención',
      icon: <AssignmentLate />,
      path: '/atencionhoy',
      roles: ['admin', 'user'],
    },
  ];
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
          zIndex: (theme: any) => theme.zIndex.drawer + 1,
          backgroundColor:
            mode === 'light'
              ? colors.lightModeHeaderColor
              : colors.darkModeHeaderColor,
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
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          width: drawerWidth,
          flexShrink: 2,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
            backgroundColor: `${
              mode === 'light'
                ? 'rgba(78, 163, 213, 0.8)' // Transparencia en modo claro
                : 'rgba(0, 0, 0, 0.8)' // Transparencia en modo oscuro
            }`, // Establecer el fondo del Drawer como transparente
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
            <IconButton
              onClick={handleDrawerToggle}
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                },
              }}
            >
              <ChevronLeftIcon />
            </IconButton>
          </Box>

          <List>
            {/* Menu items */}
            {menuItems
              .filter(
                (item) => isLoggedUser(user) && item.roles.includes(user.role)
              ) // Filtrar los elementos según el rol del usuario
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
