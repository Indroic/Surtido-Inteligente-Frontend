"use client";

import { Button } from "@heroui/button";
import { signIn, useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { addToast } from "@heroui/toast";
import { Skeleton } from "@heroui/skeleton";

export default function SignIn() {
  const { status } = useSession();
  const queryParams = useSearchParams();
  const error = queryParams.get("error");

  useEffect(() => {
    if (error) {
      addToast({
        title: "Error de autenticación",
        description: `Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo. Código de Error: ${error}`,
        color: "danger",
      });
    }
  }, [status, error]);

  if (status === "authenticated") {
    return redirect("/dashboard");
  }

  return (
    <Skeleton isLoaded className="rounded-md">
      <Button
        key={"surtido-inteligente"}
        className="w-full"
        color="primary"
        size="md"
        onPress={() => signIn("surtido-intelligente-oauth")}
      >
        {"Cuenta Surtido Inteligente"}
      </Button>
    </Skeleton>
  );
}
