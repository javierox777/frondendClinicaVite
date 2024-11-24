import React, { useEffect, useState } from 'react';
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Paper,
  CircularProgress,
  Checkbox,
  FormControlLabel,
  Grid,
  Avatar,
  IconButton,
} from '@mui/material';
import { Edit, Save, Security, VerifiedUser } from '@mui/icons-material';
import axios from 'axios';
import { generalConfig } from '../../config';

const PERMISSIONS = {
  CREATE: 'C',
  READ: 'R',
  UPDATE: 'U',
  DELETE: 'D',
};

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
  const [selectedPermissions, setSelectedPermissions] = useState<Record<string, string[]>>({});

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await axios.get(`${generalConfig.baseUrl}/professionals`);
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
    console.log(id)
    try {
      await axios.patch(`${generalConfig.baseUrl}/professionals/role/${id}`, { role: selectedRole[id] });
      console.log(`URL para actualizar role: ${generalConfig.baseUrl}/professionals/role/${id}`);

      alert('Role updated successfully');

      // Actualiza el estado de los profesionales en el frontend
      setProfessionals((prevProfessionals) =>
        prevProfessionals.map((prof) =>
          prof._id === id ? { ...prof, role: selectedRole[id] } : prof
        )
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error updating role:', error.response?.data);
        alert(`Failed to update role: ${error.response?.data?.message || error.message}`);
      } else {
        console.error('Unexpected error:', error);
        alert('An unexpected error occurred while updating the role.');
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
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        User Roles Dashboard
      </Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Manage user roles and permissions effectively
      </Typography>
      <Paper elevation={4} sx={{ padding: 3, marginTop: 2 }}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Avatar</strong></TableCell>
                <TableCell><strong>Name</strong></TableCell>
                <TableCell><strong>Role</strong></TableCell>
                <TableCell><strong>Permissions</strong></TableCell>
                <TableCell><strong>Actions</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {professionals.map((professional) => (
                <TableRow key={professional._id}>
                  <TableCell>
                    <Avatar sx={{ bgcolor: '#1976d2', color: '#fff' }}>
                      {professional.nombre1[0]}
                    </Avatar>
                  </TableCell>
                  <TableCell>{`${professional.nombre1} ${professional.apellPat}`}</TableCell>
                  <TableCell>
                    <FormControl variant="outlined" fullWidth>
                      <InputLabel>Role</InputLabel>
                      <Select
                        value={selectedRole[professional._id] || professional.role}
                        onChange={(e) => {
                          const newRole = e.target.value;
                          setSelectedRole((prevSelectedRole) => {
                            console.log('Updating role for:', professional._id, 'to:', newRole);
                            return { ...prevSelectedRole, [professional._id]: newRole };
                          });
                        }}
                      >

                        <MenuItem value="admin">
                          <Security fontSize="small" /> Admin
                        </MenuItem>
                        <MenuItem value="user">
                          <VerifiedUser fontSize="small" /> User
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                  <TableCell>


                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<Save />}
                      onClick={() => handleRoleChange(professional._id)}
                      sx={{ marginTop: 1 }}
                    >
                      Save Permissions
                    </Button>
                  </TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleRoleChange(professional._id)}
                    >
                      <Edit />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
};

export default RolesDashboard;
