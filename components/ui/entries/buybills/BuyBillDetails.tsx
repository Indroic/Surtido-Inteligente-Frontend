"use client";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import BuyBillForm from "@/components/forms/entries/BuyBillForm";
import useDetails from "@/hooks/common/details/useDetails";
import useBuyBillForm from "@/hooks/entries/useBuyBillForm";
import { BuyBillInterface } from "@/types/proveedores";
import { BUY_BILLS_API_URL } from "@/UrlPaths";

function BuyBillDetails() {
  const useDetailsContext = useDetails<BuyBillInterface>({
    apiPath: BUY_BILLS_API_URL,
    useFormHook: useBuyBillForm,
    toastMessages: {
      update: {
        title: "Compra Actualizada",
        description: "La compra se ha actualizado correctamente.",
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
        <BuyBillForm
          {...useDetailsContext.formHook}
          deactivated={deactivated}
        />
      }
      isLoaded={!useDetailsContext.isLoading}
      submitForm={useDetailsContext.submit}
      title={useDetailsContext.data?.num_factura?.toString()}
      onCloseDrawer={useDetailsContext.handleClose}
    />
  );
}

export default BuyBillDetails;
