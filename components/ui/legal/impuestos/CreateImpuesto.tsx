import { IconPlus } from "@tabler/icons-react";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { ImpuestoInterface } from "@/types/legal";
import useImpuestoForm from "@/hooks/legal/impuestos/useImpuestoForm";
import ImpuestoForm from "@/components/forms/legal/ImpuestoForm";

export default function CreateImpuesto() {
  const formHook = useImpuestoForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<ImpuestoInterface>({
          form: data,
          url: "/api/legal/impuestos/",
          toast: {
            title: "Impuesto Creado",
            description: "El impuesto se ha creado correctamente.",
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
      title="Nuevo Impuesto"
      triggerLabel="Nuevo Impuesto"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <ImpuestoForm {...formHook} />
    </CustomModal>
  );
}
