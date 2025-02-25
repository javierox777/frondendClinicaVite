import React, { useEffect, useRef, useState } from 'react';
import { Evolution } from '../../../interfaces/Evolution';
import {
  AppBar,
  Button,
  Container,
  Grid,
  Toolbar,
  Typography,
} from '@mui/material';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Visibility } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Professional } from '../../../interfaces/Professional';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Person } from '../../../interfaces/Person';
import { formatRut } from '../../../helpers/formatRut';
import { generalConfig } from '../../../config';
import axios from 'axios';
import { ShortModel } from '../../../interfaces/ShortModel';
import HeaderBar from '../../../componemts/HeaderBar';

interface Props {
  evolution: Evolution | undefined;
}

const EvolutionVisualizer = ({ evolution }: Props) => {
  const { mode } = useThemeContext();

  const [gender, setGender] = useState<ShortModel | undefined>();

  const contentRef = useRef<HTMLDivElement>(null);

  const getGender = async () => {
    if (evolution) {
      const response = await axios.get(
        `${generalConfig.baseUrl}/gender/${(evolution.persona as Person).sexo}`
      );
      setGender(response.data.body);
    } else {
      return;
    }
  };

  useEffect(() => {
    getGender();
  }, [evolution]);

  if (!evolution)
    return (
      <Container>
        <Grid container className="rounded-lg p-5">
          <Grid item>
            <Typography
              style={{
                fontWeight: 'lighter',
                color: mode === 'light' ? colors.lightModeTableText : 'white',
              }}
            >
              Haz click en {<Visibility />} en evolución para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  const handleExportPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    const imgWidth = 210; // A4 width in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 10, imgWidth, imgHeight);
    pdf.save('evolution.pdf');
  };

  return (
    <>
      <div ref={contentRef} style={{ padding: '20px', background: 'white' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <AppBar position="static" className="mb-5">
              <Toolbar
                style={{
                  backgroundColor:
                    mode === 'light'
                      ? colors.lightModeHeaderColor
                      : colors.darkModeHeaderColor,
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h6"
                  className="capitalize"
                  style={{ fontWeight: 'bold' }}
                >
                  FICHA DE EVOLUCIÓN
                </Typography>
              </Toolbar>
            </AppBar>
          </Grid>

          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              PACIENTE
            </Typography>
            <Typography
              variant="h6"
              className="capitalize border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {(evolution.persona as Person).nombre1}{' '}
              {(evolution.persona as Person).apellPat}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              RUT
            </Typography>
            <Typography
              variant="h6"
              className="capitalize border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {formatRut((evolution.persona as Person).rut)} -{' '}
              {(evolution.persona as Person).dv}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              FECHA DE NACIMIENTO
            </Typography>
            <Typography
              variant="h6"
              className="border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {evolution &&
                new Date(
                  (evolution.persona as Person).fechaNac
                ).toLocaleDateString()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              SEXO
            </Typography>
            <Typography
              variant="h6"
              className="capitalize border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {gender && gender.nombre.toLowerCase()}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              FECHA DE EVOLUCIÓN
            </Typography>
            <Typography
              variant="h6"
              className="border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {format(new Date(evolution.fecha), 'yyyy/MM/dd')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography
              className="border border-black text-white pb-1 border-b-0"
              style={{
                backgroundColor: colors.lightModeHeaderColor,
                fontWeight: 'bold',
                paddingLeft: '10px',
              }}
            >
              ATENCIÓN
            </Typography>
            <Typography
              variant="h6"
              className="capitalize border border-black p-1"
              style={{ paddingLeft: '10px' }}
            >
              {(evolution.profesional as Professional).nombre1}{' '}
              {(evolution.profesional as Professional).apellPat}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} className="h-3 w-full"></Grid>
        <Grid item xs={12} className="border border-black border-b-0">
          <Typography
            style={{
              backgroundColor: colors.lightModeHeaderColor,
              fontWeight: 'bold',
              paddingLeft: '10px',
            }}
            className="text-white text-center p-1"
          >
            EVOLUCIÓN
          </Typography>
        </Grid>
        <Grid item xs={12} className="border border-black p-5">
          <ReactMarkdown>{evolution.descripcion}</ReactMarkdown>
        </Grid>
      </div>

      <Button
        variant="contained"
        color="primary"
        onClick={handleExportPDF}
        style={{ marginTop: '20px' }}
      >
        Exportar a PDF
      </Button>
    </>
  );
};

export default EvolutionVisualizer;
