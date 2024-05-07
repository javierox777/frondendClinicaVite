import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";
import { ShortModel } from "./ShortModel";

export interface Budget {
    id: string;
    estado_id: string;
    profesional_id: string;
    empresa_id : string;
    fechaRegistro: Date;
    persona_id: string;
    presupuestoTipo_id: string;
    fechaRegistroValida: string;

    estado: ShortModel;
    profesional: Professional;
    empresa: Company;
    persona: Person;
    presupuestoTipo: ShortModel;
}