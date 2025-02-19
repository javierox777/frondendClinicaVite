import { Document } from 'mongoose'; // Ajusta si no usas mongoose
import { Company } from './Company';
import { ConsentmentDetail } from './ConsentmentDetails';
import { Person } from './Person';
import { Professional } from './Professional';
import { ShortModel } from './ShortModel';

export interface Consentment extends Document {
  _id: string;
  estado: string | ShortModel;
  profesional: string | Professional;
  empresa: string | Company;
  fechaRegistro: Date;
  persona: string | Person;
  // Asegúrate de incluir esta propiedad:
  detalles: ConsentmentDetail[];
}
