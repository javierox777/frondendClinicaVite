import { Container, Grid, Typography } from '@mui/material';
import React from 'react';

import diente11 from '../../assets/dientes/diente11.png';
import diente12 from '../../assets/dientes/diente12.png';
import diente13 from '../../assets/dientes/diente13.png';
import diente14 from '../../assets/dientes/diente14.png';
import diente15 from '../../assets/dientes/diente15.png';
import diente16 from '../../assets/dientes/diente16.png';
import diente17 from '../../assets/dientes/diente17.png';
import diente18 from '../../assets/dientes/diente18.png';
import diente21 from '../../assets/dientes/diente21.png';
import diente22 from '../../assets/dientes/diente22.png';
import diente23 from '../../assets/dientes/diente23.png';
import diente24 from '../../assets/dientes/diente24.png';
import diente25 from '../../assets/dientes/diente25.png';
import diente26 from '../../assets/dientes/diente26.png';
import diente27 from '../../assets/dientes/diente27.png';
import diente28 from '../../assets/dientes/diente28.png';
import diente31 from '../../assets/dientes/diente31.png';
import diente32 from '../../assets/dientes/diente32.png';
import diente33 from '../../assets/dientes/diente33.png';
import diente34 from '../../assets/dientes/diente34.png';
import diente35 from '../../assets/dientes/diente35.png';
import diente36 from '../../assets/dientes/diente36.png';
import diente37 from '../../assets/dientes/diente37.png';
import diente38 from '../../assets/dientes/diente38.png';
import diente42 from '../../assets/dientes/diente42.png';
import diente41 from '../../assets/dientes/diente41.png';
import diente43 from '../../assets/dientes/diente43.png';
import diente44 from '../../assets/dientes/diente44.png';
import diente45 from '../../assets/dientes/diente45.png';
import diente46 from '../../assets/dientes/diente46.png';
import diente47 from '../../assets/dientes/diente47.png';
import diente48 from '../../assets/dientes/diente48.png';

type DienteKeys =
  `diente${11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 21 | 22 | 23 | 24 | 25 | 26 | 27 | 28 | 31 | 32 | 33 | 34 | 35 | 36 | 37 | 38 | 41 | 42 | 43 | 44 | 45 | 46 | 47 | 48}`;

interface Diente {
  pieza: string; // Assuming pieza is a string
  detalle: string;
  diagnostico: string;
  estado: string;
  activo: boolean;
}

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
};

const odontogram = {
  persona: '664af7ed5c1ad5bf4ec361b4', // Replace with a valid ObjectId
  dientes: [
    {
      pieza: '18',
      detalle: 'Detail about diente1',
      diagnostico: 'Diagnosis for diente1',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '17',
      detalle: 'Detail about diente2',
      diagnostico: 'Diagnosis for diente2',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '16',
      detalle: 'Detail about diente3',
      diagnostico: 'Diagnosis for diente3',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '15',
      detalle: 'Detail about diente4',
      diagnostico: 'Diagnosis for diente4',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '14',
      detalle: 'Detail about diente5',
      diagnostico: 'Diagnosis for diente5',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '13',
      detalle: 'Detail about diente6',
      diagnostico: 'Diagnosis for diente6',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '12',
      detalle: 'Detail about diente7',
      diagnostico: 'Diagnosis for diente7',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '11',
      detalle: 'Detail about diente8',
      diagnostico: 'Diagnosis for diente8',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '21',
      detalle: 'Detail about diente9',
      diagnostico: 'Diagnosis for diente9',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '22',
      detalle: 'Detail about diente10',
      diagnostico: 'Diagnosis for diente10',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '23',
      detalle: 'Detail about diente11',
      diagnostico: 'Diagnosis for diente11',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '24',
      detalle: 'Detail about diente12',
      diagnostico: 'Diagnosis for diente12',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '25',
      detalle: 'Detail about diente13',
      diagnostico: 'Diagnosis for diente13',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '26',
      detalle: 'Detail about diente14',
      diagnostico: 'Diagnosis for diente14',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '27',
      detalle: 'Detail about diente15',
      diagnostico: 'Diagnosis for diente15',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '28',
      detalle: 'Detail about diente16',
      diagnostico: 'Diagnosis for diente16',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '38',
      detalle: 'Detail about diente17',
      diagnostico: 'Diagnosis for diente17',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '37',
      detalle: 'Detail about diente18',
      diagnostico: 'Diagnosis for diente18',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '36',
      detalle: 'Detail about diente19',
      diagnostico: 'Diagnosis for diente19',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '35',
      detalle: 'Detail about diente20',
      diagnostico: 'Diagnosis for diente20',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '34',
      detalle: 'Detail about diente21',
      diagnostico: 'Diagnosis for diente21',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '33',
      detalle: 'Detail about diente22',
      diagnostico: 'Diagnosis for diente22',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '32',
      detalle: 'Detail about diente23',
      diagnostico: 'Diagnosis for diente23',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '31',
      detalle: 'Detail about diente24',
      diagnostico: 'Diagnosis for diente24',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '41',
      detalle: 'Detail about diente25',
      diagnostico: 'Diagnosis for diente25',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '42',
      detalle: 'Detail about diente26',
      diagnostico: 'Diagnosis for diente26',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '43',
      detalle: 'Detail about diente27',
      diagnostico: 'Diagnosis for diente27',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '44',
      detalle: 'Detail about diente28',
      diagnostico: 'Diagnosis for diente28',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '45',
      detalle: 'Detail about diente29',
      diagnostico: 'Diagnosis for diente29',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '46',
      detalle: 'Detail about diente30',
      diagnostico: 'Diagnosis for diente30',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '47',
      detalle: 'Detail about diente31',
      diagnostico: 'Diagnosis for diente31',
      estado: 'Healthy',
      activo: true,
    },
    {
      pieza: '48',
      detalle: 'Detail about diente32',
      diagnostico: 'Diagnosis for diente32',
      estado: 'Healthy',
      activo: true,
    },
  ],
  version: 1,
  fecha: '2023-12-31',
  profesionalModifica: '66540e54641a176f2f611c78', // Replace with a valid ObjectId
};

const Odontogram = () => {
  return (
    <Container>
      <Grid container spacing={2}>
        {odontogram.dientes
          .filter((d) => parseInt(d.pieza) < 31)
          .map((d: Diente) => {
            const dienteKey = `diente${d.pieza}` as DienteKeys;
            return (
              <Grid item xs key={d.pieza}>
                <Grid container justifyContent={'center'}>
                  <Grid item>
                    <Typography style={{ textAlign: 'center' }}>
                      {d.pieza}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    className="hover:scale-[1.05] cursor-pointer transition-all"
                  >
                    <img
                      src={dientesImages[dienteKey]}
                      height={200}
                      width={50}
                    />
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
      <Grid container spacing={2} alignItems={'baseline'}>
        {odontogram.dientes
          .filter((d) => parseInt(d.pieza) >= 31)
          .map((d: Diente) => {
            const dienteKey = `diente${d.pieza}` as DienteKeys;
            return (
              <Grid item xs key={d.pieza}>
                <Grid container justifyContent={'center'}>
                  <Grid
                    item
                    className="hover:scale-[1.05] cursor-pointer transition-all"
                  >
                    <img
                      src={dientesImages[dienteKey]}
                      height={200}
                      width={50}
                    />
                  </Grid>
                  <Grid item>
                    <Typography style={{ textAlign: 'center' }}>
                      {d.pieza}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
};

export default Odontogram;
