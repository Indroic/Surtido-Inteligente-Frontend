import { useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";

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

  return {
    handleSubmit,
    control,
    setError,
    reset,
    loading,
    setLoading,
  };
}
