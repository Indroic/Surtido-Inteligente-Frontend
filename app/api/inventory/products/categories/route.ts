import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { CategoriesAdapter } from "@/adapters/inventory";
import { CategoryInterface } from "@/types/products";
import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";

const handlers: GenericRouteHandlers<
  CategoryInterface,
  Promise<CategoriesAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then((token) => new CategoriesAdapter(token as JWT));
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
