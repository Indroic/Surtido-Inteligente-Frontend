"use client";

import { Skeleton } from "@heroui/skeleton";
import { useCallback } from "react";
import useSWR from "swr";

import useProductDetails from "@/hooks/inventory/products/useProductDetails";
import DrawerDetails from "@/components/common/details/DetailsDrawer";

function ProductDetails() {
  const { productId, setProductId } = useProductDetails();

  const { data, isLoading } = useSWR(
    productId ? `/api/inventory/products?productID=${productId}` : null,
  );

  const handleCloseDrawer = useCallback(
    (handleCloseDrawer: () => void) => {
      setProductId(null);
      handleCloseDrawer();
    },
    [setProductId],
  );

  return (
    <DrawerDetails onCloseDrawer={handleCloseDrawer}>
      <Skeleton className="rounded-md" isLoaded={!isLoading}>
        <h1 className="text-2xl font-bold">{data?.name}</h1>
        <p className="text-lg">{data?.description}</p>
      </Skeleton>
    </DrawerDetails>
  );
}

export default ProductDetails;
