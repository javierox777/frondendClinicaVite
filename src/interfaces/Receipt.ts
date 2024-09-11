import { Person } from "./Person";
import { Professional } from "./Professional";

export interface Receipt {
    _id: string;
    estado_id: boolean;
    profesional_id: Professional | string;
    empresa_id: {
      _id: string;
      razonSocial: string;
    };
    fechaRegistro: string;
    direccion: string;
    persona_id: Person | string;
    recetaDetalle: string[];
  }