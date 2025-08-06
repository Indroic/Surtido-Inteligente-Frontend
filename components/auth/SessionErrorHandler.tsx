"use client";
import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";

/**
 * Este componente revisa si hay error de refresh en la sesión y cierra la sesión automáticamente.
 * Úsalo en tu layout principal o en _app.tsx/_app.js
 */
export default function SessionErrorHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signOut({ callbackUrl: "/auth/signin" });
    }
  }, [session]);

  return null;
}
