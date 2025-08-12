import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { ProductInterface, ProductStatsInterface } from "@/types/products";
import { ProductsAdapter } from "@/adapters/inventory";
import { loadGetStats } from "@/hooks/common/useStats";

const handlers: GenericRouteHandlers<
  ProductInterface,
  Promise<ProductsAdapter>
> = new GenericRouteHandlers(
  (req: NextRequest) => {
    return getToken({ req }).then((token) => new ProductsAdapter(token as JWT));
  },
  {
    get: async (req, adapter, baseGet, errorHandler) => {
      const { getstats } = loadGetStats(req);

      try {
        if (getstats) {
          const result: ProductStatsInterface = await adapter.stats();

          return NextResponse.json(result, { status: 200 });
        }

        return baseGet(req, adapter);
      } catch (error) {
        return errorHandler(error);
      }
    },
  },
);

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
