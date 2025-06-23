import { createContext, useContext, useState } from "react";

const WelcomeContext = createContext({
  message: "Iniciar Sesión",
  subMessage: "Selecciona un método de autenticación",
  setMessage: (_: string) => {},
  setSubMessage: (_: string) => {},
});

export function AuthTextProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("Iniciar Sesión");
  const [subMessage, setSubMessage] = useState(
    "Selecciona un método de autenticación",
  );

  return (
    <WelcomeContext.Provider
      value={{ message, subMessage, setMessage, setSubMessage }}
    >
      {children}
    </WelcomeContext.Provider>
  );
}

export const useAuthText = () => useContext(WelcomeContext);
