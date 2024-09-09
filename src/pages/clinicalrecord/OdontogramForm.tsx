// import {
//   Box,
//   Button,
//   Checkbox,
//   Container,
//   Divider,
//   FormControlLabel,
//   Grid,
//   Switch,
//   Typography,
// } from '@mui/material';
// import React, { useState } from 'react';
// import { OdontogramInterface } from '../../interfaces/Odontogram';
// import { Diente } from '../../interfaces/Diente';
// import { Person } from '../../interfaces/Person';
// import { useThemeContext } from '../../componemts/themeContext';
// import colors from '../../styles/colors';
// import PermanentForm from './FormOdontograms/PermanentForm';
// import toast from 'react-hot-toast';
// import axios from 'axios';
// import { generalConfig } from '../../config';
// import { format } from 'date-fns';

// interface Props {
//   profesionalId: string;
//   persona: Person;
//   afterSubmit: CallableFunction;
// }

// const OdontogramForm = ({ profesionalId, persona, afterSubmit }: Props) => {
//   const { mode } = useThemeContext();

//   const [isSubmitting, setSubmitting] = useState(false);

//   const [odontogramType, setType] = useState({
//     temporary: false,
//     permanent: false,
//   });

//   const [odontogram, setOdontogram] = useState<OdontogramInterface>({
//     profesionalModifica: profesionalId,
//     persona: persona._id,
//     fecha: format(new Date(), 'mm/dd/yyyy'),
//     dientes: [
//       {
//         pieza: '18',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '17',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '16',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '15',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '14',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '13',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '12',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '11',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '21',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '22',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '23',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '24',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '25',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '26',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '27',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '28',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '38',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '37',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '36',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '35',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '34',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '33',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '32',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '31',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '41',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '42',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '43',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '44',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '45',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '46',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '47',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//       {
//         pieza: '48',
//         activo: false,
//         detalle: 'sin novedad',
//         estado: 'sin novedad',
//         diagnostico: 'sin novedad',
//         bucal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         distal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         mesial: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         raiz: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         oclusal: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//         lingualpalatino: {
//           caries: false,
//           restauracion: false,
//           detalle: 'sin novedad',
//           diagnostico: 'sin novedad',
//           estado: 'sin novedad',
//         },
//       },
//     ],
//   });

//   const handleActiveChange = (tooth: Diente) => {
//     const updatedTooth = [...odontogram.dientes];

//     const toothIndex = updatedTooth.indexOf(tooth);

//     updatedTooth[toothIndex].activo = !updatedTooth[toothIndex].activo;

//     setOdontogram((prevState) => ({
//       ...prevState,
//       dientes: [...updatedTooth],
//     }));
//   };

//   const handleChangeType = () => {
//     setType({
//       permanent: !odontogramType.permanent,
//       temporary: !odontogramType.permanent ? false : true,
//     });
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setSubmitting(true);
//       if (odontogramType.permanent) {
//         const response = await axios.post(
//           `${generalConfig.baseUrl}/odontogramas`,
//           odontogram
//         );

//         if (response.data.message === 'success') {
//           toast.success('Nuevo odontograma registrado.');
//         }
//         setSubmitting(false);
//         afterSubmit();
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error('No se pudo registrar odontograma, inténtelo nuevamente');
//       setSubmitting(false);
//     }
//   };

//   return (
//     <>
//       <form onSubmit={handleSubmit}>
//         <Container>
//           <Grid container gap={3} style={{ paddingTop: 10 }}>
//             <Grid item xs={12}>
//               <Typography
//                 style={{
//                   fontSize: 20,
//                   wordWrap: 'break-word',
//                   fontWeight: 'bold',
//                   color: mode === 'light' ? colors.lightModeTableText : 'white',
//                 }}
//               >
//                 Registrar odontograma
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={6} xl={4}>
//               <Typography
//                 style={{
//                   fontWeight: 'bold',
//                   color: mode === 'light' ? colors.lightModeTableText : 'white',
//                 }}
//               >
//                 Paciente
//               </Typography>
//               <Typography>
//                 {persona.nombre1} {persona.nombre2} {persona.apellPat}{' '}
//                 {persona.apellMat}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
//               <Typography
//                 style={{
//                   fontWeight: 'bold',
//                   color: mode === 'light' ? colors.lightModeTableText : 'white',
//                 }}
//               >
//                 RUT
//               </Typography>
//               <Typography>
//                 {persona.rut} - {persona.dv}
//               </Typography>
//             </Grid>
//             <Grid item xs={12}>
//               <Divider flexItem />
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color="primary"
//                     checked={odontogramType.permanent}
//                     onChange={handleChangeType}
//                   />
//                 }
//                 label="Permanente"
//               />
//             </Grid>
//             <Grid item xs={12} sm={12} md={12} lg={4} xl={4}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     color="primary"
//                     checked={odontogramType.temporary}
//                     onChange={handleChangeType}
//                   />
//                 }
//                 label="Temporal"
//               />
//             </Grid>
//             <Grid item xs={12}>
//               <Divider flexItem />
//             </Grid>
//             <Grid item xs={12}>
//               <Typography
//                 style={{
//                   fontSize: 20,
//                   color: mode === 'light' ? colors.lightModeTableText : 'white',
//                 }}
//               >
//                 Dientes
//               </Typography>
//             </Grid>
//             {odontogramType.permanent && (
//               <Grid item xs={12}>
//                 <PermanentForm
//                   teeth={odontogram.dientes}
//                   onCheck={handleActiveChange}
//                 />
//               </Grid>
//             )}
//             <Grid item xs={12}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 type="submit"
//                 disabled={isSubmitting}
//               >
//                 Registrar Odontograma
//               </Button>
//             </Grid>
//           </Grid>
//         </Container>
//       </form>
//     </>
//   );
// };

// export default OdontogramForm;
