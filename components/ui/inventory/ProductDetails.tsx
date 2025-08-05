"use client";

import { useCallback } from "react";
import { Button, ButtonGroup, Tab, Tabs } from "@heroui/react";
import useSWR from "swr";
import { IconBook } from "@tabler/icons-react";

import ProductBaseForm from "./ProductBaseForm";

import useProductDetails from "@/hooks/inventory/products/useProductDetails";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import EditModeDrawerHeader from "@/components/common/details/EditModeDrawerHeader";
import useProductBaseForm from "@/hooks/inventory/products/useProductBaseForm";
import useEditMode from "@/hooks/common/details/useEditMode";
import { ProductInterface } from "@/types/products";

function ProductDetails() {
  const { productId, setProductId } = useProductDetails();
  const { editMode } = useEditMode();
  const { data, isLoading } = useSWR<ProductInterface>(
    productId ? `/api/inventory/products?productID=${productId}` : null,
  );
  const formProps = useProductBaseForm({
    deactivated: !editMode && !isLoading,
    defaultValues: {
      category: data?.category.toString() || "",
      product_type: data?.product_type.toString() || "",
      name: data?.name || "",
      description: data?.description || "",
    },
  });

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
          <h1 className="flex items-center justify-start text-2xl font-semibold">
            {data?.name}
          </h1>
        </EditModeDrawerHeader>
      )}
      isLoaded={!isLoading}
      onCloseDrawer={handleCloseDrawer}
    >
      <Tabs fullWidth>
        <Tab key={"resumen"}>Resumen</Tab>
        <Tab key={"general"} className="flex flex-col gap-4" title="General">
          <ProductBaseForm {...formProps} />
          <div className="flex flex-row w-full items-center justify-end">
            <ButtonGroup>
              <Button color="danger" isDisabled={!editMode} variant="light">
                Cancelar
              </Button>
              <Button
                color="primary"
                isDisabled={!editMode}
                startContent={<IconBook size={16} />}
              >
                Guardar
              </Button>
            </ButtonGroup>
          </div>
        </Tab>
        <Tab key={"variants"}>Variantes </Tab>
      </Tabs>
    </DrawerDetails>
  );
}

export default ProductDetails;
