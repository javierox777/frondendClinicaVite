// src/types.ts
export interface Profesional {
    _id: string;
    apellMat: string;
    apellPat: string;
    celular: string;
    direccion: string;
    dv: string;
    email: string;
    nombre1: string;
    nombre2: string;
    rut: string;
    login: string;
    profesion: string;
    especialidad: string;
  }
  
  export interface Empresa {
    _id: string;
    rol: string;
    dv: string;
    razonSocial: string;
    direccion: string;
    email: string;
    giro: string;
    vigencia: string;
  }
  
  export interface Persona {
    _id: string;
    apellMat: string;
    apellPat: string;
    dv: string;
    fechaNac: string;
    institucion: string;
    nacionalidad: string;
    nombre1: string;
    nombre2: string;
    rut: string;
    sexo: string;
    vigente: string;
  }
  
  export interface Receipt {
    _id: string;
    direccion:string;
    estado_id: boolean;
    profesional_id: Profesional;
    empresa_id: Empresa;
    fechaRegistro: string;
    persona_id: Persona;
    recetaDetalle: string[];
    __v: number;
  }
  