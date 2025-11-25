import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

import { BackendAdapter } from "./bases";

import { PaginationInterface } from "@/types/responses";
import {
  BillPhotoInterface,
  BuyBillInterface,
  ProveedorInterface,
} from "@/types/proveedores";

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
  async uploadBillPhoto(req: NextRequest): Promise<BillPhotoInterface> {
    const incoming = await req.formData();

    const outbound = new FormData();

    incoming.forEach((value, key) => {
      if (value instanceof File) {
        outbound.append(key, value, value.name);
      } else {
        outbound.append(key, value);
      }
    });

    return this.post(
      "proveedores/buybills/upload-photo/",
      outbound,
      true,
    ) as Promise<BillPhotoInterface>;
  }
  async update(pk: string, data: BuyBillInterface): Promise<BuyBillInterface> {
    return (await super.update(pk, data)) as BuyBillInterface;
  }
}
