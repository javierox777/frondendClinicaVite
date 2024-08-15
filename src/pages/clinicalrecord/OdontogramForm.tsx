import {
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';
import { Person } from '../../interfaces/Person';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import PermanentForm from './FormOdontograms/PermanentForm';

interface Props {
  profesionalId: string;
  persona: Person;
}

const OdontogramForm = ({ profesionalId, persona }: Props) => {
  const { mode } = useThemeContext();

  const [odontogramType, setType] = useState({
    temporary: false,
    permanent: false,
  });

  const [odontogram, setOdontogram] = useState<OdontogramInterface>({
    profesionalModifica: '',
    persona: '',
    fecha: '',
    dientes: [
      {
        pieza: '18',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '17',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '16',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '15',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '14',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '13',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '12',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '11',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '21',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '22',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '23',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '24',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '25',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '26',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '27',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '28',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '38',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '37',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '36',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '35',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '34',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '33',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '32',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '31',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '41',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '42',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '43',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '44',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '45',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '46',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '47',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
      {
        pieza: '48',
        activo: false,
        detalle: '',
        estado: '',
        diagnostico: '',
        bucal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        distal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        mesial: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        raiz: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        oclusal: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
        lingualpalatino: {
          caries: false,
          restauracion: false,
          detalle: '',
          diagnostico: '',
          estado: '',
        },
      },
    ],
  });

  const handleActiveChange = (tooth: Diente) => {
    const updatedTooth = [...odontogram.dientes];

    const toothIndex = updatedTooth.indexOf(tooth);

    updatedTooth[toothIndex].activo = !updatedTooth[toothIndex].activo;

    setOdontogram((prevState) => ({
      ...prevState,
      dientes: [...updatedTooth],
    }));
  };

  const handleChangeType = () => {
    setType({
      permanent: !odontogramType.permanent,
      temporary: !odontogramType.permanent ? false : true,
    });
  };

  return (
    <form>
      <Container>
        <Grid container gap={3}>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: 20,
                wordWrap: 'break-word',
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Registrar odontograma
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Paciente
            </Typography>
            <Typography>
              {persona.nombre1} {persona.nombre2} {persona.apellPat}{' '}
              {persona.apellMat}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <Typography
              style={{
                fontWeight: 'bold',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              RUT
            </Typography>
            <Typography>
              {persona.rut} - {persona.dv}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider flexItem />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={odontogramType.permanent}
                  onChange={handleChangeType}
                />
              }
              label="Permanente"
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
            <FormControlLabel
              control={
                <Checkbox
                  color="primary"
                  checked={odontogramType.temporary}
                  onChange={handleChangeType}
                />
              }
              label="Temporal"
            />
          </Grid>
          <Grid item xs={12}>
            <Divider flexItem />
          </Grid>
          <Grid item xs={12}>
            <Typography
              style={{
                fontSize: 20,
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Dientes
            </Typography>
          </Grid>
          {odontogramType.permanent && (
            <Grid item xs={12}>
              <PermanentForm
                teeth={odontogram.dientes}
                onCheck={handleActiveChange}
              />
            </Grid>
          )}
          <Grid item xs={12}>
            <Button fullWidth variant="contained">
              Registrar Odontograma
            </Button>
          </Grid>
        </Grid>
      </Container>
    </form>
  );
};

export default OdontogramForm;
