import { ServiceType } from "./ServiceType";

export interface ServiceInterface {
    _id: string;
    // precioUniIva: number;
    valor:number;
    vigencia: string;
    prestacionesTipo: string;
    // precioUniNeto: number;
    nombre: string;
}