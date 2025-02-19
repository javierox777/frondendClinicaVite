import React, { useRef, useState } from 'react';
import { Grid } from '@mui/material';
import HeaderBar from '../../componemts/HeaderBar';
import ConsentForm from './ConsentPage';
import ConsentmentTable from './ConsentmentTable';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { Consentment } from '../../interfaces/Consentment';
import { useNavigate } from 'react-router-dom';
import ConsentmentVisualizer from '../clinicalrecord/ConsentmentVisualizer';
import { ConsentmentResponse } from '../clinicalrecord/ConsentmentsTab'; 
// O define tu propia interfaz similar: interface ConsentmentResponse { consentimiento: Consentment; detalles: ConsentmentDetail[]; }

const ConsentMain = () => {
  const navigate = useNavigate();
  const [formOpen, setOpen] = useState(false);
  const [showConsentment, setShowConsentment] = useState<ConsentmentResponse | undefined>(undefined);
  const [dataUpdated, setUpdated] = useState(false);

  // Referencia al Visualizador (para llamar generatePDF)
  const visualizerRef = useRef<any>(null);

  // Consulta de la lista de consentimientos
  const { data: consentments, isLoading: consentmentsLoading } = useQuery({
    queryKey: ['consentments', dataUpdated],
    queryFn: async () => {
      const response = await axios.get(`${generalConfig.baseUrl}/consentments`);
      return response.data.body; // as Consentment[]
    },
  });

  // Callback para descargar PDF
  const handleDownloadPDF = (consentment: Consentment) => {
    // Suponiendo que consentment ya trae 'detalles'. 
    // Si no, hay que hacer otra consulta para obtenerlos.
    setShowConsentment({
      consentimiento: consentment,
      detalles: consentment.detalles || [], // fallback si viniera 'undefined'
    });

    setTimeout(() => {
      visualizerRef.current?.generatePDF();
    }, 100);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <HeaderBar
            title="Consentimientos"
            buttonFn={() => setOpen(true)}
            button
            buttonTitle="Nuevo consentimiento"
          />
        </Grid>

        <Grid item xs={12}>
          <ConsentmentTable
            consentments={consentments || []}
            onDownloadPDF={handleDownloadPDF}
          />
        </Grid>
      </Grid>

      {/* Visualizador oculto (se usa para generar PDF) */}
      <div style={{ display: 'none' }}>
        <ConsentmentVisualizer ref={visualizerRef} consentment={showConsentment} />
      </div>

      {/* Formulario para crear/editar consentimiento */}
      <ConsentForm
        open={formOpen}
        onClose={() => setOpen(false)}
        consentment={showConsentment ? showConsentment.consentimiento : undefined}
        afterSubmit={() => {
          setUpdated(!dataUpdated);
        }}
      />
    </>
  );
};

export default ConsentMain;
