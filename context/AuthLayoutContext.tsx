import { createContext, useContext, useState } from "react";

interface LayoutContextType {
  hideMainText: boolean;
  setHideMainText: (hide: boolean) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  hideMainText: false,
  setHideMainText: () => {},
});

export function AuthLayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hideMainText, setHideMainText] = useState(false);

  return (
    <LayoutContext.Provider value={{ hideMainText, setHideMainText }}>
      {children}
    </LayoutContext.Provider>
  );
}

export function useAuthLayoutContext() {
  return useContext(LayoutContext);
}
