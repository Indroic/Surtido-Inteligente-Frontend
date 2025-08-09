import { isAxiosError } from "axios";
import { getToken, JWT } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

import { ProductInterface } from "@/types/products";
import { ProductsAdapter } from "@/adapters/inventory";
import { loadProductsParams } from "@/hooks/inventory/products/useProductDetails";
import { PaginationInterface } from "@/types/responses";
import { BaseErrorInterface } from "@/types/bases";

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

export async function PUT(req: NextRequest) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);
  const { productID } = loadProductsParams(req);

  if (!productID) {
    return new NextResponse(
      JSON.stringify({
        formError: "product ID Missing",
      } as BaseErrorInterface),
      { status: 400, statusText: "Product ID Missing" },
    );
  }

  try {
    const body = await req.json();
    const result: ProductInterface = await adapter.update(productID, body);

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

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });
  const adapter = new ProductsAdapter(token as JWT);
  const { productID } = loadProductsParams(req);

  if (!productID) {
    return new NextResponse(
      JSON.stringify({
        formError: "product ID Missing",
      } as BaseErrorInterface),
      { status: 400, statusText: "Product ID Missing" },
    );
  }

  try {
    await adapter.delete(productID);

    return new NextResponse(JSON.stringify({}), { status: 200 });
  } catch (error) {
    if (isAxiosError(error)) {
      return new NextResponse(JSON.stringify(error.response?.data), {
        status: error.response?.status,
      });
    }

    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
}
