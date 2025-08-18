import { IconPlus } from "@tabler/icons-react";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { ProveedorInterface } from "@/types/proveedores";
import useProviderForm from "@/hooks/entries/useProviderForm";
import ProviderForm from "@/components/forms/entries/ProviderForm";
import { PROVIDERS_API_URL } from "@/UrlPaths";

export default function CreateProvider() {
  const formHook = useProviderForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<ProveedorInterface>({
          form: data,
          url: PROVIDERS_API_URL,
          toast: {
            title: "Proveedor Creado",
            description: "El proveedor se ha creado correctamente.",
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
      title="Nuevo Proveedor"
      triggerLabel="Nuevo Proveedor"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <ProviderForm {...formHook} />
    </CustomModal>
  );
}
