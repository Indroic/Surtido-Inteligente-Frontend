import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { VariantsAdapter } from "@/adapters/inventory";
import { ProductVariantInterface } from "@/types/products";
import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";

const handlers: GenericRouteHandlers<
  ProductVariantInterface,
  Promise<VariantsAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then((token) => new VariantsAdapter(token as JWT));
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
