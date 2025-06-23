"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { useRouter } from "next/navigation";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";

import { NavBarProvider } from "@/context/NavBarContext";
import { AuthLayoutProvider } from "@/context/AuthLayoutContext";
import { AuthTextProvider } from "@/context/AuthTextLayoutCOntext";

export interface ProvidersProps {
  children: React.ReactNode;
  themeProps?: ThemeProviderProps;
  session: Session;
}

declare module "@react-types/shared" {
  interface RouterConfig {
    routerOptions: NonNullable<
      Parameters<ReturnType<typeof useRouter>["push"]>[1]
    >;
  }
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  const router = useRouter();
  // **IMPORTANTE** el useHref no funciona, corregir para poder usarse correctamente en los componentes
  const useHref = (href: string) => process.env.BASE_PATH + href;

  return (
    <HeroUIProvider navigate={router.push} useHref={useHref}>
      <ToastProvider />
      <SessionProvider session={session}>
        <NextThemesProvider {...themeProps}>
          <NavBarProvider>
            <AuthLayoutProvider>
              <AuthTextProvider>{children}</AuthTextProvider>
            </AuthLayoutProvider>
          </NavBarProvider>
        </NextThemesProvider>
      </SessionProvider>
    </HeroUIProvider>
  );
}
