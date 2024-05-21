import { Budget } from "./Budget";
import { ObjectModel } from "./ObjectModel";
import { ServiceInterface } from "./ServiceInterface";

export interface BudgetDetail {
    _id: string;
    presupuesto: string;
    objeto: string;
    valorTotalNeto: number;
    valorUniNeto: number;
    valorTotalIva:number;
    prestacion: string;
    valorUniIva: number;
    cantidad: number

}