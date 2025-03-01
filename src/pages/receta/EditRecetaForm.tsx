import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
  Grid
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import axios from 'axios';

interface FormData {
  _id: string;
  estado_id: boolean;
  profesional_id: string;
  empresa_id: string;
  /**
   * Importante: Guardamos la fecha como string en formato "YYYY-MM-DD"
   * así evitamos desfases de zona horaria.
   */
  fechaRegistro: string | null; 
  persona_id: string;
  direccion: string;
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

interface IEmpresa {
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

interface EditRecetaFormProps {
  receta: FormData;
  onSuccess: () => void;
}

const EditRecetaForm: React.FC<EditRecetaFormProps> = ({ receta, onSuccess }) => {
  const [profesionals, setProfesionals] = useState<IProfesional[]>([]);
  const [companies, setCompanies] = useState<IEmpresa[]>([]);
  const [persons, setPersons] = useState<IPersona[]>([]);
  const [selectedPersona, setSelectedPersona] = useState<IPersona | null>(null);

  /**
   * Inicializamos el state con la receta que llega por props.
   * Aquí, fechaRegistro ya debe venir como string | null (si viene de un fetch).
   */
  const [formData, setFormData] = useState<FormData>(receta);

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

  /**
   * Acá convertimos la fecha seleccionada en el DatePicker a un string `YYYY-MM-DD`.
   * De esa forma ignoramos la hora y no hay desfase de zona horaria.
   */
  const handleDateChange = (date: Dayjs | null) => {
    setFormData((prevData) => ({
      ...prevData,
      fechaRegistro: date ? date.format('YYYY-MM-DD') : null,
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
    console.log('Enviando formulario con data:', formData);
    try {
      await axios.put(`http://localhost:3000/api/receipt/${formData._id}`, formData);
      onSuccess(); // Llamar la función onSuccess después de un envío exitoso
    } catch (error) {
      console.error('Error al enviar la data:', error);
    }
  };

  const getProfesionals = async () => {
    try {
      const data = await axios.get('http://localhost:3000/api/professionals');
      setProfesionals(data.data.body);
    } catch (err) {
      console.error('Error al cargar profesionales:', err);
    }
  };

  const getCompanies = async () => {
    try {
      const data = await axios.get('http://localhost:3000/api/companies');
      setCompanies(data.data.body);
    } catch (err) {
      console.error('Error al cargar empresas:', err);
    }
  };

  const getPersons = async () => {
    try {
      const data = await axios.get('http://localhost:3000/api/persons');
      setPersons(data.data.body);
    } catch (err) {
      console.error('Error al cargar personas:', err);
    }
  };

  const handlePersonaChange = (e: SelectChangeEvent<string>) => {
    const personaId = e.target.value;
    const selected = persons.find((persona) => persona._id === personaId);
    if (selected) {
      setSelectedPersona(selected);
      setFormData((prevData) => ({
        ...prevData,
        persona_id: selected._id,
        direccion: selected.direccion, // Actualiza la dirección cuando cambia la persona
      }));
    }
  };

  useEffect(() => {
    getProfesionals();
    getCompanies();
    getPersons();
  }, []);

  /**
   * Si llega una persona_id desde el prop receta, y ya tenemos la lista de persons,
   * seleccionamos la persona correspondiente.
   */
  useEffect(() => {
    if (receta.persona_id) {
      const selected = persons.find((persona) => persona._id === receta.persona_id);
      if (selected) setSelectedPersona(selected);
    }
  }, [receta, persons]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={0} sx={{ p: 3, bgcolor: 'rgba(255, 255, 255, 0.8)' }}>
        <form onSubmit={handleSubmit}>
          <Button
            style={{ marginBottom: '10px' }}
            variant="contained"
            color="primary"
            type="button"
          >
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
                /**
                 * Para mostrar la fecha, creamos un Dayjs a partir de la cadena "YYYY-MM-DD".
                 * Si formData.fechaRegistro está en ese formato, dayjs lo entenderá sin problema.
                 */
                value={
                  formData.fechaRegistro
                    ? dayjs(formData.fechaRegistro, 'YYYY-MM-DD')
                    : null
                }
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
                    value={selectedPersona.direccion}
                    variant="outlined"
                    name="direccion"
                    onChange={handleChange}
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
                    {compa.razonSocial}
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

          <Button variant="contained" onClick={handleSubmit} color="primary" type="submit">
            Enviar
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default EditRecetaForm;
