import { NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { getToken, JWT } from "next-auth/jwt";
import { AxiosError, isAxiosError } from "axios";

import { ProductsAdapter } from "@/adapters/inventory";
import { ProductInterface } from "@/types/products";

export async function POST(req: NextApiRequest) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);


    const result: ProductInterface = await adapter.create(req.body);
    return NextResponse.json(result, { status: 200 });

}
