import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Address {
    _id: string;
    tipoDireccion: ShortModel;
    ciudad: ShortModel;
    persona: Person;
    vigente: string;
    nombre: string;
}