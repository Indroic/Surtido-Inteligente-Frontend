"use client";

import { DOCUMENTS_TYPES_API_URL } from "../../UrlPaths";

import DrawerDetails from "@/components/common/details/DetailsDrawer";
import useDetails from "@/hooks/common/details/useDetails";
import { DocumentTypeInterface } from "@/types/legal";
import useDocumentTypeForm from "@/hooks/legal/useDocumentTypeForm";
import DocumentTypeForm from "@/components/forms/legal/DocumentTypeForm";

export default function DocumentTypeDetails() {
  const useDetailsContext = useDetails<DocumentTypeInterface>({
    apiPath: DOCUMENTS_TYPES_API_URL,
    useFormHook: useDocumentTypeForm,
    toastMessages: {
      update: {
        title: "Tipo de Documento Actualizado",
        description: "El Tipo de Documento se ha actualizado correctamente.",
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
        <DocumentTypeForm
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
