"use client";

import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";
import { useRouter } from "next/navigation";

import { NavBarItemType } from "@/types/navbar";

export default function NavItem({
  Icon,
  label,
  onPress,
  href,
}: NavBarItemType) {
  const router = useRouter();

  return (
    <Tooltip showArrow color="primary" content={label}>
      <Button
        isIconOnly
        size="md"
        variant="light"
        onPress={() => {
          onPress?.();
          if (href) {
            router.push(href);
          }
        }}
      >
        <Icon size={28} stroke={1} />
      </Button>
    </Tooltip>
  );
}
