"use client";

import type { ThemeProviderProps } from "next-themes";

import * as React from "react";
import { HeroUIProvider } from "@heroui/system";
import { ToastProvider } from "@heroui/toast";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { useRouter } from "next/dist/client/router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import { store, persistor } from "../store/store"; // Asegúrate de que la ruta sea correcta

import { NavBarProvider } from "@/context/NavBarContext";
import { AuthLayoutProvider } from "@/context/AuthLayoutContext";
import { AuthTextProvider } from "@/context/AuthTextLayoutCOntext";
import { BreadActionsProvider } from "@/context/ActionsContext";

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
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <HeroUIProvider>
          <ToastProvider />
          <SessionProvider session={session}>
            <NextThemesProvider {...themeProps}>
              <NavBarProvider>
                <AuthLayoutProvider>
                  <AuthTextProvider>
                    <BreadActionsProvider>{children}</BreadActionsProvider>
                  </AuthTextProvider>
                </AuthLayoutProvider>
              </NavBarProvider>
            </NextThemesProvider>
          </SessionProvider>
        </HeroUIProvider>
      </PersistGate>
    </Provider>
  );
}
