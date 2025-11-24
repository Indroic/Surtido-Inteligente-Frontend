import { IconPlus } from "@tabler/icons-react";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { BuyBillInterface } from "@/types/proveedores";
import useBuyBillForm from "@/hooks/entries/useBuyBillForm";
import BuyBillForm from "@/components/forms/entries/BuyBillForm";
import { BUY_BILLS_API_URL } from "@/UrlPaths";

export default function CreateBuyBill() {
  const formHook = useBuyBillForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<BuyBillInterface>({
          form: data,
          url: BUY_BILLS_API_URL,
          toast: {
            title: "Compra Creada",
            description: "La compra se ha creado correctamente.",
            color: "success",
          },
          type: "create",
          reset: formHook.reset,
          setError: formHook.setError,
          successFunction: closeModal,
        }),
      )()
      .finally(() => formHook.setLoading(false));
  };

  return (
    <CustomModal
      modalprops={{ size: "3xl", scrollBehavior: "inside" }}
      title="Nueva Compra"
      triggerLabel="Nueva Compra"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <BuyBillForm {...formHook} />
    </CustomModal>
  );
}
