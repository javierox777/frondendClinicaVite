import { Diente } from "./Diente";
import { Person } from "./Person";
import { Professional } from "./Professional";

export interface OdontogramInterface {
    _id?: string;
    persona: Person | string
    version: number
    fecha: string;
    profesionalModifica: Professional | string
    dientes: Diente[]
}