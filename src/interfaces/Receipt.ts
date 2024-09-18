import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";

export interface Receipt {
    _id?: string;
    estado: boolean;
    profesional: Professional | string;
    empresa: Company | string;
    fechaRegistro: string;
    direccion: string;
    persona: Person | string;
  }