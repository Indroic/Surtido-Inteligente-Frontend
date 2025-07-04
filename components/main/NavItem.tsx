"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { NavBarItemType } from "@/types/navbar";

import Link from 'next/link'

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
          <Icon size={28} stroke={1} />
        </Button>
      </Tooltip>
    </Link>
  );
}
