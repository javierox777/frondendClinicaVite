import { Professional } from "./Professional";

export interface ProfessionalSchedule {
    _id:string;
    diasHabilitados: number[],
    cupos:number;
    intervalo:number;
    profesional:string | Professional;
    horaInicio:string;
    fechaInicio:string;
    fechaTermino:string
    diasLibres:string[]
    vigente:string;
}