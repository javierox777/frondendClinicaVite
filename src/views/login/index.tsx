import React, { useState, FormEvent, useEffect } from 'react';
import { Button, Grid, TextField, Paper } from '@mui/material';
import logo from '/logo.png'; // Asegúrate de que la ruta es correcta
import Axios from 'axios';
import { generalConfig } from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../auth/userContext';
import authStorage from '../../auth/storage';

const baseUrl = generalConfig.baseUrl;

interface LoginResponse {
  data: {
    _id: string;
    login: string;
    vigencia: string;
    fechaRegistro: string;
    nombre: string;
    profesionalId: string;
  };
  token?: string;
  message: string;
}

const Login: React.FC = () => {
  const { user, setUser } = useUser();

  console.log('usuario', user);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.background =
      'linear-gradient(to right, #7f8c8d, #bdc3c7)';

    return () => {
      document.body.style.background = '';
    };
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario = { login: email, clave1: password };
    try {
      const { data } = await Axios.post<LoginResponse>(
        `${baseUrl}/users/signin`,
        usuario
      );
      const message = data.message;

      if (message === 'Bienvenido') {
        const userResponse = data.data;
        setUser({
          ...userResponse,
          vigencia: userResponse.vigencia === "true",
          role: 'user' // asignas un rol por defecto sin leerlo de userResponse
        });

        const token = data.token;
        if (token) authStorage.storeToken(token);

        navigate('/inicio');
      }

      if (message !== 'Bienvenido') {
        Swal.fire({
          icon: 'error',
          title: `${message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: 'success',
          title: `${message}`,
          showConfirmButton: false,
          timer: 1500,
        });


      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: `Contraseña o nombre de usuario incorrecto`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        background: 'linear-gradient(to right, #7f8c8d, #bdc3c7)',
      }}
    >
      <form onSubmit={login} style={{ maxWidth: '400px' }}>
        <Paper
          elevation={10}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px',
            borderRadius: '15px',
            backgroundColor: '#fff', // Fondo blanco
            color: '#333',
            boxShadow: '0 12px 24px 0 rgba(0,0,0,0.2)',
            transition: 'transform 0.3s ease-in-out',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Grid container justifyContent="center">
            <img
              src={logo}
              style={{ width: '50%', marginBottom: '20px' }}
              alt="logo"
            />
          </Grid>
          <TextField
            label="Correo"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            label="Contraseña"
            margin="normal"
            variant="outlined"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
          <div style={{ height: 20 }} />
          <Button color="primary" variant="contained" fullWidth type="submit">
            Entrar
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
