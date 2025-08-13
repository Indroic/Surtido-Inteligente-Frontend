import { useEffect, useState } from "react";
import {
  DefaultValues,
  FieldValues,
  useForm,
  useFormState,
} from "react-hook-form";

export type BaseFormHookProps<T> = {
  defaultValues?: DefaultValues<T>;
};

export default function useBaseFormHook<T extends FieldValues>({
  defaultValues,
}: BaseFormHookProps<T>) {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, setError, reset } = useForm<T>({
    defaultValues,
  });

  const { isDirty } = useFormState({ control });

  useEffect(() => {
    if (defaultValues && !isDirty) {
      reset(defaultValues);
    }
  }, [defaultValues, reset, isDirty]);

  return {
    handleSubmit,
    control,
    setError,
    reset,
    loading,
    setLoading,
  };
}
