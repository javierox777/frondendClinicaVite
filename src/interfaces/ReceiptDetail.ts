import { Receipt } from "./Receipt";

export interface ReceiptDetail {
    _id?:string;
    vigencia?: string;
    objeto: string;
    receta?: string | Receipt;
    dias:number,
    intervalo:string
}