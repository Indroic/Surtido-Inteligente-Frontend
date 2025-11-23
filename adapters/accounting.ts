import { JWT } from "next-auth/jwt";
import { NextRequest } from "next/server";

import { BackendAdapter } from "./bases";

import { PaginationInterface } from "@/types/responses";
import { BuyPayType, PayType } from "@/types/finanzas";

export class BuyPayTypesAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("finanzas/buypaytypes/", { token: token });
  }
  async list(req?: NextRequest): Promise<PaginationInterface<BuyPayType>> {
    return (await super.list(req)) as PaginationInterface<BuyPayType>;
  }

  async retrieve(pk: string): Promise<BuyPayType> {
    return (await super.retrieve(pk)) as BuyPayType;
  }

  async create(data: BuyPayType): Promise<BuyPayType> {
    return (await super.create(data)) as BuyPayType;
  }

  async update(pk: string, data: BuyPayType): Promise<BuyPayType> {
    return (await super.update(pk, data)) as BuyPayType;
  }
}

export class PayTypesAdapter extends BackendAdapter {
  constructor(token: JWT) {
    super("finanzas/paytypes/", { token: token });
  }
  async list(req?: NextRequest): Promise<PaginationInterface<PayType>> {
    return (await super.list(req)) as PaginationInterface<PayType>;
  }
  async retrieve(pk: string): Promise<PayType> {
    return (await super.retrieve(pk)) as PayType;
  }
  async create(data: PayType): Promise<PayType> {
    return (await super.create(data)) as PayType;
  }
  async update(pk: string, data: PayType): Promise<PayType> {
    return (await super.update(pk, data)) as PayType;
  }
}
