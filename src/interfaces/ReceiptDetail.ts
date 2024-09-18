import { Receipt } from "./Receipt";

export interface ReceiptDetail {
    vigencia?: string;
    objeto: string;
    receta?: string | Receipt;
    dias:number,
    intervalo:string
}