"use client";

import { Tab } from "@heroui/react";

import CreateVariant from "@/components/ui/inventory/variants/CreateVariant";
import VariantsList from "@/components/ui/inventory/variants/VariantsList";
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
      drawerProps={{
        size: "2xl",
        scrollBehavior: "inside",
        placement: "right",
      }}
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
      <Tab className="flex flex-col" title="Variantes">
        <main className="flex flex-col gap-4 items-end min-h-full min-w-full">
          <CreateVariant
            mutateProductBase={useDetailsContext.mutateEntity}
            productBaseID={useDetailsContext.data?.id}
          />
          <VariantsList
            items={useDetailsContext.data?.variants_obj || []}
            productBaseMutate={useDetailsContext.mutateEntity}
          />
        </main>
      </Tab>
    </DrawerDetails>
  );
}

export default ProductDetails;
