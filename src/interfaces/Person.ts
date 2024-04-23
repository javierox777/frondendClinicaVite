import { Institution } from "./Institution";

export interface Person {
    nombre1: string;
    nombre2: string;
    dv: string;
    apellPat:string;
    apellMat:string;
    rut:string;
    id:string;
    fechaNac:Date;
    vigente:string;
    institucion_id:string;
    nacionalidad_id:string;
    sexo_id:string
    institucion: Institution;
}