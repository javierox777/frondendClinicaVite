import { Institution } from "./Institution";
import { ShortModel } from "./ShortModel";

export interface Sexo {
    _id: string;
    nombre: string;
    vigente: string;
    persona: any[];
  }

// Definición en OdontogramInterface
export interface Person {
    _id: string;
    nombre1: string;
    nombre2: string;
    apellPat: string;
    apellMat: string;
    rut: string;
    dv: string;
    fechaNac: Date;
    vigente: string;
    institucion: Institution;
    nacionalidad: ShortModel;
    sexo: Sexo;
    libretaDireccion: string; 
  }
  
