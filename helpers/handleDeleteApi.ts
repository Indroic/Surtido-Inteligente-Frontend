import { addToast, ToastProps } from "@heroui/toast";

export type HandleDeleteApiProps = {
  url: string;
  toast: {
    title: string;
    description: string;
    color: ToastProps["color"];
  };
  successFunction?: () => void;
  errorFunction?: (error: any) => void;
};

const handleDeleteApi = async ({
  url,
  toast,
  successFunction,
  errorFunction,
}: HandleDeleteApiProps) => {
  try {
    const res = await fetch(url, {
      method: "DELETE",
    });

    if (res.ok) {
      addToast(toast);
      successFunction?.();

      return;
    }

    const errorData = await res.json().catch(() => ({
      detail: `La petición falló con el estado: ${res.status}`,
    }));

    addToast({
      title: "Error",
      description:
        errorData.detail ||
        errorData.message ||
        "No se pudo completar la eliminación.",
      color: "danger",
    });
    errorFunction?.(errorData);
  } catch (error) {
    addToast({
      title: "Error de Red",
      description:
        "No se pudo conectar con el servidor. Por favor, revisa tu conexión.",
      color: "danger",
    });
    errorFunction?.(error);
  }
};

export default handleDeleteApi;
