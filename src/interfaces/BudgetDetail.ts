import { Budget } from "./Budget";
import { ObjectModel } from "./ObjectModel";
import { ServiceInterface } from "./ServiceInterface";
import { ShortModel } from "./ShortModel";

export interface BudgetDetail {
    _id: string;
    presupuesto: Budget;
    objeto: ShortModel;
    valorTotalNeto: number;
    valorUniNeto: number;
    valorTotalIva:number;
    prestacion: ShortModel;
    valorUniIva: number;
    cantidad: number

}