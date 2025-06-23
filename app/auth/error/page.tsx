"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";

import { useAuthText } from "@/context/AuthTextLayoutCOntext";

export default function SignIn() {
  const queryParams = useSearchParams();
  const error = queryParams.get("error");
  const { setMessage, setSubMessage } = useAuthText();

  useEffect(() => {
    if (error) {
      setMessage("Error de autenticación");
      setSubMessage(
        "Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo.",
      );
      addToast({
        title: "Error de autenticación",
        description: `Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo. ${error}`,
        color: "danger",
      });
    }
  }, [error]);

  return (
    <h1 className="text-center text-2xl font-semibold">
      Ha Ocurrido un error {":("} {error}
    </h1>
  );
}
