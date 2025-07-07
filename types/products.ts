import { BaseInterface } from "./bases";
import { ImpuestoInterface } from "./legal";
import { PaginationInterface } from "./responses";

export interface CategoryInterface extends BaseInterface {
  nombre: string;
}

export interface ProductTypeInterface extends BaseInterface {
  name: string;
  impuesto: string | ImpuestoInterface;
}

export interface ProductInterface extends BaseInterface {
  name: string;
  description: string;
  product_type: ProductTypeInterface | string;
  category: CategoryInterface | string;
}

export interface ProductVariantInterface extends BaseInterface {
  product: string | ProductInterface;
  name: string;
  description: string;
  weight: number;
  stock?: number;
}

export interface ProductPaginationInterface extends PaginationInterface {
  results: ProductInterface[];
}
