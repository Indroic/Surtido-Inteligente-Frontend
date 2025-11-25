import { useQueryState } from "nuqs";
import { createLoader, parseAsInteger } from "nuqs/server";

const useWizardQueryParam = () => {
  const [step, setStep] = useQueryState("step", {
    parse: Number,
    defaultValue: 0,
  });

  return {
    step,
    setStep,
  };
};

export const loader = createLoader({
  step: parseAsInteger.withDefault(0),
});

export default useWizardQueryParam;
