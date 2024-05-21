import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";
import { ShortModel } from "./ShortModel";

export interface Budget {
    _id: string;
    estado: string;
    profesional: string;
    empresa : string;
    fechaRegistro: Date;
    persona: string;
    presupuestoTipo: string;
    fechaRegistroValida: string;

  
}