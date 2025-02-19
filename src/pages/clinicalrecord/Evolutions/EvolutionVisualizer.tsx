import React, { useRef } from 'react';
import { Evolution } from '../../../interfaces/Evolution';
import { Button, Container, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../../componemts/themeContext';
import colors from '../../../styles/colors';
import { Visibility } from '@mui/icons-material';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import { Professional } from '../../../interfaces/Professional';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface Props {
  evolution: Evolution | undefined;
}

const EvolutionVisualizer = ({ evolution }: Props) => {
  const { mode } = useThemeContext();

  const contentRef = useRef<HTMLDivElement>(null);

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
        <Grid container>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography>Fecha</Typography>
            <Typography variant="h5">
              {format(new Date(evolution.fecha), 'yyyy/MM/dd')}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
            <Typography>Atención</Typography>
            <Typography variant="h5">
              {(evolution.profesional as Professional).nombre1}{' '}
              {(evolution.profesional as Professional).apellPat}
            </Typography>
          </Grid>
        </Grid>
        <ReactMarkdown>{evolution.descripcion}</ReactMarkdown>
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
