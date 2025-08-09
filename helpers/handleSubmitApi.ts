import { addToast, ToastProps } from "@heroui/toast";
import { Path, UseFormReturn } from "react-hook-form";

import { BaseErrorInterface, BaseInterface } from "@/types/bases";

const handleSubmitApi = async <T extends BaseInterface>({
  form,
  url,
  toast,
  type,
  reset,
  setError,
  successFunction,
}: {
  form: T;
  url: string;
  toast: {
    title: string;
    description: string;
    color: ToastProps["color"];
  };
  type: "create" | "update";
  reset: UseFormReturn<T>["reset"];
  setError: UseFormReturn<T>["setError"];
  successFunction?: (data?: T) => void;
}) => {
  try {
    const res = await fetch(url, {
      method: type === "create" ? "POST" : "PUT",
      body: JSON.stringify(form),
    });

    if (res.ok) {
      addToast(toast);

      if (type === "update") {
        const data: T = await res.json();

        successFunction?.(data);
        reset(data);

        return;
      }
      successFunction?.();
      reset();

      return;
    }

    if (res.status === 400) {
      const data: BaseErrorInterface<T> = await res.json();

      Object.keys(data).forEach((key) => {
        if (key === "formError") return;

        const fieldKey: Path<T> = key as Path<T>;

        setError(fieldKey, {
          type: "manual",
          message: data[fieldKey]?.join(", "),
        });
      });

      if (data.formError) {
        addToast({
          title: "Error",
          description: data.formError,
          color: "danger",
        });
      }

      return;
    }

    // Manejo de errores genérico para otros códigos de estado
    const errorData = await res.json().catch(() => ({
      detail: `La petición falló con el estado: ${res.status}`,
    }));

    addToast({
      title: "Error",
      description:
        errorData.detail || errorData.message || "Ocurrió un error inesperado.",
      color: "danger",
    });
  } catch {
    // Manejo de errores de red
    addToast({
      title: "Error de Conexión",
      description:
        "No se pudo comunicar con el servidor. Inténtalo de nuevo más tarde.",
      color: "danger",
    });
  }
};

export default handleSubmitApi;
