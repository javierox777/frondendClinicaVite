import React, { useState, FormEvent, useEffect } from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";
import logo from "/logobusing.png"; // Asegúrate de que la ruta es correcta
import Axios from 'axios';
import { generalConfig } from '../../config';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const baseUrl = generalConfig.baseUrl;

interface LoginResponse  {
    _id: string;
    name: string;
    token?: string;
    message: string;
}
  
  


const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  useEffect(() => {
    document.body.style.background = 'linear-gradient(to right, #7f8c8d, #bdc3c7)';
  
    return () => {
      document.body.style.background = '';
    };
  }, []);

  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const usuario = { email, password };
    try {
      const { data } = await Axios.post<LoginResponse>(`${baseUrl}/users/signin`, usuario);
      const message = data.message;
      console.log("data por aca",data.message)

      if (message !== "Bienvenido") {
        Swal.fire({
          icon: "error",
          title: `${message}`,
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        Swal.fire({
          icon: "success",
          title: `${message}`,
          showConfirmButton: false,
          timer: 1500,
        });

        const token = data.token;
        const id = data._id;
        const name = data.name;

        sessionStorage.setItem("token", token ?? '');
        sessionStorage.setItem("id", id ?? '');
        sessionStorage.setItem("name", name ?? '');

        navigate('/dashboard');
      }
    } catch (error) {
      console.log("entro al error")
      console.error('Login error', error);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
    <form onSubmit={login} style={{ maxWidth: '400px' }}>
    <Paper elevation={10} sx={{
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
  borderRadius: "15px",
  backgroundColor: "rgba(255, 255, 255, 0.2)", 
  color: "#333",
  boxShadow: "0 12px 24px 0 rgba(0,0,0,0.2)",
  transition: "transform 0.3s ease-in-out",
  '&:hover': {
    transform: "scale(1.05)",
  },
}}>
          <Grid container justifyContent="center">
            <img src={logo} style={{ width: "50%", marginBottom: "20px" }} alt="logo" />
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
          <Button
            color="primary"
            variant="contained"
            fullWidth
            type="submit"
          >
            Entrar
          </Button>
        </Paper>
      </form>
    </div>
  );
};

export default Login;
