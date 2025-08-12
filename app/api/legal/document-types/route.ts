import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { DocumentTypeInterface } from "@/types/legal";
import { DocumentsStypesAdapter } from "@/adapters/legal";

const handlers: GenericRouteHandlers<
  DocumentTypeInterface,
  Promise<DocumentsStypesAdapter>
> = new GenericRouteHandlers((req: NextRequest) => {
  return getToken({ req }).then(
    (token) => new DocumentsStypesAdapter(token as JWT),
  );
});

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
