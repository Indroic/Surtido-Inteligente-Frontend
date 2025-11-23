"use client";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import PayTypeForm from "@/components/forms/accouting/PayTypeForm";
import usePayTypeForm from "@/hooks/accouting/usePayTypeForm";
import useDetails from "@/hooks/common/details/useDetails";
import { PayType } from "@/types/finanzas";
import { PAY_TYPES_API_URL } from "@/UrlPaths";

function PayTypeDetails() {
  const useDetailsContext = useDetails<PayType>({
    apiPath: PAY_TYPES_API_URL,
    useFormHook: usePayTypeForm,
    toastMessages: {
      update: {
        title: "Tipo de Pago Actualizado",
        description: "El tipo de pago se ha actualizado correctamente.",
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
        <PayTypeForm
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

export default PayTypeDetails;
