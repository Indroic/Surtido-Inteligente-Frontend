import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getToken, JWT } from "next-auth/jwt";

import { ProductTypesAdapter } from "@/adapters/inventory";
import { PaginationInterface } from "@/types/responses";
import { ProductTypeInterface } from "@/types/products";

export async function GET(req: NextApiRequest) {
  const token = await getToken({ req });
  const adapter = new ProductTypesAdapter(token as JWT);

  try {
    const result: PaginationInterface<ProductTypeInterface> =
      await adapter.list(req);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
