import { Person } from "./Person";
import { ShortModel } from "./ShortModel";

export interface Address {
    id: string;
    tipoDireccion_id: string;
    ciudad_id: string;
    persona_id: string;
    vigente: string;
    nombre: string;
    tipoDireccion: ShortModel;
    ciudad: ShortModel;
    persona : Person; 
}