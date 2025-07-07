import { NextApiRequest } from "next";
import { BaseAdapter, PaginationType } from "./bases";

import { ProductInterface, ProductPaginationInterface } from "@/types/products";

export class ProductsAdapter extends BaseAdapter {
  constructor(req: NextApiRequest) {
    super("inventory/products", { req: req });
  }
  async list(options?: PaginationType): Promise<ProductPaginationInterface> {
    return (await super.list(options)) as ProductPaginationInterface;
  }

  async retrieve(pk: string): Promise<ProductInterface> {
    return (await super.retrieve(pk)) as ProductInterface;
  }

  async create(data: any): Promise<ProductInterface> {
    return (await super.create(data)) as ProductInterface;
  }

  async update(data: any): Promise<ProductInterface> {
    return (await super.update(data)) as ProductInterface;
  }
}
