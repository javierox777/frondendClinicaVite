import { Delete } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormControlLabel,
  IconButton,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useThemeContext } from '../../componemts/themeContext';
import { generalConfig } from '../../config';
import { IAntecedent } from '../../interfaces/Antecedents';
import { Person } from '../../interfaces/Person';
import colors from '../../styles/colors';

interface Props {
  open: boolean;
  onClose: CallableFunction;
  type: 'morbid' | 'familiar' | 'allergy' | 'general' | 'habits';
  antecedents?: IAntecedent;
  patient: Person;
  afterSubmit: CallableFunction;
}

interface Antecedent {
  _id: string;
  descripcion: string;
}

const badHabits = [
  { descripcion: 'Succión digital', _id: 1 },
  { descripcion: 'Respirador bucal', _id: 2 },
  { descripcion: 'Onicofagia', _id: 3 },
  { descripcion: 'Succión chupete-mamadera', _id: 4 },
  { descripcion: 'Deflución atípico', _id: 5 },
];

const AntecedentsForm = ({
  open,
  type,
  onClose,
  antecedents,
  patient,
  afterSubmit,
}: Props) => {
  const { mode } = useThemeContext();

  const [isSubmitting, setSubmitting] = useState(false);

  const [habitos, setHabitos] = useState([
    { _id: (Math.random() * 1000).toString(), descripcion: '' },
  ]);
  const [morbidos, setMorbidos] = useState<Antecedent[]>([
    { _id: (Math.random() * 1000).toString(), descripcion: '' },
  ]);
  const [familiares, setFamiliares] = useState<Antecedent[]>([
    { _id: (Math.random() * 1000).toString(), descripcion: '' },
  ]);
  const [generales, setGenerales] = useState<Antecedent[]>([
    { _id: (Math.random() * 1000).toString(), descripcion: '' },
  ]);
  const [alergias, setAlergias] = useState<Antecedent[]>([
    { _id: (Math.random() * 1000).toString(), descripcion: '' },
  ]);

  const handleChangeAntecedents = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'morbid' | 'familiar' | 'allergy' | 'general' | 'habits',
    index: number
  ) => {
    switch (type) {
      case 'morbid':
        const updatedMorbid = [...morbidos];
        updatedMorbid[index].descripcion = e.target.value;
        setMorbidos(updatedMorbid);
        break;
      case 'familiar':
        const updatedFamiliar = [...familiares];
        updatedFamiliar[index].descripcion = e.target.value;
        setFamiliares(updatedFamiliar);
        break;
      case 'allergy':
        const updatedAllergies = [...alergias];
        updatedAllergies[index].descripcion = e.target.value;
        setAlergias(updatedAllergies);
        break;
      case 'general':
        const updatedGeneral = [...generales];
        updatedGeneral[index].descripcion = e.target.value;
        setGenerales(updatedGeneral);
        break;
    }
  };

  const handleAddAntecedent = (
    type: 'morbid' | 'familiar' | 'allergy' | 'general' | 'habits'
  ) => {
    switch (type) {
      case 'morbid':
        setMorbidos([
          ...morbidos,
          { _id: (Math.random() * 1000).toString(), descripcion: '' },
        ]);
        break;
      case 'familiar':
        setFamiliares([
          ...familiares,
          { _id: (Math.random() * 1000).toString(), descripcion: '' },
        ]);
        break;
      case 'allergy':
        setAlergias([
          ...alergias,
          { _id: (Math.random() * 1000).toString(), descripcion: '' },
        ]);
        break;
      case 'general':
        setGenerales([
          ...generales,
          { _id: (Math.random() * 1000).toString(), descripcion: '' },
        ]);
        break;
    }
  };

  const handleDeleteAntecedent = (
    type: 'morbid' | 'familiar' | 'allergy' | 'general' | 'habits',
    id: string
  ) => {
    switch (type) {
      case 'morbid':
        const updatedMorbid = morbidos.filter((a) => a._id !== id);
        setMorbidos(updatedMorbid);
        break;
      case 'familiar':
        const updatedFamiliar = familiares.filter((a) => a._id !== id);
        setFamiliares(updatedFamiliar);
        break;
      case 'allergy':
        const updatedAllergies = alergias.filter((a) => a._id !== id);
        setAlergias(updatedAllergies);
        break;
      case 'general':
        const updatedGeneral = generales.filter((a) => a._id !== id);
        setGenerales(updatedGeneral);
        break;
      case 'habits':
        setHabitos([
          ...habitos,
          { _id: (Math.random() * 1000).toString(), descripcion: '' },
        ]);
        break;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const morbidWithoutId = morbidos
        .filter((a: Antecedent) => a.descripcion !== '')
        .map(({ _id, ...rest }) => rest);
      const familiarWithoutId = familiares
        .filter((a: Antecedent) => a.descripcion !== '')
        .map(({ _id, ...rest }) => rest);
      const generalWithoutId = generales
        .filter((a: Antecedent) => a.descripcion !== '')
        .map(({ _id, ...rest }) => rest);
      const allergiesWithoutId = alergias
        .filter((a: Antecedent) => a.descripcion !== '')
        .map(({ _id, ...rest }) => rest);
      const habitsWithoutId = habitos.map(({ _id, ...rest }) => rest);

      const data = {
        persona: patient._id,
        morbidos: morbidWithoutId,
        alergias: allergiesWithoutId,
        familiares: familiarWithoutId,
        generales: generalWithoutId,
        habitos: habitsWithoutId,
      };
      console.log(data);

      if (!antecedents) {
        const response = await axios.post(
          `${generalConfig.baseUrl}/antecedents`,
          data
        );

        if (response.data.message === 'success') {
          toast.success('Antecedentes registrados');
        }
      } else {
        const response = await axios.patch(
          `${generalConfig.baseUrl}/antecedents/${antecedents._id}`,
          data
        );

        if (response.data.message === 'success') {
          toast.success('Antecedentes actualizados');
        }
      }
      setSubmitting(false);
      afterSubmit();
    } catch (error) {
      console.log(error);
      toast.error('No se pudo actualizar antecedentes, inténtelo nuevamente.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (antecedents) {
      setHabitos(antecedents.habitos);
      setFamiliares(antecedents.familiares);
      setGenerales(antecedents.generales);
      setAlergias(antecedents.alergias);
      setMorbidos(antecedents.morbidos);
    }
  }, [antecedents]);
  return (
    <Dialog open={open} fullWidth onClose={() => onClose()}>
      <form onSubmit={handleSubmit}>
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeHeaderColor
                  : colors.darkModeHeaderColor,
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">
              Agregar {type === 'morbid' && 'Antecedentes Mórbidos'}
              {type === 'general' && 'Antecedentes Generales'}
              {type === 'familiar' && 'Antecedentes Familiares'}
              {type === 'allergy' && 'Alérgias'}
              {type === 'habits' && 'Malos Hábitos'}
            </Typography>
            <Button
              variant="contained"
              onClick={() => handleAddAntecedent(type)}
            >
              Agregar antecedente
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          {type === 'general' &&
            generales.map((a: Antecedent, index) => {
              return (
                <Box className="mt-2" key={a._id}>
                  <FormControl style={{ width: '80%' }}>
                    <TextField
                      value={a.descripcion}
                      onChange={(e) =>
                        handleChangeAntecedents(e, 'general', index)
                      }
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => handleDeleteAntecedent('general', a._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}
          {type === 'morbid' &&
            morbidos.map((a: Antecedent, index) => {
              return (
                <Box className="mt-2" key={a._id}>
                  <FormControl style={{ width: '80%' }}>
                    <TextField
                      value={a.descripcion}
                      onChange={(e) =>
                        handleChangeAntecedents(e, 'morbid', index)
                      }
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => handleDeleteAntecedent('morbid', a._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}
          {type === 'allergy' &&
            alergias.map((a: Antecedent, index) => {
              return (
                <Box className="mt-2" key={a._id}>
                  <FormControl style={{ width: '80%' }}>
                    <TextField
                      value={a.descripcion}
                      onChange={(e) =>
                        handleChangeAntecedents(e, 'allergy', index)
                      }
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => handleDeleteAntecedent('allergy', a._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}
          {type === 'familiar' &&
            familiares.map((a: Antecedent, index) => {
              return (
                <Box className="mt-2" key={a._id}>
                  <FormControl style={{ width: '80%' }}>
                    <TextField
                      value={a.descripcion}
                      onChange={(e) =>
                        handleChangeAntecedents(e, 'familiar', index)
                      }
                    />
                  </FormControl>
                  <IconButton
                    onClick={() => handleDeleteAntecedent('familiar', a._id)}
                  >
                    <Delete />
                  </IconButton>
                </Box>
              );
            })}
          {type === 'habits' &&
            badHabits.map((bh: any) => {
              return (
                <FormControl fullWidth key={bh.id}>
                  <FormControlLabel
                    label={bh.descripcion}
                    control={
                      <Checkbox
                        checked={habitos.some(
                          (h) => h.descripcion === bh.descripcion
                        )}
                        onChange={(e, checked) => {
                          if (checked) {
                            setHabitos([...habitos, bh]);
                          } else {
                            const updatedHabits = habitos.filter(
                              (h) => h.descripcion !== bh.descripcion
                            );
                            setHabitos(updatedHabits);
                          }
                        }}
                      />
                    }
                  />
                </FormControl>
              );
            })}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={isSubmitting}
          >
            Guardar
          </Button>
          <Button variant="contained" color="inherit" onClick={() => onClose()}>
            Cerrar
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AntecedentsForm;
