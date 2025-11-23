import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { PayType } from "@/types/finanzas";
import { PayTypesAdapter } from "@/adapters/accounting";

const handlers: GenericRouteHandlers<
  PayType,
  Promise<PayTypesAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then((token) => new PayTypesAdapter(token as JWT));
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
