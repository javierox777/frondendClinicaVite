import { ToothPart } from "./ToothPart";

export interface Diente {
    pieza: string;
    detalle: string;
    diagnostico: string;
    estado: string;
    activo: boolean;
    bucal:ToothPart,
    oclusal:ToothPart,
    mesial:ToothPart,
    distal:ToothPart,
    lingualpalatino:ToothPart,
    raiz:ToothPart
}