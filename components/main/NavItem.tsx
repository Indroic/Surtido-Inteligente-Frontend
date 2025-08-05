"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import Link from "next/link";

import { NavBarItemType } from "@/types/navbar";

export default function NavItem({
  Icon,
  label,
  onPress,
  href,
}: NavBarItemType) {
  return (
    <Link href={href || ""}>
      <Tooltip showArrow color="primary" content={label}>
        <Button
          isIconOnly
          size="md"
          variant="light"
          onPress={() => onPress?.()}
        >
          {Icon && <Icon size={28} stroke={1} />}
        </Button>
      </Tooltip>
    </Link>
  );
}
