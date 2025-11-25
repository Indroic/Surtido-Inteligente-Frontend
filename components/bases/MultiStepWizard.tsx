"use client";

import React from "react";
import { Button, ButtonGroup, Spinner } from "@heroui/react";

// Contrato mínimo base del formHook
export interface WizardFormHookBase<FormData = any> {
  loading?: boolean;
  setLoading?: (loading: boolean) => void;
  handleSubmit?: (
    onValid: (data: FormData) => Promise<void> | void,
  ) => () => Promise<void> | void;
  setError?: (...args: any[]) => void;
  reset?: (...args: any[]) => void;
  formState?: { errors?: Record<string, unknown> };
}

export interface WizardStepDefinition<
  FormHook extends WizardFormHookBase<any> = WizardFormHookBase<any>,
> {
  id?: string;
  title?: string;
  component: React.ComponentType<FormHook>;
  /** Names of the fields handled in this step; used for error routing */
  fields?: string[];
  validate?: (formHook: FormHook) => Promise<boolean> | boolean;
}

export interface MultiStepWizardProps<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
> {
  controller: WizardController<FormHook, FormData>;
  hideDefaultNav?: boolean;
  renderNavigation?: (
    ctx: WizardController<FormHook, FormData>,
  ) => React.ReactNode;
  navigationPosition?: "top" | "bottom";
}

export interface WizardController<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
> {
  activeStep: number;
  isFirstStep: boolean;
  isLastStep: boolean;
  totalSteps: number;
  goToStep: (index: number) => void;
  previous: () => void;
  next: () => Promise<void> | void;
  finish: () => Promise<void> | void;
  formHook: FormHook;
  steps: WizardStepDefinition<FormHook>[];
  nextLabel?: string;
  prevLabel?: string;
  finishLabel?: string;
}

// (La sincronización por query se maneja ahora en el hook externo)

function DefaultNavigation<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
>(props: WizardController<FormHook, FormData>) {
  const {
    isFirstStep,
    isLastStep,
    previous,
    next,
    finish,
    activeStep,
    totalSteps,
    formHook,
    steps,
  } = props;

  const current = steps[activeStep];
  const disabledNext = !!formHook.loading;

  return (
    <div className="flex items-center gap-2 justify-between mt-4">
      <div className="text-sm opacity-70">
        Paso {activeStep + 1} de {totalSteps}
        {current?.title ? ` · ${current.title}` : ""}
      </div>
      <ButtonGroup>
        <Button
          isDisabled={isFirstStep || formHook.loading}
          size="sm"
          variant="flat"
          onPress={() => previous()}
        >
          {formHook.loading ? (
            <Spinner size="sm" />
          ) : (
            props.prevLabel || "Anterior"
          )}
        </Button>
        {!isLastStep && (
          <Button
            color="primary"
            isDisabled={disabledNext}
            size="sm"
            onPress={() => next()}
          >
            {formHook.loading ? (
              <Spinner size="sm" />
            ) : (
              props.nextLabel || "Siguiente"
            )}
          </Button>
        )}
        {isLastStep && (
          <Button
            color="success"
            isDisabled={formHook.loading}
            size="sm"
            onPress={() => finish()}
          >
            {formHook.loading ? (
              <Spinner size="sm" />
            ) : (
              props.finishLabel || "Finalizar"
            )}
          </Button>
        )}
      </ButtonGroup>
    </div>
  );
}

export function MultiStepWizard<
  FormHook extends WizardFormHookBase<FormData>,
  FormData = any,
>(props: MultiStepWizardProps<FormHook, FormData>) {
  const {
    controller,
    hideDefaultNav,
    renderNavigation,
    navigationPosition = "bottom",
  } = props;

  const { formHook, steps, activeStep } = controller;
  const Current = steps[activeStep]?.component;

  function renderNav(pos: "top" | "bottom") {
    if (navigationPosition !== pos) return null;
    if (hideDefaultNav) return null;

    return renderNavigation ? (
      renderNavigation(controller)
    ) : (
      <DefaultNavigation {...controller} />
    );
  }

  return (
    <div className="w-full">
      {renderNav("top")}
      <div>
        {Current && <Current {...(formHook as any)} formHook={formHook} />}
      </div>
      {renderNav("bottom")}
    </div>
  );
}

export default MultiStepWizard;
