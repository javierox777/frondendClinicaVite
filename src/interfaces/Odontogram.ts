import { Diente } from "./Diente";
import { Person } from "./Person";
import { Professional } from "./Professional";


export interface ITreatment {
    _id?:string
    detalle:string;
    fecha: Date;
    profesional:Professional | string;
    pieza:{
        diente:string;
        parte:string;
    }
}


export interface OdontogramInterface {
    _id?: string;
    persona: Person | string
    fecha: string;
    profesionalModifica: Professional | string
    dientes: Diente[]
    tratamientos: ITreatment[]
}