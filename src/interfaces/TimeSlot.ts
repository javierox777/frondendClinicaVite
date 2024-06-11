import { Person } from "./Person";
import { Professional } from "./Professional";

export interface TimeSlot {
        horaInicio: string;
        horaTermino: string;
        fecha:Date;
        content: {
                type: string,
                razon?: string,
                persona:Person,
                profesional:Professional,
                estado:string        
        }
        mostrarHora:boolean;
        cuadroHabilitado:boolean;
}