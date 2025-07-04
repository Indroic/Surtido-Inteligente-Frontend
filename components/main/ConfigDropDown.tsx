"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import {
  IconSun,
  IconMoon,
  IconDotsVertical,
  IconEyeClosed,
  IconEye,
} from "@tabler/icons-react";
import { useTheme } from "next-themes";

import { DropdownElement } from "@/types/navbar";
import { useHeaderBar } from "@/context/HeaderBarContext";

export default function ConfigDropDown() {
  const { theme, setTheme } = useTheme();
  const { hidden: hiddenHeaderBar, setHidden: setHiddenHeaderBar } =
    useHeaderBar();

  const elements: DropdownElement[] = [
    {
      label: `Tema ${theme === "dark" ? "Claro" : "Oscuro"}`,
      onPress: () => {
        setTheme(theme === "dark" ? "light" : "dark");
      },
      Icon: theme === "dark" ? IconSun : IconMoon,
    },
    {
      label: `${hiddenHeaderBar ? "Mostrar" : "Ocultar"} Header `,
      onPress: () => {
        setHiddenHeaderBar(!hiddenHeaderBar);
      },
      Icon: hiddenHeaderBar ? IconEye : IconEyeClosed,
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger className="w-min">
        <IconDotsVertical />
      </DropdownTrigger>
      <DropdownMenu items={elements}>
        {(item) => (
          <DropdownItem
            key={item.label.replace(" ", "").toLowerCase()}
            className={item.danger ? "text-danger" : ""}
            color={item.danger ? "danger" : "default"}
            startContent={item.Icon && <item.Icon size={16} />}
            onPress={item.onPress}
          >
            {item.label}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
}
