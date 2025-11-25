import { NextRequest, NextResponse } from "next/server";
import { getToken, JWT } from "next-auth/jwt";

import { GenericRouteHandlers } from "@/app/api/GenericRouteHandlers";
import { BillPhotoInterface, BuyBillInterface } from "@/types/proveedores";
import { BuyBillsAdapter } from "@/adapters/entries";
import { loadUploadBillImage } from "@/hooks/entries/useUploadBuyBillPhotoQueryParam";

const handlers: GenericRouteHandlers<
  BuyBillInterface,
  Promise<BuyBillsAdapter>
> = new GenericRouteHandlers(
  (req: NextRequest) => {
    return getToken({ req }).then((token) => new BuyBillsAdapter(token as JWT));
  },
  {
    post: async (req, adapter, basePost, errorHandler) => {
      const { uploadBillImage } = loadUploadBillImage(req);

      try {
        if (uploadBillImage) {
          const result: BillPhotoInterface = await adapter.uploadBillPhoto(req);

          return NextResponse.json(result, { status: 201 });
        }

        return basePost(req, adapter);
      } catch (error) {
        return errorHandler(error);
      }
    },
  },
);

export const { GET, POST, PUT, DELETE } = handlers.getAllHandlers();
