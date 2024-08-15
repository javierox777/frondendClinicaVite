import { Diente } from "./Diente";
import { Person } from "./Person";
import { Professional } from "./Professional";

export interface OdontogramInterface {
    _id?: string;
    persona: Person | string
    fecha: string;
    profesionalModifica: Professional | string
    dientes: Diente[]
}