import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { NavBarItemType } from "@/types/navbar";

export default function NavItem({
  Icon,
  label,
  onPress,
  href,
}: NavBarItemType) {
  return (
    <Tooltip showArrow color="primary" content={label}>
      <Button
        isIconOnly
        href={href}
        size="md"
        variant="light"
        onPress={() => onPress?.()}
      >
        <Icon size={28} stroke={1} />
      </Button>
    </Tooltip>
  );
}
