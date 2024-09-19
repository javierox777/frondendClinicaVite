import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";
import { ShortModel } from "./ShortModel";

export interface Receipt {
    _id?: string;
    estado: string | ShortModel;
    profesional: Professional | string;
    empresa: Company | string;
    fechaRegistro: string;
    direccion: string;
    persona: Person | string;
  }