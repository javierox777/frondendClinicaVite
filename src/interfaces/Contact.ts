import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Contact {
    id: string;
    descripcion: string;
    contacto_id: string;
    fechaReg: Date;
    persona_id:string;
    vigente:string;
    contacto: ShortModel
    persona: Person;
}