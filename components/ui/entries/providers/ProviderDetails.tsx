"use client";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import ProviderForm from "@/components/forms/entries/ProviderForm";
import useDetails from "@/hooks/common/details/useDetails";
import useProviderForm from "@/hooks/entries/useProviderForm";
import { ProveedorInterface } from "@/types/proveedores";
import { PROVIDERS_API_URL } from "@/UrlPaths";

function ProviderDetails() {
  const useDetailsContext = useDetails<ProveedorInterface>({
    apiPath: PROVIDERS_API_URL,
    useFormHook: useProviderForm,
    toastMessages: {
      update: {
        title: "Proveedor Actualizado",
        description: "El proveedor se ha actualizado correctamente.",
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
        <ProviderForm
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

export default ProviderDetails;
