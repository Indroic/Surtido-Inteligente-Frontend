import { isAxiosError } from "axios";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { ProductInterface } from "@/types/products";
import { ProductsAdapter } from "@/adapters/inventory";

export async function create(req: NextRequest) {
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

export { create as POST };
