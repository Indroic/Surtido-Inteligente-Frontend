import { BaseInterface } from "./bases";

export interface DocumentTypeInterface extends BaseInterface {
  nombre: string;
  codigo: string;
}

export interface ImpuestoInterface extends BaseInterface {
  nombre: string;
  impuesto: number;
}
