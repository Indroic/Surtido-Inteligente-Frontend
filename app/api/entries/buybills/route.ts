import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { BuyBillInterface } from "@/types/proveedores";
import { BuyBillsAdapter } from "@/adapters/entries";

const handlers: GenericRouteHandlers<
  BuyBillInterface,
  Promise<BuyBillsAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then((token) => new BuyBillsAdapter(token as JWT));
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
