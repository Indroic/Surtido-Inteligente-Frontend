import { useCallback, useEffect, useMemo, useState } from "react";

import useWizardQueryParam from "@/hooks/utils/useWizardQueryParam";
import {
  WizardFormHookBase,
  WizardStepDefinition,
  WizardController,
} from "@/components/bases/MultiStepWizard";

export interface UseWizardControllerOptions<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
> {
  steps: WizardStepDefinition<FormHook>[];
  formHook: FormHook;
  onFinish: (data: FormData) => Promise<void> | void;
  /** Sincronizar con query param ?step= */
  syncWithQueryParam?: boolean;
  /** Etiquetas opcionales */
  labels?: {
    next?: string;
    prev?: string;
    finish?: string;
  };
}

export default function useWizardController<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
>(
  options: UseWizardControllerOptions<FormHook, FormData>,
): WizardController<FormHook, FormData> {
  const { steps, formHook, onFinish, syncWithQueryParam, labels } = options;
  const [activeStep, setActiveStep] = useState(0);
  const { step: qpStep, setStep: setQpStep } = useWizardQueryParam();
  const errors = formHook?.formState?.errors ?? {};

  const fieldToStepIndex = useMemo(() => {
    const map = new Map<string, number>();

    steps.forEach((step, index) => {
      step.fields?.forEach((field) => {
        if (typeof field === "string" && !map.has(field)) {
          map.set(field, index);
        }
      });
    });

    return map;
  }, [steps]);

  // Sincronización query param
  useEffect(() => {
    if (!syncWithQueryParam) return;
    if (qpStep !== activeStep) setActiveStep(qpStep);
  }, [qpStep, activeStep, syncWithQueryParam]);

  useEffect(() => {
    if (!syncWithQueryParam) return;
    if (activeStep !== qpStep) setQpStep(activeStep);
  }, [activeStep, qpStep, syncWithQueryParam, setQpStep]);

  const totalSteps = steps.length;
  const isFirstStep = activeStep === 0;
  const isLastStep = activeStep === totalSteps - 1;

  const goToStep = useCallback(
    (index: number) => {
      if (index < 0 || index >= totalSteps) return;
      setActiveStep(index);
    },
    [totalSteps],
  );

  const previous = useCallback(() => {
    if (!isFirstStep) setActiveStep((s) => s - 1);
  }, [isFirstStep]);

  const next = useCallback(async () => {
    const def = steps[activeStep];

    if (def?.validate) {
      const ok = await def.validate(formHook);

      if (!ok) return;
    }

    if (!isLastStep) setActiveStep((s) => s + 1);
  }, [steps, activeStep, formHook, isLastStep]);

  const finish = useCallback(async () => {
    const def = steps[activeStep];

    if (def?.validate) {
      const ok = await def.validate(formHook);

      if (!ok) return;
    }

    if (formHook.handleSubmit) {
      formHook.setLoading?.(true);
      try {
        await formHook.handleSubmit(async (data: FormData) => {
          await onFinish(data);
        })();
      } finally {
        formHook.setLoading?.(false);
      }
    } else {
      await onFinish(undefined as unknown as FormData);
    }
  }, [steps, activeStep, formHook, onFinish]);

  useEffect(() => {
    const errorKeys = Object.keys(errors || {});

    if (!errorKeys.length) return;

    let targetIndex: number | null = null;

    for (const key of errorKeys) {
      const rootKey = key.split(".")[0] ?? key;
      const stepIndex = fieldToStepIndex.get(rootKey);

      if (typeof stepIndex === "number") {
        targetIndex =
          targetIndex === null ? stepIndex : Math.min(targetIndex, stepIndex);
      }
    }

    if (targetIndex !== null && targetIndex !== activeStep) {
      setActiveStep(targetIndex);
    }
  }, [errors, fieldToStepIndex, activeStep]);

  return useMemo(
    () => ({
      activeStep,
      isFirstStep,
      isLastStep,
      totalSteps,
      goToStep,
      previous,
      next,
      finish,
      formHook,
      steps,
      nextLabel: labels?.next,
      prevLabel: labels?.prev,
      finishLabel: labels?.finish,
    }),
    [
      activeStep,
      isFirstStep,
      isLastStep,
      totalSteps,
      goToStep,
      previous,
      next,
      finish,
      formHook,
      steps,
      labels?.next,
      labels?.prev,
      labels?.finish,
    ],
  );
}
