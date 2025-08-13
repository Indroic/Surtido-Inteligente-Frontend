"use client";

import { Tab } from "@heroui/react";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useProductBaseForm from "@/hooks/inventory/useProductBaseForm";
import ProductBaseForm from "@/components/forms/inventory/ProductBaseForm";
import useDetails from "@/hooks/common/details/useDetails";
import { ProductInterface } from "@/types/products";
import { PRODUCT_BASE_API_URL } from "@/components/ui/UrlPaths";

function ProductDetails() {
  const useDetailsContext = useDetails<ProductInterface>({
    apiPath: PRODUCT_BASE_API_URL,
    useFormHook: useProductBaseForm,
    toastMessages: {
      update: {
        title: "Producto Actualizado",
        description: "El producto se ha actualizado correctamente.",
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
        <ProductBaseForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.name}
      onCloseDrawer={useDetailsContext.handleClose}
    >
      <Tab title="Variantes">Variantes</Tab>
    </DrawerDetails>
  );
}

export default ProductDetails;
