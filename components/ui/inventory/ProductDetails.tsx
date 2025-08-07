"use client";

import { useCallback } from "react";
import useSWR from "swr";
import { Tab } from "@heroui/react";

import useProductDetails from "@/hooks/inventory/products/useProductDetails";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useProductBaseForm from "@/hooks/inventory/products/useProductBaseForm";
import useEditMode from "@/hooks/common/details/useEditMode";
import { ProductInterface } from "@/types/products";
import ProductBaseForm from "@/components/forms/inventory/ProductBaseForm";
import handleSubmitApi from "@/helpers/handleSubmitApi";

function ProductDetails() {
  const { productId, setProductId } = useProductDetails();
  const { editMode } = useEditMode();
  const { data, isLoading } = useSWR<ProductInterface>(
    productId ? `/api/inventory/products?productID=${productId}` : null,
  );

  const formHook = useProductBaseForm({
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

  const handleSubmit = useCallback(() => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((form) =>
        handleSubmitApi<ProductInterface>({
          form: form,
          url: `/api/inventory/products?productID=${productId}`,
          toast: {
            title: "Producto Actualizado",
            description: "El producto se ha actualizado correctamente.",
            color: "success",
          },
          type: "update",
          reset: formHook.reset,
          setError: formHook.setError,
        }),
      )()
      .finally(() => formHook.setLoading(false));
  }, [formHook]);

  return (
    <DrawerDetails
      hiddeCloseButton
      editForm={<ProductBaseForm {...formHook} />}
      isLoaded={!isLoading}
      submitForm={handleSubmit}
      title={data?.name}
      onCloseDrawer={handleCloseDrawer}
    >
      <Tab title="Variantes">Variantes</Tab>
    </DrawerDetails>
  );
}

export default ProductDetails;
