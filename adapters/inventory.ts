import { JWT } from "next-auth/jwt";
import { NextApiRequest } from "next";

import { BaseAdapter } from "./bases";

import { CategoryInterface, ProductInterface } from "@/types/products";
import { PaginationInterface } from "@/types/responses";

export class ProductsAdapter extends BaseAdapter {
  constructor(token: JWT) {
    super("inventory/products", { token: token });
  }
  async list(
    req?: NextApiRequest,
  ): Promise<PaginationInterface<ProductInterface>> {
    return (await super.list(req)) as PaginationInterface<ProductInterface>;
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

export class CategoriesAdapter extends BaseAdapter {
  constructor(token: JWT) {
    super("inventory/categories", { token: token });
  }
  async list(
    req?: NextApiRequest,
  ): Promise<PaginationInterface<CategoryInterface>> {
    return (await super.list(req)) as any;
  }
  async retrieve(pk: string): Promise<CategoryInterface> {
    return (await super.retrieve(pk)) as any;
  }
  async create(data: any): Promise<CategoryInterface> {
    return (await super.create(data)) as any;
  }
  async update(data: any): Promise<CategoryInterface> {
    return (await super.update(data)) as any;
  }
}
