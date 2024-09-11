import React from 'react';

import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useThemeContext } from '../../componemts/themeContext';
import colors from '../../styles/colors';
import RecetaTemplate from '../receta/RecetaPdf';
import { Receipt } from '../../interfaces/Receipt';

interface Props {
  receipt?: Receipt;
}

const ReceiptVisualizer = ({ receipt }: Props) => {
  const { mode } = useThemeContext();

  if (!receipt)
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
              Selecciona receta para ver más.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    );

  return (
    <RecetaTemplate receta={receipt} />
    // <Container>
    //   <Grid container className=" rounded-lg p-3" spacing={2}>
    //     <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
    //       <Typography
    //         style={{
    //           fontWeight: 'bold',
    //           color: mode === 'light' ? colors.lightModeTableText : 'white',
    //         }}
    //       >
    //         Fecha de emisión
    //       </Typography>
    //       <Typography>
    //         {new Date(receipt.fechaRegistro).toLocaleDateString()}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
    //       <Typography
    //         style={{
    //           fontWeight: 'bold',
    //           color: mode === 'light' ? colors.lightModeTableText : 'white',
    //         }}
    //       >
    //         Receta emitida por
    //       </Typography>
    //       <Typography>
    //         {receipt.profesional_id.nombre1} {receipt.profesional_id.nombre2}{' '}
    //         {receipt.profesional_id.apellPat} {receipt.profesional_id.apellMat}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
    //       <Typography
    //         style={{
    //           fontWeight: 'bold',
    //           color: mode === 'light' ? colors.lightModeTableText : 'white',
    //         }}
    //       >
    //         RUT
    //       </Typography>
    //       <Typography>
    //         {receipt.persona_id.rut}-{receipt.persona_id.dv}
    //       </Typography>
    //     </Grid>
    //     <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
    //       <Typography
    //         style={{
    //           fontWeight: 'bold',
    //           color: mode === 'light' ? colors.lightModeTableText : 'white',
    //         }}
    //       >
    //         Clínica
    //       </Typography>
    //       <Typography>{receipt.empresa_id.razonSocial}</Typography>
    //     </Grid>
    //     <Grid item xs={12}>
    //       <Typography
    //         style={{
    //           fontWeight: 'bold',
    //           color: mode === 'light' ? colors.lightModeTableText : 'white',
    //         }}
    //       >
    //         Medicamentos
    //       </Typography>
    //       {receipt.recetaDetalle.map((d, index) => {
    //         return (
    //           <React.Fragment key={index}>
    //             <Box>
    //               <Typography>{d}</Typography>
    //             </Box>
    //             <Divider />
    //           </React.Fragment>
    //         );
    //       })}
    //     </Grid>
    //   </Grid>
    // </Container>
  );
};

export default ReceiptVisualizer;
