import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { GenericRouteHandlers } from "../../GenericRouteHandlers";

import { ProductInterface, ProductStatsInterface } from "@/types/products";
import { ProductsAdapter } from "@/adapters/inventory";
import { PaginationInterface } from "@/types/responses";
import { BaseErrorInterface } from "@/types/bases";
import { loadGetStats } from "@/hooks/common/useStats";
import { loadIDParam } from "@/hooks/common/details/useIDSearchParam";

const handlers: GenericRouteHandlers<
  Promise<ProductsAdapter>,
  ProductInterface,
  PaginationInterface<ProductInterface>
> = new GenericRouteHandlers(
  (req: NextRequest) => {
    // Adaptador con token
    return getToken({ req }).then((token) => new ProductsAdapter(token as JWT));
  },
  {
    get: async (req, adapterPromise) => {
      const adapter = await adapterPromise;
      const { getstats } = loadGetStats(req);
      const { id } = loadIDParam(req);

      try {
        if (getstats) {
          const result: ProductStatsInterface = await adapter.stats();

          return NextResponse.json(result, { status: 200 });
        }
        if (id) {
          const result: ProductInterface = await adapter.retrieve(id);

          return NextResponse.json(result, { status: 200 });
        }
        const result: PaginationInterface<ProductInterface> =
          await adapter.list(req);

        return NextResponse.json(result, { status: 200 });
      } catch {
        const data: PaginationInterface<ProductInterface> = {
          count: 0,
          next: null,
          previous: null,
          results: [],
          page: 0,
          totalPages: 0,
          hasNext: false,
          hasPrevious: false,
          limit: 0,
          offset: 0,
        };

        return NextResponse.json(data, { status: 500 });
      }
    },
    put: async (req, adapterPromise) => {
      const adapter = await adapterPromise;
      const { id } = loadIDParam(req);

      if (!id) {
        return new NextResponse(
          JSON.stringify({
            formError: "product ID Missing",
          } as BaseErrorInterface),
          { status: 400, statusText: "Product ID Missing" },
        );
      }
      try {
        const body = await req.json();
        const result: ProductInterface = await adapter.update(id, body);

        return new NextResponse(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return handlers.handleError(error);
      }
    },
    delete: async (req, adapterPromise) => {
      const adapter = await adapterPromise;
      const { id } = loadIDParam(req);

      if (!id) {
        return new NextResponse(
          JSON.stringify({
            formError: "product ID Missing",
          } as BaseErrorInterface),
          { status: 400, statusText: "Product ID Missing" },
        );
      }
      try {
        await adapter.delete(id);

        return new NextResponse(JSON.stringify({}), { status: 200 });
      } catch (error) {
        return handlers.handleError(error);
      }
    },
    post: async (req, adapterPromise) => {
      const adapter = await adapterPromise;

      try {
        const body = await req.json();
        const result: ProductInterface = await adapter.create(body);

        return new NextResponse(JSON.stringify(result), { status: 200 });
      } catch (error) {
        return handlers.handleError(error);
      }
    },
  },
);

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
