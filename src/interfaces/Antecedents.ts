import { Person } from "./Person";

interface AntecedentType {
    _id:string
    descripcion:string;
}



export interface IAntecedent extends Document {
    _id?:string
    persona: Person | string,
    morbidos: AntecedentType[],
    familiares: AntecedentType[],
    generales: AntecedentType[]
    habitos: AntecedentType[]
    alergias: AntecedentType[]
}
