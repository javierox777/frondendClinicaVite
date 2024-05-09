import { Budget } from "./Budget";
import { ObjectModel } from "./ObjectModel";
import { ServiceInterface } from "./ServiceInterface";

export interface BudgetDetail {
    id: string;
    presupuesto_id: string;
    objeto_id: string;
    valorTotalNeto: number;
    valorUniNeto: number;
    valorTotalIva:number;
    prestacion_id: string;
    valorUniIva: number;
    cantidad: number
    presupuesto: Budget
    objeto: ObjectModel
    prestacion: ServiceInterface
}