"use client";

import type { BuiltInProviderType } from "next-auth/providers";

import { Button } from "@heroui/button";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { addToast } from "@heroui/toast";
import { Skeleton } from "@heroui/skeleton";

export default function SignIn() {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);
  const { status } = useSession();
  const queryParams = useSearchParams();
  const error = queryParams.get("error");

  useEffect(() => {
    if (status === "unauthenticated") {
      getProviders().then((provs) => {
        setProviders(provs);
      });
    }
    if (error) {
      addToast({
        title: "Error de autenticación",
        description: `Hubo un problema al iniciar sesión. Por favor, inténtalo de nuevo. Código de Error: ${error}`,
        color: "danger",
      });
    }
  }, [status, error]);

  if (!providers && status === "authenticated") {
    return redirect("/dashboard");
  }

  return (
    <Skeleton className="rounded-md" isLoaded={!!providers}>
      {providers ? (
        Object.values(providers).map((provider) => (
          <Button
            key={provider.name}
            className="w-full"
            color="primary"
            size="md"
            onPress={() => signIn(provider.id)}
          >
            {provider.name}
          </Button>
        ))
      ) : (
        <p>NO METODOS DE AUTENTICACION DISPONIBLES</p>
      )}
    </Skeleton>
  );
}
