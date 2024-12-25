export interface User {
    _id: string;
    nombre?:string
    vigencia?: string ;
    fechaRegistro: Date;
    login: string;
    profesionalId:string
}