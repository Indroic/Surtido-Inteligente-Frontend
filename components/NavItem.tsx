"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { NavBarItemType } from "@/types/navbar";
import { useRouter } from "next/navigation";

export default function NavItem({
  Icon,
  label,
  onPress,
  href,
}: NavBarItemType) {
  const router = useRouter()
  return (
    <Tooltip showArrow color="primary" content={label}>
      <Button
        isIconOnly
        size="md"
        variant="light"
        onPress={() =>{ onPress?.(); if(href){router.push(href);} }}
      >
        <Icon size={28} stroke={1} />
      </Button>
    </Tooltip>
  );
}
