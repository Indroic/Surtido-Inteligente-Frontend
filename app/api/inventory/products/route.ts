import { isAxiosError } from "axios";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { ProductInterface } from "@/types/products";
import { ProductsAdapter } from "@/adapters/inventory";
import { loadProductsParams } from "@/hooks/inventory/products/useProductDetails";
import { PaginationInterface } from "@/types/responses";

export async function GET(req: any) {
  const { productID } = loadProductsParams(req);
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);

  try {
    if (productID) {
      const result: ProductInterface = await adapter.retrieve(productID);

      return NextResponse.json(result, { status: 200 });
    }

    const result: PaginationInterface<ProductInterface> =
      await adapter.list(req);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);

  try {
    const body = await req.json();
    const result: ProductInterface = await adapter.create(body);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return new NextResponse(JSON.stringify(error.response?.data), {
        status: error.response?.status,
      });
    }

    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
