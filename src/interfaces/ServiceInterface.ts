import { ServiceType } from "./ServiceType";

export interface ServiceInterface {
    id: string;
    precioUniIva: number;
    vigencia: string;
    prestacionesTipo_id: string;
    precioUniNeto: number;
    nombre: string;
    prestacionesTipo: ServiceType
}