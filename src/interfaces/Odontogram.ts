import { Diente } from "./Diente";
import { Person } from "./Person";
import { Professional } from "./Professional";

export interface OdontogramInterface {
    _id?: string;
    persona: string | Person
    version: number
    fecha: string;
    profesionalModifica:  string | Professional
    dientes: Diente[]
}