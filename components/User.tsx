"use client";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
} from "@heroui/dropdown";
import { Skeleton } from "@heroui/skeleton";
import { signOut, useSession } from "next-auth/react";
import { useMemo, useState } from "react";
import { User as UserHeroUI } from "@heroui/user";

import { DropdownElement } from "@/types/navbar";

const dropdownElements: DropdownElement[] = [
  {
    label: "Cerrar Sesion",
    onPress: () => signOut(),
    danger: true,
  },
];

export default function User() {
  const { data, status } = useSession();
  const [loaded, setLoaded] = useState<boolean>(false);

  useMemo(() => {
    if (status == "authenticated") {
      setLoaded(!loaded);
    }
  }, [status]);

  return (
    <Dropdown>
      <DropdownTrigger className="w-min">
        <Skeleton className="rounded-full" isLoaded={loaded}>
          <UserHeroUI name={data?.user?.username} />
        </Skeleton>
      </DropdownTrigger>
      <DropdownMenu>
        <DropdownSection items={dropdownElements} title={"Acciones"}>
          {(item) => (
            <DropdownItem
              key={item.label.replace(" ", "").toLowerCase()}
              className={item.danger ? "text-danger" : ""}
              color={item.danger ? "danger" : "default"}
              onPress={item.onPress}
            >
              {item.label}
            </DropdownItem>
          )}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
}
