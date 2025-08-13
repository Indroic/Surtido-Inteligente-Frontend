import { DefaultValues } from "react-hook-form";

import useBaseFormHook, { BaseFormHookProps } from "@/hooks/baseFormHook";
import { ImpuestoInterface } from "@/types/legal";

const defaultProductValues: DefaultValues<ImpuestoInterface> = {
  nombre: "",
  impuesto: 0,
};

export default function useImpuestoForm(
  {
    deactivated = false,
    defaultValues = defaultProductValues,
  }: BaseFormHookProps<ImpuestoInterface> = {
    defaultValues: undefined,
  },
) {
  const baseHook = useBaseFormHook<ImpuestoInterface>({
    deactivated,
    defaultValues,
  });

  return baseHook;
}
