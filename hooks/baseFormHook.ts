import { useState } from "react";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { ObjectSchema } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type BaseFormHookProps<T> = {
  defaultValues?: DefaultValues<T>;
  validator_schema?: ObjectSchema<any>;
};

export default function useBaseFormHook<T extends FieldValues>({
  defaultValues,
  validator_schema,
}: BaseFormHookProps<T>) {
  const [loading, setLoading] = useState(false);

  const { handleSubmit, control, setError, reset, watch, setValue } =
    useForm<T>({
      defaultValues,
      resolver: validator_schema ? yupResolver(validator_schema) : undefined,
    });

  return {
    handleSubmit,
    control,
    setError,
    reset,
    loading,
    setLoading,
    watch,
    setValue,
  };
}
