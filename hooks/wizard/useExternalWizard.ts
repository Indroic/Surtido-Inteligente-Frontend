"use client";

import { useCallback, useMemo } from "react";

import useWizardQueryParam from "@/hooks/wizard/useWizardQueryParam";

/**
 * Hook externo para controlar el paso del wizard sin acceder al contexto interno.
 * Ideal para breadcrumbs, botones en header, etc.
 * Acepta opcionalmente un arreglo de ids para salto por id.
 */
export default function useExternalWizard(stepIds?: string[]) {
  const { step, setStep } = useWizardQueryParam();

  const total = stepIds?.length ?? undefined;

  const goToIndex = useCallback(
    (index: number) => {
      if (index < 0) return;
      if (total !== undefined && index >= total) return;
      setStep(index);
    },
    [setStep, total],
  );

  const goNext = useCallback(() => {
    if (total !== undefined && step + 1 >= total) return;
    setStep(step + 1);
  }, [setStep, step, total]);

  const goPrev = useCallback(() => {
    if (step - 1 < 0) return;
    setStep(step - 1);
  }, [setStep, step]);

  const idMap = useMemo(() => {
    if (!stepIds) return undefined;
    const map = new Map<string, number>();

    stepIds.forEach((id, idx) => map.set(id, idx));

    return map;
  }, [stepIds]);

  const goToId = useCallback(
    (id: string) => {
      if (!idMap) return;
      const idx = idMap.get(id);

      if (idx === undefined) return;
      goToIndex(idx);
    },
    [idMap, goToIndex],
  );

  return {
    step,
    goToIndex,
    goNext,
    goPrev,
    goToId,
    hasIds: !!stepIds?.length,
    stepIds,
  };
}
