import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { CategoriesAdapter } from "@/adapters/inventory";
import { PaginationInterface } from "@/types/responses";
import { CategoryInterface } from "@/types/products";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });
  const adapter = new CategoriesAdapter(token as JWT);

  try {
    const result: PaginationInterface<CategoryInterface> =
      await adapter.list(req);

    return NextResponse.json(result, { status: 200 });
  } catch {
    return NextResponse.json({ error: "failed to load data" }, { status: 500 });
  }
}
