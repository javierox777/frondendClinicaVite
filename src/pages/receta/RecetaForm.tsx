import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import { TextField, Button, Container, Paper, Box, MenuItem, Select, InputLabel, FormControl, FormControlLabel, Switch, SelectChangeEvent, Grid } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

interface FormData {
  estado_id: boolean;
  profesional_id: string;
  empresa_id: string;
  fechaRegistro: Date | null;
  direccion: string;
  persona_id: string;
  recetaDetalle: string[];
}

interface IProfesional {
  _id: string;
  apellMat: string;
  apellPat: string;
  celular: string;
  direccion: string;
  dv: string;
  email: string;
  nombre1: string;
  nombre2: string;
  rut: string;
  solicitario: string;
  atencion: string;
  consentimiento: string;
  fichaClinica: string;
  presupuesto: string;
  receta: string;
}

interface IEmpresa extends Document {
  _id: string;
  vigencia: string;
  dv: string;
  razonSocial: string;
  direccion: string;
  rol: string;
  email: string;
  giro: string;
  Solicitario: string;
  consentimiento: string;
  presupuesto: string;
  receta: string;
}

interface IPersona {
  _id: string;
  apellMat: string;
  apellPat: string;
  dv: string;
  fechaNac: Date;
  institucion: string;
  nacionalidad: string;
  nombre1: string;
  nombre2: string;
  rut: string;
  sexo: string;
  vigente: string;
  direccion: string;
}

interface RecetaFormProps {
  onSuccess: () => void;
}

const RecetaForm: React.FC<RecetaFormProps> = ({ onSuccess }) => {
  const [profesionals, setProfesionals] = useState<IProfesional[]>([]);
  const [companies, setCompanies] = useState<IEmpresa[]>([]);
  const [persons, setPersons] = useState<IPersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);

  const [formData, setFormData] = useState<FormData>({
    estado_id: true,
    profesional_id: '',
    empresa_id: '',
    direccion: '',
    fechaRegistro: null,
    persona_id: '',
    recetaDetalle: [''],
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSwitchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: checked,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevData) => ({
      ...prevData,
      fechaRegistro: date ? new Date(date.year(), date.month(), date.date()) : null,
    }));
  };

  const handleRecetaDetalleChange = (index: number, value: string) => {
    const newRecetaDetalle = [...formData.recetaDetalle];
    newRecetaDetalle[index] = value;
    setFormData((prevData) => ({
      ...prevData,
      recetaDetalle: newRecetaDetalle,
    }));
  };

  const addRecetaDetalle = () => {
    setFormData((prevData) => ({
      ...prevData,
      recetaDetalle: [...prevData.recetaDetalle, ''],
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post('http://localhost:3000/api/receipt/', formData);
      onSuccess(); // Llamar la función onSuccess después de un envío exitoso
    } catch (error) {
      console.error('Error al enviar la data:', error);
    }
  };

  const getProfesionals = async () => {
    const data = await axios.get('http://localhost:3000/api/professionals');
    setProfesionals(data.data.body);
    console.log("aca professionals", profesionals);
  };

  const getCompanies = async () => {
    const data = await axios.get('http://localhost:3000/api/companies');
    setCompanies(data.data.body);
    console.log("aca companies", companies);
  };

  const getPersons = async () => {
    const data = await axios.get('http://localhost:3000/api/persons');
    setPersons(data.data.body);
    console.log("aca persons", persons);
  };

  const handlePersonaChange = (e: SelectChangeEvent<string>) => {
    const personaId = e.target.value;
    const selected = persons.find(persona => persona._id === personaId);
    if (selected) {
      setSelectedPersona(selected);
      setFormData((prevData) => ({
        ...prevData,
        persona_id: selected._id,
        direccion: selected.direccion, // Establecer la dirección aquí
      }));
    }
  };

  useEffect(() => {
    getProfesionals();
    getCompanies();
    getPersons();
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
        <form onSubmit={handleSubmit}>
          <Button style={{ marginBottom: '10px' }} variant="contained" color="primary" type="submit">
            Ficha Clinica
          </Button>
          <Box mb={2} mt={4} display="flex" justifyContent="space-between" alignItems="center">
            <FormControlLabel
              control={
                <Switch
                  checked={formData.estado_id}
                  onChange={handleSwitchChange}
                  name="estado_id"
                  color="primary"
                />
              }
              label="Estado ID"
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Fecha de Registro"
                value={formData.fechaRegistro ? dayjs(formData.fechaRegistro) : null}
                onChange={handleDateChange}
              />
            </LocalizationProvider>
          </Box>
          <Box mb={1}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="persona-label">Persona</InputLabel>
              <Select
                labelId="persona-label"
                name="persona_id"
                value={formData.persona_id}
                onChange={handlePersonaChange}
                label="Persona"
              >
                {persons.map((persona) => (
                  <MenuItem key={persona._id} value={persona._id}>
                    {`${persona.nombre1} ${persona.nombre2} ${persona.apellPat} ${persona.apellMat} - ${persona.rut}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {selectedPersona && (
            <Box mb={1}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="RUT"
                    value={selectedPersona.rut}
                    variant="outlined"
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Nombre 1"
                    value={selectedPersona.nombre1}
                    variant="outlined"
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Nombre 2"
                    value={selectedPersona.nombre2}
                    variant="outlined"
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Apellido Paterno"
                    value={selectedPersona.apellPat}
                    variant="outlined"
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Apellido Materno"
                    value={selectedPersona.apellMat}
                    variant="outlined"
                    disabled
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={6} sm={4}>
                  <TextField
                    fullWidth
                    label="Dirección"
                    name="direccion"
                    value={formData.direccion}
                    onChange={handleChange}
                    variant="outlined"
                    margin="normal"
                  />
                </Grid>
              </Grid>
            </Box>
          )}
          <Box mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="profesional-label">Profesional</InputLabel>
              <Select
                labelId="profesional-label"
                name="profesional_id"
                value={formData.profesional_id}
                onChange={handleSelectChange}
                label="Profesional"
              >
                {profesionals.map((profesional) => (
                  <MenuItem key={profesional._id} value={profesional._id}>
                    {`${profesional.nombre1} ${profesional.nombre2} ${profesional.apellPat} ${profesional.apellMat}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <FormControl fullWidth variant="outlined">
              <InputLabel id="empresa">Empresa</InputLabel>
              <Select
                labelId="empresa"
                name="empresa_id"
                value={formData.empresa_id}
                onChange={handleSelectChange}
                label="Empresa"
              >
                {companies.map((compa) => (
                  <MenuItem key={compa._id} value={compa._id}>
                    {`${compa.razonSocial}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          <Box mb={2}>
            <label>Receta Detalle:</label>
            {formData.recetaDetalle.map((detalle, index) => (
              <Box key={index} mb={1}>
                <TextField
                  fullWidth
                  value={detalle}
                  onChange={(e) => handleRecetaDetalleChange(index, e.target.value)}
                  variant="outlined"
                />
              </Box>
            ))}
            <Button variant="contained" color="primary" onClick={addRecetaDetalle}>
              Añadir Detalle
            </Button>
          </Box>
          <Button variant="contained" color="primary" type="submit">
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default RecetaForm;
