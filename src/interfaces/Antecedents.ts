import { Person } from "./Person";

interface AntecedentType {
    descripcion:string;
}



export interface IAntecedent extends Document {
    persona: Person | string,
    morbidos: AntecedentType[],
    familiares: AntecedentType[],
    generales: AntecedentType[]
    habitos: AntecedentType[]
    alergias: AntecedentType[]
}
