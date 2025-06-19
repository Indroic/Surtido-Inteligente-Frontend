import { BaseInterface } from "./bases";
import { BuyPayType } from "./finanzas";
import { DocumentTypeInterface } from "./legal";
import { PaginationInterface } from "./responses";

export interface ProveedorInterface extends BaseInterface {
  name: string;
  document: number;
  document_type: DocumentTypeInterface | string;
  phone: string;
  email: string;
  direction: string;
}

export interface BuyBillInterface extends BaseInterface {
  date: Date;
  proveedor: ProveedorInterface | string;
  num_control: number;
  num_factura: number;
  subtotal: number;
  iva: number;
  total: number;
  tasaCambio: number;
  total_reference: number;
  pay_type: string | BuyPayType;
  photo?: string;
}

export interface ProveedoresPaginationInterface extends PaginationInterface {
  results: ProveedorInterface[];
}

export interface BuyBillPaginationInterface extends PaginationInterface {
  results: BuyBillInterface[];
}
