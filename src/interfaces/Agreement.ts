import { Person } from "./Person";
import { ServiceType } from "./ServiceType";

export interface Agreement { 
    _id?:string
    persona: string | Person
    prestacionTipo:string | ServiceType   
    new?:boolean
}