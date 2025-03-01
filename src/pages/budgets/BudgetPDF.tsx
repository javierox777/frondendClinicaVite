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
      console.error('Elemento con id "pdf" no encontrado.');
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
        className="bg-white text-gray-800 border border-gray-400 rounded-md p-6"
      >
        {/* ========================================
            1) CABECERA DEL PRESUPUESTO (Tabla)
        ========================================= */}
        <h2 className="text-lg font-semibold mb-3">CABECERA DEL PRESUPUESTO</h2>
        <table className="w-full border border-gray-300 text-sm mb-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-3 font-semibold border border-gray-300">
                Fecha de registro
              </th>
              <th className="py-2 px-3 font-semibold border border-gray-300">
                Tipo presupuesto
              </th>
              <th className="py-2 px-3 font-semibold border border-gray-300">
                Clínica
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="text-center">
              <td className="py-2 px-3 border border-gray-300">
                {new Date(budget.fechaRegistro).toLocaleDateString()}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {budget.presupuestoTipo?.nombre}
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {budget.empresa?.razonSocial}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ========================================
            2) DATOS DEL PACIENTE (Tabla)
        ========================================= */}
        <h2 className="text-lg font-semibold mb-3">DATOS DEL PACIENTE</h2>
        <table className="w-full border border-gray-300 text-sm mb-6">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-3 font-semibold border border-gray-300">
                .
              </th>
              <th className="py-2 px-3 font-semibold border border-gray-300">
                
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Nombre */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                Nombre
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {budget.persona.nombre1} {budget.persona.nombre2}{' '}
                {budget.persona.apellPat} {budget.persona.apellMat}
              </td>
            </tr>
            {/* RUT */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                RUT
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {budget.persona.rut}-{budget.persona.dv}
              </td>
            </tr>
            {/* Fecha de nacimiento */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                Fecha de nacimiento
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {new Date(budget.persona.fechaNac).toLocaleDateString()}
              </td>
            </tr>
            {/* Previsión */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                Previsión
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {budget.persona.institucion.prevision?.nombre}{' '}
                {budget.persona.institucion?.nombre}
              </td>
            </tr>
            {/* Contacto(s) */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                Contacto(s)
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {validContacts?.length ? (
                  validContacts.map((c: Contact) => (
                    <div key={c._id} className="mb-1">
                      <span className="italic">{c.contacto?.nombre}:</span>{' '}
                      {c.descripcion}
                    </div>
                  ))
                ) : (
                  <span>No hay contactos registrados</span>
                )}
              </td>
            </tr>
            {/* Dirección(es) */}
            <tr>
              <td className="py-2 px-3 border border-gray-300 font-bold">
                Dirección(es)
              </td>
              <td className="py-2 px-3 border border-gray-300">
                {validAddresses?.length ? (
                  validAddresses.map((a: Address) => (
                    <div key={a._id} className="mb-1">
                      <span className="italic">
                        {a.tipoDireccion?.nombre}:
                      </span>{' '}
                      {a.nombre}
                    </div>
                  ))
                ) : (
                  <span>No hay direcciones registradas</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* ========================================
            3) DETALLES DEL PRESUPUESTO (Tabla)
        ========================================= */}
        <h2 className="text-lg font-semibold mb-3">DETALLES DEL PRESUPUESTO</h2>
        <table className="w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-2 px-3 font-semibold border border-gray-300">
                DIENTE
              </th>
              <th className="py-2 px-3 font-semibold border border-gray-300">
                PRESTACIÓN / TRATAMIENTO
              </th>
              <th className="py-2 px-3 font-semibold border border-gray-300">
                VALOR
              </th>
            </tr>
          </thead>
          <tbody>
            {details?.map((d: BudgetDetail) => (
              <tr key={d._id} className="text-center">
                <td className="py-2 px-3 border border-gray-300">
                  {d.objeto.nombre}
                </td>
                <td className="py-2 px-3 border border-gray-300">
                  {d.prestacion.nombre}
                </td>
                <td className="py-2 px-3 border border-gray-300">{d.valor}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-gray-100 font-bold">
              <td className="py-2 px-3 border border-gray-300">
                TOTAL A PAGAR
              </td>
              <td className="py-2 px-3 border border-gray-300"></td>
              <td className="py-2 px-3 border border-gray-300 text-center">
                {details?.reduce((acc: number, d: BudgetDetail) => {
                  return d.valor + acc;
                }, 0)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  );
};

export default BudgetPDF;
