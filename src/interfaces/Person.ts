import { Institution } from "./Institution";
import { ShortModel } from "./ShortModel";

export interface Person {
    _id:string
    nombre1: string;
    nombre2: string;
    dv: string;
    apellPat:string;
    apellMat:string;
    rut:string;
    id:string;
    fechaNac:Date;
    vigente:string;
    institucion:string;
    nacionalidad:string;
    sexo:string

}