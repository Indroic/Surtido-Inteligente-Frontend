"use client";

import { useQueryState } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";

/**
 * Hook para manejar el paso actual del wizard usando query params (step).
 * Permite reutilizar botones de navegación fuera del contexto directo del wizard
 * y evita tener que depender de contextos personalizados.
 */
const useWizardQueryParam = () => {
  const [step, setStep] = useQueryState("step", {
    parse: Number,
    defaultValue: 0,
  });

  return { step, setStep };
};

export const wizardLoader = createLoader({
  step: parseAsInteger.withDefault(0),
});

export default useWizardQueryParam;
