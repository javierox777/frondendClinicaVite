import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Contact {
    _id: string;
    descripcion: string;
    contacto:  ShortModel;
    fechaReg: Date;
    persona:  Person;
    vigente:string;
 
}