import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getToken, JWT } from "next-auth/jwt";

import { ProductsAdapter } from "@/adapters/inventory";
import { ProductPaginationInterface } from "@/types/products";

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  const productsAdapter = new ProductsAdapter(token as JWT);

  try {
    const result: ProductPaginationInterface = await productsAdapter.list();

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.log(err);

    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
