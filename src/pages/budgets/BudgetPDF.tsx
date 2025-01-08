import { Download } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import jsPDF from 'jspdf';
import { useLocation } from 'react-router-dom';
import { generalConfig } from '../../config';
import { Address } from '../../interfaces/Address';
import { Budget } from '../../interfaces/Budget';
import { BudgetDetail } from '../../interfaces/BudgetDetail';
import { Contact } from '../../interfaces/Contact';

const BudgetPDF = () => {
  const budget: Budget = useLocation().state.budget;

  const { data: contacts } = useQuery({
    queryKey: ['contacts'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/contact-book/getcontacts/${budget.persona._id}`
      );

      return response.data.body;
    },
  });

  const { data: addresses } = useQuery({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/address-book/getaddresses/${budget.persona._id}`
      );

      return response.data.body;
    },
  });

  const { data: details } = useQuery({
    queryKey: ['details'],
    queryFn: async () => {
      const response = await axios.get(
        `${generalConfig.baseUrl}/budget-details/getdetails/${budget._id}`
      );

      return response.data.body;
    },
  });

  const validContacts = contacts?.filter((c: any) => c.vigente === '1');

  const validAddresses = addresses?.filter((a: any) => a.vigente === '1');

  const generatePdf = () => {
    let doc = new jsPDF({
      orientation: 'p',
      unit: 'pt',
      format: 'a1',
      precision: 5,
    });

    const pdfHtml = document.querySelector('#pdf') as HTMLElement;
    if (pdfHtml) {
      doc.html(pdfHtml, {
        callback: function (pdf) {
          pdf.save(
            `presupuesto_${budget._id}_${budget.persona.nombre1}${budget.persona.apellPat}.pdf`
          );
        },
      });
    } else {
      console.error('Element with id "pdf" not found.');
    }
  };

  return (
    <>
      <div className="my-5">
        <Button variant="outlined" color="info" onClick={generatePdf}>
          <Download />
          Exportar PDF
        </Button>
      </div>
      <div
        id="pdf"
        className="flex-col justify-evenly bg-white p-10 border  border-slate-400 rounded-md text-slate-800 h-screen"
      >
        {/* cabecera   */}
        <div className="grid grid-cols-3 mb-4 ">
          <div className="flex flex-col">
            <div className="font-bold">Fecha de registro</div>
            <div>{new Date(budget.fechaRegistro).toLocaleDateString()}</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold">Tipo presupuesto</div>
            <div>{budget.presupuestoTipo.nombre}</div>
          </div>
          <div className="flex flex-col">
            <div className="font-bold">Clínica</div>
            <div>{budget.empresa.razonSocial}</div>
          </div>
        </div>
        {/* cabecera   */}
        {/* datos de paciente */}
        <div>
          <div className="flex flex-col mb-5 py-5  border-b-2 border-slate-300">
            <div className="text-xl font-extralight">DATOS DEL PACIENTE</div>
          </div>
        </div>
        <div className="grid grid-cols-2">
          <div className="flex flex-col my-1">
            <div className="font-bold">Nombre</div>
            <div>
              {budget.persona.nombre1} {budget.persona.nombre2}{' '}
              {budget.persona.apellPat} {budget.persona.apellMat}
            </div>
          </div>
          <div className="flex flex-col my-1">
            <div className="font-bold">RUT</div>
            <div>
              {budget.persona.rut}-{budget.persona.dv}
            </div>
          </div>
          <div className="flex flex-col my-1">
            <div className="font-bold">Fecha De nacimiento</div>
            <div>{new Date(budget.persona.fechaNac).toLocaleDateString()}</div>
          </div>
          <div className="flex flex-col my-1">
            <div className="font-bold">Previsión</div>
            <div>
              {budget.persona.institucion.prevision.nombre}{' '}
              {budget.persona.institucion.nombre}
            </div>
          </div>
          <div className="flex flex-col my-1">
            <div className="font-bold">Contacto</div>
            {validContacts?.map((c: Contact) => {
              return (
                <div key={c._id} className="flex-col my-1">
                  <div className="font-extralight">{c.contacto.nombre}</div>
                  <div>{c.descripcion}</div>
                </div>
              );
            })}
          </div>
          <div className="flex flex-col my-1">
            <div className="font-bold">Direccion(es)</div>
            {validAddresses?.map((a: Address) => {
              return (
                <div key={a._id} className="flex-col my-1">
                  <div className="font-extralight">
                    {a.tipoDireccion.nombre}
                  </div>
                  <div>{a.nombre}</div>
                </div>
              );
            })}
          </div>
        </div>
        {/* datos de paciente */}
        {/* detalles del presupuesto */}
        <br />
        <br />
        <br />
        <br />
        <br />
        <div>
          <div className="flex flex-col mb-5">
            <div className="text-xl font-extralight py-5 border-b-2 border-slate-300">
              DETALLES PRESUPUESTO
            </div>
          </div>
        </div>
        <br />
        <br />
        <br />
        <div className="content-center">
          <table className="w-full">
            <thead>
              <tr className="font-bold bg-slate-700">
                <td className="p-2 text-slate-100">DIENTE</td>
                <td className="p-2 text-slate-100">PRESTACIÓN/TRATAMIENTO</td>
                <td className="p-2 text-slate-100">VALOR</td>
              </tr>
            </thead>
            <tbody>
              {details?.map((d: BudgetDetail) => {
                return (
                  <tr key={d._id}>
                    <td className="p-2">{d.objeto.nombre}</td>
                    <td className="p-2">{d.prestacion.nombre}</td>
                    <td className="p-2">{d.valor}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <td className="font-bold text-xl">TOTAL A PAGAR</td>
                <td></td>
                <td className="font-bold text-xl">
                  {details?.reduce((acc: number, d: BudgetDetail) => {
                    return d.valor + acc;
                  }, 0)}
                </td>
              </tr>
            </tfoot>
          </table>
          <br />
          <br />
          <br />
          <br />
        </div>

        {/* detalles del presupuesto */}
      </div>
    </>
  );
};

export default BudgetPDF;
