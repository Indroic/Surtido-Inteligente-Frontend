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
import { HeaderBarProvider } from "@/context/HeaderBarContext";

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

  return (
    <HeroUIProvider navigate={router.push}>
      <ToastProvider />
      <SessionProvider session={session}>
        <NextThemesProvider {...themeProps}>
          <NavBarProvider>
            <AuthLayoutProvider>
              <AuthTextProvider>
                <HeaderBarProvider>
                  {children}
                </HeaderBarProvider>
              </AuthTextProvider>
            </AuthLayoutProvider>
          </NavBarProvider>
        </NextThemesProvider>
      </SessionProvider>
    </HeroUIProvider>
  );
}
