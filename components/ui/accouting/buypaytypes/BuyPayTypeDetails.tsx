"use client";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import BuyPayTypeForm from "@/components/forms/accouting/BuyPayTypeForm";
import useBuyPayTypeForm from "@/hooks/accouting/useBuyPayTypeForm";
import useDetails from "@/hooks/common/details/useDetails";
import { BuyPayType } from "@/types/finanzas";
import { BUY_PAY_TYPES_API_URL } from "@/UrlPaths";

function BuyPayTypeDetails() {
  const useDetailsContext = useDetails<BuyPayType>({
    apiPath: BUY_PAY_TYPES_API_URL,
    useFormHook: useBuyPayTypeForm,
    toastMessages: {
      update: {
        title: "Tipo de Pago de Compra Actualizado",
        description:
          "El tipo de pago de compra se ha actualizado correctamente.",
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
        <BuyPayTypeForm
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

export default BuyPayTypeDetails;
