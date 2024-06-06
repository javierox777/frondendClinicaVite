import { Professional } from "./Professional";

export interface ProfessionalSchedule {
    diasHabilitados: number[],
    cupos:number;
    intervalo:number;
    profesional:string | Professional;
    horaInicio:string;
}