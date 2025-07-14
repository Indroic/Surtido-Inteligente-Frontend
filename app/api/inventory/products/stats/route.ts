import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getToken, JWT } from "next-auth/jwt";

import { ProductsAdapter } from "@/adapters/inventory";
import { ProductStatsInterface } from "@/types/products";

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);

  try {
    const result: ProductStatsInterface = await adapter.stats();

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
