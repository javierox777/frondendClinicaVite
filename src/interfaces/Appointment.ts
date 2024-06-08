import { Person } from "./Person";
import { Professional } from "./Professional";

export interface Appointment{
    _id:string;
    profesional: Professional;
    persona : Person;
    fecha : Date;
    horaInicio : string;
    horaTermino: string;
    estado : string
    razon: string
}