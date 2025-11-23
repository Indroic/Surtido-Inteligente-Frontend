import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { BuyPayType } from "@/types/finanzas";
import { BuyPayTypesAdapter } from "@/adapters/accounting";

const handlers: GenericRouteHandlers<
  BuyPayType,
  Promise<BuyPayTypesAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then(
    (token) => new BuyPayTypesAdapter(token as JWT),
  );
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
