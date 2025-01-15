import {
  ArrowDownward,
  ArrowUpward,
  Save,
  Security,
  VerifiedUser,
} from '@mui/icons-material';
import {
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  Container,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// import { useUser } from '../../auth/userContext';
import { generalConfig } from '../../config';
import toast, { Toaster } from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';

// const PERMISSIONS = {
//   CREATE: 'C',
//   READ: 'R',
//   UPDATE: 'U',
//   DELETE: 'D',
// };

interface Professional {
  _id: string;
  nombre1: string;
  apellPat: string;
  role: string;
  permissions: string[];
}

const RolesDashboard: React.FC = () => {
  const [professionals, setProfessionals] = useState<Professional[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Record<string, string>>({});
  const [selectedPermissions, setSelectedPermissions] = useState<
    Record<string, string[]>
  >({});
  // const { user: currentUser } = useUser();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(
          `${generalConfig.baseUrl}/professionals`
        );
        setProfessionals(response.data.body);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching professionals:', error);
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, []);

  const handleRoleChange = async (id: string) => {
    console.log(id);
    try {
      await axios.patch(`${generalConfig.baseUrl}/professionals/role/${id}`, {
        role: selectedRole[id],
      });
      console.log(
        `URL para actualizar role: ${generalConfig.baseUrl}/professionals/role/${id}`
      );

      toast.success('Rol ha sido actualizado correctamente');

      // Actualiza el estado de los profesionales en el frontend
      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((prof) =>
          prof._id === id ? { ...prof, role: selectedRole[id] } : prof
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating role:', error.response?.data);
        toast.error('Error al actualizar el rol');
      } else {
        console.error('Unexpected error:', error);
        toast.error('Error inesperado');
      }
    }
  };

  const handlePermissionChange = (id: string, permission: string) => {
    const updatedPermissions = selectedPermissions[id] || [];
    if (updatedPermissions.includes(permission)) {
      setSelectedPermissions({
        ...selectedPermissions,
        [id]: updatedPermissions.filter((perm) => perm !== permission),
      });
    } else {
      setSelectedPermissions({
        ...selectedPermissions,
        [id]: [...updatedPermissions, permission],
      });
    }
  };

  if (loading) return <CircularProgress />;

  return (
    <>
      <Container maxWidth="lg" sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom align="center">
          Administración de Roles
        </Typography>

        <Paper elevation={4} sx={{ padding: 2, marginTop: 2 }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>
                    <strong>Avatar</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Nombre</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Roles</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {professionals.map((professional) => (
                  <ProfessionalRow
                    key={professional._id}
                    professional={professional}
                    selectedRole={selectedRole}
                    setSelectedRole={setSelectedRole}
                    handleRoleChange={handleRoleChange}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
      <Toaster />
    </>
  );
};

const ProfessionalRow = ({
  professional,
  selectedRole,
  setSelectedRole,
  handleRoleChange,
}: {
  professional: Professional;
  selectedRole: Record<string, string>;
  setSelectedRole: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleRoleChange: (id: string) => void;
}) => {
  const [open, setOpen] = useState(false);

  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: login } = useQuery({
    queryKey: ['professionallogin', professional._id],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/users/professionallogin/${professional._id}`
      );
      return response.data.body;
    },
  });

  const onChangePassword = async () => {
    setIsSubmitting(true);
    try {
      const response = await axios.patch(
        `${generalConfig.baseUrl}/users/${login._id}`,
        { clave1: password }
      );
      console.log(response);
      if (response.data.message === 'success') {
        toast.success('Contraseña actualizada correctamente');
        setIsSubmitting(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating password:', error.response?.data);
        toast.error('Error al actualizar la contraseña');
        setIsSubmitting(false);
      } else {
        console.error('Unexpected error:', error);
        toast.error('Error inesperado');
        setIsSubmitting(false);
      }
    }
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <ArrowUpward /> : <ArrowDownward />}
          </IconButton>
        </TableCell>
        <TableCell>
          <Avatar sx={{ bgcolor: '#1976d2', color: '#fff' }}>
            {professional.nombre1[0]}
          </Avatar>
        </TableCell>
        <TableCell>{`${professional.nombre1} ${professional.apellPat}`}</TableCell>
        <TableCell>
          <FormControl variant="outlined" fullWidth>
            <Select
              value={selectedRole[professional._id] || professional.role}
              onChange={(e) => {
                const newRole = e.target.value;
                setSelectedRole((prevSelectedRole) => {
                  console.log(
                    'Updating role for:',
                    professional._id,
                    'to:',
                    newRole
                  );
                  return {
                    ...prevSelectedRole,
                    [professional._id]: newRole,
                  };
                });
              }}
            >
              <MenuItem value="admin">
                <Security fontSize="small" /> Administrador Clinica
              </MenuItem>
              <MenuItem value="user">
                <VerifiedUser fontSize="small" /> Dentista
              </MenuItem>
            </Select>
          </FormControl>
        </TableCell>
        <TableCell>
          <Button
            variant="outlined" // Botón con borde
            color="success" // Verde en el borde y el texto/ícono
            startIcon={<Save />}
            onClick={() => handleRoleChange(professional._id)}
            sx={{
              marginLeft: '20%',
              fontSize: '0.75rem',
              padding: '4px 8px',
              borderColor: 'rgba(76, 175, 80, 0.5)',
              color: 'rgba(76, 175, 80, 0.9)',
              backgroundColor: 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.05)',
              },
            }}
          >
            Guardar
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography variant="h6" gutterBottom>
              Cambiar Contraseña
            </Typography>
            <form>
              <FormControl
                fullWidth
                variant="outlined"
                sx={{ marginBottom: 2 }}
              >
                <TextField
                  type="password"
                  placeholder="Nueva Contraseña"
                  onChange={(e) => {
                    const newPassword = e.target.value;
                    setPassword(newPassword);
                  }}
                />
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={onChangePassword}
                disabled={isSubmitting}
              >
                Cambiar Contraseña
              </Button>
            </form>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default RolesDashboard;
