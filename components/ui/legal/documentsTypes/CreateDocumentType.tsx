import { IconPlus } from "@tabler/icons-react";

import { DOCUMENTS_TYPES_API_URL } from "../../UrlPaths";

import CustomModal from "@/components/bases/modal";
import handleSubmitApi from "@/helpers/handleSubmitApi";
import { DocumentTypeInterface } from "@/types/legal";
import useDocumentTypeForm from "@/hooks/legal/useDocumentTypeForm";
import DocumentTypeForm from "@/components/forms/legal/DocumentTypeForm";

export default function CreateDocumentType() {
  const formHook = useDocumentTypeForm();

  const onSubmit = (closeModal: () => void) => {
    formHook.setLoading(true);
    formHook
      .handleSubmit((data) =>
        handleSubmitApi<DocumentTypeInterface>({
          form: data,
          url: DOCUMENTS_TYPES_API_URL,
          toast: {
            title: "Tipo de Documento Creado",
            description: "El Tipo de Documento se ha creado correctamente.",
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
      title="Nuevo Tipo de Documento"
      triggerLabel="Nuevo Tipo de Documento"
      triggerProps={{ startContent: <IconPlus size={16} /> }}
      onConfirm={(closeModal) => onSubmit(closeModal)}
    >
      <DocumentTypeForm {...formHook} />
    </CustomModal>
  );
}
