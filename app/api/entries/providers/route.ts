import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { ProveedorInterface } from "@/types/proveedores";
import { ProveedoresAdapter } from "@/adapters/entries";

const handlers: GenericRouteHandlers<
  ProveedorInterface,
  Promise<ProveedoresAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then(
    (token) => new ProveedoresAdapter(token as JWT),
  );
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
