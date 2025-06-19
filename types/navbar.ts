import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type NavBarItemType = {
  Icon: React.ElementType;
  label: string;
  onPress?: () => void;
  href?: string;
};

export interface DropdownElement extends NavBarItemType {
  danger?: boolean;
}
