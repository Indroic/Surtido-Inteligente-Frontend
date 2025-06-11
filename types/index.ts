import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

interface BaseInterface {
  id: string;
  created_at: string;
  updated_at: string;
}

export interface ClienteInterface extends BaseInterface {
  names: string;
  lastnames: string;
  document: string;
  phone: string;
  email?: string;
  birthdate: string;
  document_type: string;

  //Estos solo estan cuando se hace el Get
  credito?: number;
  deuda?: number;
}

export interface UsuarioInterface extends BaseInterface {
  username: string;
  client?: ClienteInterface;
  is_active?: boolean;
  is_superuser?: boolean;
  is_staff?: boolean;
  is_client?: boolean;
  is_seller?: boolean;
}

export type NavBarItemType = {
  Icon: React.ElementType;
  label: string;
  onPress?: () => void;
  href?: string;
};
