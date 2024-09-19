import React from 'react';
import logo from './receta.jpeg';
import { Receipt } from '../../interfaces/Receipt';
import { Person } from '../../interfaces/Person';
import { Professional } from '../../interfaces/Professional';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { generalConfig } from '../../config';
import { TableContainer } from '@mui/material';
import { ReceiptDetail } from '../../interfaces/ReceiptDetail';
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

interface Props {
  receta: Receipt;
}

const RecetaTemplate = ({ receta }: Props) => {
  const { data: details, isLoading } = useQuery({
    queryKey: ['details'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/receipt-details/getreceiptdetails/${receta._id}`
      );

      return response.data.body;
    },
  });

  return (
    <div
      id={`receta-${receta._id}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '210mm',
        height: '297mm',
        padding: '20mm',
        position: 'relative',
        color: 'blue',
        fontWeight: 'bold',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', left: 0, right: 0 }}
      >
        <img
          src={logo}
          alt="Receta Template"
          style={{ width: '100mm', height: 'auto' }}
        />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: 'blue',
        }}
      >
        Elina Carla Nuñes Alfaro
        <br />
        Prestaciones Dentales E.I.R.I
        <br />
        Rut: 76.654.448-7
        <br />
        21 DE MAYO N°1317 - FONO: 552812569 - CEL: 979460049 - TOCOPILLA
      </div>

      <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            justifyContent: 'center',
            paddingTop: '1px',
            paddingLeft: '2%',
            paddingRight: '2%',
            border: '1px solid blue',
          }}
        >
          <p
            style={{
              textAlign: 'right',
              marginTop: '20px',
              color: 'blue',
              fontWeight: 'bold',
            }}
          >
            Fecha: {new Date(receta.fechaRegistro).toLocaleDateString()}
          </p>
          <div>
            <br />
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>Nombre:</span>
            <span
              style={{
                flexGrow: 1,
                borderBottom: '1px solid blue',
                marginLeft: '10px',
              }}
            >
              {(receta.persona as Person).nombre1}{' '}
              {(receta.persona as Person).nombre2}{' '}
              {(receta.persona as Person).apellPat}{' '}
              {(receta.persona as Person).apellMat}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>Dirección:</span>
            <span
              style={{
                flexGrow: 1,
                borderBottom: '1px solid blue',
                marginLeft: '10px',
              }}
            >
              {receta.direccion}
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '10px',
            }}
          >
            <span>Edad:</span>
            <span
              style={{
                flexGrow: 1,
                borderBottom: '1px solid blue',
                marginLeft: '10px',
              }}
            >
              {new Date().getFullYear() -
                new Date((receta.persona as Person).fechaNac).getFullYear()}
            </span>
            <span>C. Identidad:</span>
            <span
              style={{
                flexGrow: 1,
                borderBottom: '1px solid blue',
                marginLeft: '10px',
              }}
            >
              {(receta.persona as Person).rut}
            </span>
          </div>
          <div>
            <br />
          </div>
          <p style={{ marginLeft: '2mm' }}>Rp.</p>
          <div>
            <br />
          </div>
          <table style={{ width: '100%' }}>
            <tr className="border-blue-700 border">
              <th className="border-blue-700 border">Medicamento</th>
              <th className="border-blue-700 border">Fracción</th>
              <th className="border-blue-700 border">Días</th>
            </tr>
            {details?.map((d: ReceiptDetail) => {
              return (
                <tr key={d._id}>
                  <td className="text-center">{d.objeto}</td>
                  <td className="text-center">{d.intervalo}</td>
                  <td className="text-center">{d.dias}</td>
                </tr>
              );
            })}
          </table>
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
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '20px',
            }}
          >
            <div style={{ textAlign: 'left' }}>
              <p
                style={{
                  borderBottom: '1px solid blue',
                  width: '200px',
                  margin: '0 auto',
                }}
              >
                {(receta.profesional as Professional).nombre1}{' '}
                {(receta.profesional as Professional).nombre2}{' '}
                {(receta.profesional as Professional).apellPat}{' '}
                {(receta.profesional as Professional).apellMat}
              </p>
              <p style={{ width: '200px', margin: '0 auto' }}>Profesional</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <br />
              <br />
              <p
                style={{
                  borderTop: '1px solid blue',
                  width: '200px',
                  margin: '0 auto',
                }}
              >
                Firma Profesional
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecetaTemplate;
