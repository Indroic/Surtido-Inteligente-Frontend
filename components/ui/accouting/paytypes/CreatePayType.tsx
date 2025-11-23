import { IconPlus } from "@tabler/icons-react";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { PAY_TYPES_API_URL } from "@/UrlPaths";
import usePayTypeForm from "@/hooks/accouting/usePayTypeForm";
import { PayType } from "@/types/finanzas";
import PayTypeForm from "@/components/forms/accouting/PayTypeForm";

export default function CreatePayType() {
  const formHook = usePayTypeForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<PayType>({
          form: data,
          url: PAY_TYPES_API_URL,
          toast: {
            title: "Tipo de Pago Creado",
            description: "El tipo de pago se ha creado correctamente.",
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
      title="Nuevo Tipo de Pago"
      triggerLabel="Nuevo Tipo de Pago"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <PayTypeForm {...formHook} />
    </CustomModal>
  );
}
