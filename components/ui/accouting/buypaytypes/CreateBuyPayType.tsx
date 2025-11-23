import { IconPlus } from "@tabler/icons-react";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { BUY_PAY_TYPES_API_URL } from "@/UrlPaths";
import useBuyPayTypeForm from "@/hooks/accouting/useBuyPayTypeForm";
import { BuyPayType } from "@/types/finanzas";
import BuyPayTypeForm from "@/components/forms/accouting/BuyPayTypeForm";

export default function CreateBuyPayType() {
  const formHook = useBuyPayTypeForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<BuyPayType>({
          form: data,
          url: BUY_PAY_TYPES_API_URL,
          toast: {
            title: "Tipo de Pago de Compra Creado",
            description:
              "El tipo de pago de compra se ha creado correctamente.",
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
      modalprops={{ size: "xl", scrollBehavior: "inside" }}
      title="Nuevo Tipo de Pago de Compra"
      triggerLabel="Nuevo Tipo de Pago de Compra"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <BuyPayTypeForm {...formHook} />
    </CustomModal>
  );
}
