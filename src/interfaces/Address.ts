import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Address {
    _id: string;
    tipoDireccion: string;
    ciudad: string;
    persona: string;
    vigente: string;
    nombre: string;
}