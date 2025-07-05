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
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleHeaderVisibility } from "@/store/features/header/HeaderSlice";

export default function ConfigDropDown() {
  const { theme, setTheme } = useTheme();
  const hiddenHeaderBar = useAppSelector((state) => state.header.hidden);
  const dispatch = useAppDispatch()

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
      onPress: () => dispatch(toggleHeaderVisibility()),
      Icon: hiddenHeaderBar ? IconEye : IconEyeClosed,
    },
  ];

  return (
    <Dropdown>
      <DropdownTrigger className="w-min">
        <IconDotsVertical />
      </DropdownTrigger>
      <DropdownMenu items={elements}>
        {(item: DropdownElement) => (
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
