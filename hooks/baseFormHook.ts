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

  const form = useForm<T>({
    defaultValues,
    resolver: validator_schema ? yupResolver(validator_schema) : undefined,
  });

  return {
    ...form, // incluye todos los métodos de react-hook-form (getValues, trigger, etc.)
    loading,
    setLoading,
  };
}
