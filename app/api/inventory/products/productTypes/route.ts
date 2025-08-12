import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { ProductTypesAdapter } from "@/adapters/inventory";
import { ProductTypeInterface } from "@/types/products";
import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";

const handlers: GenericRouteHandlers<
  ProductTypeInterface,
  Promise<ProductTypesAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then(
    (token) => new ProductTypesAdapter(token as JWT),
  );
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
