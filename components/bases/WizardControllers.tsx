import { Button, ButtonGroup } from "@heroui/button";
import { Spinner } from "@heroui/spinner";
import React from "react";

import {
  WizardController,
  WizardFormHookBase,
} from "@/components/bases/MultiStepWizard";

type Props<FormHook extends WizardFormHookBase<any>> = {
  controller: WizardController<FormHook, any>;
  formHook: FormHook;
};

export default function WizardControllers<
  FormHook extends WizardFormHookBase<any>,
>({ controller, formHook }: Props<FormHook>) {
  return (
    <ButtonGroup>
      <Button
        isDisabled={controller.isFirstStep || formHook.loading}
        size="sm"
        variant="flat"
        onPress={() => controller.previous()}
      >
        {formHook.loading ? (
          <Spinner size="sm" />
        ) : (
          controller.prevLabel || "Anterior"
        )}
      </Button>
      {!controller.isLastStep && (
        <Button
          color="secondary"
          isDisabled={formHook.loading}
          size="sm"
          onPress={() => controller.next()}
        >
          {formHook.loading ? (
            <Spinner size="sm" />
          ) : (
            controller.nextLabel || "Siguiente"
          )}
        </Button>
      )}
      {controller.isLastStep && (
        <Button
          color="primary"
          isDisabled={formHook.loading}
          size="sm"
          onPress={() => controller.finish()}
        >
          {formHook.loading ? (
            <Spinner size="sm" />
          ) : (
            controller.finishLabel || "Finalizar"
          )}
        </Button>
      )}
    </ButtonGroup>
  );
}
