import { BaseAdapter, PaginationType } from "./bases";

import {
  BuyBillInterface,
  BuyBillPaginationInterface,
  ProveedoresPaginationInterface,
  ProveedorInterface,
} from "@/types/proveedores";

export class ProveedoresAdapter extends BaseAdapter {
  constructor(token?: string) {
    super("/proveedores/providers", { token: token });
  }

  async list(
    options?: PaginationType,
  ): Promise<ProveedoresPaginationInterface> {
    return (await super.list(options)) as ProveedoresPaginationInterface;
  }

  async retrieve(pk: string): Promise<ProveedorInterface> {
    return (await super.retrieve(pk)) as ProveedorInterface;
  }

  async create(data: any): Promise<ProveedorInterface> {
    return (await super.create(data)) as ProveedorInterface;
  }

  async update(data: any): Promise<ProveedorInterface> {
    return (await super.update(data)) as ProveedorInterface;
  }
}

export class BuyBillsAdapter extends BaseAdapter {
  constructor(token: string) {
    super("/proveedores/buybills", { baseUrl: "", token: token });
  }

  async list(options?: PaginationType): Promise<BuyBillPaginationInterface> {
    return (await super.list(options)) as BuyBillPaginationInterface;
  }

  async retrieve(pk: string): Promise<BuyBillInterface> {
    return (await super.retrieve(pk)) as BuyBillInterface;
  }

  async create(data: any): Promise<BuyBillInterface> {
    return (await super.create(data)) as BuyBillInterface;
  }

  async update(data: any): Promise<BuyBillInterface> {
    return (await super.update(data)) as BuyBillInterface;
  }
}
