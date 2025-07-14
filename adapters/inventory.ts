import { JWT } from "next-auth/jwt";
import { NextApiRequest } from "next";

import { BackendAdapter } from "./bases";

import {
  CategoryInterface,
  ProductInterface,
  ProductStatsInterface,
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

  async stats(): Promise<ProductStatsInterface> {
    return (await super.retrieve("stats")) as ProductStatsInterface;
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
    return (await super.list(req)) as ProductStatsInterface;
  }
  async retrieve(pk: string): Promise<CategoryInterface> {
    return (await super.retrieve(pk)) as ProductStatsInterface;
  }
  async create(data: ProductStatsInterface): Promise<CategoryInterface> {
    return (await super.create(data)) as ProductStatsInterface;
  }
  async update(data: ProductStatsInterface): Promise<CategoryInterface> {
    return (await super.update(data)) as ProductStatsInterface;
  }
}

export class ProductTypesAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("inventory/product-types", { token: token });
  }
  async list(
    req?: NextApiRequest,
  ): Promise<PaginationInterface<ProductTypeInterface>> {
    return (await super.list(req)) as ProductStatsInterface;
  }
  async retrieve(pk: string): Promise<ProductTypeInterface> {
    return (await super.retrieve(pk)) as ProductStatsInterface;
  }
  async create(data: ProductStatsInterface): Promise<ProductTypeInterface> {
    return (await super.create(data)) as ProductStatsInterface;
  }
  async update(data: ProductStatsInterface): Promise<ProductTypeInterface> {
    return (await super.update(data)) as ProductStatsInterface;
  }
}
