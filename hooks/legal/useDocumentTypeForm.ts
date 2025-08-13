import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { DocumentTypeInterface } from "@/types/legal";

const defaultProductValues: DefaultValues<DocumentTypeInterface> = {
  nombre: "",
  codigo: "",
};

export default function useDocumentTypeForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<DocumentTypeInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<DocumentTypeInterface>({
    defaultValues,
  });

  return baseHook;
}
