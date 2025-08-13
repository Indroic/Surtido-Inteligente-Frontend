import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { ImpuestoInterface } from "@/types/legal";

const defaultProductValues: DefaultValues<ImpuestoInterface> = {
  nombre: "",
  impuesto: 0,
};

export default function useImpuestoForm(
  {
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ImpuestoInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<ImpuestoInterface>({
    defaultValues,
  });

  return baseHook;
}
