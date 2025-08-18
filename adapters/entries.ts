import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

import { BackendAdapter } from "./bases";

import { PaginationInterface } from "@/types/responses";
import { BuyBillInterface, ProveedorInterface } from "@/types/proveedores";

export class ProveedoresAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("proveedores/providers/", { token: token });
  }
  async list(
    req?: NextRequest,
  ): Promise<PaginationInterface<ProveedorInterface>> {
    return (await super.list(req)) as PaginationInterface<ProveedorInterface>;
  }

  async retrieve(pk: string): Promise<ProveedorInterface> {
    return (await super.retrieve(pk)) as ProveedorInterface;
  }

  async create(data: ProveedorInterface): Promise<ProveedorInterface> {
    return (await super.create(data)) as ProveedorInterface;
  }

  async update(
    pk: string,
    data: ProveedorInterface,
  ): Promise<ProveedorInterface> {
    return (await super.update(pk, data)) as ProveedorInterface;
  }
}

export class BuyBillsAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("proveedores/buybills/", { token: token });
  }
  async list(
    req?: NextRequest,
  ): Promise<PaginationInterface<BuyBillInterface>> {
    return (await super.list(req)) as PaginationInterface<BuyBillInterface>;
  }
  async retrieve(pk: string): Promise<BuyBillInterface> {
    return (await super.retrieve(pk)) as BuyBillInterface;
  }
  async create(data: BuyBillInterface): Promise<BuyBillInterface> {
    return (await super.create(data)) as BuyBillInterface;
  }
  async update(pk: string, data: BuyBillInterface): Promise<BuyBillInterface> {
    return (await super.update(pk, data)) as BuyBillInterface;
  }
}
