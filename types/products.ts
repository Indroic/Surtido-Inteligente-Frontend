import { BaseInterface } from "./bases";
import { ImpuestoInterface } from "./legal";

export interface CategoryInterface extends BaseInterface {
  name: string;
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
  stock?: number;
  variants?: number;
}

export interface ProductVariantInterface extends BaseInterface {
  product: string | ProductInterface;
  name: string;
  description: string;
  weight: number;
  stock?: number;
}
