import { jsPDF } from 'jspdf';
import { forwardRef, useImperativeHandle } from 'react';

import {
  AppBar,
  Container,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import colors from '../../styles/colors';
import { ConsentmentResponse } from './ConsentmentsTab';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { ConsentmentDetail } from '../../interfaces/ConsentmentDetails';

interface Props {
  consentment: ConsentmentResponse | undefined;
}

const ConsentmentVisualizer = forwardRef(({ consentment }: Props, ref) => {
  const { mode } = useThemeContext();

  // const { data: details, isLoading } = useQuery({
  //   queryKey: ['details', consentment],
  //   queryFn: async () => {
  //     if (consentment === undefined) return [];
  //     const response = await axios.get(
  //       `${generalConfig.baseUrl}/consentment-details/getdetails/${consentment.consentimiento._id}`
  //     );
  //     return response.data.body;
  //   },
  // });

  // Exponer la función generatePDF al componente padre
  useImperativeHandle(ref, () => ({
    generatePDF,
  }));

  const generatePDF = () => {
    if (!consentment) return;

    const { consentimiento, detalles } = consentment;
    const doc = new jsPDF();

    // Título principal
    doc.setFontSize(12);
    doc.text('CONSENTIMIENTO INFORMADO', 105, 20, { align: 'center' });

    let y = 30;
    const startX = 20;
    const columnWidths = [60, 60, 50]; // Anchos de columnas para la tabla

    // Dibujar encabezado de la tabla
    doc.setFontSize(9);
    doc.rect(startX, y, columnWidths[0], 10); // Diagnóstico
    doc.rect(startX + columnWidths[0], y, columnWidths[1], 10); // Tratamiento
    doc.rect(
      startX + columnWidths[0] + columnWidths[1],
      y,
      columnWidths[2],
      10
    ); // Complicaciones

    doc.text('DIAGNÓSTICO', startX + 2, y + 7);
    doc.text('TRATAMIENTO', startX + columnWidths[0] + 2, y + 7);
    doc.text(
      'POSIBLES COMPLICACIONES',
      startX + columnWidths[0] + columnWidths[1] + 2,
      y + 7
    );

    y += 10;
    doc.line(
      startX,
      y,
      startX + columnWidths[0] + columnWidths[1] + columnWidths[2],
      y
    ); // Línea horizontal

    // Dibujar filas de la tabla
    detalles.forEach((d: ConsentmentDetail) => {
      const rowHeight = 10;

      doc.rect(startX, y, columnWidths[0], rowHeight);
      doc.rect(startX + columnWidths[0], y, columnWidths[1], rowHeight);
      doc.rect(
        startX + columnWidths[0] + columnWidths[1],
        y,
        columnWidths[2],
        rowHeight
      );

      doc.text(d.diagnostico || '', startX + 2, y + 7);
      doc.text(d.tratamiento || '', startX + columnWidths[0] + 2, y + 7);
      doc.text(
        d.posiblesComplicaciones || '',
        startX + columnWidths[0] + columnWidths[1] + 2,
        y + 7
      );

      y += rowHeight;
    });

    y += 15; // Espacio después de la tabla
    doc.setFontSize(10);

    // Texto alineado en una sola línea
    const textLine = `Por medio del presente consentimiento, Yo ${(consentimiento.persona as Person).nombre1} ${(consentimiento.persona as Person).apellPat}, RUT: ${(consentimiento.persona as Person).rut || 'N/A'}, en atención comenzada el día ${new Date(consentimiento.fechaRegistro).toLocaleDateString()}, con el/la profesional ${(consentimiento.profesional as Professional).nombre1} ${(consentimiento.profesional as Professional).apellPat}.`;

    // Dividir el texto largo en líneas controladas
    const textLines = doc.splitTextToSize(textLine, 170); // Ajustar al ancho máximo
    doc.text(textLines, startX, y);

    y += textLines.length * 5;

    // Texto adicional
    const finalText =
      'He sido informado acerca de mi diagnóstico, pronóstico y plan de tratamiento así como sus posibles complicaciones mencionadas en este documento.';

    const finalText1 =
      'Por lo tanto, de forma consciente y voluntaria doy mi consentimiento y aprobación para que se realice el tratamiento teniendo pleno conocimiento de los posibles riesgos, complicaciones y beneficios que podría desprenderse de dicho acto.';

    const finalLines = doc.splitTextToSize(finalText, 170);
    const finalLines1 = doc.splitTextToSize(finalText1, 170);
    doc.text(finalLines, startX, y);
    doc.text(finalLines1, startX, y + 10);

    y += finalLines.length * 5;

    // Firmas
    doc.text('________________________', startX + 10, y + 25);
    doc.text(
      `${(consentimiento.persona as Person).nombre1} ${(consentimiento.persona as Person).apellPat}`,
      startX + 10,
      y + 30
    );
    // doc.text(" SU REPRESENTANTE", startX + 10, y + 35);
    doc.text('________________________', startX + 90, y + 25);
    doc.text(
      `${(consentimiento.profesional as Professional).nombre1} ${(consentimiento.profesional as Professional).apellPat}`,
      startX + 90,
      y + 30
    );

    // Guardar PDF
    doc.save('consentimiento_informado.pdf');
  };

  if (!consentment)
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
              Selecciona consentimiento para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar position="static">
          <Toolbar
            style={{
              backgroundColor:
                mode === 'light'
                  ? colors.lightModeHeaderColor
                  : colors.darkModeHeaderColor,
            }}
          >
            <Typography variant="h6">Consentimiento</Typography>
          </Toolbar>
        </AppBar>
      </Grid>

      {/* Visualización Actual */}
      <Grid item xs={12}>
        <Typography variant="body1">
          Por medio del presente consentimiento, Yo{' '}
          {(consentment.consentimiento.persona as Person).nombre1}{' '}
          {(consentment.consentimiento.persona as Person).apellPat}
        </Typography>
      </Grid>

      <Grid item xs={6}>
        <Typography variant="body1">
          En atención comenzada el día{' '}
          {new Date(
            consentment.consentimiento.fechaRegistro
          ).toLocaleDateString()}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography variant="body1">
          con el/la profesional{' '}
          {(consentment.consentimiento.profesional as Professional).nombre1}{' '}
          {(consentment.consentimiento.profesional as Professional).apellPat}
        </Typography>
      </Grid>

      <Grid item xs={12}>
        <Typography variant="body1">
          He sido informado acerca de mi diagnóstico, pronóstico y plan de
          tratamiento así como sus posibles complicaciones mencionadas en este
          documento. Por lo tanto, de forma consciente y voluntaria doy mi
          consentimiento y aprobación para que se realice el tratamiento.
        </Typography>
      </Grid>

      {/* Tabla */}
      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Diagnóstico</TableCell>
                <TableCell>Tratamiento</TableCell>
                <TableCell>Complicaciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consentment.detalles.map((d) => (
                <TableRow key={d._id}>
                  <TableCell>{d.diagnostico}</TableCell>
                  <TableCell>{d.tratamiento}</TableCell>
                  <TableCell>{d.posiblesComplicaciones}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
});

export default ConsentmentVisualizer;
