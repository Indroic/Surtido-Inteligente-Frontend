import { ProductsAdapter } from "@/adapters/inventory";
import { ProductInterface } from "@/types/products";
import { isAxiosError } from "axios";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function create(req: NextRequest, res: NextResponse) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);
  const body = await req.json();
  console.log(body)
  try {
    const result: ProductInterface = await adapter.create(body);

    return new NextResponse(JSON.stringify(result), { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return new NextResponse(error.response?.data, { status: error.response?.status, headers: { "Content-Type": "application/json" } });
    }
  }
}

export { create as POST };
