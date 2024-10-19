import { ServiceType } from "./ServiceType";

export interface ServiceInterface {
    _id: string;
    valor:number;
    vigencia: string;
    prestacionesTipo?: string | ServiceType;
    nombre: string;
    standard:boolean
}