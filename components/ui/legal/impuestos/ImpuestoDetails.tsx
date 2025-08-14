"use client";

import { IMPUESTOS_API_URL } from "@/components/ui/UrlPaths";
import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useDetails from "@/hooks/common/details/useDetails";
import { ImpuestoInterface } from "@/types/legal";
import useImpuestoForm from "@/hooks/legal/useImpuestoForm";
import ImpuestoForm from "@/components/forms/legal/ImpuestoForm";

function ImpuestoDetails() {
  const useDetailsContext = useDetails<ImpuestoInterface>({
    apiPath: IMPUESTOS_API_URL,
    useFormHook: useImpuestoForm,
    toastMessages: {
      update: {
        title: "Impuesto Actualizado",
        description: "El impuesto se ha actualizado correctamente.",
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
        <ImpuestoForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.nombre}
      onCloseDrawer={useDetailsContext.handleClose}
    />
  );
}

export default ImpuestoDetails;
