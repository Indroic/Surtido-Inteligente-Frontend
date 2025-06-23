import { createContext, useContext, useState, ReactNode } from "react";

type HeaderBarContextType = {
  hidden: boolean;
  setHidden: (hidden: boolean) => void;
};

const NavBarContext = createContext<HeaderBarContextType | undefined>(
  undefined,
);

export const HeaderBarProvider = ({ children }: { children: ReactNode }) => {
  const [hidden, setHidden] = useState<boolean>(false);

  return (
    <NavBarContext.Provider
      value={{ hidden, setHidden } as HeaderBarContextType}
    >
      {children}
    </NavBarContext.Provider>
  );
};

export const useHeaderBar = () => {
  const context = useContext(NavBarContext);

  if (!context) {
    throw new Error("useHeaderBar must be used within a HeaderBarProvider");
  }

  return context;
};
