"use client";

import { Button } from "@heroui/button";
import { useCallback } from "react";

import useProductDetails from "@/hooks/inventory/products/useProductDetails";
import useDrawerDetails from "@/hooks/common/details/useDetailsDrawer";

type Props = {
  productID: string;
};

function ButtonSetDetails({ productID }: Props) {
  const { setOpenDetails } = useDrawerDetails();
  const { setProductId } = useProductDetails();

  const handleOpenDrawer = useCallback(() => {
    setOpenDetails(true);
    setProductId(productID);
  }, [setOpenDetails, setProductId]);

  return (
    <Button color="primary" onPress={handleOpenDrawer}>
      Detalles
    </Button>
  );
}

export default ButtonSetDetails;
