"use client";

import { useCallback, useEffect } from "react";
import useSWR from "swr";
import { Tab } from "@heroui/react";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useProductBaseForm from "@/hooks/inventory/base_products/useProductBaseForm";
import useEditMode from "@/hooks/common/details/useEditMode";
import { ProductInterface } from "@/types/products";
import ProductBaseForm from "@/components/forms/inventory/ProductBaseForm";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import useIDParam from "@/hooks/common/details/useIDSearchParam";

function ProductDetails() {
  const { id, setID } = useIDParam();
  const { editMode, setEditMode } = useEditMode();
  const {
    data,
    isLoading,
    mutate: mutateProduct,
  } = useSWR<ProductInterface>(
    id ? `/api/inventory/products?id=${id}` : null
  );

  const formHook = useProductBaseForm({
    deactivated: !editMode && !isLoading,
  });

  const handleCloseDrawer = useCallback(
    (handleCloseDrawer: () => void) => {
      setID(null);
      handleCloseDrawer();
    },
    [setID]
  );

  useEffect(() => {
    if (data) {
      formHook.reset({
        category: data.category.toString() || "",
        product_type: data.product_type.toString() || "",
        name: data.name || "",
        description: data.description || "",
      });
    }
  }, [data, formHook.reset, isLoading]);

  const handleSubmit = useCallback(() => {
    const success = async (data?: ProductInterface) => {
      setEditMode(false);

      await mutateProduct(data);
    };

    formHook.setLoading(true);
    formHook
      .handleSubmit((form) =>
        handleSubmitApi<ProductInterface>({
          form: form,
          url: `/api/inventory/products?id=${id}`,
          toast: {
            title: "Producto Actualizado",
            description: "El producto se ha actualizado correctamente.",
            color: "success",
          },
          type: "update",
          reset: formHook.reset,
          setError: formHook.setError,
          successFunction: success,
        }),
      )()
      .finally(() => formHook.setLoading(false));
  }, [formHook, mutateProduct, id, setEditMode]);

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
