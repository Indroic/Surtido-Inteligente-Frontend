"use client";

import { PRODUCT_TYPE_API_URL } from "@/UrlPaths";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useDetails from "@/hooks/common/details/useDetails";
import { ProductTypeInterface } from "@/types/products";
import ProductTypeForm from "@/components/forms/inventory/ProductTypeForm";
import useProductTypeForm from "@/hooks/inventory/useProductTypeForm";

export default function ProductTypeDetails() {
  const useDetailsContext = useDetails<ProductTypeInterface>({
    apiPath: PRODUCT_TYPE_API_URL,
    useFormHook: useProductTypeForm,
    toastMessages: {
      update: {
        title: "Tipo de Producto Actualizado",
        description: "El Tipo de Producto se ha actualizado correctamente.",
        color: "success",
      },
    },
  });

  const deactivated =
    !useDetailsContext.isLoading && !useDetailsContext.editMode;

  return (
    <DrawerDetails
      hiddeCloseButton
      editForm={
        <ProductTypeForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.name}
      onCloseDrawer={useDetailsContext.handleClose}
    />
  );
}
