import {
  Box,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  Button as MuiButton,
  LinearProgress,
  AppBar,
  Toolbar,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { ITreatment, OdontogramInterface } from '../../interfaces/Odontogram';
import { Diente } from '../../interfaces/Diente';

import { jsPDF } from 'jspdf';

import diente11 from '../../assets/dientes/diente_11.png';
import diente12 from '../../assets/dientes/diente_12.png';
import diente13 from '../../assets/dientes/diente_13.png';
import diente14 from '../../assets/dientes/diente_14.png';
import diente15 from '../../assets/dientes/diente_15.png';
import diente16 from '../../assets/dientes/diente_16.png';
import diente17 from '../../assets/dientes/diente_17.png';
import diente18 from '../../assets/dientes/diente_18.png';
import diente21 from '../../assets/dientes/diente_21.png';
import diente22 from '../../assets/dientes/diente_22.png';
import diente23 from '../../assets/dientes/diente_23.png';
import diente24 from '../../assets/dientes/diente_24.png';
import diente25 from '../../assets/dientes/diente_25.png';
import diente26 from '../../assets/dientes/diente_26.png';
import diente27 from '../../assets/dientes/diente_27.png';
import diente28 from '../../assets/dientes/diente_28.png';
import diente31 from '../../assets/dientes/diente_31.png';
import diente32 from '../../assets/dientes/diente_32.png';
import diente33 from '../../assets/dientes/diente_33.png';
import diente34 from '../../assets/dientes/diente_34.png';
import diente35 from '../../assets/dientes/diente_35.png';
import diente36 from '../../assets/dientes/diente_36.png';
import diente37 from '../../assets/dientes/diente_37.png';
import diente38 from '../../assets/dientes/diente_38.png';
import diente41 from '../../assets/dientes/diente_41.png';
import diente42 from '../../assets/dientes/diente_42.png';
import diente43 from '../../assets/dientes/diente_43.png';
import diente44 from '../../assets/dientes/diente_44.png';
import diente45 from '../../assets/dientes/diente_45.png';
import diente46 from '../../assets/dientes/diente_46.png';
import diente47 from '../../assets/dientes/diente_47.png';
import diente48 from '../../assets/dientes/diente_48.png';
import diente51 from '../../assets/dientes/diente_51.png';
import diente52 from '../../assets/dientes/diente_52.png';
import diente53 from '../../assets/dientes/diente_53.png';
import diente54 from '../../assets/dientes/diente_54.png';
import diente55 from '../../assets/dientes/diente_55.png';
import diente61 from '../../assets/dientes/diente_61.png';
import diente62 from '../../assets/dientes/diente_62.png';
import diente63 from '../../assets/dientes/diente_63.png';
import diente64 from '../../assets/dientes/diente_64.png';
import diente65 from '../../assets/dientes/diente_65.png';
import diente71 from '../../assets/dientes/diente_71.png';
import diente72 from '../../assets/dientes/diente_72.png';
import diente73 from '../../assets/dientes/diente_73.png';
import diente74 from '../../assets/dientes/diente_74.png';
import diente75 from '../../assets/dientes/diente_75.png';
import diente81 from '../../assets/dientes/diente_81.png';
import diente82 from '../../assets/dientes/diente_82.png';
import diente83 from '../../assets/dientes/diente_83.png';
import diente84 from '../../assets/dientes/diente_84.png';
import diente85 from '../../assets/dientes/diente_85.png';

import { Button, ButtonGroup } from 'rsuite';
import Tooth from '../../componemts/Tooth';
import { Professional } from '../../interfaces/Professional';
import { useUser } from '../../auth/userContext';
import { User } from '../../interfaces/User';
import { Delete } from '@mui/icons-material';
import colors from '../../styles/colors';
import { useThemeContext } from '../../componemts/themeContext';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { generalConfig } from '../../config';
import TreatmentForm from './TreatmentForm';
import { Person } from '../../interfaces/Person'



const isPerson = (persona: any): persona is Person => {
  return typeof persona === 'object' && persona !== null && 'rut' in persona;
};
interface Address {
  ciudad: {
    _id: string;       // ID único de la ciudad
    nombre: string;    // Nombre de la ciudad
    vigente: string;   // Estado de vigencia de la ciudad
  };
  nombre: string;      // Nombre de la dirección
  _id: string;         // ID único de la dirección
}
interface Morbido {
  descripcion: string;
  detail: string;
  _id: string;
}

interface General {
  descripcion: string;
  _id: string;
}

interface Familiar {
  descripcion: string;
  _id: string;
}

interface Alergia {
  descripcion: string;
  _id: string;
}

interface Habito {
  descripcion: string;
  _id: string;
}

interface Antecedents {
  _id: string;
  persona: string;
  morbidos: Morbido[];
  familiares: Familiar[];
  generales: General[];
  habitos: Habito[];
  alergias: Alergia[];
  __v: number;
}




type DienteKeys =
  `diente${11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48 | 51 | 52 | 53 | 54 | 55 | 61 | 62 | 63 | 64 | 65 | 71 | 72 | 73 | 74 | 75 | 81 | 82 | 83 | 84 | 85}`;

const dientesImages: Record<DienteKeys, string> = {
  diente11: diente11,
  diente12: diente12,
  diente13: diente13,
  diente14: diente14,
  diente15: diente15,
  diente16: diente16,
  diente17: diente17,
  diente18: diente18,
  diente21: diente21,
  diente22: diente22,
  diente23: diente23,
  diente24: diente24,
  diente25: diente25,
  diente26: diente26,
  diente27: diente27,
  diente28: diente28,
  diente31: diente31,
  diente32: diente32,
  diente33: diente33,
  diente34: diente34,
  diente35: diente35,
  diente36: diente36,
  diente37: diente37,
  diente38: diente38,
  diente41: diente41,
  diente42: diente42,
  diente43: diente43,
  diente44: diente44,
  diente45: diente45,
  diente46: diente46,
  diente47: diente47,
  diente48: diente48,
  diente51: diente51,
  diente52: diente52,
  diente53: diente53,
  diente54: diente54,
  diente55: diente55,
  diente61: diente61,
  diente62: diente62,
  diente63: diente63,
  diente64: diente64,
  diente65: diente65,
  diente71: diente71,
  diente72: diente72,
  diente73: diente73,
  diente74: diente74,
  diente75: diente75,
  diente81: diente81,
  diente82: diente82,
  diente83: diente83,
  diente84: diente84,
  diente85: diente85,
};

const items = [
  { title: 'Resetear parte', id: 0, color: '#FFFFFF' },
  { title: 'Aparato Ortodontico Fijo', id: 1, color: '#AB9ECD' },
  { title: 'Aparato Ortodontico Removible', id: 2, color: '#FF5241' },
  { title: 'Caries', id: 3, color: '#FF0000' },
  { title: 'Corona Definitiva', id: 4, color: '#FFCF36' },
  { title: 'Corona Provisoria', id: 5, color: '#FF9729' },
  { title: 'Desgaste Oclusal/Incisal', id: 6, color: '#808080' },
  { title: 'Diastema', id: 7, color: '#00CED1' },
  { title: 'Diente Ausente', id: 8, color: '#000000' },
  { title: 'Diente Discromico', id: 9, color: '#8B4513' },
  { title: 'Diente Ectopico', id: 10, color: '#4682B4' },
  { title: 'Diente Extruido', id: 12, color: '#FF69B4' },
  { title: 'Diente Intruido', id: 13, color: '#DB7093' },
  { title: 'Endentulo Total', id: 14, color: '#D3D3D3' },
  { title: 'Fractura', id: 15, color: '#A52A2A' },
  { title: 'Geminación/Fusión', id: 16, color: '#BA55D3' },
  { title: 'Impactación', id: 17, color: '#8B0000' },
  { title: 'Implante', id: 18, color: '#2E8B57' },
  { title: 'Macrodoncia', id: 19, color: '#8FBC8F' },
  { title: 'Microdoncia', id: 20, color: '#87CEEB' },
  { title: 'Migración', id: 21, color: '#6A5ACD' },
  { title: 'Movilidad', id: 22, color: '#FFB6C1' },
  { title: 'Protesis Fija Plural', id: 23, color: '#B8860B' },
  { title: 'Protesis Removible Parcial', id: 24, color: '#F4A460' },
  { title: 'Protesis Removible Total', id: 25, color: '#FFDEAD' },
  { title: 'Resto Radicular', id: 26, color: '#2F4F4F' },
  { title: 'Restauración', id: 27, color: '#32CD32' },
  { title: 'Restauración Temporal', id: 28, color: '#9ACD32' },
  { title: 'Semi Impactación', id: 29, color: '#B22222' },
  { title: 'Supernumerario', id: 30, color: '#FF8C00' },
  { title: 'Tratamiento Pulpar', id: 31, color: '#FF6347' },
  { title: 'Giroversión', id: 32, color: '#B0E0E6' },
  { title: 'Transposición', id: 33, color: '#20B2AA' },
  { title: 'Diente incluido', id: 34, color: '#B11720' },

];

interface Props {
  odontogram: OdontogramInterface | undefined;
}

const Odontogramm = ({ odontogram }: Props) => {
  const [treatments, setTreatments] = useState<ITreatment[]>([]);
  const { user } = useUser();
  const { mode } = useThemeContext();

  const [odontogramLoading, setLoading] = useState(true);

  const [treatmentForm, setTreatmentForm] = useState(false);
  const [treatmentToEdit, setEditTreatment] = useState<ITreatment>();

  const [isSubmitting, setSubmitting] = useState(false);

  const [treatment, setTreatment] = useState({
    selected: 0,
    color: '',
  });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [type, setType] = useState('permanent');

  const [teeth, setTeeth] = useState<Diente[]>();
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [convenios, setConvenios] = useState<any[]>([]);
  const [antecedents, setAntecedents] = useState<Antecedents | null>(null);

  // useEffect para obtener los antecedentes
  useEffect(() => {
    const fetchAntecedents = async () => {
      try {
        if (odontogram && isPerson(odontogram.persona)) {
          const personId = odontogram.persona._id;
          const res = await axios.get(
            `${generalConfig.baseUrl}/antecedents/getantecedents/${personId}`
          );
          const data = res.data;
          if (data && data.message === 'success' && Array.isArray(data.body)) {
            setAntecedents(data.body[0]); // Asumiendo que siempre hay un objeto en el array
          } else {
            setAntecedents([]);
          }
        }
      } catch (error) {
        console.error('Error fetching antecedents:', error);
        setAntecedents([]);
      }
    };

    fetchAntecedents();
  }, [odontogram]);

  useEffect(() => {
    const fetchConvenios = async () => {
      try {
        // Verificar si existe persona y su _id
        if (odontogram && isPerson(odontogram.persona)) {
          const personId = odontogram.persona._id;
          // Llamar a tu endpoint NestJS: GET /api/persons/convenios/:id
          const res = await axios.get(
            `${generalConfig.baseUrl}/persons/convenios/${personId}`
          );
          // Respuesta esperada: { message: 'success', body: {..., convenios: [...] } }
          const data = res.data;
          if (data && data.body && Array.isArray(data.body.convenios)) {
            setConvenios(data.body.convenios);
          } else {
            setConvenios([]); // en caso de que no vengan convenios
          }
        }
      } catch (error) {
        console.error('Error fetching convenios:', error);
        setConvenios([]);
      }
    };

    fetchConvenios();
  }, [odontogram]);

  useEffect(() => {
    const fetchAddresses = async () => {
      if (odontogram && isPerson(odontogram.persona)) {
        try {
          const response = await axios.get(
            `${generalConfig.baseUrl}/address-book/getaddresses/${odontogram.persona._id}`
          );

          // Imprime directamente los datos de la respuesta
          console.log("addresses from response", response.data.body);

          // Actualiza el estado con los datos obtenidos
          setAddresses(response.data.body || []);
        } catch (error) {
          console.error('Error fetching addresses:', error);
        }
      }
    };

    fetchAddresses();
  }, [odontogram]);


  useEffect(() => {
    if (odontogram && odontogram.dientes) {
      setTeeth(odontogram.dientes);
    }
  }, [odontogram]);

  useEffect(() => {
    if (odontogram && odontogram.dientes) {
      // Forzar un ligero retraso
      setLoading(true);
      setTimeout(() => {
        setTeeth(odontogram.dientes);
        setTreatments(odontogram.tratamientos);
        setLoading(false);
      }, 100);
    }
  }, [odontogram]);

  const handleUpdate = (tooth: Diente, part: string) => {
    const updatedTeeth = [...teeth!];

    const indexOfOldTooth = teeth!.findIndex(
      (d: Diente) => d._id === tooth._id
    );

    updatedTeeth[indexOfOldTooth] = tooth;

    setTeeth(updatedTeeth);

    const getTreatment = items.find((i) => i.id === treatment.selected);

    if (!getTreatment) {
      // Manejar el caso en que NO se encuentre el tratamiento, por ejemplo:
      return; // o mostrar un error, etc.
    }

    if (getTreatment?.title === 'Resetear parte') {
      // Eliminar el tratamiento correspondiente a esta pieza y parte
      const newTreatments = treatments.filter(
        (t) => !(t.pieza.diente === tooth.pieza && t.pieza.parte === part)
      );
      setTreatments(newTreatments);
    } else {
      // Aquí mantienes la lógica existente de agregar un nuevo tratamiento
      // Si no existe un tratamiento igual en el día de hoy
      const today = new Date().toDateString();
      const treatmentExists = treatments.some(
        (t) =>
          t.pieza.diente === tooth.pieza &&
          t.pieza.parte === part &&
          t.detalle === getTreatment.title &&
          new Date(t.fecha).toDateString() === today
      );

      if (!treatmentExists) {
        setTreatments([
          ...treatments,
          {
            detalle: getTreatment.title,
            fecha: new Date(),
            profesional: (user as User).profesionalId,
            pieza: {
              diente: tooth.pieza!,
              parte: part,
            },
            _id: (Math.random() * 1000).toString(),
            observacion: 'sin novedad',
          },
        ]);
      }
    }
  };
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      const treatmentsWithoutId = treatments.map(({ _id, ...rest }) => rest);

      const response = await axios.patch(
        `${generalConfig.baseUrl}/odontogramas/${odontogram?._id}`,

        {
          profesionalModifica: (user as User).profesionalId,
          tratamientos: treatmentsWithoutId,
          dientes: teeth,
        }
      );
      console.log('id de odontograma', odontogram?.persona);

      if (response.data.message === 'success') {
        toast.success('Cambios guardados.');
      }
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
      toast.error('No se pudo guardar el odontograma, inténtelo nuevamente.');
      console.log(error);
    }
  };

  const calculateAge = (fechaNac: string): number => {
    const today = new Date();
    const birthDate = new Date(fechaNac);

    let age = today.getFullYear() - birthDate.getFullYear();

    // Verificar si el cumpleaños ya ocurrió este año
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  };
  console.log("Odontogram!:", odontogram);
  console.log("Persona!:", odontogram?.persona);
 

  const generateDentistPDF = async () => {
    
    try {
      const doc = new jsPDF('portrait', 'mm', 'a4');
      const persona = odontogram?.persona;

      if (!isPerson(persona)) {
        console.error('La persona no es del tipo esperado.');
        return;
      }

      const rutCompleto = `${persona.rut}-${persona.dv}`;
      const fechaNacimiento = new Date(persona.fechaNac).toLocaleDateString();
      const edad = calculateAge(persona.fechaNac instanceof Date ? persona.fechaNac.toISOString() : persona.fechaNac);

      const pageWidth = doc.internal.pageSize.getWidth();
       // 1. Definir límites de la página
       const PAGE_HEIGHT = 297; // Altura total de una hoja A4 en mm
       const MARGIN = 10; // Márgenes en mm
       const MAX_Y = PAGE_HEIGHT - MARGIN; // Posición Y máxima antes de añadir una nueva página
   
       // 2. Función de utilidad para añadir texto con verificación de salto de página
       const addTextWithPageCheck = (
         text: string,
         x: number,
         y: number,
         lineHeight: number = 8
       ): number => {
         if (y + lineHeight > MAX_Y) {
           doc.addPage();
           y = MARGIN; // Reiniciar posición Y en la nueva página
   
           // Repetir encabezados si es necesario
           doc.setFontSize(18);
           doc.setTextColor(255, 105, 180);
           doc.setFont('helvetica', 'bold');
           doc.text('Clínica Dental', pageWidth / 2 - 20, 20, { align: 'center' });
   
           doc.setTextColor(0, 102, 204);
           doc.text('AMANIA', pageWidth / 2 + 20, 20, { align: 'center' });
   
           doc.setFontSize(16);
           doc.setTextColor(0, 102, 204);
           doc.text('Odontograma', pageWidth / 2, 30, { align: 'center' });
   
           doc.setFontSize(10);
           doc.setFont('helvetica', 'normal');
   
           return y; // Y se ha reiniciado
         }
         doc.text(text, x, y);
         return y + lineHeight;
       };
   
       // 3. Agregar encabezados
       doc.setFontSize(18);
       doc.setTextColor(255, 105, 180);
       doc.setFont('helvetica', 'bold');
       doc.text('Clínica Dental', pageWidth / 2 - 20, 20, { align: 'center' });
   
       doc.setTextColor(0, 102, 204);
       doc.text('AMANIA', pageWidth / 2 + 20, 20, { align: 'center' });
   
       doc.setFontSize(16);
       doc.setTextColor(0, 102, 204);
       doc.text('Odontograma', pageWidth / 2, 30, { align: 'center' });
   
       const logoUrl = '/logo.png';
       doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
   
       const cellHeight = 8;
       const startX = 10;
       let currentY = 50;
   
       doc.setFontSize(10);
       doc.setFont('helvetica', 'normal');


      // Fila: Apellido paterno, materno y nombres
      doc.setTextColor(0, 0, 0);
      doc.rect(startX, currentY, 190, cellHeight);
      doc.line(startX + 63.33, currentY, startX + 63.33, currentY + cellHeight);
      doc.line(startX + 126.66, currentY, startX + 126.66, currentY + cellHeight);
      doc.text('APELLIDO PATERNO', startX + 2, currentY + 5);
      doc.text('APELLIDO MATERNO', startX + 65, currentY + 5);
      doc.text('NOMBRES', startX + 130, currentY + 5);
      currentY += cellHeight;

      doc.rect(startX, currentY, 190, cellHeight);
      doc.line(startX + 63.33, currentY, startX + 63.33, currentY + cellHeight);
      doc.line(startX + 126.66, currentY, startX + 126.66, currentY + cellHeight);
      doc.text(`${persona.apellPat}`, startX + 2, currentY + 5);
      doc.text(`${persona.apellMat}`, startX + 65, currentY + 5);
      doc.text(`${persona.nombre1} ${persona.nombre2}`, startX + 130, currentY + 5);
      currentY += cellHeight;

      // Fila: Rut, Edad, Sexo, Fecha de Nacimiento
      doc.rect(startX, currentY, 190, cellHeight);
      doc.line(startX + 63.33, currentY, startX + 63.33, currentY + cellHeight);
      doc.line(startX + 94.995, currentY, startX + 94.995, currentY + cellHeight);
      doc.line(startX + 126.66, currentY, startX + 126.66, currentY + cellHeight);
      doc.text('RUT', startX + 2, currentY + 5);
      doc.text('EDAD', startX + 65, currentY + 5);
      doc.text('SEXO', startX + 96, currentY + 5);
      doc.text('FECHA DE NACIMIENTO', startX + 130, currentY + 5);
      currentY += cellHeight;

      doc.rect(startX, currentY, 190, cellHeight);
      doc.line(startX + 63.33, currentY, startX + 63.33, currentY + cellHeight);
      doc.line(startX + 94.995, currentY, startX + 94.995, currentY + cellHeight);
      doc.line(startX + 126.66, currentY, startX + 126.66, currentY + cellHeight);
      doc.text(`${rutCompleto}`, startX + 2, currentY + 5);
      doc.text(`${edad} años`, startX + 65, currentY + 5);
      doc.text(`${persona.sexo.nombre}`, startX + 96, currentY + 5);
      doc.text(`${fechaNacimiento}`, startX + 130, currentY + 5);
      currentY += cellHeight;

      currentY += cellHeight; // Agregar espacio vacío antes del título

      // Celda del título "PREVISIÓN:"
      doc.rect(startX, currentY, 190, cellHeight); // Dibujar borde de la celda
      doc.text(`PREVISIÓN:`, startX + 2, currentY + 7); // Texto del título
      currentY += cellHeight;

      // Filas dinámicas para los valores de prevision
      const prevision = persona.institucion?.nombre ? [persona.institucion.nombre] : ['Sin Presión']; // Asegura que haya al menos un valor
      prevision.forEach((prevision) => {
        doc.rect(startX, currentY, 190, cellHeight); // Dibujar borde de cada fila
        doc.text(prevision, startX + 2, currentY + 5); // Texto del convenio
        currentY += cellHeight; // Avanza a la siguiente fila
      });
      currentY += cellHeight; // Agregar espacio vacío antes del título

      // Celda del título "CONVENIOS:"
      const conveniosList = convenios.length
        ? convenios.map((c) => c.prestacionTipo?.nombre || 'Sin convenio')
        : ['Sin convenios disponibles'];

      // 2. Generamos sección "CONVENIOS"
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);

      // Luego dibujar el texto
      doc.text('CONVENIOS:', startX + 2, currentY + 7);
      currentY += cellHeight;

      conveniosList.forEach((convenio) => {

        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(convenio, startX + 2, currentY + 5);
        currentY += cellHeight;
      });



      // Filas dinámicas de direcciones
      currentY += cellHeight;
      doc.rect(startX, currentY, 190, cellHeight); // Borde de la celda del título
      doc.text(`DIRECCIÓN:`, startX + 2, currentY + 5); // Texto del título
      currentY += cellHeight; // Avanza a la siguiente fila

      // Filas dinámicas de direcciones
      addresses.forEach((address) => {
        const ciudadNombre = address.ciudad?.nombre || 'Sin ciudad';
        const direccionNombre = address.nombre || 'Sin dirección';

        // Celda de cada dirección
        doc.rect(startX, currentY, 190, cellHeight); // Borde de la celda
        doc.text(`${ciudadNombre}, ${direccionNombre}`, startX + 2, currentY + 5); // Texto de la celda
        currentY += cellHeight; // Avanza a la siguiente fila
      });

      currentY += cellHeight;


      // doc.text('Direcciones:', 10, 50);
      // addresses.forEach((address, index) => {
      //   doc.text(`- ${address}`, 10, 60 + index * 10);
      // });

      // Fila: Teléfono
      doc.rect(startX, currentY, 190, cellHeight);
      doc.text('FONO:', startX + 2, currentY + 7);
      currentY += cellHeight;
      doc.addPage();

// Reiniciar currentY al margen superior
      // Margen superior en mm
      doc.setFontSize(18);
      doc.setTextColor(255, 105, 180);
      doc.setFont('helvetica', 'bold');
      doc.text('Clínica Dental', pageWidth / 2 - 20, 20, { align: 'center' });
  
      doc.setTextColor(0, 102, 204);
      doc.text('AMANIA', pageWidth / 2 + 20, 20, { align: 'center' });
  
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204);
      doc.text('Odontograma', pageWidth / 2, 30, { align: 'center' });
  
     
      doc.addImage(logoUrl, 'PNG', 10, 10, 30, 30);
  
     
  
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
     currentY = 60;  

    

        // 9. Secciones Dinámicas: GENERALES, FAMILIARES, MÓRBIDOS, ALÉRGIAS, HÁBITOS
    if (antecedents) {
      const generalesListt = antecedents.generales?.length
        ? antecedents.generales.map((g: General) => g.descripcion || 'Sin datos generales')
        : ['Sin datos generales'];

      const familiaresList = antecedents.familiares?.length
        ? antecedents.familiares.map((f: Familiar) => f.descripcion || 'Sin datos familiares')
        : ['Sin datos familiares'];

      const morbidosList = antecedents.morbidos?.length
        ? antecedents.morbidos.map((m: Morbido) => `${m.descripcion}: ${m.detail || 'Sin detalles'}`)
        : ['Sin datos mórbidos'];

      const alergiasList = antecedents.alergias?.length
        ? antecedents.alergias.map((a: Alergia) => a.descripcion || 'Sin datos de alergias')
        : ['Sin datos de alergias'];

      const habitosList = antecedents.habitos?.length
        ? antecedents.habitos.map((h: Habito) => h.descripcion || 'Sin datos de hábitos')
        : ['Sin datos de hábitos'];

      
     

      // -------------------------------
      // Secciones Dinámicas: GENERALES, FAMILIARES, MÓRBIDOS, ALÉRGIAS, HÁBITOS
      // -------------------------------
     
      // 1) GENERALES
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);
      doc.text('GENERALES:', startX + 2, currentY + 5);
      currentY += cellHeight;

      generalesListt.forEach((item) => {
        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(item, startX + 2, currentY + 5);
        currentY += cellHeight;
      });
      currentY += cellHeight
      // 2) FAMILIARES
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);
      doc.text('FAMILIARES:', startX + 2, currentY + 5);
      currentY += cellHeight;

      familiaresList.forEach((item: any) => {
        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(item, startX + 2, currentY + 5);
        currentY += cellHeight;
      });
      currentY += cellHeight
      // 3) MÓRBIDOS
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);
      doc.text('MÓRBIDOS:', startX + 2, currentY + 5);
      currentY += cellHeight;

      morbidosList.forEach((item: any) => {
        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(item, startX + 2, currentY + 5);
        currentY += cellHeight;
      });
      currentY += cellHeight
      // 4) ALÉRGIAS
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);
      doc.text('ALÉRGIAS:', startX + 2, currentY + 5);
      currentY += cellHeight;

      alergiasList.forEach((item: any) => {
        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(item, startX + 2, currentY + 5);
        currentY += cellHeight;
      });
      currentY += cellHeight

      // 5) HÁBITOS
      doc.rect(startX, currentY, 190, cellHeight);
      doc.setTextColor(0, 0, 0);
      doc.text('HÁBITOS:', startX + 2, currentY + 5);
      currentY += cellHeight;

      habitosList.forEach((item: any) => {
        doc.rect(startX, currentY, 190, cellHeight);
        doc.text(item, startX + 2, currentY + 5);
        currentY += cellHeight;
      });




      currentY += cellHeight * 3;

     

      currentY += cellHeight * 4;
      doc.addPage();

      // Odontograma
      const toothWidth = 7;
      const toothHeight = 10;
      const gap = 5;
      let toothX = startX;
      let toothY = 20;

      // Encabezado
      // Título "Clínica Dental" (color rosa)
      doc.setFontSize(18);
      doc.setTextColor(255, 105, 180);
      doc.setFont('helvetica', 'bold');
      doc.text('Clínica Dental', pageWidth / 2 - 20, 20, { align: 'center' });

      // Título "AMANIA" (color azul)
      doc.setTextColor(0, 102, 204); // Azul (RGB: 0, 102, 204)
      doc.text('AMANIA', pageWidth / 2 + 20, 20, { align: 'center' });

      // Subtítulo "ODONTOGRAMA" (azul también)
      doc.setFontSize(16);
      doc.setTextColor(0, 102, 204); // Azul (igual que "AMANIA")
      doc.text('Odontograma', pageWidth / 2, 30, { align: 'center' });

      doc.addImage(logoUrl, 'PNG', 10, 3, 30, 30);

      // Función para pintar las secciones de la cruz
      const drawToothShape = (x: number, y: number, toothParts: any) => {
        const size = 2;
        const parts = [
          { key: 'bucal', x: x + size, y: y, w: size, h: size }, // Arriba
          { key: 'distal', x: x, y: y + size, w: size, h: size }, // Izquierda
          { key: 'oclusal', x: x + size, y: y + size, w: size, h: size }, // Centro
          { key: 'mesial', x: x + 2 * size, y: y + size, w: size, h: size }, // Derecha
          {
            key: 'lingualpalatino',
            x: x + size,
            y: y + 2 * size,
            w: size,
            h: size,
          }, // Abajo
        ];

        parts.forEach((part) => {
          let color = toothParts?.[part.key]?.color || '#FFFFFF';

          if (color.includes('255\t151\t41')) {
            color = '#FF9729';
          }
          doc.setFillColor(color);
          doc.rect(part.x, part.y, part.w, part.h, 'FD');
        });

      };

      // Función para dibujar una fila de dientes
      const drawTeethRow = (
        teeth: Diente[],
        treatmentsData: any,
        startY: number,
        startX: number
      ) => {
        let toothX = startX;
        let toothY = startY + 30;

        teeth.forEach((tooth) => {
          if (toothX + toothWidth > pageWidth - startX) {
            toothX = startX;
            toothY += toothHeight + gap * 8;
          }

          // Dibujar número del diente
          doc
            .setFontSize(8)
            .text(`${tooth.pieza}`, toothX + toothWidth / 3, toothY - 2);

          // Imagen del diente
          const toothImage =
            dientesImages[`diente${tooth.pieza}` as DienteKeys];
          if (toothImage) {
            doc.addImage(
              toothImage,
              'PNG',
              toothX,
              toothY,
              toothWidth,
              toothHeight
            );
          }

          // Obtener tratamiento dinámico del backend
          const toothParts = tooth.pieza ? treatmentsData[tooth.pieza] : {}; // fallback to an empty object

          drawToothShape(toothX + 1, toothY + toothHeight + 3, toothParts);

          toothX += toothWidth + gap;
        });
      };

      // Datos dinámicos de tratamientos desde el backend
      const treatmentsData: any = {};
      teeth?.forEach((tooth) => {
        treatmentsData[tooth.pieza!] = {
          bucal: { color: tooth.bucal.color },
          mesial: { color: tooth.mesial.color },
          distal: { color: tooth.distal.color },
          lingualpalatino
            : { color: tooth.lingualpalatino.color },
          oclusal: { color: tooth.oclusal.color },
        };
      });

      // Definir dientes superiores e inferiores
      const upperTeeth = teeth!.filter((t: Diente) => parseInt(t.pieza!) < 31);
      const lowerTeeth = teeth!.filter(
        (t: Diente) => parseInt(t.pieza!) >= 31 && parseInt(t.pieza!) < 51
      );

      // Calcular el área total de los dientes
      const totalWidth =
        upperTeeth.length * toothWidth + (upperTeeth.length - 1) * gap;
      const totalHeight = (toothHeight + gap * 3) * 2; // Dos filas de dientes

      // Dibujar el rectángulo envolvente
      doc.setDrawColor(0); // Color del borde (negro)
      doc.setLineWidth(0.1); // Grosor del borde
      doc.rect(startX - 5, 60 - 5, totalWidth + 10, totalHeight + 10); // Rectángulo envolvente

      // Dibujar filas de dientes
      drawTeethRow(upperTeeth, treatmentsData, 30, startX);
      drawTeethRow(
        lowerTeeth,
        treatmentsData,
        30 + toothHeight + gap * 4,
        startX
      );

      const cellHeight1 = 8;
      const totalRows = 40; // Total de filas para la tabla

      currentY = 100;

      currentY += cellHeight1 * 2;
      // Título de la página
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0);

      currentY += cellHeight1 * 2;

      // Dibujar tabla de EVOLUCIÓN
      const headers = ['FECHA', 'DIENTE', 'EVOLUCIÓN'];
      const columnWidths = [40, 30, 120];

      // Agregar encabezado
      doc.setFont('helvetica', 'bold');
      headers.forEach((header, index) => {
        doc.rect(
          startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
          currentY,
          columnWidths[index],
          10
        );
        doc.text(
          header,
          startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0) + 2,
          currentY + 7
        );
      });
      currentY += 10;

      // Agregar filas dinámicas desde el estado `treatments`
      treatments.forEach((treatment) => {
        const values = [
          new Date(treatment.fecha).toLocaleDateString(), // FECHA
          `${treatment.pieza.diente} ${treatment.pieza.parte}`, // DIENTE
          treatment.detalle, // EVOLUCIÓN
        ];

        values.forEach((value, index) => {
          doc.rect(
            startX + columnWidths.slice(0, index).reduce((a, b) => a + b, 0),
            currentY,
            columnWidths[index],
            10
          );
          doc.text(
            value,
            startX +
            columnWidths.slice(0, index).reduce((a, b) => a + b, 0) +
            2,
            currentY + 7
          );
        });

        currentY += 10;

        // Agregar una nueva página si la tabla excede el límite de la página actual
        if (currentY > 280) {
          doc.addPage();
          currentY = 20; // Reiniciar posición Y
        }
      });

      doc.save('ficha_dental.pdf');
    }} catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  };

  const onChangeTreatment = (obs: string, id: string) => {
    const updatedTreatments = [...treatments];
    const index = treatments.findIndex((t: ITreatment) => t._id === id);

    updatedTreatments[index].observacion = obs;

    setTreatments(updatedTreatments);
  };

  console.log(treatments);
  const treatmentColorMap: Record<string, string> = {
    'Caries': '#FF0000',
    'Corona Definitiva': '#FFCF36',
    'Corona Provisoria': '#FF9729',
    'Restauración': '#32CD32',
    'Fractura': '#A52A2A',
    'Endodoncia': '#00CED1',
    'Protesis Fija': '#B8860B',
    'Protesis Removible': '#F4A460',
    'Protesis Total': '#FFDEAD',
    'Aparato Ortodontico Fijo': '#AB9ECD',
    'Aparato Ortodontico Removible': '#FF5241',
    'Tratamiento Pulpar': '#FF6347',
    'Diente Ausente': '#000000',
    'Diente Discromico': '#8B4513',
    'Giroversión': '#B0E0E6',
    'Implante': '#2E8B57',
    'Migración': '#6A5ACD',
    'Movilidad': '#FFB6C1',
    'Microdoncia': '#87CEEB',
    'Macrodoncia': '#8FBC8F',
    'Semi Impactación': '#B22222',
    'Supernumerario': '#FF8C00',
    'Restauración Temporal': '#9ACD32',
    'Desgaste Oclusal/Incisal': '#808080',
    'Diastema': '#00CED1',
    'Geminación/Fusión': '#BA55D3',
    'Impactación': '#8B0000',
    'Resto Radicular': '#2F4F4F',
    'Diente incluido': '#B11720',
    'Diente Extruido': '#FF69B4',
    'Diente Intruido': '#DB7093',
    'Endentulo Total': '#D3D3D3',
    'Protesis Fija Plural': '#B8860B',
    'Protesis Removible Parcial': '#F4A460',
    'Protesis Removible Total': '#FFDEAD',
    'Transposición': '#20B2AA',
  };

  const treatmentsWithColor = treatments.map((t: ITreatment) => {
    const treatmentColor = treatmentColorMap[t.detalle] || '#FFFFFF';
    return {
      ...t,
      pieza: {
        ...t.pieza,
        bucal:
          t.pieza.parte === 'bucal'
            ? { color: treatmentColor }
            : { color: '#FFFFFF' },
        distal:
          t.pieza.parte === 'distal'
            ? { color: treatmentColor }
            : { color: '#FFFFFF' },
        oclusal:
          t.pieza.parte === 'oclusal'
            ? { color: treatmentColor }
            : { color: '#FFFFFF' },
        mesial:
          t.pieza.parte === 'mesial'
            ? { color: treatmentColor }
            : { color: '#FFFFFF' },
        lingualpalatino:
          t.pieza.parte === 'lingualpalatino'
            ? { color: treatmentColor }
            : { color: '#FFFFFF' },
      },
    };
  });

  if (!odontogram) return <LinearProgress />;

  return (
    <>
      <Grid container>
        <Grid item xs={12} style={{ paddingBottom: 20 }}>
          <Grid container>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <Box>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  Fecha de registro
                </Typography>

                <Typography
                  style={{
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  {odontogram?.fecha}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={5} xl={5}>
              <Box>
                <Typography
                  style={{
                    fontWeight: 'bold',
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  Última modificación
                </Typography>

                <Typography
                  style={{
                    color:
                      mode === 'light' ? colors.lightModeTableText : 'white',
                    textAlign: 'center',
                  }}
                >
                  {odontogram &&
                    (odontogram.profesionalModifica as Professional)
                      .nombre1}{' '}
                  {odontogram &&
                    (odontogram.profesionalModifica as Professional).apellPat}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <MuiButton
              variant="contained"
              color="primary" // Funciona correctamente con Material-UI
              onClick={generateDentistPDF}
            >
              Descargar PDF
            </MuiButton>
          </div>
        </Grid>

        <Grid item xs={12} style={{ marginBottom: 15 }}>
          <MuiButton
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            Guardar Cambios
          </MuiButton>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={3}
          xl={3}
          style={{ height: 'calc(500px + 0.75rem)' }}
          className="border-2 border-b-0 rounded-tl-md overflow-y-auto no-scrollbar"
        >
          <Box>
            <Box
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeTableHead
                    : colors.darkModeTableHead,
                padding: 10,
              }}
            >
              <Typography
                style={{
                  fontWeight: 'bold',
                  color: mode === 'light' ? colors.lightModeTableText : 'white',
                  textAlign: 'center',
                }}
              >
                Condiciones/ Tratamientos dentales
              </Typography>
            </Box>
            {items.map((item) => {
              return (
                <Box
                  key={item.id}
                  className={`flex items-center ${treatment.selected === item.id ? 'scale-[1.03] transition-all bg-green-500' : ''} pl-3`}
                >
                  <div
                    style={{ backgroundColor: item.color }}
                    className="rounded-full w-6 h-6 mr-2"
                  ></div>
                  <Typography
                    style={{ borderBottom: '1px solid #e1e3e3' }}
                    className={` cursor-pointer p-3 w-full ${treatment.selected === item.id ? 'text-white' : ''}`}
                    onClick={() => {
                      setTreatment((prevState) => ({
                        color: item.color,
                        selected: item.id,
                      }));
                    }}
                  >
                    {item.title}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={9}
          xl={9}
          className="border-2 border-b-0 pt-3 rounded-tr-md"
        >
          {odontogramLoading && (
            <Grid
              className="no-scrollbar "
              container
              direction={'column'}
              justifyContent={'center'}
              alignItems="center"
              gap={3}
              style={{ height: '500px', overflow: 'scroll' }}
            >
              <Grid item>
                <LinearProgress />
              </Grid>
            </Grid>
          )}
          {!odontogramLoading && (
            <Grid
              className="no-scrollbar "
              container
              direction={'column'}
              justifyContent={'center'}
              alignItems="center"
              gap={3}
              style={{ height: '500px', overflow: 'scroll' }}
            >
              <Grid item>
                <ButtonGroup>
                  <Button onClick={() => setType('permanent')}>
                    Permanente
                  </Button>
                  <Button onClick={() => setType('temporary')}>Temporal</Button>
                </ButtonGroup>
              </Grid>
              {type === 'permanent' && (
                <>
                  <Grid item>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter((t: Diente) => parseInt(t.pieza!) < 31)
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center "
                                style={{ height: '100%' }}
                              >
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter(
                            (t: Diente) =>
                              parseInt(t.pieza!) >= 31 &&
                              parseInt(t.pieza!) < 51
                          )
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center ju"
                                style={{ height: '100%' }}
                              >
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>{' '}
                </>
              )}
              {type === 'temporary' && (
                <>
                  <Grid item>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter(
                            (t: Diente) =>
                              parseInt(t.pieza!) > 48 &&
                              parseInt(t.pieza!) <= 65
                          )
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center "
                                style={{ height: '100%' }}
                              >
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>
                  <Grid item xs>
                    <Grid container>
                      {teeth &&
                        teeth
                          .filter((t: Diente) => parseInt(t.pieza!) >= 71)
                          .map((t: Diente) => {
                            const dienteKey = `diente${t.pieza}` as DienteKeys;
                            return (
                              <div
                                key={t._id}
                                className="flex-col items-center justify-center ju"
                                style={{ height: '100%' }}
                              >
                                <div
                                  style={{ width: '100%' }}
                                  className="flex items-center justify-center"
                                >
                                  <Tooth
                                    tooth={t}
                                    onUpdate={handleUpdate}
                                    treatment={treatment}
                                  />
                                </div>
                                <div>
                                  <img
                                    src={dientesImages[dienteKey]}
                                    style={{ height: '100px', width: '60px' }}
                                    className="cursor-pointer"
                                  />
                                </div>
                                <div className="text-center font-semibold">
                                  {t.pieza!}
                                </div>
                              </div>
                            );
                          })}
                    </Grid>
                  </Grid>{' '}
                </>
              )}
            </Grid>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            backgroundColor:
              mode === 'light'
                ? colors.lightModeTableHead
                : colors.darkModeTableHead,
            marginBlock: 15,
          }}
        >
          <AppBar position="static">
            <Toolbar
              style={{
                backgroundColor:
                  mode === 'light'
                    ? colors.lightModeHeaderColor
                    : colors.darkModeHeaderColor,
              }}
            >
              <Typography variant="h6">Registro clínico de dientes</Typography>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className="border-t-2"
        >
          <TableContainer>
            <Table>
              <TableHead
                style={{
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeTableHead
                      : colors.darkModeTableHead,
                }}
              >
                <TableRow>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Condiciones/ Tratamientos dentales
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Pieza
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Fecha
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Observación
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Atención
                  </TableCell>

                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  >
                    Detalle Tratamiento
                  </TableCell>
                  <TableCell
                    style={{
                      fontWeight: 'bold',
                      color:
                        mode === 'light' ? colors.lightModeTableText : 'white',
                    }}
                  ></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {treatmentsWithColor
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((t: ITreatment) => {
                    const bucalColor =
                      t.pieza.parte === 'bucal'
                        ? t.pieza.bucal?.color
                        : '#FFFFFF';
                    const distalColor =
                      t.pieza.parte === 'distal'
                        ? t.pieza.distal?.color
                        : '#FFFFFF';
                    const oclusalColor =
                      t.pieza.parte === 'oclusal'
                        ? t.pieza.oclusal?.color
                        : '#FFFFFF';
                    const mesialColor =
                      t.pieza.parte === 'mesial'
                        ? t.pieza.mesial?.color
                        : '#FFFFFF';
                    const lingualColor =
                      t.pieza.parte === 'lingualpalatino'
                        ? t.pieza.lingualpalatino?.color
                        : '#FFFFFF';

                    return (
                      <TableRow key={t._id}>
                        <TableCell>{t.detalle}</TableCell>
                        <TableCell>
                          {t.pieza.diente} {t.pieza.parte}
                        </TableCell>
                        <TableCell>
                          {new Date(t.fecha).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Tooltip
                            title={
                              t.observacion ? t.observacion : 'sin novedad'
                            }
                          >
                            <Typography>
                              {t.observacion
                                ? t.observacion.length > 20
                                  ? `${t.observacion.slice(0, 20)}...`
                                  : t.observacion
                                : 'sin novedad'}
                            </Typography>
                          </Tooltip>
                        </TableCell>
                        <TableCell>
                          {(t.profesional as Professional).nombre1}{' '}
                          {(t.profesional as Professional).apellPat}
                        </TableCell>
                        {/* pintar cruz */}
                        <TableCell>
                          <div
                            style={{ display: 'flex', alignItems: 'center' }}
                          >
                            {/* Imagen del diente */}
                            <img
                              src={
                                dientesImages[
                                `diente${t.pieza.diente}` as DienteKeys
                                ]
                              }
                              alt={`Diente ${t.pieza.diente}`}
                              style={{ height: '50px', marginRight: '10px' }}
                            />

                            {/* Cruz pintada */}
                            <div
                              style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(3, 15px)',
                                gridTemplateRows: 'repeat(3, 15px)',
                                gap: '1px',
                                width: '32px',
                                height: '32px',
                              }}
                            >
                              {/* Bucal (arriba) */}
                              <div
                                style={{
                                  gridColumn: '2',
                                  gridRow: '1',
                                  backgroundColor: bucalColor,
                                  border: '2px solid #ccc',
                                }}
                              ></div>

                              {/* Distal (izquierda) */}
                              <div
                                style={{
                                  gridColumn: '1',
                                  gridRow: '2',
                                  backgroundColor: distalColor,
                                  border: '2px solid #ccc',
                                }}
                              ></div>

                              {/* Oclusal (centro) */}
                              <div
                                style={{
                                  gridColumn: '2',
                                  gridRow: '2',
                                  backgroundColor: oclusalColor,
                                  border: '2px solid #ccc',
                                }}
                              ></div>

                              {/* Mesial (derecha) */}
                              <div
                                style={{
                                  gridColumn: '3',
                                  gridRow: '2',
                                  backgroundColor: mesialColor,
                                  border: '2px solid #ccc',
                                }}
                              ></div>

                              {/* Lingual/Palatino (abajo) */}
                              <div
                                style={{
                                  gridColumn: '2',
                                  gridRow: '3',
                                  backgroundColor: lingualColor,
                                  border: '2px solid #ccc',
                                }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <IconButton
                            onClick={() => {
                              const newTreatments = treatments.filter(
                                (tr: ITreatment) => t._id !== tr._id
                              );
                              setTreatments(newTreatments);

                              const updatedTeeth = [...teeth!];

                              const toothIndex = teeth!.findIndex(
                                (d: Diente) => d.pieza === t.pieza.diente
                              );

                              updatedTeeth[toothIndex][
                                t.pieza.parte as
                                | 'bucal'
                                | 'distal'
                                | 'oclusal'
                                | 'mesial'
                                | 'lingualpalatino'
                              ].color = '#FFFFFF';
                              updatedTeeth[toothIndex][
                                t.pieza.parte as
                                | 'bucal'
                                | 'distal'
                                | 'oclusal'
                                | 'mesial'
                                | 'lingualpalatino'
                              ].detalle = '';
                              updatedTeeth[toothIndex][
                                t.pieza.parte as
                                | 'bucal'
                                | 'distal'
                                | 'oclusal'
                                | 'mesial'
                                | 'lingualpalatino'
                              ].diagnostico = '';
                              updatedTeeth[toothIndex][
                                t.pieza.parte as
                                | 'bucal'
                                | 'distal'
                                | 'oclusal'
                                | 'mesial'
                                | 'lingualpalatino'
                              ].estado = '';

                              setTeeth(updatedTeeth);
                            }}
                          >
                            <Delete />
                          </IconButton>
                          <MuiButton
                            color="primary"
                            variant="contained"
                            onClick={() => {
                              setTreatmentForm(true);
                              setEditTreatment(t);
                            }}
                          >
                            Añadir observación
                          </MuiButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
            <TablePagination
              page={page}
              onPageChange={handleChangePage}
              count={treatments.length}
              component="div"
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </Grid>
      </Grid>
      <Toaster />
      <TreatmentForm
        open={treatmentForm}
        onClose={() => setTreatmentForm(false)}
        treatment={treatmentToEdit}
        onSave={onChangeTreatment}
      />
    </>
  );
};

export default Odontogramm;
