import React from 'react';
import logo from './receta.jpeg'; // Asegúrate de que la ruta sea correcta y que el archivo exista en esta ubicación

interface IPersona {
  _id: string;
  apellMat: string;
  apellPat: string;
  dv: string;
  fechaNac: Date;
  institucion: string;
  nacionalidad: string;
  nombre1: string;
  nombre2: string;
  rut: string;
  sexo: string;
  vigente: string;
  direccion: string;
  Solicitario: string;
  atencion: string;
  consentimiento: string;
  fichaClinica: string;
  libretaContacto: string;
  libretaDireccion: string;
  presupuesto: string;
  receta: string;
}

interface TableData {
  _id: string;
  estado_id: boolean;
  profesional_id: {
    _id: string;
    apellMat: string;
    apellPat: string;
    nombre1: string;
    nombre2: string;
  };
  empresa_id: {
    _id: string;
    razonSocial: string;
  };
  fechaRegistro: string;
  persona_id: IPersona;
  recetaDetalle: string[];
}

interface RecetaTemplateProps {
  receta: TableData;
}

const RecetaTemplate: React.FC<RecetaTemplateProps> = ({ receta }) => (
  <div id={`receta-${receta._id}`} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '210mm', height: '297mm', padding: '20mm', position: 'relative', color: 'blue', fontWeight: 'bold' }}>
    <div style={{ display: 'flex', justifyContent: 'center', left: 0, right: 0 }}>
      <img src={logo} alt="Receta Template" style={{ width: '100mm', height: 'auto' }} />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', color: 'blue' }}>
      Elina Carla Nuñes Alfaro<br />
      Prestaciones Dentales E.I.R.I<br />
      Rut: 76.654.448-7<br />
      21 DE MAYO N°1317 - FONO: 552812569 - CEL: 979460049 - TOCOPILLA
    </div>

    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <div style={{ position: 'relative', zIndex: 1, justifyContent: 'center', paddingTop: '1px', paddingLeft: '2%', paddingRight: '2%', border: '1px solid blue' }}>
        <p style={{ textAlign: 'right', marginTop: '20px', color: 'blue', fontWeight: 'bold' }}>Fecha: {new Date(receta.fechaRegistro).toLocaleDateString()}</p>
        <div><br /></div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span>Nombre:</span>
          <span style={{ flexGrow: 1, borderBottom: '1px solid blue', marginLeft: '10px' }}>{receta.persona_id.nombre1} {receta.persona_id.nombre2} {receta.persona_id.apellPat} {receta.persona_id.apellMat}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span>Dirección:</span>
          <span style={{ flexGrow: 1, borderBottom: '1px solid blue', marginLeft: '10px' }}>{receta.persona_id.direccion}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
          <span>Edad:</span>
          <span style={{ flexGrow: 1, borderBottom: '1px solid blue', marginLeft: '10px' }}>{new Date().getFullYear() - new Date(receta.persona_id.fechaNac).getFullYear()}</span>
      
       
          <span>C. Identidad:</span>
          <span style={{ flexGrow: 1, borderBottom: '1px solid blue', marginLeft: '10px' }}>{receta.persona_id.rut}</span>
        </div>
        <div><br /></div>
        <p style={{ marginLeft: "2mm" }}>Rp.<br /> {receta.recetaDetalle.join(', ')}</p>
        <div></div>
        <div><br /></div>
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <p style={{ textAlign: 'right', marginTop: '20px', color: 'blue', fontWeight: 'bold' }}>Firma Profesional: ____________________</p>
        <div><br /></div>
      </div>
    </div>
  </div>
);

export default RecetaTemplate;
