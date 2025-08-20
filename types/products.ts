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
  variants?: ProductVariantInterface[];
}

export interface ProductVariantInterface extends BaseInterface {
  product: string | ProductInterface;
  name: string;
  description: string;
  weight: number;
  separate_stock: boolean;
  stock?: number;
  bar_code?: string;
}

export interface ProductStatsInterface {
  total_products: number;
  total_variants: number;
  total_stock: number;
  total_categories: number;
}

export interface ProductVariantImageInterface extends BaseInterface {
  product: string | ProductVariantInterface;
  image: string;
}
