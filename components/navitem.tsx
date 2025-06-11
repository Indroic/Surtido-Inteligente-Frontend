import { Button } from "@heroui/button";
import { Tooltip } from "@heroui/tooltip";

import { NavBarItemType } from "@/types";

export default function NavItem({
  Icon,
  label,
  onPress,
  href,
}: NavBarItemType) {
  return (
    <Tooltip showArrow color="primary" content={label} placement="right">
      <Button
        isIconOnly
        href={href}
        size="lg"
        variant="light"
        onPress={() => onPress?.()}
      >
        <Icon size={32} stroke={1} />
      </Button>
    </Tooltip>
  );
}
