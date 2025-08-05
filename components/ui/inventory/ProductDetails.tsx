"use client";

import { Skeleton } from "@heroui/skeleton";
import { useCallback } from "react";
import useSWR from "swr";

import useProductDetails from "@/hooks/inventory/products/useProductDetails";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import EditModeDrawerHeader from "@/components/common/details/EditModeDrawerHeader";

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
    <DrawerDetails
      hiddeCloseButton
      headerChildren={(onClose) => (
        <EditModeDrawerHeader isLoading={isLoading} onClose={onClose}>
          <h1 className="text-xl font-semibold">{data?.name}</h1>
        </EditModeDrawerHeader>
      )}
      isLoaded={!isLoading}
      onCloseDrawer={handleCloseDrawer}
    >
      <p className="text-lg">{data?.description}</p>
    </DrawerDetails>
  );
}

export default ProductDetails;
