import { DefaultValues } from "react-hook-form";
import { useState } from "react";
import * as yup from "yup";

import useInfiniteScroll from "../useInfiniteScroll";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { ProveedorInterface } from "@/types/proveedores";
import { DocumentTypeInterface } from "@/types/legal";
import { DOCUMENTS_TYPES_API_URL } from "@/UrlPaths";

const defaultProductValues: DefaultValues<ProveedorInterface> = {
  name: "",
  document: "",
  document_type: "",
  phone: "",
  email: "",
  direction: "",
};

export default function useProviderForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ProveedorInterface> = {
    defaultValues: undefined,
  },
) {
  const [openDocumentType, setOpenDocumentType] = useState<boolean>(false);

  const validator_schema = yup.object<ProveedorInterface>({
    name: yup.string().required("El Nombre es Requerido"),
    document: yup.string().required("El Documento es Requerido").min(6),
    document_type: yup.string().required("El Tipo de Documento es Requerido"),
    phone: yup.string().required("El Telefono es Requerido").length(13),
    email: yup.string().email("El Email no es Valido"),
    direction: yup.string().required("La Direccion es Requerida"),
  });

  const baseHook = useBaseFormHook<ProveedorInterface>({
    defaultValues,
    validator_schema,
  });

  const {
    items: documentTypes,
    loading: documentsTypeLoading,
    scrollerRef: scrollRefDocumentTypes,
  } = useInfiniteScroll<DocumentTypeInterface>({
    Enabled: openDocumentType,
    url: DOCUMENTS_TYPES_API_URL,
  });

  return {
    ...baseHook,
    openDocumentType,
    setOpenDocumentType,
    documentTypesData: {
      documentTypes,
      documentsTypeLoading,
      scrollRefDocumentTypes,
    },
  };
}
