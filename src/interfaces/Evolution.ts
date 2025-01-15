import { Company } from "./Company";
import { Person } from "./Person";
import { Professional } from "./Professional";

export interface Evolution {
    _id?:string
    persona: string | Person;
    profesional:string | Professional;
    fecha:string;
    descripcion:string;
    empresa:string | Company
    }