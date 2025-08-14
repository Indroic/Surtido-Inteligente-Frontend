"use client";

import { VARIANTS_API_URL } from "@/components/ui/UrlPaths";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useDetails from "@/hooks/common/details/useDetails";
import { ProductVariantInterface } from "@/types/products";
import useProductVariantForm from "@/hooks/inventory/useProductVariantForm";
import ProductVariantForm from "@/components/forms/inventory/ProductVariantForm";
import useVariantDetailsStateController from "@/hooks/controllers/inventory/useVariantDetailsStateController";
import useVariantIDController from "@/hooks/controllers/inventory/useVariantIDController";

export default function VariantDetails() {
  const useDetailsContext = useDetails<ProductVariantInterface>({
    apiPath: VARIANTS_API_URL,
    useFormHook: useProductVariantForm,
    toastMessages: {
      update: {
        title: "Variante Actualizada",
        description: "La Variante se ha actualizado correctamente.",
        color: "success",
      },
    },
    stateController: useVariantDetailsStateController,
    idController: useVariantIDController,
  });

  const deactivated =
    !useDetailsContext.isLoading && !useDetailsContext.editMode;

  return (
    <DrawerDetails
      hiddeCloseButton
      drawerProps={{ size: "xl", scrollBehavior: "inside", placement: "left" }}
      editForm={
        <ProductVariantForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      stateController={useVariantDetailsStateController}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.name}
      onCloseDrawer={useDetailsContext.handleClose}
    />
  );
}
