import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Contact {
    _id: string;
    descripcion: string;
    contacto: string;
    fechaReg: Date;
    persona:string;
    vigente:string;
 
}