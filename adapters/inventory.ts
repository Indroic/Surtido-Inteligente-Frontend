import { JWT } from "next-auth/jwt";
import { NextApiRequest } from "next";

import { BackendAdapter } from "./bases";

import {
  CategoryInterface,
  ProductInterface,
  ProductTypeInterface,
} from "@/types/products";
import { PaginationInterface } from "@/types/responses";

export class ProductsAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("inventory/products/", { token: token });
  }
  async list(
    req?: NextApiRequest,
  ): Promise<PaginationInterface<ProductInterface>> {
    return (await super.list(req)) as PaginationInterface<ProductInterface>;
  }

  async retrieve(pk: string): Promise<ProductInterface> {
    return (await super.retrieve(pk)) as ProductInterface;
  }

  async create(data: ProductInterface): Promise<ProductInterface> {
    return (await super.create(data)) as ProductInterface;
  }

  async update(data: ProductInterface): Promise<ProductInterface> {
    return (await super.update(data)) as ProductInterface;
  }
}

export class CategoriesAdapter extends BackendAdapter {
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

export class ProductTypesAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("inventory/product-types", { token: token });
  }
  async list(
    req?: NextApiRequest,
  ): Promise<PaginationInterface<ProductTypeInterface>> {
    return (await super.list(req)) as any;
  }
  async retrieve(pk: string): Promise<ProductTypeInterface> {
    return (await super.retrieve(pk)) as any;
  }
  async create(data: any): Promise<ProductTypeInterface> {
    return (await super.create(data)) as any;
  }
  async update(data: any): Promise<ProductTypeInterface> {
    return (await super.update(data)) as any;
  }
}
