import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";
import { ShortModel } from "./ShortModel";

export interface Budget {
    _id: string;
    estado: ShortModel;
    profesional: Professional;
    empresa : Company;
    fechaRegistro: Date;
    persona: Person;
    presupuestoTipo: ShortModel;
    fechaRegistroValida: string;

  
}